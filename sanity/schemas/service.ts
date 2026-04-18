import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Leistung",
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
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "number",
      title: "Nummer (z.B. 01)",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Kurzbeschreibung (Übersicht)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "headerImage",
      title: "Header-Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "lead",
      title: "Lead-Satz",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "paragraphs",
      title: "Fließtext (Absätze)",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "body", title: "Beschreibung", type: "text" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "stack",
      title: "Technologie-Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", media: "headerImage" },
  },
});
