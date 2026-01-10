"use server";

import { syncJotform } from "@/util/syncJotform";
import { getJotformData } from "@/util/fetchJotform";
import SubmissionsPage from "./submissions";

export default async function Submissions() {
  const jotformResp = await getJotformData();

  // Create a server action that can be passed to the client component
  const syncAction = async () => {
    "use server";
    return await syncJotform(jotformResp);
  };

  return <SubmissionsPage syncAction={syncAction} />;
}
