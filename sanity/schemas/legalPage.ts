import { defineField, defineType } from "sanity";

/**
 * Rechtstext-Seite (Impressum, Datenschutz).
 *
 * Das Impressum besteht aus zwei Teilen:
 *  1. Den Pflichtangaben — die werden NICHT hier gepflegt, sondern kommen
 *     automatisch aus den Website-Einstellungen → Rechtsangaben. So steht die
 *     Adresse nur an einer Stelle und kann nicht auseinanderlaufen.
 *  2. Den Fliesstext-Abschnitten (Haftung, Urheberrecht, …) — die stehen unten
 *     in "Abschnitte" und sind frei editierbar.
 */
export const legalPageSchema = defineType({
  name: "legalPage",
  title: "Rechtstext-Seite",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Seitentitel",
      type: "string",
      description: 'Grosse Überschrift oben auf der Seite, z.B. "Impressum."',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Kleiner Text über der Überschrift",
      type: "string",
      initialValue: "Rechtliches",
    }),
    defineField({
      name: "showCompanyDetails",
      title: "Pflichtangaben automatisch einblenden",
      type: "boolean",
      initialValue: false,
      description:
        "Blendet Anbieterkennzeichnung, Kontakt, Geschäftsführung, Handelsregister und USt-IdNr. aus den Website-Einstellungen oberhalb der Abschnitte ein. Für das Impressum aktivieren, für die Datenschutzerklärung ausgeschaltet lassen.",
    }),
    defineField({
      name: "sections",
      title: "Abschnitte",
      type: "array",
      description:
        "Jeder Abschnitt bekommt eine Überschrift und einen formatierten Text. Reihenfolge per Drag & Drop änderbar.",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "heading",
              title: "Überschrift",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "richText",
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "lastUpdated",
      title: "Stand vom",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      description:
        'Wird unten als "Stand: …" ausgegeben. Leer lassen = kein Datum anzeigen.',
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
