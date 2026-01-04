"use server";
import { queryOptions } from "@tanstack/react-query";
import { JotformResponseSchema, type JotformResponse } from "@/models/jotform";
import axios from "redaxios";

export const getJotformData = async () => {
  "use server";
  console.log("Fetching jotform data");
  const jotformBaseUrl = "https://api.jotform.com";
  const jotformApiKey = process.env.JOTFORM_API_KEY;

  if (!jotformApiKey) {
    throw new Error("Jotform API key is not configured");
  }

  const response = await axios.get<JotformResponse>(
    `${jotformBaseUrl}/form/243584258319162/submissions?apiKey=${jotformApiKey}&limit=10`
  );

  return JotformResponseSchema.parse(response.data);
};
