/**
 * Einmaliger Text-Patch (18.07.2026): faktenbasierte Website-Texte.
 *
 * Grundlage ist die Recherche auf cologne-hunters.de (Bestandswebsite):
 * über 25 Jahre Erfahrung, Einsätze von Detroit bis Tokio, Kunden aus
 * Automotive (u.a. Volkswagen, Audi, Skoda) und TV (ZDF, WDR),
 * CAD-Planung mit 3D-Visualisierung, Raumakustik-Analyse, TÜV-geprüftes
 * Rigging, hybride Konferenzen mit Streaming, Ü-Wagen und Schnittplatz.
 *
 * Ersetzt werden ausschliesslich Texte, die aus den Platzhaltern stammen.
 * Bewusst NICHT angefasst: heroHeadline, heroImage, clients, tagline,
 * companyName — vom Betreiber im Studio gepflegt.
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ─── Startseite ────────────────────────────────────────────────────────────────

const HOMEPAGE_TEXTS = {
  heroEyebrow: "Veranstaltungstechnik · Köln · über 25 Jahre",
  heroDescription:
    "Von der Automobilpremiere bis zur TV-Produktion: Wir planen, liefern und betreiben Licht-, Ton- und Videotechnik für Messen, Konferenzen und Events — in Köln zu Hause, weltweit im Einsatz.",
  heroStats: [
    { _key: "stat1", value: "25+", label: "Jahre Erfahrung" },
    { _key: "stat2", value: "15", label: "Metropolen weltweit" },
    { _key: "stat3", value: "24/7", label: "Projektbetreuung" },
    { _key: "stat4", value: "4K", label: "LED & Streaming" },
  ],
  servicesHeading: "Licht, Ton und Video — aus einer Hand.",
  servicesBody:
    "Messe, TV-Produktion, Konferenz oder Gala: Wir übernehmen die komplette technische Umsetzung — von der ersten CAD-Zeichnung über den Aufbau mit TÜV-geprüftem Material bis zur Betreuung während der Veranstaltung.",
  capabilitiesHeading: "Alles, was zwischen Idee und Show liegt.",
  capabilities: [
    {
      _key: "cap1",
      tag: "Planung",
      title: "Beratung & CAD-Planung",
      description:
        "Wir denken Veranstaltungen vom Ergebnis her: Beratung, Konzeption und CAD-Planung mit 3D-Visualisierung — bevor das erste Case rollt.",
    },
    {
      _key: "cap2",
      tag: "Rigging",
      title: "Rigging & Bühnenbau",
      description:
        "Traversen, Motoren und Bühnen mit TÜV-geprüftem Material und zertifiziertem Personal — sicher geplant, termingerecht montiert.",
    },
    {
      _key: "cap3",
      tag: "Konferenz",
      title: "Konferenztechnik & Streaming",
      description:
        "Analog, digital oder hybrid: Konferenzen mit Licht, Ton, Video und Streaming — auf Wunsch Ende-zu-Ende-verschlüsselt.",
    },
    {
      _key: "cap4",
      tag: "Sonderlösungen",
      title: "Sonderbauten & Speziallösungen",
      description:
        "Wenn es für andere schwierig wird, wird es für uns erst richtig spannend: technische Lösungen abseits des Katalogs.",
    },
  ],
  studioHeading: "Ein Team. Ein Ansprechpartner.",
  studioBody:
    "Unser Projektmanagement begleitet Sie rund um die Uhr — von der ersten Beratung über Aufbau und Show bis zum Abbau. Keine Übergabeverluste, keine Warteschleifen.",
  processSteps: [
    {
      _key: "step1",
      num: "01",
      title: "Beratung",
      description: "Anlass, Ziele, Budget — wir hören zu und denken mit.",
    },
    {
      _key: "step2",
      num: "02",
      title: "Planung",
      description: "Konzeption und CAD-Planung mit 3D-Visualisierung.",
    },
    {
      _key: "step3",
      num: "03",
      title: "Aufbau",
      description: "Termingerechte Montage mit TÜV-geprüftem Material.",
    },
    {
      _key: "step4",
      num: "04",
      title: "Show",
      description: "Erfahrene Operator und 24/7-Betreuung vor Ort.",
    },
  ],
  contactHeading: "Lassen Sie uns Ihre Veranstaltung realisieren.",
  contactResponseTime: "Antwort innerhalb von 24 h werktags",
};

// Texte der drei Gewerke-Karten, zugeordnet über das Kürzel (abbr) — die
// hrefs im Bestand zeigten generisch auf /leistungen und taugen nicht als
// Schlüssel. Bilder und Nummern der vorhandenen Einträge bleiben erhalten.
const DISCIPLINE_TEXTS: Record<
  string,
  { title: string; description: string; href: string }
> = {
  Licht: {
    title: "Lichttechnik",
    description:
      "Vom kamerafesten Tageslicht bis zur Show-Beleuchtung der Produktpremiere: Lichtdesign, das Marken und Menschen richtig in Szene setzt.",
    href: "/leistungen/licht",
  },
  Ton: {
    title: "Tontechnik",
    description:
      "Beschallung mit vorausgehender Raumakustik-Analyse — damit jedes Wort verständlich ankommt, von der Pressekonferenz bis zur Gala.",
    href: "/leistungen/ton",
  },
  Video: {
    title: "Videotechnik",
    description:
      "LED-Wände, Kameratechnik und Streaming in Full HD und 4K — für hybride Konferenzen ebenso wie für den TV-tauglichen Auftritt.",
    href: "/leistungen/video",
  },
};

// ─── Leistungen (Detailseiten) ─────────────────────────────────────────────────

const SERVICES = [
  {
    _id: "service-licht",
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
    eyebrow: "01 · Lichttechnik",
    headline: "Licht macht aus Technik eine Inszenierung.",
    intro:
      "Ob Produktpremiere, Messestand oder TV-Studio: Wir entwickeln Lichtkonzepte, die zeigen, was gezeigt werden soll — und verschwinden lassen, was nicht.",
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
    seo: {
      metaTitle: "Lichttechnik",
      metaDescription:
        "Lichtdesign und Lichttechnik aus Köln: kamerataugliches Licht für TV, Messen und Events — Planung, Equipment und Operating aus einer Hand.",
    },
  },
  {
    _id: "service-ton",
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
    eyebrow: "02 · Tontechnik",
    headline: "Guter Ton ist der, über den niemand spricht.",
    intro:
      "Sprachverständlichkeit ist kein Zufall: Wir analysieren die Raumakustik, bevor die erste Box hängt — und liefern Beschallung, die zum Raum und zum Anlass passt.",
    lead: "Wir hören den Raum, bevor ihn Ihr Publikum hört.",
    paragraphs: [
      "Am Anfang steht die Analyse: Raumgrösse, Nachhall, Publikumsflächen. Daraus entsteht ein Beschallungskonzept, das jeden Platz erreicht — ohne die ersten Reihen zu erdrücken.",
      "Für Konferenzen und Pressetermine liefern wir zuverlässige Funkmikrofonie und Konferenzton — auf Wunsch mit Anbindung an Streaming und Aufzeichnung.",
      "Unsere Tontechniker mischen die Veranstaltung vor Ort und bleiben bis zum letzten Wort: Bei Livemusik ebenso wie bei der Keynote, bei der jedes Wort sitzen muss.",
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
    seo: {
      metaTitle: "Tontechnik",
      metaDescription:
        "Tontechnik aus Köln: Beschallung mit Raumakustik-Analyse, Funkmikrofonie und Konferenzton für Messen, Konferenzen und Veranstaltungen.",
    },
  },
  {
    _id: "service-video",
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
    eyebrow: "03 · Videotechnik",
    headline: "Bilder, die ankommen — im Saal und im Stream.",
    intro:
      "Von der LED-Wand über die Kameraregie bis zur Übertragung: Wir planen die komplette Bildkette und betreiben sie zuverlässig — in Full HD und 4K.",
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
    seo: {
      metaTitle: "Videotechnik",
      metaDescription:
        "Videotechnik aus Köln: LED-Wände, Kameratechnik, Bildregie und Streaming in Full HD und 4K — für Events, Messen und hybride Konferenzen.",
    },
  },
];

// ─── Seiten-Singletons ─────────────────────────────────────────────────────────

const PAGE_TEXTS: Array<{ _id: string; fields: Record<string, unknown> }> = [
  {
    _id: "servicesPage",
    fields: {
      eyebrow: "Leistungen",
      title: "Technik für Messen, TV-Produktionen und Events.",
      intro:
        "Licht, Ton und Video sind unsere Kerngewerke — ergänzt um Konferenztechnik, Streaming, Rigging und Bühnenbau. Geplant, geliefert und betreut von einem Team, das seit über 25 Jahren nichts anderes macht.",
    },
  },
  {
    _id: "projectsPage",
    fields: {
      eyebrow: "Referenzen",
      title: "Ausgewählte Produktionen.",
      intro:
        "Messen, TV-Produktionen, Konferenzen und Galas — realisiert für Marken aus Automobilindustrie, Fernsehen und Wirtschaft.",
    },
  },
  {
    _id: "mapPage",
    fields: {
      intro:
        "Von Detroit bis Tokio: Cologne Hunters betreut technisch aufwändige Veranstaltungen weltweit. Klicken Sie auf ein markiertes Land, um die Projekte dort zu sehen.",
    },
  },
  {
    _id: "contactPage",
    fields: {
      intro:
        "Wir beantworten Anfragen in der Regel innerhalb eines Werktages. Bei laufenden Produktionen erreichen Sie unser Projektmanagement rund um die Uhr.",
      formBody:
        "Je mehr wir über Anlass, Ort und Umfang wissen, desto präziser wird unser erster Vorschlag. Zwei, drei Sätze genügen für den Anfang.",
    },
  },
];

// ─── Website-Einstellungen (nur leere Felder) ──────────────────────────────────

const SETTINGS_TEXTS = {
  footerTagline:
    "Cologne Hunters Licht und Ton Service GmbH — Veranstaltungstechnik aus Köln, weltweit im Einsatz. Licht, Ton, Video, Konferenztechnik und Rigging aus einer Hand.",
  siteDescription:
    "Cologne Hunters — Veranstaltungstechnik aus Köln: Licht, Ton, Video, Konferenz- und Streamingtechnik für Messen, TV-Produktionen und Events weltweit.",
};

// ─── Ausführung ────────────────────────────────────────────────────────────────

async function main() {
  // Gewerke-Karten: vorhandene Bilder behalten, Texte und Links tauschen
  const hp = await client.fetch<{
    disciplines?: Array<Record<string, unknown> & { abbr?: string; _key: string }>;
  }>(`*[_id=="homepage"][0]{disciplines}`);

  const disciplines = (hp?.disciplines ?? []).map((d) => {
    const texts = d.abbr ? DISCIPLINE_TEXTS[d.abbr] : undefined;
    return texts ? { ...d, ...texts } : d;
  });

  const tx = client.transaction();

  tx.patch("homepage", (p) =>
    p.set({
      ...HOMEPAGE_TEXTS,
      ...(disciplines.length ? { disciplines } : {}),
    })
  );

  // Nur die bislang leeren Einstellungs-Felder füllen
  tx.patch("siteSettings", (p) => p.setIfMissing(SETTINGS_TEXTS));

  for (const svc of SERVICES) {
    const { _id, slug, seo, capabilities, ...fields } = svc;
    tx.patch(_id, (p) =>
      p.set({
        ...fields,
        slug: { _type: "slug", current: slug },
        capabilities: capabilities.map((c, i) => ({
          _type: "object",
          _key: `cap${i}`,
          ...c,
        })),
        seo: { _type: "seo", ...seo },
      })
    );
  }

  for (const page of PAGE_TEXTS) {
    tx.patch(page._id, (p) => p.set(page.fields));
  }

  await tx.commit();
  console.log("Texte aktualisiert:");
  console.log("  ~ homepage (Hero, Gewerke, Capabilities, Prozess, Kontakt)");
  console.log("  ~ siteSettings (nur leere Felder: footerTagline, siteDescription)");
  for (const s of SERVICES) console.log(`  ~ ${s._id}`);
  for (const p of PAGE_TEXTS) console.log(`  ~ ${p._id}`);
}

main().catch((err) => {
  console.error("Patch fehlgeschlagen:", err.message ?? err);
  process.exit(1);
});
