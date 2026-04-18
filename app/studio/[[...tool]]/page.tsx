import { metadata } from "next-sanity/studio/metadata";
import StudioClient from "@/components/StudioClient";

export { metadata };

export default function StudioPage() {
  return <StudioClient />;
}
