import { LabelsPage } from "./labels";
import { isAuthed } from "@/util/auth";
import { getQueryClient } from "@/util/getQueryClient";
import { redirect } from "next/navigation";
import { jotformOptions } from "../jotform";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Labels() {
  if (!(await isAuthed())) {
    redirect("/");
  }
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(jotformOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabelsPage />
    </HydrationBoundary>
  );
}
