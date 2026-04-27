import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Script from "next/script";
import ProjectMap from "@/components/ProjectMap";
import { getMapProjects, isDemoMapData } from "@/lib/getMapProjects";

export const metadata: Metadata = {
  title: "Projektkarte",
  description:
    "Interaktive Weltkarte aller Cologne Hunters Produktionen — Events, Broadcast und Corporate weltweit.",
};

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function ProjektKartePage() {
  const { isEnabled: preview } = draftMode();
  const projects = await getMapProjects({ preview, revalidate: 300 });
  const countryCount = new Set(projects.map((p) => p.iso)).size;
  const isDemo = isDemoMapData(projects);

  return (
    <>
      {/* Load D3 + TopoJSON before page renders */}
      <Script
        src="https://unpkg.com/d3@7.8.5/dist/d3.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js"
        strategy="beforeInteractive"
      />

      <section style={{ paddingTop: 110, minHeight: "100vh" }}>
        {/* Header */}
        <div
          style={{
            padding: "clamp(40px,6vh,80px) var(--pad-x) clamp(28px,4vh,48px)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 16 }}>
                ● Referenzen weltweit
              </div>
              <h1
                className="serif"
                style={{
                  fontSize: "clamp(40px, 7vw, 96px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}
              >
                Projekt
                <span style={{ fontStyle: "italic" }}>karte</span>.
              </h1>
              <p
                style={{
                  marginTop: 20,
                  maxWidth: "52ch",
                  color: "var(--ink-dim)",
                  fontSize: 17,
                  lineHeight: 1.55,
                }}
              >
                Cologne Hunters realisiert Produktionen weltweit. Klicken Sie auf ein
                markiertes Land, um die Projekte dort zu sehen.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 32,
                alignItems: "flex-end",
              }}
            >
              <Stat value={String(countryCount)} label="Länder" />
              <Stat value={String(projects.length)} label="Projekte" />
              {isDemo && (
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: "var(--ink-mute)",
                    textTransform: "uppercase",
                    maxWidth: "20ch",
                    lineHeight: 1.6,
                  }}
                >
                  Demo-Daten — Projekte im Studio mit ISO-Code veröffentlichen
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          style={{
            position: "relative",
            borderBottom: "1px solid var(--line)",
            overflow: "hidden",
          }}
        >
          <ProjectMap projects={projects} />
        </div>

        {/* Legend */}
        <div
          style={{
            padding: "20px var(--pad-x)",
            display: "flex",
            gap: 28,
            alignItems: "center",
            flexWrap: "wrap",
          }}
          className="mono"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-dim)", textTransform: "uppercase" }}>
              Aktive Länder
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "rgba(242,238,232,0.08)",
                border: "1px solid rgba(242,238,232,0.2)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-dim)", textTransform: "uppercase" }}>
              Kein Projekt
            </span>
          </div>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-mute)", textTransform: "uppercase" }}>
            Scrollen / Pinch zum Zoomen · Klick auf Land für Details
          </span>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="serif"
        style={{
          fontSize: "clamp(36px, 4vw, 60px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--ink)",
        }}
      >
        {value}
      </div>
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}
