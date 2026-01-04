import { LabelsPage } from "./labels";
import { isAuthed } from "@/util/auth";
import { redirect } from "next/navigation";

export default async function Labels() {
  if (!(await isAuthed())) {
    redirect("/");
  }
  return <LabelsPage />;
}
