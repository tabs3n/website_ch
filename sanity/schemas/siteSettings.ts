import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  groups: [
    { name: "company", title: "🏢 Unternehmen", default: true },
    { name: "contact", title: "📞 Kontakt" },
    { name: "footer", title: "🔗 Footer" },
  ],
  fields: [
    // ── Unternehmen ──────────────────────────────────────
    defineField({
      name: "companyName",
      title: "Firmenname",
      type: "string",
      group: "company",
      initialValue: "Cologne Hunters",
    }),
    defineField({
      name: "tagline",
      title: "Tagline / Unterzeile",
      type: "string",
      group: "company",
      initialValue: "Licht und Ton Service GmbH",
    }),
    defineField({
      name: "clients",
      title: "Referenzkunden (Logo-Marquee)",
      type: "array",
      group: "company",
      of: [{ type: "string" }],
      description: "Namen werden im animierten Marquee-Strip unter dem Hero angezeigt.",
      initialValue: [
        "RTL",
        "ZDF",
        "FORD",
        "LANXESS",
        "KOELNMESSE",
        "DEUTSCHE TELEKOM",
        "REWE",
        "BAYER",
        "DMEXCO",
        "BURDA",
        "AXEL SPRINGER",
        "VODAFONE",
      ],
    }),

    // ── Kontakt ───────────────────────────────────────────
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      group: "contact",
      initialValue: "kontakt@cologne-hunters.de",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      group: "contact",
      initialValue: "+49 221 1234 5678",
    }),
    defineField({
      name: "addressStreet",
      title: "Straße & Hausnummer",
      type: "string",
      group: "contact",
      initialValue: "Deutz-Mülheimer Straße 129",
    }),
    defineField({
      name: "addressCity",
      title: "PLZ und Stadt",
      type: "string",
      group: "contact",
      initialValue: "51063 Köln",
    }),
    defineField({
      name: "businessHours",
      title: "Geschäftszeiten",
      type: "array",
      group: "contact",
      of: [{ type: "string" }],
      description: 'Jede Zeile = eine Zeile im Kontaktbereich. z.B. "Mo–Fr · 08:00–18:00"',
      initialValue: ["Mo–Fr · 08:00–18:00", "24/7 Show-Support"],
    }),

    // ── Footer ────────────────────────────────────────────
    defineField({
      name: "footerTagline",
      title: "Footer-Beschreibungstext",
      type: "text",
      group: "footer",
      rows: 3,
      initialValue:
        "Licht und Ton Service GmbH · Veranstaltungstechnik auf Broadcast-Niveau — von der Konzeption bis zur schlüsselfertigen Umsetzung.",
    }),
  ],
});
