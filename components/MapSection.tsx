import { draftMode } from "next/headers";
import Link from "next/link";
import Script from "next/script";
import ProjectMap from "@/components/ProjectMap";
import { getMapProjects, isDemoMapData } from "@/lib/getMapProjects";

export default async function MapSection() {
  const { isEnabled: preview } = draftMode();
  const projects = await getMapProjects({ preview });
  const countryCount = new Set(projects.map((p) => p.iso)).size;
  const isDemo = isDemoMapData(projects);

  return (
    <section style={{ borderTop: "1px solid var(--line)", position: "relative" }}>
      <Script src="https://unpkg.com/d3@7.8.5/dist/d3.min.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js" strategy="beforeInteractive" />

      <div
        style={{
          padding: "clamp(48px,8vh,96px) var(--pad-x) clamp(24px,4vh,40px)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "clamp(16px,3vw,40px)",
          alignItems: "end",
        }}
        className="map-head"
      >
        <div>
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 14 }}>
            ● Weltweit aktiv
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
            }}
          >
            Kölner Technik,
            <br />
            <span style={{ fontStyle: "italic" }}>globale</span> Bühne.
          </h2>
          <p
            style={{
              marginTop: 20,
              maxWidth: "48ch",
              color: "var(--ink-dim)",
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            Von Köln aus realisieren wir Produktionen in{" "}
            <strong style={{ color: "var(--ink)" }}>{countryCount} Ländern</strong>.
            Klicken Sie auf ein markiertes Land für die Projektdetails.
          </p>
          {isDemo && (
            <p
              className="mono"
              style={{
                marginTop: 14,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
              }}
            >
              Demo-Daten · Fügen Sie Projekte im Studio mit ISO-Code hinzu
            </p>
          )}
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            className="serif"
            style={{
              fontSize: "clamp(44px,5vw,72px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {projects.length}
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
            Produktionen
          </div>
          <Link
            href="/projektkarte"
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-dim)",
              borderBottom: "1px solid var(--line-strong)",
              paddingBottom: 2,
              display: "inline-block",
              marginTop: 16,
            }}
          >
            Vollbild →
          </Link>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ProjectMap projects={projects} />
      </div>

      <div
        style={{
          padding: "14px var(--pad-x)",
          display: "flex",
          gap: 24,
          alignItems: "center",
          flexWrap: "wrap",
        }}
        className="mono"
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ink-dim)",
            }}
          >
            Aktive Länder
          </span>
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}
        >
          Scrollen / Pinch zum Zoomen · Klick auf Land für Details
        </span>
      </div>

      <style>{`@media (max-width:700px){ .map-head{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}
