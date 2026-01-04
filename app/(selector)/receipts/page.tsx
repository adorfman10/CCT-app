import { redirect } from "next/navigation";
import { isAuthed } from "@/util/auth";

export default async function Receipts() {
  if (!(await isAuthed())) {
    redirect("/");
  }
  return (
    <div>
      <h1>Receipts</h1>
    </div>
  );
}
