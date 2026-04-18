"use client";

import { useEffect, useState } from "react";

interface SanityDoc {
  _type: string;
  _id?: string;
  slug?: { current?: string };
  title?: string;
}

interface PreviewPaneProps {
  document: {
    displayed: SanityDoc;
  };
}

/** Resolves the public URL for a given Sanity document */
function resolveUrl(doc: SanityDoc): string {
  if (typeof window === "undefined") return "/";

  // The Studio is served at /studio — strip that to get the app origin
  const origin = window.location.origin;

  switch (doc._type) {
    case "project":
      return doc.slug?.current ? `/projekte/${doc.slug.current}` : "/projekte";
    case "homepage":
      return "/";
    case "siteSettings":
      return "/";
    default:
      return "/";
  }
}

/** Iframe preview pane shown alongside the form in Sanity Studio */
export function IframePreview({ document: doc }: PreviewPaneProps) {
  const displayed = doc.displayed;
  const path = resolveUrl(displayed);

  // Use same origin so cookies / styles load correctly
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const previewUrl = origin + path;
  const [key, setKey] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#0A0A0A",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          borderBottom: "1px solid #222",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#666",
            letterSpacing: "0.06em",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {previewUrl || path}
        </span>

        <button
          onClick={() => setKey((k) => k + 1)}
          title="Vorschau aktualisieren"
          style={{
            background: "none",
            border: "1px solid #333",
            borderRadius: 4,
            color: "#999",
            cursor: "pointer",
            fontSize: 13,
            padding: "3px 8px",
            lineHeight: 1,
          }}
        >
          ↺
        </button>

        {origin && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "none",
              border: "1px solid #E8B54A",
              borderRadius: 4,
              color: "#E8B54A",
              fontSize: 11,
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              padding: "3px 8px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            ↗ Öffnen
          </a>
        )}
      </div>

      {/* Iframe */}
      {origin ? (
        <iframe
          key={key}
          src={previewUrl}
          style={{
            flex: 1,
            border: "none",
            width: "100%",
            background: "#0A0A0A",
          }}
          title="Seiten-Vorschau"
        />
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#555",
            fontFamily: "monospace",
            fontSize: 12,
          }}
        >
          Lade Vorschau …
        </div>
      )}
    </div>
  );
}
