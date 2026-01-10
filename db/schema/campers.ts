import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { familySubmission } from "./familySubmission";

export const camper = pgTable("camper", {
  id: text().primaryKey(),
  firstName: text(),
  lastName: text(),
  camp: text(),
  numOfBags: integer(),
  familySubmissionId: text("jotformSubmissionId").references(
    () => familySubmission.jotformSubmissionId
  ),
});
