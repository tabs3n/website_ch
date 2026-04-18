import ProjectMap from "@/components/ProjectMap";
import { client } from "@/sanity/lib/client";
import { mapProjectsQuery } from "@/sanity/lib/queries";
import type { MapProject } from "@/lib/supabase";
import Link from "next/link";
import Script from "next/script";

// Fallback — shown until the first Sanity project has a countryIso set
const FALLBACK: MapProject[] = [
  {
    id: "demo-1", iso: "DEU", country: "Deutschland",
    title: "Lanxess Global Kick-off", city: "Köln", year: 2025, client: "Lanxess AG",
    blurb: "Komplettes Licht-, Ton- und Video-Setup in der Lanxess Arena.",
    quote: null, lat: 50.93, lng: 6.97, created_at: "", project_images: [],
  },
  {
    id: "demo-2", iso: "DEU", country: "Deutschland",
    title: "RTL Primetime Studio", city: "Köln", year: 2024, client: "RTL Deutschland",
    blurb: "Permanentes Studiobeleuchtungskonzept auf grandMA3.",
    quote: null, lat: 50.95, lng: 6.99, created_at: "", project_images: [],
  },
  {
    id: "demo-3", iso: "GBR", country: "Großbritannien",
    title: "IBC Side Event", city: "London", year: 2024, client: "Broadcaster Consortium",
    blurb: "Licht und Sound für Side Events während der IBC.",
    quote: null, lat: 51.5, lng: -0.12, created_at: "", project_images: [],
  },
  {
    id: "demo-4", iso: "USA", country: "USA",
    title: "NAB Show Booth", city: "Las Vegas", year: 2023, client: "Technology Partner",
    blurb: "Messeauftritt mit Full LED Wall Setup und Broadcast-Demo.",
    quote: null, lat: 36.17, lng: -115.14, created_at: "", project_images: [],
  },
  {
    id: "demo-5", iso: "ARE", country: "VAE",
    title: "Corporate Gala Dubai", city: "Dubai", year: 2023, client: "MENA Corp",
    blurb: "Premium Gala-Abend mit Moving Lights, Line-Array und 4K LED Wall.",
    quote: null, lat: 25.2, lng: 55.27, created_at: "", project_images: [],
  },
  {
    id: "demo-6", iso: "CHE", country: "Schweiz",
    title: "World Economic Forum", city: "Davos", year: 2024, client: "WEF",
    blurb: "Konferenztechnik und hybrides Streaming für das WEF.",
    quote: null, lat: 46.82, lng: 9.84, created_at: "", project_images: [],
  },
  {
    id: "demo-7", iso: "FRA", country: "Frankreich",
    title: "MIPCOM Booth", city: "Cannes", year: 2023, client: "Media Group",
    blurb: "LED Wall und Tontechnik für den Messeauftritt in Cannes.",
    quote: null, lat: 43.55, lng: 7.02, created_at: "", project_images: [],
  },
];

type SanityMapProject = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  year: number;
  city?: string;
  location?: string;
  country?: string;
  countryIso: string;
  summary?: string;
  lat?: number;
  lng?: number;
  hero?: string;
};

async function getMapProjects(): Promise<MapProject[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docs = await (client.fetch as any)(
      mapProjectsQuery,
      {},
      { next: { revalidate: 60 } }
    ) as SanityMapProject[];

    if (!docs?.length) return FALLBACK;

    return docs.map((d) => ({
      id: d._id,
      iso: d.countryIso,
      country: d.country ?? d.location ?? d.countryIso,
      title: d.title,
      city: d.city ?? d.location ?? null,
      year: d.year ?? null,
      client: d.client ?? null,
      blurb: d.summary ?? null,
      quote: null,
      lat: d.lat ?? null,
      lng: d.lng ?? null,
      created_at: "",
      project_images: d.hero
        ? [{ url: d.hero, sort_order: 0 }]
        : [],
    }));
  } catch {
    return FALLBACK;
  }
}

export default async function MapSection() {
  const projects = await getMapProjects();
  const countryCount = new Set(projects.map((p) => p.iso)).size;
  const isDemo = projects[0]?.id?.startsWith("demo-");

  return (
    <section style={{ borderTop: "1px solid var(--line)", position: "relative" }}>
      {/* D3 + TopoJSON */}
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
            <strong style={{ color: "var(--ink)" }}>{countryCount} Ländern</strong>. Klicken Sie
            auf ein markiertes Land für die Projektdetails.
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

      {/* Legend */}
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
