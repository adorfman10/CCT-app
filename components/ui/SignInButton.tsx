"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const SignInButton = ({ isAuthed }: { isAuthed: boolean }) => {
  return !isAuthed ? (
    <Button
      className="cursor-pointer"
      onClick={() => authClient.signIn.social({ provider: "google" })}
    >
      Sign In with Google
    </Button>
  ) : (
    <Button
      className="cursor-pointer"
      onClick={() => {
        authClient.signOut();
        redirect("/");
      }}
    >
      Sign Out
    </Button>
  );
};
