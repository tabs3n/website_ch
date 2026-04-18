"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

// Load the Sanity Studio only on the client (it's a browser-only app).
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
);

export default function StudioClient() {
  return <NextStudio config={config} />;
}
