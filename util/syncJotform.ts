import { db } from "@/db";
import { JotformResponse } from "@/models/jotform";
import { familySubmission } from "@/db/schema/familySubmission";
import { type InferSelectModel } from "drizzle-orm";
import { parseJotform } from "./parseJotfrom";

export const jotformToDb = (
  jotformResp: JotformResponse
): InferSelectModel<typeof familySubmission>[] => {
  return parseJotform(jotformResp).map((sub) => {
    return {
      jotformSubmissionId: sub.jotformId,
      created_at: sub.SubmissionDate,
      route: sub.route,
      stopNumber: sub.stopNumber,
      returnRoute: sub.returnRoute,
      returnStopNumber: sub.returnStopNumber,
      familyName: sub.FamilyName,
      email: sub.email,
      cellPhone: sub.cellPhone,
      homePhone: sub.homePhone,
      address: sub.address,
      returnAddress: sub.returnAddress,
      pickUpLocation: sub.pickUpLocation,
      returnLocation: sub.returnLocation,
    };
  });
};
export const syncJotform = async (jotformResponse: JotformResponse) => {
  const vals = jotformToDb(jotformResponse);
  try {
    await db.insert(familySubmission).values(vals).onConflictDoNothing();
  } catch (e) {
    console.error(e);
  }
};
