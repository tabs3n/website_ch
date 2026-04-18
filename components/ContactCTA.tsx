"use client";

import { useState } from "react";

const SERVICES = ["Licht", "Ton", "Video", "Konferenz", "Rigging", "Stage-Design"];

function Field({
  label,
  type = "text",
  textarea,
  full,
  chips,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  full?: boolean;
  chips?: string[];
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const [active, setActive] = useState<string[]>([]);

  return (
    <label
      style={{
        gridColumn: full ? "1 / -1" : "auto",
        display: "block",
        position: "relative",
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: focused ? "var(--accent)" : "var(--ink-mute)",
          marginBottom: 8,
          transition: "color .2s",
        }}
      >
        {label}
      </div>

      {chips ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {chips.map((c) => {
            const on = active.includes(c);
            return (
              <button
                type="button"
                key={c}
                onClick={() =>
                  setActive((a) => (on ? a.filter((x) => x !== c) : [...a, c]))
                }
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: `1px solid ${on ? "var(--accent)" : "var(--line-strong)"}`,
                  background: on ? "var(--accent)" : "transparent",
                  color: on ? "#0A0A0A" : "var(--ink)",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : textarea ? (
        <textarea
          rows={3}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${focused ? "var(--accent)" : "var(--line-strong)"}`,
            color: "var(--ink)",
            fontFamily: "inherit",
            fontSize: 16,
            padding: "10px 0",
            outline: "none",
            resize: "vertical",
            transition: "border-color .2s",
          }}
        />
      ) : (
        <input
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${focused ? "var(--accent)" : "var(--line-strong)"}`,
            color: "var(--ink)",
            fontFamily: "inherit",
            fontSize: 16,
            padding: "10px 0",
            outline: "none",
            transition: "border-color .2s",
          }}
        />
      )}
    </label>
  );
}

function InfoBlock({ label, lines }: { label: string; lines: React.ReactNode[] }) {
  return (
    <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)" }}>
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink)" }}>
          {l}
        </div>
      ))}
    </div>
  );
}

function CTABtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "14px 22px",
        borderRadius: 999,
        background: primary
          ? hovered
            ? "var(--ink)"
            : "var(--accent)"
          : hovered
          ? "rgba(242,238,232,.08)"
          : "transparent",
        color: primary ? "#0A0A0A" : "var(--ink)",
        border: primary ? "1px solid var(--accent)" : "1px solid var(--line-strong)",
        cursor: "pointer",
        transition: "all .25s",
      }}
    >
      {children}
      <span
        style={{
          transform: hovered ? "translateX(4px)" : "none",
          transition: "transform .25s",
        }}
      >
        →
      </span>
    </button>
  );
}

export default function ContactCTA({ heading }: { heading?: string } = {}) {
  return (
    <section
      id="kontakt"
      style={{
        padding: "clamp(80px,12vh,160px) var(--pad-x)",
        borderTop: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "clamp(20px, 4vw, 60px)",
          alignItems: "end",
          borderTop: "1px solid var(--line)",
          paddingTop: 22,
          marginBottom: "clamp(48px, 8vh, 100px)",
        }}
        className="ctc-head"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}>
            IV/IV
          </span>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Projektanfrage
          </span>
        </div>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
          }}
        >
          {heading ?? (
            <>
              Lassen Sie uns
              <br />
              Ihr <span style={{ fontStyle: "italic" }}>nächstes</span> Event realisieren.
            </>
          )}
        </h2>
        <style>{`@media (max-width:900px){ .ctc-head{grid-template-columns:1fr !important} }`}</style>
      </div>

      {/* Form + info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "clamp(28px, 5vw, 80px)",
          alignItems: "start",
        }}
        className="ctc-grid"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
            className="ctc-fields"
          >
            <Field label="Name" />
            <Field label="Unternehmen" />
            <Field label="E-Mail" type="email" />
            <Field label="Telefon" type="tel" />
            <Field label="Eventdatum (optional)" full />
            <Field label="Gewerke" full chips={SERVICES} />
            <Field label="Kurzbeschreibung" full textarea />
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <CTABtn primary>Anfrage senden</CTABtn>
            <span
              className="mono"
              style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--ink-mute)" }}
            >
              Antwort innerhalb von 24 h werktags
            </span>
          </div>
        </form>

        <aside style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <InfoBlock label="Projektbüro Köln" lines={["Deutz-Mülheimer Straße 129", "51063 Köln"]} />
          <InfoBlock
            label="Telefon"
            lines={[<a key="t" href="tel:+4922112345678">+49 221 1234 5678</a>]}
          />
          <InfoBlock
            label="E-Mail"
            lines={[<a key="e" href="mailto:kontakt@cologne-hunters.de">kontakt@cologne-hunters.de</a>]}
          />
          <InfoBlock label="Erreichbarkeit" lines={["Mo–Fr · 08:00–18:00", "24/7 Show-Support"]} />

          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid var(--line)",
              marginTop: 8,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1000&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55) contrast(1.1)" }}
            />
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: 10,
                left: 14,
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "rgba(242,238,232,.85)",
              }}
            >
              ● N 50°56′ E 6°58′
            </div>
          </div>
        </aside>
      </div>

      <style>{`@media (max-width:900px){ .ctc-grid, .ctc-fields{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}
