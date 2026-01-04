import { Camp, type Camper, type TruckingData } from "@/models/TruckingData";
import type {
  AddressType,
  Camper1CamperStaffType,
  CellPhoneType,
  DropOffInstructionsType,
  EmailType,
  FamilyNameType,
  HomePhoneType,
  HowManyBagsCamper1Type,
  HowManyBagsStaff1Type,
  JotformContentAnswers,
  JotformFullNameBase,
  JotformResponse,
  PickUpInstructionsType,
} from "@/models/jotform";
import { QuestionText } from "@/models/jotform";
import z from "zod";

type JotformFullName = z.infer<typeof JotformFullNameBase>;

const camperQuestions = [
  QuestionText.Camper1Name,
  QuestionText.Camper2Name,
  QuestionText.Camper3Name,
  QuestionText.Camper4Name,
  QuestionText.Camper1Camp,
  QuestionText.Camper2Camp,
  QuestionText.Camper3Camp,
  QuestionText.Camper4Camp,
  QuestionText.Camper1CamperStaff,
  QuestionText.Camper2CamperStaff,
  QuestionText.Camper3CamperStaff,
  QuestionText.Camper4CamperStaff,
  QuestionText.HowManyBagsCamper1,
  QuestionText.HowManyBagsCamper2,
  QuestionText.HowManyBagsCamper3,
  QuestionText.HowManyBagsCamper4,
  QuestionText.HowManyBagsStaff1,
  QuestionText.HowManyBagsStaff2,
  QuestionText.HowManyBagsStaff3,
  QuestionText.HowManyBagsStaff4,
  QuestionText.HowManyCampers,
];

const parseCampers = (answers: JotformContentAnswers[]): Camper[] => {
  const campers: Camper[] = [];
  const data = {} as Record<QuestionText, any>;
  answers
    .filter((ans) => camperQuestions.includes(ans.text))
    .forEach((ans) => {
      data[ans.text] = ans.answer;
    });
  for (
    let i = 0;
    i < data["How many campers and/or staff members do you have?"];
    i++
  ) {
    const campKey = z
      .enum(QuestionText)
      .parse(`Camper/Staff ${i + 1} Equinunk or Blue Ridge`);
    const camp = data[campKey] as Camp;

    const camperOrStaffKey = z
      .enum(QuestionText)
      .parse(`Camper/CA/CIT/Staff ${i + 1}${i === 0 ? ":" : ""}`);
    const camperOrStaff = data[
      camperOrStaffKey
    ] as Camper1CamperStaffType["answer"];
    let numOfBags = 2;
    if (camperOrStaff === "Camper") {
      const bagsKey = z
        .enum(QuestionText)
        .parse(`How many bags for Camper ${i + 1}?`);
      const numOfBagsRaw = data[bagsKey] as HowManyBagsCamper1Type["answer"];
      numOfBags = numOfBagsRaw?.includes("2 bags") ? 2 : 3;
    } else {
      const bagsKey = z
        .enum(QuestionText)
        .parse(`How many bags for CA/CIT/Staff ${i + 1}?`);
      const numOfBagsRaw = data[bagsKey] as HowManyBagsStaff1Type["answer"];
      if (numOfBagsRaw?.includes("2 bag")) {
        numOfBags = 2;
      } else if (numOfBagsRaw?.includes("3 bag")) {
        numOfBags = 3;
      } else if (numOfBagsRaw?.includes("1 bag")) {
        numOfBags = 1;
      }
    }

    const nameKey = z.enum(QuestionText).parse(`Camper/Staff ${i + 1} Name`);
    const firstName = (data[nameKey] as JotformFullName["answer"])!.first;
    const lastName = (data[nameKey] as JotformFullName["answer"])!.last;
    campers.push({ camp, firstName, lastName, numOfBags });
  }
  return campers;
};

export const parseJotform = (jotformResp: JotformResponse): TruckingData[] => {
  const truckingData: TruckingData[] = [];
  jotformResp.content.map((sub) => {
    const truckingFormattedSub = {} as TruckingData;
    truckingFormattedSub.jotformId = sub.id;
    truckingFormattedSub.SubmissionDate = sub.created_at;
    truckingFormattedSub.campers = parseCampers(Object.values(sub.answers));
    Object.values(sub.answers).map((ans) => {
      switch (ans.text) {
        case QuestionText.FamilyName:
          const answer = ans.answer as FamilyNameType["answer"];
          truckingFormattedSub.FamilyName = answer;
          break;
        case QuestionText.Email:
          const email = ans.answer as EmailType["answer"];
          truckingFormattedSub.email = email;
          break;
        case QuestionText.CellPhone:
          const cellPhone = ans.answer as CellPhoneType["answer"];
          truckingFormattedSub.cellPhone = cellPhone?.full ?? "";
          break;
        case QuestionText.HomePhone:
          const homePhone = ans.answer as HomePhoneType["answer"];
          truckingFormattedSub.homePhone = homePhone?.full ?? "";
          break;
        case QuestionText.Address:
          const {
            addr_line1: line1,
            addr_line2: line2,
            city,
            postal: zip,
            state,
          } = ans.answer as AddressType["answer"];
          truckingFormattedSub.address = { city, state, line1, zip, line2 };
          break;
        case QuestionText.PickUpInstructions:
          const pickUpInstructions =
            ans.answer as PickUpInstructionsType["answer"];
          if (typeof pickUpInstructions === "string")
            truckingFormattedSub.pickUpLocation = pickUpInstructions;
          if (typeof pickUpInstructions === "object")
            truckingFormattedSub.pickUpLocation = pickUpInstructions.other;
          break;
        case QuestionText.DropOffInstructions:
          const dropOffInstructions =
            ans.answer as DropOffInstructionsType["answer"];
          if (typeof dropOffInstructions === "string")
            truckingFormattedSub.returnLocation = dropOffInstructions;
          if (typeof dropOffInstructions === "object")
            truckingFormattedSub.returnLocation = dropOffInstructions.other;
          break;
      }
    });

    truckingData.push(truckingFormattedSub);
  });
  return truckingData;
};
