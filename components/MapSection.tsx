import ProjectMap from "@/components/ProjectMap";
import { getSupabase } from "@/lib/supabase";
import type { MapProject } from "@/lib/supabase";
import Link from "next/link";
import Script from "next/script";

const FALLBACK: MapProject[] = [
  {
    id: "1", iso: "DEU", country: "Deutschland",
    title: "Lanxess Global Kick-off", city: "Köln", year: 2025, client: "Lanxess AG",
    blurb: "Komplettes Licht-, Ton- und Video-Setup in der Lanxess Arena.", quote: null,
    lat: 50.93, lng: 6.97, created_at: "", project_images: [],
  },
  {
    id: "2", iso: "DEU", country: "Deutschland",
    title: "RTL Primetime Studio", city: "Köln", year: 2024, client: "RTL Deutschland",
    blurb: "Permanentes Studiobeleuchtungskonzept auf grandMA3.", quote: null,
    lat: 50.95, lng: 6.99, created_at: "", project_images: [],
  },
  {
    id: "3", iso: "GBR", country: "Großbritannien",
    title: "IBC Side Event", city: "London", year: 2024, client: "Broadcaster Consortium",
    blurb: "Licht und Sound für Side Events während der IBC.", quote: null,
    lat: 51.5, lng: -0.12, created_at: "", project_images: [],
  },
  {
    id: "4", iso: "USA", country: "USA",
    title: "NAB Show Booth", city: "Las Vegas", year: 2023, client: "Technology Partner",
    blurb: "Messeauftritt mit Full LED Wall Setup und Broadcast-Demo.", quote: null,
    lat: 36.17, lng: -115.14, created_at: "", project_images: [],
  },
  {
    id: "5", iso: "ARE", country: "VAE",
    title: "Corporate Gala Dubai", city: "Dubai", year: 2023, client: "MENA Corp",
    blurb: "Premium Gala-Abend mit Moving Lights, Line-Array und 4K LED Wall.", quote: null,
    lat: 25.2, lng: 55.27, created_at: "", project_images: [],
  },
  {
    id: "6", iso: "CHE", country: "Schweiz",
    title: "World Economic Forum", city: "Davos", year: 2024, client: "WEF",
    blurb: "Konferenztechnik und hybrides Streaming für das WEF.", quote: null,
    lat: 46.82, lng: 9.84, created_at: "", project_images: [],
  },
  {
    id: "7", iso: "FRA", country: "Frankreich",
    title: "MIPCOM Booth", city: "Cannes", year: 2023, client: "Media Group",
    blurb: "LED Wall und Tontechnik für den Messeauftritt in Cannes.", quote: null,
    lat: 43.55, lng: 7.02, created_at: "", project_images: [],
  },
];

async function getProjects(): Promise<MapProject[]> {
  const sb = getSupabase();
  if (!sb) return FALLBACK;
  try {
    const { data, error } = await sb
      .from("projects")
      .select("*, project_images(url, sort_order)")
      .order("created_at");
    if (error || !data?.length) return FALLBACK;
    return data as MapProject[];
  } catch {
    return FALLBACK;
  }
}

export default async function MapSection() {
  const projects = await getProjects();
  const countryCount = new Set(projects.map((p) => p.iso)).size;

  return (
    <section
      style={{
        borderTop: "1px solid var(--line)",
        position: "relative",
      }}
    >
      {/* Load D3 + TopoJSON */}
      <Script src="https://unpkg.com/d3@7.8.5/dist/d3.min.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js" strategy="beforeInteractive" />

      {/* Header */}
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
            <strong style={{ color: "var(--ink)" }}>{countryCount} Ländern</strong>. Klicken Sie auf
            ein markiertes Land für die Projektdetails.
          </p>
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

      {/* Map */}
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

      {/* Hint bar */}
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
