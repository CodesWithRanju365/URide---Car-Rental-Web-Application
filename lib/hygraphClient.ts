//hygraphClient.ts
import { GraphQLClient } from "graphql-request";

const HYGRAPH_API_URL = process.env.NEXT_PUBLIC_HYGRAPH_API_URL || "";
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN || "";

export const hygraphClient =
  HYGRAPH_API_URL && HYGRAPH_TOKEN
    ? new GraphQLClient(HYGRAPH_API_URL, {
        headers: {
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
      })
    : null; // no crash, we return null

if (!hygraphClient) {
  console.warn("Hygraph client not initialized. Using fallback instead.");
}
