import type { Metadata } from "next";
import Script from "next/script";
import ProjectMap from "@/components/ProjectMap";
import { getSupabase } from "@/lib/supabase";
import type { MapProject } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Projektkarte",
  description:
    "Interaktive Weltkarte aller Cologne Hunters Produktionen — Events, Broadcast und Corporate weltweit.",
};

// Revalidate every 5 minutes
export const revalidate = 300;

// Static fallback data — shown when Supabase is not yet configured
const FALLBACK_PROJECTS: MapProject[] = [
  {
    id: "1", iso: "DEU", country: "Deutschland", title: "Lanxess Global Kick-off",
    city: "Köln", year: 2025, client: "Lanxess AG",
    blurb: "Komplettes Licht-, Ton- und Video-Setup für die internationale Jahresauftaktveranstaltung in der Lanxess Arena.",
    quote: null, lat: 50.93, lng: 6.97, created_at: "", project_images: [],
  },
  {
    id: "2", iso: "DEU", country: "Deutschland", title: "RTL Primetime Studio",
    city: "Köln", year: 2024, client: "RTL Deutschland",
    blurb: "Permanentes Studiobeleuchungskonzept auf grandMA3 Basis — 24/7 Broadcastfähig.",
    quote: null, lat: 50.95, lng: 6.99, created_at: "", project_images: [],
  },
  {
    id: "3", iso: "GBR", country: "Großbritannien", title: "IBC Amsterdam Side Event",
    city: "London", year: 2024, client: "Broadcaster Consortium",
    blurb: "Licht- und Sound-Design für Side Events während der IBC Broadcast-Konferenz.",
    quote: null, lat: 51.5, lng: -0.12, created_at: "", project_images: [],
  },
  {
    id: "4", iso: "USA", country: "USA", title: "NAB Show Booth",
    city: "Las Vegas", year: 2023, client: "Technology Partner",
    blurb: "Messeauftritt auf der NAB Show — Full LED Wall Setup mit Broadcast-Live-Demo.",
    quote: null, lat: 36.17, lng: -115.14, created_at: "", project_images: [],
  },
  {
    id: "5", iso: "ARE", country: "Vereinigte Arabische Emirate", title: "Corporate Gala Dubai",
    city: "Dubai", year: 2023, client: "MENA Corp",
    blurb: "Premium Gala-Abend mit Moving Lights, Line-Array und 4K LED Wall.",
    quote: "Spectacular production — exactly what we envisioned.", lat: 25.2, lng: 55.27, created_at: "", project_images: [],
  },
];

async function getProjects(): Promise<MapProject[]> {
  const sb = getSupabase();
  if (!sb) return FALLBACK_PROJECTS;

  try {
    const { data, error } = await sb
      .from("projects")
      .select("*, project_images(url, sort_order)")
      .order("created_at");

    if (error || !data?.length) return FALLBACK_PROJECTS;
    return data as MapProject[];
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export default async function ProjektKartePage() {
  const projects = await getProjects();
  const countryCount = new Set(projects.map((p) => p.iso)).size;
  const isLive = getSupabase() !== null;

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
              {!isLive && (
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
                  Demo-Daten — Supabase noch nicht verbunden
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
