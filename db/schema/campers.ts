import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { familySubmission } from "./familySubmission";

export const truckingData = pgTable("camper", {
  id: integer().primaryKey(),
  firstName: text(),
  lastName: text(),
  camp: text(),
  numOfBags: integer(),
  familySubmissionId: text("jotformSubmissionId").references(
    () => familySubmission.jotformSubmissionId
  ),
});
