"use client";

import { useState } from "react";

const CAPABILITIES = [
  {
    tag: "Planung",
    t: "Konzeption & Engineering",
    d: "CAD-basierte Planung, Rigging-Statik, Power-Kalkulation und Netzwerk-Design.",
  },
  {
    tag: "Rigging",
    t: "Traversen & Motorsysteme",
    d: "Zertifizierte Rigger, Chain Hoists bis 2 t, Ground Support und Arena-Systeme.",
  },
  {
    tag: "Konferenz",
    t: "Dolmetsch & Streaming",
    d: "Personenführungsanlagen, Simultandolmetschen, hybride Konferenzen mit Multi-Feed-Streaming.",
  },
  {
    tag: "Crew",
    t: "Techniker & Operator",
    d: "Eigene, qualifizierte Crew — von SFX und Pyro bis FOH-Engineer und Show-Caller.",
  },
];

function CapRow({
  tag,
  t,
  d,
  i,
}: {
  tag: string;
  t: string;
  d: string;
  i: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 28,
        alignItems: "start",
        padding: "26px 0",
        borderBottom: "1px solid var(--line)",
        cursor: "pointer",
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          color: hovered ? "var(--accent)" : "var(--ink-mute)",
          transition: "color .25s",
          paddingTop: 6,
        }}
      >
        —— 0{i + 1}
      </span>

      <div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--ink-mute)",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {tag}
        </div>
        <div
          className="serif"
          style={{
            fontSize: "clamp(22px, 2.2vw, 32px)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: hovered ? 12 : 0,
            transition: "margin .3s",
          }}
        >
          {t}
        </div>
        <div
          style={{
            maxHeight: hovered ? 80 : 0,
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition: "max-height .4s, opacity .4s",
            color: "var(--ink-dim)",
            fontSize: 15,
            lineHeight: 1.55,
            maxWidth: "62ch",
          }}
        >
          {d}
        </div>
      </div>

      <span
        className="mono"
        style={{
          fontSize: 14,
          color: hovered ? "var(--accent)" : "var(--ink-mute)",
          transition: "color .25s, transform .25s",
          transform: hovered ? "translateX(4px)" : "none",
        }}
      >
        →
      </span>
    </div>
  );
}

export default function CapabilitiesStrip() {
  return (
    <section
      style={{
        padding: "clamp(60px,10vh,140px) var(--pad-x)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 60,
        }}
        className="cap-grid"
      >
        <div>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Capabilities
          </span>
          <h3
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginTop: 18,
            }}
          >
            Alles, was zwischen Idee und Show liegt.
          </h3>
        </div>

        <div>
          {CAPABILITIES.map((c, i) => (
            <CapRow key={i} {...c} i={i} />
          ))}
        </div>
      </div>

      <style>{`@media (max-width:900px){ .cap-grid{grid-template-columns:1fr !important; gap:28px !important;} }`}</style>
    </section>
  );
}
