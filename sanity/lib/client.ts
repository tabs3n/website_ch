import { createClient } from "@sanity/client";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
} as const;

/** Standard client — cached, for production pages */
export const client = createClient({
  ...config,
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * Preview client — bypasses CDN, fetches draft documents.
 * Use this when Next.js Draft Mode is active.
 */
export const previewClient = createClient({
  ...config,
  useCdn: false,
  perspective: "previewDrafts" as const,
  // A read-only token is needed to access draft documents
  token: process.env.SANITY_API_READ_TOKEN,
});

/** Returns the right client based on whether draft mode is active */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}
