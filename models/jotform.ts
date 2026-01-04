import { Camp } from "@/models/TruckingData";
import { z } from "zod";

const httpCodes = z.literal([200, 201, 202, 204, 206, 207, 208, 226]);

export const JotformTypes = z.enum([
  "control_head",
  "control_button",
  "control_pagebreak",
  "control_text",
  "control_checkbox",
  "control_email",
  "control_textbox",
  "control_textarea",
  "control_radio",
  "control_phone",
  "control_fullname",
  "control_address",
  "control_calculation",
  "control_square",
  "control_widget",
]);

export enum QuestionText {
  FamilyName = "Family Name",
  DevelopmentName = "Name of Development (if any)",
  CrossroadsName = "Please list Cross Streets, Landmarks",
  SpecialInstructions = "Special Instructions (anything else we should know)",
  CellPhone = "Cell Phone Number",
  HomePhone = "Home Phone Number",
  Email = "Parent Email Address",
  Camper1Name = "Camper/Staff 1 Name",
  Camper2Name = "Camper/Staff 2 Name",
  Camper3Name = "Camper/Staff 3 Name",
  Camper4Name = "Camper/Staff 4 Name",
  Camper1Camp = "Camper/Staff 1 Equinunk or Blue Ridge",
  Camper2Camp = "Camper/Staff 2 Equinunk or Blue Ridge",
  Camper3Camp = "Camper/Staff 3 Equinunk or Blue Ridge",
  Camper4Camp = "Camper/Staff 4 Equinunk or Blue Ridge",
  Camper1CamperStaff = "Camper/CA/CIT/Staff 1:",
  Camper2CamperStaff = "Camper/CA/CIT/Staff 2",
  Camper3CamperStaff = "Camper/CA/CIT/Staff 3",
  Camper4CamperStaff = "Camper/CA/CIT/Staff 4",
  HowManyBagsCamper1 = "How many bags for Camper 1?",
  HowManyBagsCamper2 = "How many bags for Camper 2?",
  HowManyBagsCamper3 = "How many bags for Camper 3?",
  HowManyBagsCamper4 = "How many bags for Camper 4?",
  HowManyBagsStaff1 = "How many bags for CA/CIT/Staff 1?",
  HowManyBagsStaff2 = "How many bags for CA/CIT/Staff 2?",
  HowManyBagsStaff3 = "How many bags for CA/CIT/Staff 3?",
  HowManyBagsStaff4 = "How many bags for CA/CIT/Staff 4?",
  HowManyCampers = "How many campers and/or staff members do you have?",
  PickUpInstructions = "If no one is home, pick up bags from:",
  DropOffInstructions = "If no one is home, return bags to:",
  TotalPrice = "Total Amount Due ($)",
  Address = "Address",
  IGNORE = "IGNORE",
}

export const JotformBase = z.object({
  name: z.string(),
  order: z.coerce.number(),
  text: z.enum(QuestionText),
  type: JotformTypes,
  answer: z.any(),
});

export const JotformHeadBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_head),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformButtonBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_button),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformCheckboxBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_checkbox),
  answer: z.array(z.string()),
  prettyFormat: z.string(),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformPagebreakBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_pagebreak),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformTextBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_text),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformSquareBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_square),
  answer: z.object({
    price: z.coerce.number(),
    paymentArray: z.string(),
  }),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformWidgetBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_widget),
  text: z.string().transform(() => QuestionText.IGNORE),
});

export const JotformCellPhoneBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_phone),
  answer: z
    .object({
      full: z.string(),
    })
    .optional(),
  prettyFormat: z.string().optional(),
});

export const JotformEmailBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_email),
  answer: z.string(),
});

export const JotformFullNameBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_fullname),
  answer: z
    .object({
      first: z.string(),
      last: z.string(),
    })
    .optional(),
  prettyFormat: z.string().optional(),
});

export const JotformRadioBase = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_radio),
  answer: z.string().optional(),
});

export const JotformCalculationSchema = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_calculation),
  answer: z.coerce.number(),
});

export const JotformAddressSchema = JotformBase.extend({
  type: z.literal(JotformTypes.enum.control_address),
  answer: z.object({
    addr_line1: z.string(),
    addr_line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postal: z.string(),
  }),
  prettyFormat: z.string(),
});

//--------------

export const FamilyNameSchema = JotformBase.extend({
  text: z.literal(QuestionText.FamilyName),
  type: z.literal(JotformTypes.enum.control_textbox),
  answer: z.string(),
});
export type FamilyNameType = z.infer<typeof FamilyNameSchema>;

export const DevelopmentNameSchema = JotformBase.extend({
  text: z.literal(QuestionText.DevelopmentName),
  type: z.literal(JotformTypes.enum.control_textbox),
  answer: z.string().optional(),
});
export type DevelopmentNameType = z.infer<typeof DevelopmentNameSchema>;

export const CrossroadsNameSchema = JotformBase.extend({
  text: z.literal(QuestionText.CrossroadsName),
  type: z.literal(JotformTypes.enum.control_textarea),
  answer: z.string().optional(),
});
export type CrossroadsNameType = z.infer<typeof CrossroadsNameSchema>;

export const SpecialInstructionsSchema = JotformBase.extend({
  text: z.literal(QuestionText.SpecialInstructions),
  type: z.literal(JotformTypes.enum.control_textarea),
  answer: z.string().optional(),
});
export type SpecialInstructionsType = z.infer<typeof SpecialInstructionsSchema>;

export const CellPhoneSchema = JotformCellPhoneBase.extend({
  text: z.literal(QuestionText.CellPhone),
});
export type CellPhoneType = z.infer<typeof CellPhoneSchema>;

export const HomePhoneSchema = JotformCellPhoneBase.extend({
  text: z.literal(QuestionText.HomePhone),
});
export type HomePhoneType = z.infer<typeof HomePhoneSchema>;

export const EmailSchema = JotformEmailBase.extend({
  text: z.literal(QuestionText.Email),
});
export type EmailType = z.infer<typeof EmailSchema>;

export const Camper1NameSchema = JotformFullNameBase.extend({
  text: z.literal(QuestionText.Camper1Name),
});
export type Camper1NameType = z.infer<typeof Camper1NameSchema>;
export const Camper2NameSchema = JotformFullNameBase.extend({
  text: z.literal(QuestionText.Camper2Name),
});
export type Camper2NameType = z.infer<typeof Camper2NameSchema>;
export const Camper3NameSchema = JotformFullNameBase.extend({
  text: z.literal(QuestionText.Camper3Name),
});
export type Camper3NameType = z.infer<typeof Camper3NameSchema>;
export const Camper4NameSchema = JotformFullNameBase.extend({
  text: z.literal(QuestionText.Camper4Name),
});
export type Camper4NameType = z.infer<typeof Camper4NameSchema>;

export const Camper1CampSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper1Camp),
  answer: z.enum(Camp),
});
export type Camper1CampType = z.infer<typeof Camper1CampSchema>;
export const Camper2CampSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper2Camp),
  answer: z.enum(Camp).optional(),
});
export type Camper2CampType = z.infer<typeof Camper2CampSchema>;
export const Camper3CampSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper3Camp),
  answer: z.enum(Camp).optional(),
});
export type Camper3CampType = z.infer<typeof Camper3CampSchema>;
export const Camper4CampSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper4Camp),
  answer: z.enum(Camp).optional(),
});
export type Camper4CampType = z.infer<typeof Camper4CampSchema>;

export const Camper1CamperStaffSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper1CamperStaff),
  answer: z.enum(["Camper", "Staff", "CA/CIT"]).optional(),
});
export type Camper1CamperStaffType = z.infer<typeof Camper1CamperStaffSchema>;
export const Camper2CamperStaffSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper2CamperStaff),
  answer: z.enum(["Camper", "Staff", "CA/CIT"]).optional(),
});
export type Camper2CamperStaffType = z.infer<typeof Camper2CamperStaffSchema>;
export const Camper3CamperStaffSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper3CamperStaff),
  answer: z.enum(["Camper", "Staff", "CA/CIT"]).optional(),
});
export type Camper3CamperStaffType = z.infer<typeof Camper3CamperStaffSchema>;
export const Camper4CamperStaffSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.Camper4CamperStaff),
  answer: z.enum(["Camper", "Staff", "CA/CIT"]).optional(),
});
export type Camper4CamperStaffType = z.infer<typeof Camper4CamperStaffSchema>;

export const HowManyBagsCamper1Schema = JotformRadioBase.extend({
  text: z.literal(QuestionText.HowManyBagsCamper1),
  answer: z
    .enum([
      "$395 total, 2 bags total, round trip",
      "$480 total, 3 bags total, round trip",
    ])
    .optional(),
});
export type HowManyBagsCamper1Type = z.infer<typeof HowManyBagsCamper1Schema>;
export const HowManyBagsCamper2Schema = HowManyBagsCamper1Schema.extend({
  text: z.literal(QuestionText.HowManyBagsCamper2),
});
export const HowManyBagsCamper3Schema = HowManyBagsCamper1Schema.extend({
  text: z.literal(QuestionText.HowManyBagsCamper3),
  answer: z
    .enum([
      "$345 total, 2 bags total, round trip",
      "$430 total, 3 bags total, round trip",
    ])
    .optional(),
});
export const HowManyBagsCamper4Schema = HowManyBagsCamper3Schema.extend({
  text: z.literal(QuestionText.HowManyBagsCamper4),
});

export const HowManyBagsStaff1Schema = JotformRadioBase.extend({
  text: z.literal(QuestionText.HowManyBagsStaff1),
  answer: z
    .enum([
      "$395 total, 2 bags total, round trip",
      "$480 total, 3 bags total, round trip",
      "FOR STAFF/CA/CIT ONLY $275 total, 1 bag total, round trip",
      "FOR STAFF/CA/CIT ONLY $180 total, 1 bag total, ONE WAY",
      "FOR STAFF/CA/CIT ONLY $250 total, 2 bag total, ONE WAY",
    ])
    .optional(),
});
export type HowManyBagsStaff1Type = z.infer<typeof HowManyBagsStaff1Schema>;
export const HowManyBagsStaff2Schema = HowManyBagsStaff1Schema.extend({
  text: z.literal(QuestionText.HowManyBagsStaff2),
});
export const HowManyBagsStaff3Schema = HowManyBagsStaff1Schema.extend({
  text: z.literal(QuestionText.HowManyBagsStaff3),
  answer: z
    .enum([
      "$345 total, 2 bags total, round trip",
      "$430 total, 3 bags total, round trip",
      "FOR STAFF/CA/CIT ONLY $275 total, 1 bag total, round trip",
      "FOR STAFF/CA/CIT ONLY $180 total, 1 bag total, ONE WAY",
      "FOR STAFF/CA/CIT ONLY $250 total, 2 bag total, ONE WAY",
    ])
    .optional(),
});
export const HowManyBagsStaff4Schema = HowManyBagsStaff3Schema.extend({
  text: z.literal(QuestionText.HowManyBagsStaff4),
});

export const HowManyCampersSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.HowManyCampers),
  answer: z.coerce.number(),
});
export type HowManyCampersType = z.infer<typeof HowManyCampersSchema>;

export const PickUpInstructionsSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.PickUpInstructions),
  answer: z.union([z.string(), z.object({ other: z.string() })]),
});
export type PickUpInstructionsType = z.infer<typeof PickUpInstructionsSchema>;
export const DropOffInstructionsSchema = JotformRadioBase.extend({
  text: z.literal(QuestionText.DropOffInstructions),
  answer: z.union([z.string(), z.object({ other: z.string() })]),
});
export type DropOffInstructionsType = z.infer<typeof DropOffInstructionsSchema>;

export const TotalPriceSchema = JotformCalculationSchema.extend({
  text: z.literal(QuestionText.TotalPrice),
});
export type TotalPriceType = z.infer<typeof TotalPriceSchema>;

export const AddressSchema = JotformAddressSchema.extend({
  text: z.literal(QuestionText.Address),
});
export type AddressType = z.infer<typeof AddressSchema>;

export const JotformContentAnswersSchema = z.union([
  FamilyNameSchema,
  DevelopmentNameSchema,
  CrossroadsNameSchema,
  SpecialInstructionsSchema,
  CellPhoneSchema,
  HomePhoneSchema,
  EmailSchema,
  Camper1NameSchema,
  Camper2NameSchema,
  Camper3NameSchema,
  Camper4NameSchema,
  Camper1CampSchema,
  Camper2CampSchema,
  Camper3CampSchema,
  Camper4CampSchema,
  Camper1CamperStaffSchema,
  Camper2CamperStaffSchema,
  Camper3CamperStaffSchema,
  Camper4CamperStaffSchema,
  HowManyBagsCamper1Schema,
  HowManyBagsCamper2Schema,
  HowManyBagsCamper3Schema,
  HowManyBagsCamper4Schema,
  HowManyBagsStaff1Schema,
  HowManyBagsStaff2Schema,
  HowManyBagsStaff3Schema,
  HowManyBagsStaff4Schema,
  HowManyCampersSchema,
  PickUpInstructionsSchema,
  DropOffInstructionsSchema,
  TotalPriceSchema,
  AddressSchema,
  JotformHeadBase,
  JotformButtonBase,
  JotformCheckboxBase,
  JotformPagebreakBase,
  JotformTextBase,
  JotformSquareBase,
  JotformWidgetBase,
]);

export const JotformContentSchema = z.array(
  z.object({
    id: z.string(),
    created_at: z.string(), //"2025-08-16 16:12:53",
    answers: z.record(z.string(), JotformContentAnswersSchema),
  })
);

export const JotformResponseSchema = z.object({
  responseCode: httpCodes,
  message: z.string(),
  content: JotformContentSchema,
  duration: z.string(),
  resultSet: z.object({
    offset: z.int(),
    limit: z.int(),
    orderby: z.string().optional(),
    count: z.int(),
  }),
  "limit-left": z.int(),
});

export type JotformResponse = z.infer<typeof JotformResponseSchema>;
export type JotformContent = z.infer<typeof JotformContentSchema>;
export type JotformContentAnswers = z.infer<typeof JotformContentAnswersSchema>;
