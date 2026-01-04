import { redirect } from "next/navigation";
import { isAuthed } from "@/util/auth";
import { getQueryClient } from "@/util/getQueryClient";
import { jotformOptions } from "../jotform";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReceiptsPage } from "./receipts";

export default async function Receipts() {
  if (!(await isAuthed())) {
    redirect("/");
  }
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(jotformOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReceiptsPage />
    </HydrationBoundary>
  );
}
