import { defineField, defineType } from "sanity";

/**
 * Wiederverwendbarer SEO-Block.
 * Alle Felder sind optional — leer lassen heisst: die Seite nutzt ihre
 * Standardwerte (Titel der Seite bzw. die Meta-Beschreibung aus den
 * Website-Einstellungen).
 */
export const seoObject = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta-Titel",
      type: "string",
      description:
        'Titel in Google und im Browser-Tab. Der Firmenname wird automatisch angehängt. Leer lassen = Seitentitel wird verwendet.',
      validation: (R) =>
        R.max(60).warning("Empfohlen: max. 60 Zeichen, sonst kürzt Google den Titel ab."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta-Beschreibung",
      type: "text",
      rows: 3,
      description:
        "Beschreibungstext unter dem Titel in den Google-Suchergebnissen. Leer lassen = Beschreibung aus den Website-Einstellungen.",
      validation: (R) =>
        R.max(160).warning("Empfohlen: max. 160 Zeichen für optimale Darstellung in Google."),
    }),
    defineField({
      name: "ogImage",
      title: "Social-Media-Bild",
      type: "image",
      options: { hotspot: true },
      description:
        "Vorschaubild beim Teilen auf Facebook, LinkedIn oder WhatsApp. Empfohlen: 1200 × 630 px. Leer lassen = Standardbild aus den Website-Einstellungen.",
    }),
    defineField({
      name: "noIndex",
      title: "Von Suchmaschinen ausschliessen",
      type: "boolean",
      initialValue: false,
      description:
        "Aktivieren, damit diese Seite nicht in Google erscheint (z.B. für Impressum oder Datenschutz).",
    }),
  ],
});
