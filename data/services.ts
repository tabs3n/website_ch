import type { ServiceDetailData, ServiceListItem } from "@/sanity/lib/types";

/**
 * Ausgangsinhalte der Leistungen.
 *
 * Zwei Zwecke — wie bei data/legalContent.ts:
 *  1. Fallback, solange im CMS noch keine Leistung angelegt ist.
 *  2. Vorlage für das Seed-Skript (scripts/seed.ts).
 *
 * Die Bilder sind Platzhalter von Unsplash. Sobald im CMS ein eigenes Bild
 * hochgeladen ist, hat dieses Vorrang.
 */

const UNSPLASH = {
  licht: "photo-1516307365426-bea591f05011",
  ton: "photo-1520166012956-add9ba0835cb",
  video: "photo-1505236858219-8359eb29e329",
} as const;

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type ServiceSeed = Omit<ServiceDetailData, "_id" | "next" | "first"> &
  Pick<ServiceListItem, "shortDescription" | "bullets" | "cardImage">;

export const SERVICE_SEEDS: ServiceSeed[] = [
  // ── 01 · Licht ─────────────────────────────────────────
  {
    slug: "licht",
    order: 1,
    number: "01",
    title: "Lichttechnik",
    shortDescription:
      "Moving Lights, LED-Flächen, kinetische Systeme und DMX-Netzwerke — gesteuert aus einer Hand.",
    bullets: [
      "grandMA3 & ETC EOS Lichtregie",
      "MDG Hazer & Atmospheric FX",
      "Kinetische Lichtsysteme",
      "Truss- und Rigging-Integration",
    ],
    cardImage: img(UNSPLASH.licht, 1600),
    eyebrow: "01 · Lichttechnik",
    headline: "Licht ist die erste Entscheidung jeder Produktion.",
    intro:
      "Von der Einzel-Keynote bis zur Arena-Show: Wir entwickeln Lichtdesigns, die Content stützen, Räume definieren und Marken inszenieren.",
    headerImage: img(UNSPLASH.licht, 2400),
    lead: "Wir denken Licht nicht als Ausstattung, sondern als erzählerisches Werkzeug — präzise gesteuert, redundant gesichert, sauber integriert.",
    paragraphs: [
      "Unser Licht-Team plant jedes Projekt in CAD: Rigging-Statik, Power-Verteilung, Dimmer-Schemata und DMX-Netzwerke werden vor dem ersten Aufbau geprüft und abgenommen.",
      "Wir arbeiten ausschließlich mit Top-Tier-Equipment — primär grandMA3 als Konsolensystem, ergänzt durch ETC EOS und eine eigene Flotte an Moving Lights, LED-Flächen und kinetischen Elementen.",
      "Für Broadcast-Produktionen liefern wir Lichtdesigns mit kalibrierten Farbtemperaturen, CRI ≥ 92 und flicker-freien Output für 4K-Kameras bei hohen Shutter Speeds.",
    ],
    capabilities: [
      {
        title: "Show Lighting",
        body: "Event-, Corporate- und Entertainment-Produktionen mit vollständigem Design und Operating.",
      },
      {
        title: "Broadcast Lighting",
        body: "Studio-Grade Lichtdesign mit TV-tauglichem Spektrum und redundanter Stromversorgung.",
      },
      {
        title: "Architectural & Kinetisch",
        body: "LED-Flächen, Lichtvorhänge und kinetische Winch-Systeme — synchronisiert über Timecode.",
      },
      {
        title: "Atmospheric FX",
        body: "MDG Hazer, Low-Fog und CO₂-Jets — sauber integriert mit Brandschutzfreigabe.",
      },
      {
        title: "DMX / Network",
        body: "sACN, Art-Net und redundante Fiber-Backbones für sichere Signalverteilung.",
      },
      {
        title: "Previz",
        body: "Pre-Programming in grandMA onPC und depence² für volle Show-Sicherheit.",
      },
    ],
    stack: [
      "grandMA3 · grandMA2",
      "ETC EOS Ti · Gio",
      "Ayrton · Robe · Martin Moving Lights",
      "Astera Titan · Quasar Science",
      "MDG Atmosphere",
      "depence² Previsualisierung",
    ],
    gallery: [
      { url: img(UNSPLASH.licht, 1600), alt: "Moving Lights über einer Bühne" },
      { url: img("photo-1470229722913-7c0e2dbbafd3", 1200), alt: "Konzertbeleuchtung" },
      { url: img("photo-1516450360452-9312f5e86fc7", 1200), alt: "Lichtdesign im Publikumsraum" },
      { url: img("photo-1540575467063-178a50c2df87", 1200), alt: "Bühnenaufbau mit Traversen" },
      { url: img("photo-1493238792000-8113da705763", 1200), alt: "Scheinwerfer im Detail" },
    ],
    seo: {
      metaTitle: "Lichttechnik",
      metaDescription:
        "Moving Lights, LED-Systeme, kinetisches Licht und DMX-Netzwerke auf Broadcast-Niveau.",
    },
  },

  // ── 02 · Ton ───────────────────────────────────────────
  {
    slug: "ton",
    order: 2,
    number: "02",
    title: "Tontechnik",
    shortDescription:
      "Line-Array-Systeme, Monitoring, digitale Konsolen und Dante-Netzwerke für alle Venue-Größen.",
    bullets: [
      "d&b audiotechnik GSL & KSL",
      "DiGiCo SD-Serie · Yamaha RIVAGE",
      "IEM Monitoring · Shure Axient",
      "Dante- & MADI-Netzwerke",
    ],
    cardImage: img(UNSPLASH.ton, 1600),
    eyebrow: "02 · Tontechnik",
    headline: "Sprachverständlichkeit und Musikalität, in jedem Winkel.",
    intro:
      "Beschallung ist Präzisionshandwerk. Wir liefern akustisch vermessene Setups mit Top-Tier-Equipment und erfahrenen FOH-Engineers.",
    headerImage: img(UNSPLASH.ton, 2400),
    lead: "Wir messen, simulieren und optimieren jedes Setup — damit der Sound in Reihe 1 und Reihe 40 identisch trägt.",
    paragraphs: [
      "Für jede Venue erstellen wir eine d&b ArrayCalc-Simulation: Beschallungskeule, SPL-Verteilung und Delay-Konzept werden vor dem ersten Flug abgenommen.",
      "Unsere FOH- und Monitor-Engineers arbeiten auf DiGiCo SD-Konsolen oder Yamaha RIVAGE — mit durchgängigen Dante-Netzwerken und MADI-Redundanz bis ins Rack.",
      "Für Konferenz- und Broadcast-Formate liefern wir zusätzlich Dolmetschkabinen, Personenführungsanlagen und IFB-Systeme für Regie-Kommunikation.",
    ],
    capabilities: [
      {
        title: "Live Sound",
        body: "d&b audiotechnik GSL/KSL/Y-Serie — von Clubshows bis Arena-Tour.",
      },
      {
        title: "Corporate Audio",
        body: "Sprachverständlichkeit-optimierte Beschallung für Keynotes, Townhalls und Kongresse.",
      },
      {
        title: "Broadcast Audio",
        body: "IFB-Routing, Mix-Minus-Workflows und gesicherte Sendesignale.",
      },
      {
        title: "Monitoring",
        body: "IEM-Systeme Shure Axient, Sennheiser 6000 und klassische Wedge-Monitoring.",
      },
      {
        title: "Dolmetschtechnik",
        body: "Bosch Integrus, Williams Digi-Wave — bis zu 16 Simultansprachen.",
      },
      {
        title: "Measurement",
        body: "Rational Acoustics Smaart und d&b ArrayCalc für reproduzierbare Ergebnisse.",
      },
    ],
    stack: [
      "d&b audiotechnik GSL · KSL · Y-Serie",
      "DiGiCo SD7 · SD12 · Quantum",
      "Yamaha RIVAGE PM10",
      "Shure Axient Digital · Sennheiser 6000",
      "Dante / MADI / Optocore",
      "Rational Acoustics Smaart",
    ],
    gallery: [
      { url: img(UNSPLASH.ton, 1600), alt: "Mischpult im Front-of-House" },
      { url: img("photo-1511671782779-c97d3d27a1d4", 1200), alt: "Digitales Mischpult" },
      { url: img("photo-1508973379184-7517410fb0bc", 1200), alt: "Line-Array-Lautsprecher" },
      { url: img("photo-1516035054744-d0d52a9dfec5", 1200), alt: "Tontechnik im Einsatz" },
      { url: img("photo-1506157786151-b8491531f063", 1200), alt: "Mikrofon auf der Bühne" },
    ],
    seo: {
      metaTitle: "Tontechnik",
      metaDescription:
        "Line-Array-Beschallung, digitale Mischpulte, IEM-Monitoring und Dante-Netzwerke.",
    },
  },

  // ── 03 · Video ─────────────────────────────────────────
  {
    slug: "video",
    order: 3,
    number: "03",
    title: "Videotechnik",
    shortDescription:
      "LED-Walls, Broadcast-Kameras, Medienserver und hybrides Streaming in 4K.",
    bullets: [
      "ROE Visual LED-Walls bis 1.2 mm",
      "disguise VX4 · Resolume Arena",
      "Blackmagic URSA · Sony PXW-Kameras",
      "Multi-Feed Live-Streaming",
    ],
    cardImage: img(UNSPLASH.video, 1600),
    eyebrow: "03 · Videotechnik",
    headline: "Bildsprache, die trägt — live, hybrid und broadcastfähig.",
    intro:
      "LED-Walls, Kameraketten, Medienserver und Streaming — als ein aufeinander abgestimmtes System.",
    headerImage: img(UNSPLASH.video, 2400),
    lead: "Vom Pixel Pitch bis zum CDN-Endpoint: wir planen die gesamte Bildkette — kalibriert, redundant, 4K-fähig.",
    paragraphs: [
      "Wir entwickeln LED-Designs auf Basis von ROE Visual Black Marble und Carbon-Serien — inklusive Processing auf Brompton Tessera für Broadcast-Qualität.",
      "Unsere Kameraketten reichen von kompakten PTZ-Lösungen bis zu voll ausgestatteten Broadcast-Kameras mit Engineering-Support und Rack Control.",
      "Für Streaming und Hybrid-Produktionen setzen wir auf vMix, Blackmagic ATEM Constellation und redundante Encoder mit Failover-Logik.",
    ],
    capabilities: [
      {
        title: "LED Walls",
        body: "ROE Visual · INFiLED · Brompton Processing — bis 1.2 mm Pixel Pitch.",
      },
      {
        title: "Bildregie",
        body: "Blackmagic ATEM Constellation 4K · Grass Valley Kayenne.",
      },
      {
        title: "Kameras",
        body: "Sony PXW-FX9, Blackmagic URSA Broadcast, Marshall PTZ — Fiber-Backbone.",
      },
      {
        title: "Medienserver",
        body: "disguise VX4 · Resolume Arena · watchout — synchron über Timecode.",
      },
      {
        title: "Live Streaming",
        body: "Multi-Feed Encoder, RTMP & SRT, CDN-Distribution mit SLA.",
      },
      {
        title: "Show Control",
        body: "Timecode-basiertes Cueing, QLab & Stage Precision — verlässlich im Sekundentakt.",
      },
    ],
    stack: [
      "ROE Visual Black Marble BM2 · CB5",
      "Brompton Tessera SX40 · XD",
      "disguise VX4 · Resolume Arena 7",
      "Blackmagic ATEM Constellation 4K",
      "Sony PXW-FX9 · Marshall PTZ",
      "vMix · OBS · SRT Streaming",
    ],
    gallery: [
      { url: img(UNSPLASH.video, 1600), alt: "LED-Wall auf einer Bühne" },
      { url: img("photo-1516035069371-29a1b244cc32", 1200), alt: "Kamera bei einer Live-Produktion" },
      { url: img("photo-1495616811223-4d98c6e9c869", 1200), alt: "Bildregie-Arbeitsplatz" },
      { url: img("photo-1560439514-4e9645039924", 1200), alt: "Videowand im Konferenzsaal" },
      { url: img("photo-1542744095-291d1f67b221", 1200), alt: "Streaming-Setup" },
    ],
    seo: {
      metaTitle: "Videotechnik",
      metaDescription:
        "LED-Walls, Broadcast-Kameras, Medienserver und Live-Streaming in 4K.",
    },
  },
];

/** Bestandsleistungen im Format der Übersichtsseite. */
export const SERVICE_LIST_FALLBACK: ServiceListItem[] = SERVICE_SEEDS.map((s) => ({
  _id: `fallback-${s.slug}`,
  title: s.title,
  slug: s.slug,
  order: s.order ?? null,
  number: s.number ?? null,
  shortDescription: s.shortDescription ?? null,
  bullets: s.bullets ?? null,
  cardImage: s.cardImage ?? null,
  cardImageAlt: null,
}));

/** Eine Bestandsleistung samt "nächste Leistung"-Verweis. */
export function getServiceFallback(slug: string): ServiceDetailData | null {
  const index = SERVICE_SEEDS.findIndex((s) => s.slug === slug);
  if (index === -1) return null;

  const service = SERVICE_SEEDS[index];
  // Nach der letzten Leistung geht es zurück zur ersten
  const next = SERVICE_SEEDS[(index + 1) % SERVICE_SEEDS.length];

  return {
    ...service,
    _id: `fallback-${service.slug}`,
    next: { title: next.title, slug: next.slug },
    first: { title: SERVICE_SEEDS[0].title, slug: SERVICE_SEEDS[0].slug },
  };
}
