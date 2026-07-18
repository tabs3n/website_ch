import { defineField, defineType } from "sanity";

/**
 * Einzelseiten-Singletons.
 *
 * Jede dieser Seiten hat genau ein Dokument im CMS (siehe Desk-Struktur in
 * sanity.config.ts). Gepflegt werden hier nur die redaktionellen Teile —
 * die Listen (Projekte, Leistungen) kommen weiterhin aus den jeweiligen
 * Dokumenttypen.
 */

// ─── Gemeinsame Seitenkopf-Felder ──────────────────────────────────────────────
const headerFields = [
  defineField({
    name: "eyebrow",
    title: "Kleiner Text über der Überschrift",
    type: "string",
    group: "header",
  }),
  defineField({
    name: "title",
    title: "Überschrift",
    type: "string",
    group: "header",
    validation: (R) => R.required(),
  }),
  defineField({
    name: "intro",
    title: "Einleitungstext",
    type: "text",
    rows: 3,
    group: "header",
    description: "Kurzer Absatz unter der Überschrift. Leer lassen = wird ausgeblendet.",
  }),
];

const headerGroups = [
  { name: "header", title: "📄 Seitenkopf", default: true },
  { name: "seo", title: "🔍 SEO" },
];

const seoField = defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" });

// ─── /leistungen ───────────────────────────────────────────────────────────────
export const servicesPageSchema = defineType({
  name: "servicesPage",
  title: "Leistungen-Seite",
  type: "document",
  groups: [...headerGroups, { name: "cta", title: "📧 Abschluss-CTA" }],
  fields: [
    ...headerFields,
    defineField({
      name: "linkLabel",
      title: "Beschriftung des Karten-Links",
      type: "string",
      group: "header",
      initialValue: "Details ansehen",
      description: 'Text unten auf jeder Leistungs-Kachel, z.B. "Details ansehen".',
    }),
    defineField({
      name: "ctaHeading",
      title: "Überschrift des Kontaktbereichs",
      type: "string",
      group: "cta",
      description:
        "Überschrift im Kontaktblock am Seitenende. Leer lassen = Standardtext von der Startseite.",
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Leistungen-Seite" }) },
});

// ─── /projekte ─────────────────────────────────────────────────────────────────
export const projectsPageSchema = defineType({
  name: "projectsPage",
  title: "Projekte-Seite",
  type: "document",
  groups: [...headerGroups, { name: "cta", title: "📧 Abschluss-CTA" }],
  fields: [
    ...headerFields,
    defineField({
      name: "emptyStateText",
      title: "Text wenn keine Projekte vorhanden sind",
      type: "string",
      group: "header",
      initialValue: "Aktuell sind keine Projekte veröffentlicht.",
      description:
        "Wird angezeigt, wenn kein einziges Projekt auf „In Referenzen anzeigen“ steht.",
    }),
    defineField({
      name: "ctaHeading",
      title: "Überschrift des Kontaktbereichs",
      type: "string",
      group: "cta",
      initialValue: "Ihr Projekt als nächstes?",
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Projekte-Seite" }) },
});

// ─── /projektkarte ─────────────────────────────────────────────────────────────
export const mapPageSchema = defineType({
  name: "mapPage",
  title: "Projektkarte-Seite",
  type: "document",
  groups: [...headerGroups, { name: "labels", title: "🏷 Beschriftungen" }],
  fields: [
    ...headerFields,
    defineField({
      name: "countriesLabel",
      title: "Beschriftung Länder-Zähler",
      type: "string",
      group: "labels",
      initialValue: "Länder",
      description: 'Steht neben der Anzahl der Länder, z.B. "12 Länder".',
    }),
    defineField({
      name: "projectsLabel",
      title: "Beschriftung Projekt-Zähler",
      type: "string",
      group: "labels",
      initialValue: "Produktionen",
    }),
    defineField({
      name: "demoNotice",
      title: "Hinweis bei Beispieldaten",
      type: "string",
      group: "labels",
      initialValue:
        "Beispieldaten — sobald Projekte mit Ländercode gepflegt sind, erscheinen sie hier automatisch.",
      description:
        "Wird nur angezeigt, solange noch kein Projekt einen ISO-Ländercode hat und die Karte Platzhalter zeigt.",
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Projektkarte-Seite" }) },
});

// ─── /kontakt ──────────────────────────────────────────────────────────────────
export const contactPageSchema = defineType({
  name: "contactPage",
  title: "Kontakt-Seite",
  type: "document",
  groups: [
    ...headerGroups,
    { name: "office", title: "🏢 Infokarte" },
    { name: "hours", title: "🕐 Öffnungszeiten" },
    { name: "form", title: "✉️ Formular" },
  ],
  fields: [
    ...headerFields,

    // ── Infokarte ──
    // Adresse, Telefon und E-Mail kommen bewusst aus den Website-Einstellungen,
    // damit sie nicht an zwei Stellen gepflegt werden müssen.
    defineField({
      name: "officeLabel",
      title: "Überschrift der Infokarte",
      type: "string",
      group: "office",
      initialValue: "Projektbüro Köln",
    }),
    defineField({
      name: "showProjectPhone",
      title: "Projekttelefon separat anzeigen",
      type: "boolean",
      group: "office",
      initialValue: false,
      description:
        "Zeigt zusätzlich zur normalen Telefonnummer eine zweite Nummer für laufende Produktionen.",
    }),
    defineField({
      name: "projectPhone",
      title: "Projekttelefon",
      type: "string",
      group: "office",
      hidden: ({ document }) => !document?.showProjectPhone,
      description: "Nur relevant, wenn die Option darüber aktiviert ist.",
    }),

    // ── Öffnungszeiten ──
    defineField({
      name: "hoursLabel",
      title: "Überschrift Öffnungszeiten",
      type: "string",
      group: "hours",
      initialValue: "Öffnungszeiten",
    }),
    defineField({
      name: "openingHours",
      title: "Zeiten",
      type: "array",
      group: "hours",
      description:
        'Je Eintrag eine Zeile. "Hervorheben" färbt den Wert in der Akzentfarbe ein — gedacht für 24/7-Support.',
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Bezeichnung",
              type: "string",
              description: 'z.B. "Mo–Fr" oder "Show-Support"',
              validation: (R) => R.required(),
            }),
            defineField({
              name: "time",
              title: "Wert",
              type: "string",
              description: 'z.B. "08:00 – 18:00" oder "nach Absprache"',
              validation: (R) => R.required(),
            }),
            defineField({
              name: "highlight",
              title: "Hervorheben",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: { select: { title: "day", subtitle: "time" } },
        },
      ],
      initialValue: [
        { _key: "h1", day: "Mo–Fr", time: "08:00 – 18:00", highlight: false },
        { _key: "h2", day: "Sa", time: "nach Absprache", highlight: false },
        { _key: "h3", day: "Show-Support", time: "24/7", highlight: true },
      ],
    }),

    // ── Formular ──
    defineField({
      name: "formEyebrow",
      title: "Kleiner Text über der Formular-Überschrift",
      type: "string",
      group: "form",
      initialValue: "Projektanfrage",
    }),
    defineField({
      name: "formHeading",
      title: "Formular-Überschrift",
      type: "string",
      group: "form",
      initialValue: "Erzählen Sie uns von Ihrem Projekt.",
    }),
    defineField({
      name: "formBody",
      title: "Text über dem Formular",
      type: "text",
      rows: 3,
      group: "form",
      initialValue:
        "Je mehr wir über Anlass, Location und Umfang wissen, desto präziser können wir Ihnen ein erstes Konzept zurückspielen.",
    }),
    defineField({
      name: "formSuccessMessage",
      title: "Bestätigungstext nach dem Absenden",
      type: "text",
      rows: 2,
      group: "form",
      initialValue:
        "Vielen Dank — Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb eines Werktages.",
    }),
    defineField({
      name: "privacyNote",
      title: "Datenschutz-Hinweis unter dem Formular",
      type: "text",
      rows: 2,
      group: "form",
      initialValue:
        "Ihre Angaben werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet.",
      description: "Leer lassen = kein Hinweis anzeigen.",
    }),

    seoField,
  ],
  preview: { prepare: () => ({ title: "Kontakt-Seite" }) },
});
