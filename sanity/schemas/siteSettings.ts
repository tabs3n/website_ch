import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  groups: [
    { name: "branding", title: "🎨 Branding", default: true },
    { name: "company", title: "🏢 Unternehmen" },
    { name: "contact", title: "📞 Kontakt" },
    { name: "footer", title: "🔗 Footer" },
  ],
  fields: [
    // ── Branding ──────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "branding",
      options: { hotspot: false },
      description:
        "Hochgeladenes Logo-Bild (PNG oder SVG mit transparentem Hintergrund empfohlen). Wird in der Navigationsleiste angezeigt.",
    }),
    defineField({
      name: "accentColor",
      title: "Akzentfarbe",
      type: "string",
      group: "branding",
      initialValue: "#E8B54A",
      description:
        "Hex-Farbcode für Buttons, Highlights und interaktive Elemente. z.B. #E8B54A (Amber · Standard) · #3B82F6 (Blau) · #10B981 (Grün) · #EF4444 (Rot)",
      validation: (R) =>
        R.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
          name: "hex-color",
          invert: false,
        }).error("Bitte einen gültigen Hex-Farbcode eingeben, z.B. #E8B54A"),
    }),
    defineField({
      name: "headlineFont",
      title: "Überschriften-Schrift",
      type: "string",
      group: "branding",
      initialValue: "instrument-serif",
      description: "Schriftart für Überschriften (H1, H2, H3) und den Markennamen.",
      options: {
        list: [
          { title: "Instrument Serif — elegant, editorial (Standard)", value: "instrument-serif" },
          { title: "Playfair Display — klassisch, zeitlos", value: "playfair-display" },
          { title: "Cormorant Garamond — fein, luxuriös", value: "cormorant-garamond" },
          { title: "DM Serif Display — modern, klar", value: "dm-serif-display" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "bodyFont",
      title: "Fließtext-Schrift",
      type: "string",
      group: "branding",
      initialValue: "inter-tight",
      description: "Schriftart für Absätze, Beschreibungstexte und allgemeinen Fließtext.",
      options: {
        list: [
          { title: "Inter Tight — kompakt, modern (Standard)", value: "inter-tight" },
          { title: "DM Sans — rund, freundlich", value: "dm-sans" },
          { title: "Montserrat — geometrisch, klar", value: "montserrat" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "labelFont",
      title: "Label- & Navigations-Schrift",
      type: "string",
      group: "branding",
      initialValue: "jetbrains-mono",
      description: "Schriftart für Navigationspunkte, Eyebrows, Kennziffern und Labels.",
      options: {
        list: [
          { title: "JetBrains Mono — technisch, präzise (Standard)", value: "jetbrains-mono" },
          { title: "IBM Plex Mono — neutral, professionell", value: "ibm-plex-mono" },
        ],
        layout: "radio",
      },
    }),

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
      title: "Tagline / Unterzeile (Navbar)",
      type: "string",
      group: "company",
      initialValue: "LICHT · TON · VIDEO",
      description: "Kleiner Text unter dem Firmennamen in der Navigationsleiste.",
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
