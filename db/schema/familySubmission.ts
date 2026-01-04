import { pgTable, text, json } from "drizzle-orm/pg-core";

export const familySubmission = pgTable("familySubmission", {
  jotformSubmissionId: text().primaryKey(),
  created_at: text(),
  route: text(),
  stopNumber: text(),
  returnRoute: text(),
  returnStopNumber: text(),
  familyName: text(),
  email: text(),
  cellPhone: text(),
  homePhone: text(),
  address: json(),
  returnAddress: json(),
  pickUpLocation: text(),
  returnLocation: text(),
});
