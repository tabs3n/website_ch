import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "client",
      title: "Kunde",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "year",
      title: "Jahr",
      type: "number",
      validation: (R) => R.required().min(2000).max(2100),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
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
      rows: 3,
      validation: (R) => R.required().max(280),
    }),
    defineField({
      name: "description",
      title: "Beschreibung (Absätze)",
      type: "array",
      of: [{ type: "text" }],
      description: "Jeder Eintrag wird als eigener Absatz dargestellt.",
    }),
    defineField({
      name: "services",
      title: "Eingesetzte Leistungen",
      type: "array",
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
      name: "hero",
      title: "Hero-Bild",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt-Text",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Kennzahlen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Bezeichnung", type: "string" }),
            defineField({ name: "value", title: "Wert", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured (Startseite)",
      type: "boolean",
      initialValue: false,
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
