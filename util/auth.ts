import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const isAuthed = async () => {
  const validEmails = [
    "cctcecbr@gmail.com",
    "adorfman10@gmail.com",
    "stephaniehdorfman@gmail.com",
  ];
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.email && validEmails.includes(session.user.email)) {
    return true;
  }
  return false;
};
