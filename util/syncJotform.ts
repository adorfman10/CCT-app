"use server";

import { db } from "@/db";
import { JotformResponse } from "@/models/jotform";
import { familySubmission } from "@/db/schema/familySubmission";
import { camper } from "@/db/schema/campers";
import { type InferSelectModel } from "drizzle-orm";
import { parseJotform } from "./parseJotform";
import { v4 as uuidv4 } from "uuid";

function jotformFamilySubmissionToDb(
  jotformResp: JotformResponse
): InferSelectModel<typeof familySubmission>[] {
  return parseJotform(jotformResp).map((sub) => ({
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
  }));
}

function jotformCampersToDb(
  jotformResponse: JotformResponse
): InferSelectModel<typeof camper>[] {
  return parseJotform(jotformResponse).flatMap((sub) => {
    return sub.campers.map((camper) => ({
      id: uuidv4(),
      camp: camper.camp,
      familySubmissionId: sub.jotformId,
      firstName: camper.firstName,
      lastName: camper.lastName,
      numOfBags: camper.numOfBags,
    }));
  });
}

export async function syncJotform(jotformResponse: JotformResponse) {
  try {
    const vals = jotformFamilySubmissionToDb(jotformResponse);
    await db.insert(familySubmission).values(vals).onConflictDoNothing();
    const camperVals = jotformCampersToDb(jotformResponse);
    await db.insert(camper).values(camperVals).onConflictDoNothing();
    return { success: true };
  } catch (error) {
    console.error("Error syncing Jotform data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
