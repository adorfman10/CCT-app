import Link from "next/link";
import { SignInButton } from "@/components/ui/SignInButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="h-14 flex justify-between items-center px-4 gap-8">
      <div className="flex flex-row gap-2 items-center">
        <p>Century Camp Trucking</p>
        <Link href="/" className="underline underline-offset-2">
          Home
        </Link>
        <Link href="/submissions" className="underline underline-offset-2">
          Submissions
        </Link>
        <Link href="/labels" className="underline underline-offset-2">
          Labels
        </Link>
        <Link href="/receipts" className="underline underline-offset-2">
          Receipts
        </Link>
      </div>
      <SignInButton isAuthed={!!session} />
    </nav>
  );
}
