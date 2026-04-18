export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  location?: string;
  category: "Corporate" | "Broadcast" | "Live" | "Konferenz";
  summary: string;
  description: string[];
  services: string[];
  hero: string;
  gallery: string[];
  stats?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "lanxess-kickoff-2025",
    title: "Lanxess Global Kick-off 2025",
    client: "Lanxess AG",
    year: 2025,
    location: "Lanxess Arena, Köln",
    category: "Corporate",
    summary:
      "Hybride Global Kick-off-Veranstaltung für 4.500 Teilnehmende mit 32 m LED-Wall und Dolmetschtechnik in sechs Sprachen.",
    description: [
      "Für den internationalen Kick-off der Lanxess AG haben wir ein vollständig integriertes Technik-Setup realisiert — von der Planung der Bühne und Rigging-Statik bis hin zur Live-Produktion für internationale Streams.",
      "Zentrales Element war eine 32 × 6 Meter LED-Wall mit 2.6 mm Pixel Pitch, ergänzt durch kinetische Lichtelemente und eine mehrsprachige Simultandolmetschanlage mit Personenführung.",
      "Die komplette Show wurde auf einer ROE Visual LED-Wall in 4K ausgespielt und parallel in sechs Sprachen via IPTV an Satellite-Offices in Asien und Nordamerika übertragen.",
    ],
    services: ["Lichttechnik", "Tontechnik", "Videotechnik", "Rigging", "Dolmetschtechnik"],
    hero: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
    stats: [
      { label: "Teilnehmer", value: "4.500" },
      { label: "Sprachen", value: "6" },
      { label: "LED-Fläche", value: "192 m²" },
      { label: "Kameras", value: "12" },
    ],
  },
  {
    slug: "ford-ev-launch",
    title: "Ford EV Launch Europe",
    client: "Ford Motor Company",
    year: 2024,
    location: "Motorworld Köln",
    category: "Live",
    summary:
      "Produktlaunch einer neuen EV-Baureihe mit dynamischer Fahrzeug-Reveal-Sequenz und gespiegeltem IPTV-Signal in 12 Händler-Showrooms.",
    description: [
      "Ein choreografierter Reveal: Automatisch gesteuerte Drehteller, synchronisierte Moving Lights und eine LED-Bodenfläche bildeten die Bühne für drei neue Fahrzeugmodelle.",
      "Die Veranstaltung wurde live in 12 Händler-Showrooms europaweit übertragen — synchronisiert über unser eigenes IPTV-Netz mit dediziertem Backup-Stream.",
      "Showtechnisch arbeiteten wir mit grandMA3 Stagern und einer disguise VX4-Medienserver-Infrastruktur für nahtlose Content-Synchronisation.",
    ],
    services: ["Lichttechnik", "Videotechnik", "Medienserver", "Streaming"],
    hero: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1600&q=80",
    ],
    stats: [
      { label: "Showrooms", value: "12" },
      { label: "Fahrzeuge", value: "3" },
      { label: "Medienserver", value: "disguise VX4" },
    ],
  },
  {
    slug: "rtl-primetime-studio",
    title: "RTL Primetime Studio",
    client: "RTL Deutschland",
    year: 2024,
    location: "Studio Köln-Deutz",
    category: "Broadcast",
    summary:
      "Permanentes Studio-Setup inklusive Lichtdesign, Kamerakranen und Konferenz-Backend für tägliche Live-Ausstrahlungen.",
    description: [
      "Für das tägliche Primetime-Format haben wir ein komplettes Studio-Setup entwickelt — mit modularer LED-Kulisse, Broadcast-Lichtdesign und einer stillgelegten Akustik-Architektur.",
      "Die Lichtregie basiert auf einer ETC EOS-Konsole, die Tonregie läuft über DiGiCo SD7. Alle Signale werden via MADI in die zentrale Regie geroutet.",
      "Das System erlaubt schnelle Szenenwechsel in unter 60 Sekunden — entscheidend für den täglichen Produktionsbetrieb.",
    ],
    services: ["Lichttechnik", "Tontechnik", "Broadcast", "Rigging"],
    hero: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
    ],
    stats: [
      { label: "Ausstrahlungen", value: "täglich" },
      { label: "Kameras", value: "8" },
      { label: "Szenenwechsel", value: "< 60 s" },
    ],
  },
  {
    slug: "koelnmesse-dmexco",
    title: "DMEXCO Hauptbühne",
    client: "Koelnmesse GmbH",
    year: 2024,
    location: "Koelnmesse, Halle 7",
    category: "Konferenz",
    summary:
      "Hauptbühnen-Produktion für zwei Konferenztage mit 42 Sessions, 110 Sprecher·innen und paralleler Streaming-Infrastruktur.",
    description: [
      "Für die DMEXCO-Hauptbühne entwickelten wir ein modulares Setup, das innerhalb von 24 Stunden aufgebaut war und in 42 Sessions flexibel umkonfiguriert werden konnte.",
      "Wir lieferten Bühnenbild, ein 24-Meter-LED-Backdrop, Beschallung mit d&b GSL-System sowie die Streaming-Infrastruktur für zwei Hybrid-Tracks.",
      "Ein dediziertes Show-Control-Team steuerte Cues, Einblender und Videoregie aus einer zentralen FOH-Position.",
    ],
    services: ["Tontechnik", "Videotechnik", "Streaming", "Show Control"],
    hero: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=80",
    ],
    stats: [
      { label: "Sessions", value: "42" },
      { label: "Sprecher", value: "110" },
      { label: "LED-Backdrop", value: "24 m" },
    ],
  },
  {
    slug: "telekom-hybrid-summit",
    title: "Telekom Hybrid Summit",
    client: "Deutsche Telekom",
    year: 2023,
    location: "Bonn · Campus",
    category: "Konferenz",
    summary:
      "Hybride Unternehmenskonferenz mit 1.200 Gästen vor Ort und 8.000 Zuschauer·innen im internen Stream.",
    description: [
      "Der jährliche Leadership Summit wurde hybrid geplant: Ein Mix aus Keynote-Bühne, Breakout-Formaten und Live-Interaktion aus dem Stream in den Saal.",
      "Technisch betrieben wir drei Kamera-Ketten, einen dedizierten Vmix-Streaming-Workflow und eine hochperformante Konferenz-Backbone mit Dante über Glasfaser.",
      "Besonderer Fokus lag auf der akustischen Behandlung des Saals, um Sprachverständlichkeit in allen Bereichen zu garantieren.",
    ],
    services: ["Tontechnik", "Videotechnik", "Streaming", "Konferenztechnik"],
    hero: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80",
    ],
    stats: [
      { label: "Vor Ort", value: "1.200" },
      { label: "Stream", value: "8.000" },
      { label: "Breakouts", value: "12" },
    ],
  },
  {
    slug: "bayer-investor-day",
    title: "Bayer Investor Day",
    client: "Bayer AG",
    year: 2023,
    location: "Leverkusen · BayKomm",
    category: "Corporate",
    summary:
      "Broadcast-Qualität für einen Investor Day mit Live-Übersetzung in fünf Sprachen und globalem Satelliten-Uplink.",
    description: [
      "Für den Bayer Investor Day entwickelten wir ein broadcastfähiges Studio im BayKomm — inklusive Mehrkamera-Regie, Teleprompter-Setup und redundanter Streaming-Infrastruktur.",
      "Alle Signale wurden doppelt ausgespielt und sowohl an einen Satelliten-Uplink als auch an die Investoren-Plattform verteilt.",
      "Die Übersetzungen liefen synchron in fünf Sprachen, eingespeist direkt in den IPTV-Feed.",
    ],
    services: ["Videotechnik", "Tontechnik", "Broadcast", "Dolmetschtechnik"],
    hero: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=1600&q=80",
    ],
    stats: [
      { label: "Sprachen", value: "5" },
      { label: "Kameras", value: "6" },
      { label: "Streams", value: "redundant" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
