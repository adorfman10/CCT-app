"use server";

import { JotformResponseSchema, type JotformResponse } from "@/models/jotform";

const JOTFORM_FORM_ID = "243584258319162";
const PAGE_SIZE = 100;

async function fetchJotformPage(
  apiKey: string,
  offset: number
): Promise<JotformResponse> {
  const jotformBaseUrl = "https://api.jotform.com";
  const url = new URL(`/form/${JOTFORM_FORM_ID}/submissions`, jotformBaseUrl);

  url.searchParams.append("apiKey", apiKey);
  url.searchParams.append("limit", PAGE_SIZE.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("orderby", "created_at");

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Jotform API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return JotformResponseSchema.parse(data);
}

export const getJotformData = async (
  maxPages = 20
): Promise<JotformResponse> => {
  "use server";

  const jotformApiKey = process.env.JOTFORM_API_KEY;
  if (!jotformApiKey) {
    throw new Error("Jotform API key is not configured");
  }

  let allSubmissions: JotformResponse["content"] = [];
  let offset = 0;
  let hasMore = true;
  let pageCount = 0;
  let resultSetCount = 0;
  let rateLimit = 1000; // Default rate limit

  try {
    // First, fetch one page to get the total count and rate limit
    const firstPage = await fetchJotformPage(jotformApiKey, 0);
    console.log("First page", firstPage);
    if (firstPage.resultSet) {
      resultSetCount = firstPage.resultSet.count;
    }
    if ("limit-left" in firstPage) {
      rateLimit = firstPage["limit-left"];
    }

    // If we got results, add them to our collection
    if (firstPage.content?.length) {
      allSubmissions = [...firstPage.content];
      pageCount = 1;
      offset = firstPage.content.length;

      // If there are more pages, fetch them
      if (
        firstPage.content.length === PAGE_SIZE &&
        firstPage.resultSet?.count >= offset
      ) {
        hasMore = true;
      } else {
        hasMore = false;
      }
    }
    console.log("hasMore", hasMore);

    // Fetch remaining pages if needed
    while (hasMore && pageCount < maxPages) {
      console.log(
        "Fetching page",
        pageCount,
        "hasMore",
        hasMore,
        "offset",
        offset
      );
      const response = await fetchJotformPage(jotformApiKey, offset);

      if (response.content?.length) {
        allSubmissions = [...allSubmissions, ...response.content];
        offset += response.content.length;
        pageCount++;

        // Update rate limit if available
        if ("limit-left" in response) {
          rateLimit = response["limit-left"];
        }

        // Check if we've reached the end of the results
        if (response.content.length < PAGE_SIZE) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    // Create a response that strictly matches JotformResponseSchema
    const response: JotformResponse = {
      responseCode: 200 as const,
      message: "success",
      content: allSubmissions,
      duration: "0ms",
      "limit-left": rateLimit,
      resultSet: {
        count: resultSetCount || allSubmissions.length,
        offset: 0,
        limit: allSubmissions.length,
      },
    };

    // Validate against the schema before returning
    return JotformResponseSchema.parse(response);
  } catch (error) {
    console.error("Error fetching Jotform data:", error);
    throw new Error("Failed to fetch Jotform data");
  }
};
