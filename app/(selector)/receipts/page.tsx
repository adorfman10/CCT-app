import { redirect } from "next/navigation";
import { isAuthed } from "@/util/auth";
import { ReceiptsPage } from "./receipts";

export default async function Receipts() {
  if (!(await isAuthed())) {
    redirect("/");
  }

  return <ReceiptsPage />;
}
