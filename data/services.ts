import type { ServiceDetailData, ServiceListItem } from "@/sanity/lib/types";

/**
 * Ausgangsinhalte der Leistungen.
 *
 * Zwei Zwecke — wie bei data/legalContent.ts:
 *  1. Fallback, solange im CMS noch keine Leistung angelegt ist.
 *  2. Vorlage für das Seed-Skript (scripts/seed.ts).
 *
 * Die Texte folgen der Bestandswebsite cologne-hunters.de (über 25 Jahre
 * Erfahrung, CAD-Planung mit 3D, Raumakustik-Analyse, TÜV-geprüftes Rigging,
 * Full-HD/4K-Video, Streaming bis Satellit). Keine Marken-Behauptungen —
 * Equipment wird als Kategorie genannt, nicht als Fabrikat.
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
      "Lichtdesign für Messen, TV-Produktionen und Events — vom kamerafesten Tageslicht bis zur Show-Beleuchtung.",
    bullets: [
      "Lichtdesign & Operating",
      "Kamerataugliches Tageslicht",
      "Moving Lights & LED",
      "Messe- & Architekturlicht",
    ],
    cardImage: img(UNSPLASH.licht, 1600),
    eyebrow: "01 · Lichttechnik",
    headline: "Licht macht aus Technik eine Inszenierung.",
    intro:
      "Ob Produktpremiere, Messestand oder TV-Studio: Wir entwickeln Lichtkonzepte, die zeigen, was gezeigt werden soll — und verschwinden lassen, was nicht.",
    headerImage: img(UNSPLASH.licht, 2400),
    lead: "Gutes Licht fällt nicht auf. Es lässt auffallen, worauf es ankommt.",
    paragraphs: [
      "Jedes Lichtkonzept beginnt bei uns am Plan: In der CAD-Planung mit 3D-Visualisierung stimmen wir Positionen, Winkel und Stromversorgung ab, bevor der erste Scheinwerfer hängt.",
      "Aus über 25 Jahren Messe- und TV-Erfahrung wissen wir, was Kameras brauchen: flimmerfreies, kamerataugliches Licht mit sauberer Farbwiedergabe — im Studio wie auf der Messebühne.",
      "Unsere Lichtoperator begleiten die Veranstaltung vor Ort, vom Einleuchten über die Proben bis zum letzten Cue. Bei Änderungen in letzter Minute reagieren wir, statt zu diskutieren.",
    ],
    capabilities: [
      {
        title: "Showlicht",
        body: "Produktpräsentationen, Galas und Bühnenshows — geplant, programmiert und gefahren von erfahrenen Operatorn.",
      },
      {
        title: "Messelicht",
        body: "Stände und Exponate ins richtige Licht gesetzt — abgestimmt auf Architektur, Material und Markenauftritt.",
      },
      {
        title: "TV- & Studiolicht",
        body: "Kamerataugliches Licht für Produktionen und Übertragungen — flimmerfrei und farbstabil.",
      },
      {
        title: "Tageslichttechnik",
        body: "Leistungsstarke Tageslicht-Scheinwerfer für Situationen, in denen Kunstlicht an Grenzen stösst.",
      },
      {
        title: "Architektur- & Effektlicht",
        body: "Fassaden, Räume und Objekte inszeniert — dezent oder spektakulär, je nach Anlass.",
      },
      {
        title: "Lichtsteuerung",
        body: "Programmierung und Operating über professionelle Lichtsteuerungen — inklusive Backup-Konzept.",
      },
    ],
    stack: [
      "Moving Lights",
      "LED-Wash- & Flächenlicht",
      "Tageslicht-Scheinwerfer",
      "Profiler & Verfolger",
      "Lichtsteuerpulte",
      "Dimmer- & Stromverteilung",
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
        "Lichtdesign und Lichttechnik aus Köln: kamerataugliches Licht für TV, Messen und Events — Planung, Equipment und Operating aus einer Hand.",
    },
  },

  // ── 02 · Ton ───────────────────────────────────────────
  {
    slug: "ton",
    order: 2,
    number: "02",
    title: "Tontechnik",
    shortDescription:
      "Beschallung mit Raumakustik-Analyse — von der Pressekonferenz bis zum Konzert verständlich und druckvoll.",
    bullets: [
      "Beschallung & Raumakustik",
      "Funkmikrofonie & Monitoring",
      "Konferenz- & Dolmetschton",
      "Aufzeichnung & Mitschnitt",
    ],
    cardImage: img(UNSPLASH.ton, 1600),
    eyebrow: "02 · Tontechnik",
    headline: "Guter Ton ist der, über den niemand spricht.",
    intro:
      "Sprachverständlichkeit ist kein Zufall: Wir analysieren die Raumakustik, bevor die erste Box hängt — und liefern Beschallung, die zum Raum und zum Anlass passt.",
    headerImage: img(UNSPLASH.ton, 2400),
    lead: "Wir hören den Raum, bevor ihn Ihr Publikum hört.",
    paragraphs: [
      "Am Anfang steht die Analyse: Raumgrösse, Nachhall, Publikumsflächen. Daraus entsteht ein Beschallungskonzept, das jeden Platz erreicht — ohne die ersten Reihen zu erdrücken.",
      "Für Konferenzen und Pressetermine liefern wir zuverlässige Funkmikrofonie und Konferenzton — auf Wunsch mit Anbindung an Streaming und Aufzeichnung.",
      "Unsere Tontechniker mischen die Veranstaltung vor Ort und bleiben bis zum letzten Wort: bei Livemusik ebenso wie bei der Keynote, bei der jedes Wort sitzen muss.",
    ],
    capabilities: [
      {
        title: "Beschallung",
        body: "Systeme für jede Raumgrösse — von der Besprechung bis zur Halle, sauber eingemessen.",
      },
      {
        title: "Raumakustik-Analyse",
        body: "Wir vermessen und bewerten den Raum, bevor wir Technik empfehlen — nicht umgekehrt.",
      },
      {
        title: "Funkmikrofonie",
        body: "Drahtlose Mikrofonstrecken mit sorgfältiger Frequenzplanung — störungsfrei auch im Messeumfeld.",
      },
      {
        title: "Monitoring",
        body: "In-Ear- und Bühnenmonitoring, damit alle auf der Bühne hören, was sie brauchen.",
      },
      {
        title: "Konferenzton",
        body: "Diskussionsanlagen und Konferenzsysteme — analog, digital oder hybrid mit Streaming-Anbindung.",
      },
      {
        title: "Aufzeichnung",
        body: "Mitschnitte in Sende- und Archivqualität, auf Wunsch direkt geschnitten und aufbereitet.",
      },
    ],
    stack: [
      "Line-Array- & Punktquellen-Systeme",
      "Digitale Mischpulte",
      "Funkmikrofonie",
      "In-Ear- & Bühnenmonitoring",
      "Delay- & Frontfill-Systeme",
      "Recording & Mitschnitt",
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
        "Tontechnik aus Köln: Beschallung mit Raumakustik-Analyse, Funkmikrofonie und Konferenzton für Messen, Konferenzen und Veranstaltungen.",
    },
  },

  // ── 03 · Video ─────────────────────────────────────────
  {
    slug: "video",
    order: 3,
    number: "03",
    title: "Videotechnik",
    shortDescription:
      "LED-Wände, Kameratechnik und Streaming in Full HD und 4K — live im Saal, hybrid im Netz.",
    bullets: [
      "LED-Wände & Displays",
      "Kameratechnik & Bildregie",
      "Streaming bis Satellit",
      "Hybride Konferenzen",
    ],
    cardImage: img(UNSPLASH.video, 1600),
    eyebrow: "03 · Videotechnik",
    headline: "Bilder, die ankommen — im Saal und im Stream.",
    intro:
      "Von der LED-Wand über die Kameraregie bis zur Übertragung: Wir planen die komplette Bildkette und betreiben sie zuverlässig — in Full HD und 4K.",
    headerImage: img(UNSPLASH.video, 2400),
    lead: "Eine Bildkette ist nur so stark wie ihr schwächstes Glied. Deshalb planen wir alle.",
    paragraphs: [
      "LED-Wände und Displays liefern wir in Full HD und 4K — passend zu Raum, Betrachtungsabstand und Content. Die Einbindung in Bühnenbild und Rigging planen wir gleich mit.",
      "Für hybride Konferenzen verbinden wir Saal und Teilnehmende im Netz: Kamerazüge, Bildregie und Streaming — von der einfachen Konferenzschaltung bis zur Satellitenübertragung, auf Wunsch Ende-zu-Ende-verschlüsselt.",
      "Nach der Veranstaltung ist das Material bei uns in guten Händen: Bearbeitung, Schnitt und Archivierung übernehmen wir auf Wunsch gleich mit.",
    ],
    capabilities: [
      {
        title: "LED-Wände & Displays",
        body: "Indoor und Outdoor, Full HD bis 4K — inklusive Statik-, Rigging- und Stromplanung.",
      },
      {
        title: "Kameratechnik",
        body: "Kamerazüge für Bühne, Studio und Übertragung — bedient von erfahrenen Operatorn.",
      },
      {
        title: "Bildregie",
        body: "Live geschnitten und gemischt — damit im Saal und im Stream immer das richtige Bild steht.",
      },
      {
        title: "Streaming & Übertragung",
        body: "Von der Konferenzschaltung bis zur Satellitenübertragung — stabil, redundant, auf Wunsch verschlüsselt.",
      },
      {
        title: "Hybride Konferenzen",
        body: "Saal und Remote-Teilnehmende in einem Setup — Licht, Ton, Bild und Streaming aus einer Hand.",
      },
      {
        title: "Content Management",
        body: "Bearbeitung, Schnitt und Archivierung des Materials — für Doku, Social Media oder die nächste Ausgabe.",
      },
    ],
    stack: [
      "LED-Wände (Indoor & Outdoor)",
      "4K-Kameratechnik",
      "Bildregie & Bildmischer",
      "Streaming-Encoder",
      "Ü-Wagen & Schnittplatz",
      "Medienserver & Zuspieler",
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
        "Videotechnik aus Köln: LED-Wände, Kameratechnik, Bildregie und Streaming in Full HD und 4K — für Events, Messen und hybride Konferenzen.",
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
