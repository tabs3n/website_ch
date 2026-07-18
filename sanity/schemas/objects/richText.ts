import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Formatierter Fliesstext (Portable Text).
 * Bewusst reduziert gehalten: Absatz, zwei Überschriftsebenen, Listen,
 * fett/kursiv und Links. Damit lassen sich Rechtstexte vollständig pflegen,
 * ohne dass das Layout der Website gesprengt werden kann.
 */
export const richTextObject = defineType({
  name: "richText",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Überschrift", value: "h2" },
        { title: "Unterüberschrift", value: "h3" },
        { title: "Zitat / Hinweis", value: "blockquote" },
      ],
      lists: [
        { title: "Aufzählung", value: "bullet" },
        { title: "Nummerierte Liste", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                description:
                  'Externe Adresse (https://…), interne Seite (/kontakt), E-Mail (mailto:…) oder Telefon (tel:…).',
                validation: (R) =>
                  R.required().uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              }),
              defineField({
                name: "newTab",
                title: "In neuem Tab öffnen",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
