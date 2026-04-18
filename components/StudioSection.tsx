"use client";

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface StudioData {
  studioHeading?: string | null;
  studioBody?: string | null;
  studioImage?: string | null;
  processSteps?: ProcessStep[] | null;
}

const FALLBACK_STEPS: ProcessStep[] = [
  { num: "01", title: "Brief", description: "Anforderungen, Gewerke, Budget, Termine." },
  { num: "02", title: "Engineering", description: "CAD · Statik · Power · Netzwerk." },
  { num: "03", title: "Proben", description: "Technische Proben und Show-Programmierung." },
  { num: "04", title: "Showtime", description: "FOH · Operator · Crew · Backup on-site." },
];

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1400&q=80";

export default function StudioSection({
  studioHeading,
  studioBody,
  studioImage,
  processSteps,
}: StudioData = {}) {
  const heading =
    studioHeading !== undefined ? studioHeading : "Ein Team. Ein Signal-Weg.";
  const body =
    studioBody !== undefined
      ? studioBody
      : "Unsere Techniker, Operator und Projektleiter arbeiten seit Jahren zusammen. Keine Subunternehmer-Kette, keine Übergabe-Verluste.";
  const img =
    studioImage !== undefined ? (studioImage ?? FALLBACK_IMG) : FALLBACK_IMG;
  const steps =
    processSteps !== undefined ? (processSteps ?? []) : FALLBACK_STEPS;

  return (
    <section
      style={{
        padding: "clamp(80px,12vh,160px) var(--pad-x)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Heading */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          paddingTop: 22,
          marginBottom: "clamp(40px, 7vh, 80px)",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "clamp(20px, 4vw, 60px)",
          alignItems: "end",
        }}
        className="studio-head"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}
          >
            III/IV
          </span>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Studio
          </span>
        </div>
        <div>
          {heading && (
            <h2
              className="serif"
              style={{
                fontSize: "clamp(40px, 6vw, 96px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
              }}
            >
              {heading}
            </h2>
          )}
          {body && (
            <p
              style={{
                maxWidth: "52ch",
                color: "var(--ink-dim)",
                marginTop: 20,
                fontSize: 17,
                lineHeight: 1.55,
              }}
            >
              {body}
            </p>
          )}
        </div>
        <style>{`@media (max-width:900px){ .studio-head{grid-template-columns:1fr !important} }`}</style>
      </div>

      {/* Image + steps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--gap)",
        }}
        className="studio-grid"
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            border: "1px solid var(--line)",
            aspectRatio: "4/5",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(.72) saturate(.9)",
            }}
          />
          <div
            className="mono"
            style={{
              position: "absolute",
              top: 18,
              left: 20,
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(242,238,232,.85)",
            }}
          >
            KÖLN · LAGER 01
          </div>
        </div>

        {steps.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap)" }}>
            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 24,
                  padding: "24px 26px",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  background: "rgba(242,238,232,.02)",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--accent)" }}
                >
                  —— {s.num}
                </span>
                <div>
                  <div
                    className="serif"
                    style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 8 }}
                  >
                    {s.title}
                  </div>
                  <div style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.55 }}>
                    {s.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@media (max-width:900px){ .studio-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}
