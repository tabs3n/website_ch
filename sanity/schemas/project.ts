import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "media", title: "Medien" },
    { name: "map", title: "🗺 Projektkarte" },
  ],
  fields: [
    // ── Inhalt ───────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "content",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "client",
      title: "Kunde",
      type: "string",
      group: "content",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "year",
      title: "Jahr",
      type: "number",
      group: "content",
      validation: (R) => R.required().min(2000).max(2100),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Corporate", value: "Corporate" },
          { title: "Broadcast", value: "Broadcast" },
          { title: "Live", value: "Live" },
          { title: "Konferenz", value: "Konferenz" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "summary",
      title: "Kurzbeschreibung",
      type: "text",
      group: "content",
      rows: 3,
      validation: (R) => R.required().max(280),
    }),
    defineField({
      name: "description",
      title: "Beschreibung (Absätze)",
      type: "array",
      group: "content",
      of: [{ type: "text" }],
      description: "Jeder Eintrag wird als eigener Absatz dargestellt.",
    }),
    defineField({
      name: "services",
      title: "Eingesetzte Leistungen",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        list: [
          "Lichttechnik",
          "Tontechnik",
          "Videotechnik",
          "Rigging",
          "Dolmetschtechnik",
          "Broadcast",
          "Streaming",
          "Show Control",
          "Medienserver",
          "Konferenztechnik",
        ].map((s) => ({ title: s, value: s })),
        layout: "tags",
      },
    }),
    defineField({
      name: "stats",
      title: "Kennzahlen",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Bezeichnung", type: "string" }),
            defineField({ name: "value", title: "Wert", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "showInReferenzen",
      title: "In Referenzen anzeigen",
      type: "boolean",
      group: "content",
      initialValue: true,
      description: "Projekt auf der Referenzen-Seite (/projekte) anzeigen. Deaktivieren, um ein Projekt zu verstecken.",
    }),
    defineField({
      name: "featured",
      title: "Featured (Startseite)",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),

    // ── Medien ───────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero-Bild",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt-Text", type: "string" },
          ],
        },
      ],
    }),

    // ── Projektkarte ──────────────────────────────────────
    defineField({
      name: "country",
      title: "Land",
      type: "string",
      group: "map",
      description: "Vollständiger Ländername, z.B. Deutschland",
    }),
    defineField({
      name: "countryIso",
      title: "ISO-3-Ländercode",
      type: "string",
      group: "map",
      description: "3-stelliger ISO-Code, z.B. DEU · GBR · USA · FRA",
      validation: (R) => R.max(3),
    }),
    defineField({
      name: "city",
      title: "Stadt",
      type: "string",
      group: "map",
      description: "Stadt des Projekts (wird im Map-Popup angezeigt)",
    }),
    defineField({
      name: "lat",
      title: "Breitengrad (optional)",
      type: "number",
      group: "map",
      description: "Genauer Marker-Standort, z.B. 50.938",
    }),
    defineField({
      name: "lng",
      title: "Längengrad (optional)",
      type: "number",
      group: "map",
      description: "Genauer Marker-Standort, z.B. 6.960",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "hero",
    },
  },
  orderings: [
    {
      title: "Jahr (neueste zuerst)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
