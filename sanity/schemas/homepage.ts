import { defineField, defineType } from "sanity";

export const homepageSchema = defineType({
  name: "homepage",
  title: "Startseite",
  type: "document",
  groups: [
    { name: "visibility", title: "👁 Sichtbarkeit" },
    { name: "hero", title: "🎬 Hero", default: true },
    { name: "services", title: "⚡ Leistungen" },
    { name: "capabilities", title: "🔧 Capabilities" },
    { name: "studio", title: "📸 Studio" },
    { name: "contact", title: "📧 Kontakt" },
  ],
  fields: [
    // ── Sichtbarkeit ──────────────────────────────────────
    defineField({
      name: "showCapabilities",
      title: "Capabilities-Bereich anzeigen",
      type: "boolean",
      group: "visibility",
      initialValue: false,
      description: "Den Capabilities-Accordion-Bereich auf der Startseite ein- oder ausblenden.",
    }),
    defineField({
      name: "showProjectsPreview",
      title: "Referenz-Vorschau anzeigen",
      type: "boolean",
      group: "visibility",
      initialValue: false,
      description: "Die Projekt-Kacheln auf der Startseite zeigen (die Karte bleibt immer sichtbar).",
    }),
    defineField({
      name: "showStudio",
      title: "Studio-Bereich anzeigen",
      type: "boolean",
      group: "visibility",
      initialValue: false,
      description: "Den Studio / Prozess-Schritt-Bereich auf der Startseite ein- oder ausblenden.",
    }),

    // ── Hero ─────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero-Hintergrundbild",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Wird als Ken-Burns-animiertes Hintergrundbild im Hero verwendet.",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow-Text",
      type: "string",
      group: "hero",
      initialValue: "Veranstaltungstechnik · Köln · seit 2003",
      description: "Kleiner Text über der Hauptüberschrift.",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hauptüberschrift",
      type: "string",
      group: "hero",
      initialValue: "Licht. Ton. Video auf Broadcast-Niveau.",
      description:
        'Vollständiger Headline-Text. Das letzte Wort vor dem Gedankenstrich wird kursiv dargestellt (z.B. "Broadcast").',
    }),
    defineField({
      name: "heroDescription",
      title: "Beschreibungstext",
      type: "text",
      group: "hero",
      rows: 3,
      initialValue:
        "Integrierte Technik-Setups für Events, Konferenzen und Broadcast-Produktionen — von der ersten CAD-Zeichnung bis zur schlüsselfertigen Show.",
    }),
    defineField({
      name: "heroStats",
      title: "Kennzahlen (Stats-Rail)",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Wert", type: "string", description: 'z.B. "20+"' }),
            defineField({ name: "label", title: "Bezeichnung", type: "string", description: 'z.B. "Jahre"' }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      initialValue: [
        { _key: "stat1", value: "20+", label: "Jahre" },
        { _key: "stat2", value: "800+", label: "Produktionen" },
        { _key: "stat3", value: "24/7", label: "On-Site Support" },
        { _key: "stat4", value: "4K", label: "Broadcast-Ready" },
      ],
    }),

    // ── Leistungen ────────────────────────────────────────
    defineField({
      name: "servicesHeading",
      title: "Leistungen – Überschrift",
      type: "string",
      group: "services",
      initialValue: "Drei Gewerke, eine Regie.",
    }),
    defineField({
      name: "servicesBody",
      title: "Leistungen – Beschreibung",
      type: "text",
      group: "services",
      rows: 3,
      initialValue:
        "Wir planen, liefern und betreiben komplette Technik-Setups. Jede Linie spricht miteinander — konzeptionell, technisch, operativ.",
    }),
    defineField({
      name: "disciplines",
      title: "Gewerke (Karten)",
      type: "array",
      group: "services",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "num", title: "Nummer", type: "string", description: 'z.B. "01"' }),
            defineField({ name: "abbr", title: "Kürzel", type: "string", description: 'z.B. "Licht"' }),
            defineField({ name: "title", title: "Titel", type: "string", description: 'z.B. "Lichttechnik"' }),
            defineField({ name: "description", title: "Beschreibung", type: "text", rows: 3 }),
            defineField({
              name: "image",
              title: "Kartenbild",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: 'z.B. "/leistungen/licht"',
              initialValue: "/leistungen",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "key", media: "image" },
          },
        },
      ],
      initialValue: [
        {
          _key: "disc1",
          num: "01",
          abbr: "Licht",
          title: "Lichttechnik",
          description:
            "Moving Lights · Konventionell · LED-Paneele · DMX-Netzwerke · kinetische Elemente. Gesteuert auf grandMA3.",
          href: "/leistungen/licht",
        },
        {
          _key: "disc2",
          num: "02",
          abbr: "Ton",
          title: "Tontechnik",
          description:
            "Line-Array Systeme · IEM-Monitoring · digitale Konsolen · Dante-Netzwerke. Für Events jeder Größenordnung.",
          href: "/leistungen/ton",
        },
        {
          _key: "disc3",
          num: "03",
          abbr: "Video",
          title: "Videotechnik",
          description:
            "LED-Walls · 4K-Kameraketten · Bildregie · Live-Streaming · Stage-Design. Nahtlos in Broadcast-Qualität.",
          href: "/leistungen/video",
        },
      ],
    }),

    // ── Capabilities ──────────────────────────────────────
    defineField({
      name: "capabilitiesHeading",
      title: "Capabilities – Überschrift",
      type: "string",
      group: "capabilities",
      initialValue: "Alles, was zwischen Idee und Show liegt.",
    }),
    defineField({
      name: "capabilities",
      title: "Capability-Einträge",
      type: "array",
      group: "capabilities",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "tag", title: "Kategorie-Tag", type: "string", description: 'z.B. "Planung"' }),
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "description", title: "Beschreibung", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        },
      ],
      initialValue: [
        {
          _key: "cap1",
          tag: "Planung",
          title: "Konzeption & Engineering",
          description: "CAD-basierte Planung, Rigging-Statik, Power-Kalkulation und Netzwerk-Design.",
        },
        {
          _key: "cap2",
          tag: "Rigging",
          title: "Traversen & Motorsysteme",
          description: "Zertifizierte Rigger, Chain Hoists bis 2 t, Ground Support und Arena-Systeme.",
        },
        {
          _key: "cap3",
          tag: "Konferenz",
          title: "Dolmetsch & Streaming",
          description:
            "Personenführungsanlagen, Simultandolmetschen, hybride Konferenzen mit Multi-Feed-Streaming.",
        },
        {
          _key: "cap4",
          tag: "Crew",
          title: "Techniker & Operator",
          description:
            "Eigene, qualifizierte Crew — von SFX und Pyro bis FOH-Engineer und Show-Caller.",
        },
      ],
    }),

    // ── Studio ────────────────────────────────────────────
    defineField({
      name: "studioHeading",
      title: "Studio-Bereich – Überschrift",
      type: "string",
      group: "studio",
      initialValue: "Ein Team. Ein Signal-Weg.",
      description: "Wird im Footer-Bereich als Abschnitt-Überschrift verwendet.",
    }),
    defineField({
      name: "studioBody",
      title: "Studio-Bereich – Beschreibung",
      type: "text",
      group: "studio",
      rows: 3,
      initialValue:
        "Unsere Techniker, Operator und Projektleiter arbeiten seit Jahren zusammen. Keine Subunternehmer-Kette, keine Übergabe-Verluste.",
    }),
    defineField({
      name: "studioImage",
      title: "Studio-Bild (links)",
      type: "image",
      group: "studio",
      options: { hotspot: true },
      description: "Bild auf der linken Seite neben den Prozess-Schritten.",
    }),
    defineField({
      name: "processSteps",
      title: "Prozess-Schritte",
      type: "array",
      group: "studio",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "num", title: "Nummer", type: "string", description: 'z.B. "01"' }),
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "description", title: "Beschreibung", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "num" } },
        },
      ],
      initialValue: [
        { _key: "step1", num: "01", title: "Brief", description: "Anforderungen, Gewerke, Budget, Termine." },
        { _key: "step2", num: "02", title: "Engineering", description: "CAD · Statik · Power · Netzwerk." },
        { _key: "step3", num: "03", title: "Proben", description: "Technische Proben und Show-Programmierung." },
        { _key: "step4", num: "04", title: "Showtime", description: "FOH · Operator · Crew · Backup on-site." },
      ],
    }),

    // ── Kontakt ───────────────────────────────────────────
    defineField({
      name: "contactHeading",
      title: "Kontakt – Überschrift",
      type: "string",
      group: "contact",
      initialValue: "Lassen Sie uns Ihr nächstes Event realisieren.",
    }),
    defineField({
      name: "contactResponseTime",
      title: "Antwortzeit-Hinweis",
      type: "string",
      group: "contact",
      initialValue: "Antwort innerhalb von 24 h werktags",
    }),
    defineField({
      name: "contactLocationImage",
      title: "Standort-Bild",
      type: "image",
      group: "contact",
      options: { hotspot: true },
      description: "Kölner Stadtbild oder Büro-Foto im Kontaktbereich.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Startseite" }),
  },
});
