"use client";

import { usePathname } from "next/navigation";

/**
 * Floating banner shown when Next.js Draft Mode is active.
 * Editors see this strip while previewing unpublished Sanity content.
 */
export default function PreviewBanner() {
  const path = usePathname();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: "var(--accent)",
        color: "var(--accent-ink)",
        padding: "12px var(--pad-x)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--font-label)",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#0A0A0A",
            display: "inline-block",
          }}
        />
        Vorschau aktiv — Sie sehen unveröffentlichte Inhalte
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <a
          href={`/studio`}
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-ink)",
            borderBottom: "1px solid rgba(255,255,255,0.5)",
            paddingBottom: 2,
          }}
        >
          Studio öffnen →
        </a>
        <a
          href={`/api/disable-draft?slug=${encodeURIComponent(path)}`}
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "#0A0A0A",
            color: "var(--accent-text)",
            padding: "8px 14px",
            borderRadius: 999,
          }}
        >
          Vorschau beenden ✕
        </a>
      </div>
    </div>
  );
}
