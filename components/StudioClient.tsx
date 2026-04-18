"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

// Studio läuft nur im Browser — kein SSR
const Studio = dynamic(
  () => import("sanity").then((mod) => {
    const { Studio: S } = mod;
    // Wrap so dynamic() bekommt einen default export
    const Wrapped = () => <S config={config} />;
    Wrapped.displayName = "SanityStudio";
    return { default: Wrapped };
  }),
  { ssr: false, loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#101112] text-white text-sm">
      Studio lädt…
    </div>
  )}
);

export default function StudioClient() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <Studio />
    </div>
  );
}
