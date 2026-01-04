import { isAuthed } from "@/util/auth";
import { redirect } from "next/navigation";

export default async function Labels() {
  if (!(await isAuthed())) {
    redirect("/");
  }
  return (
    <div>
      <h1>Labels</h1>
    </div>
  );
}
