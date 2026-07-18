import { defineField, defineType } from "sanity";

/**
 * Eine Leistung (Licht, Ton, Video, …).
 *
 * Speist gleichzeitig:
 *  · die Kachel auf der Übersichtsseite /leistungen
 *  · die Detailseite /leistungen/<slug>
 *
 * Die Reihenfolge bestimmt das Feld "Reihenfolge". Sie legt auch fest, welche
 * Leistung am Ende einer Detailseite als "Nächste Leistung" verlinkt wird —
 * nach der letzten geht es zurück zur ersten.
 */
export const serviceSchema = defineType({
  name: "service",
  title: "Leistung",
  type: "document",
  groups: [
    { name: "overview", title: "📋 Übersicht (Kachel)", default: true },
    { name: "detail", title: "📄 Detailseite" },
    { name: "media", title: "🖼 Medien" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    // ── Übersicht / Kachel ───────────────────────────────
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "overview",
      description: 'z.B. "Lichttechnik"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Pfad",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      description:
        'Ergibt die Adresse der Detailseite: "licht" wird zu /leistungen/licht. Nach der Veröffentlichung möglichst nicht mehr ändern.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      group: "overview",
      initialValue: 1,
      description:
        "Bestimmt die Position auf der Übersichtsseite. Kleinere Zahl = weiter oben. 1, 2, 3, …",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "number",
      title: "Kennziffer",
      type: "string",
      group: "overview",
      description:
        'Wird über dem Titel angezeigt, z.B. "01". Leer lassen = wird aus der Reihenfolge erzeugt.',
    }),
    defineField({
      name: "shortDescription",
      title: "Kurzbeschreibung",
      type: "text",
      group: "overview",
      rows: 2,
      description: "Der Text auf der Kachel in der Leistungs-Übersicht.",
    }),
    defineField({
      name: "bullets",
      title: "Stichpunkte auf der Kachel",
      type: "array",
      group: "overview",
      of: [{ type: "string" }],
      description:
        "Kurze Schlagworte, die auf der Übersichtskachel erscheinen. Empfehlung: vier Einträge.",
      validation: (R) =>
        R.max(6).warning("Mehr als 6 Stichpunkte sprengen das Kachel-Layout."),
    }),
    defineField({
      name: "cardImage",
      title: "Kachelbild",
      type: "image",
      group: "overview",
      options: { hotspot: true },
      description:
        "Bild auf der Übersichtskachel. Leer lassen = das Header-Bild der Detailseite wird verwendet.",
      fields: [
        defineField({
          name: "alt",
          title: "Bildbeschreibung",
          type: "string",
          description: "Beschreibt das Bild für Screenreader und Suchmaschinen.",
        }),
      ],
    }),
    defineField({
      name: "hidden",
      title: "Leistung ausblenden",
      type: "boolean",
      group: "overview",
      initialValue: false,
      description:
        "Blendet die Leistung von der Übersichtsseite aus. Die Detailseite bleibt über den direkten Link erreichbar.",
    }),

    // ── Detailseite ──────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Kleiner Text über der Überschrift",
      type: "string",
      group: "detail",
      description:
        'z.B. "01 · Lichttechnik". Leer lassen = wird aus Kennziffer und Titel erzeugt.',
    }),
    defineField({
      name: "headline",
      title: "Überschrift der Detailseite",
      type: "string",
      group: "detail",
      description:
        'Die grosse Überschrift, z.B. "Licht ist die erste Entscheidung jeder Produktion." Leer lassen = der Titel wird verwendet.',
    }),
    defineField({
      name: "intro",
      title: "Einleitungstext",
      type: "text",
      group: "detail",
      rows: 3,
      description: "Absatz direkt unter der Überschrift.",
    }),
    defineField({
      name: "lead",
      title: "Lead-Satz",
      type: "text",
      group: "detail",
      rows: 2,
      description: "Hervorgehobener Einstiegssatz in grosser Schrift über dem Fliesstext.",
    }),
    defineField({
      name: "paragraphs",
      title: "Fliesstext",
      type: "array",
      group: "detail",
      of: [{ type: "text" }],
      description: "Jeder Eintrag wird zu einem eigenen Absatz.",
    }),
    defineField({
      name: "capabilitiesHeading",
      title: "Überschrift des Leistungsumfangs",
      type: "string",
      group: "detail",
      initialValue: "Capabilities",
    }),
    defineField({
      name: "capabilities",
      title: "Leistungsumfang",
      type: "array",
      group: "detail",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({ name: "body", title: "Beschreibung", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
    defineField({
      name: "stackHeading",
      title: "Überschrift des Technologie-Stacks",
      type: "string",
      group: "detail",
      initialValue: "Technologie-Stack",
    }),
    defineField({
      name: "stack",
      title: "Technologie-Stack",
      type: "array",
      group: "detail",
      of: [{ type: "string" }],
      description:
        "Eingesetzte Geräte und Systeme — je Eintrag eine Zeile in der Seitenleiste.",
    }),

    // ── Medien ───────────────────────────────────────────
    defineField({
      name: "headerImage",
      title: "Header-Bild",
      type: "image",
      group: "media",
      options: { hotspot: true },
      description: "Grosses Hintergrundbild im Seitenkopf der Detailseite.",
      fields: [
        defineField({
          name: "alt",
          title: "Bildbeschreibung",
          type: "string",
          description: "Beschreibt das Bild für Screenreader und Suchmaschinen.",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      group: "media",
      description:
        "Das erste Bild wird gross dargestellt, die weiteren als quadratische Kacheln daneben.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Bildbeschreibung",
              type: "string",
              description: "Beschreibt das Bild für Screenreader und Suchmaschinen.",
            }),
          ],
        },
      ],
    }),

    // ── SEO ──────────────────────────────────────────────
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
      media: "cardImage",
      fallback: "headerImage",
    },
    prepare: ({ title, order, media, fallback }) => ({
      title: title as string,
      subtitle: order != null ? `Position ${order}` : undefined,
      media: (media ?? fallback) as never,
    }),
  },
  orderings: [
    {
      title: "Reihenfolge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
