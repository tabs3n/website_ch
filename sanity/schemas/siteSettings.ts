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
    { name: "seo", title: "🔍 SEO" },
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
      name: "contactRecipientEmail",
      title: "📬 Anfragen-Postfach (Formular-Empfänger)",
      type: "string",
      group: "contact",
      description: "An diese Adresse werden alle Kontaktformular-Einsendungen geschickt. z.B. anfragen@cologne-hunters.de",
      validation: (R) =>
        R.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
          .error("Bitte eine gültige E-Mail-Adresse eingeben."),
    }),
    defineField({
      name: "contactFromEmail",
      title: "📤 Absender-Adresse (muss in Resend verifiziert sein)",
      type: "string",
      group: "contact",
      initialValue: "onboarding@resend.dev",
      description: "Von dieser Adresse gehen die E-Mails raus. Für eigene Domain (z.B. no-reply@cologne-hunters.de) muss die Domain zuerst in resend.com/domains verifiziert werden. Leer lassen = Resend-Testadresse (nur an verifizierte Empfänger sendbar).",
    }),
    defineField({
      name: "email",
      title: "E-Mail (öffentlich, Impressum & Footer)",
      type: "string",
      group: "contact",
      initialValue: "kontakt@cologne-hunters.de",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      group: "contact",
      initialValue: "+49 (0) 221 2790-20",
    }),
    defineField({
      name: "addressStreet",
      title: "Straße & Hausnummer",
      type: "string",
      group: "contact",
      initialValue: "Bonner Wall 31",
    }),
    defineField({
      name: "addressCity",
      title: "PLZ und Stadt",
      type: "string",
      group: "contact",
      initialValue: "50677 Köln",
    }),
    defineField({
      name: "businessHours",
      title: "Geschäftszeiten",
      type: "array",
      group: "contact",
      of: [{ type: "string" }],
      description: 'Jede Zeile = eine Zeile im Kontaktbereich. z.B. "Mo–Fr · 08:00–18:00"',
      initialValue: ["Mo–Fr · 08:00–18:00", "Kurzfristige Produktionen nach Absprache"],
    }),

    // ── Social Media ──────────────────────────────────────
    defineField({
      name: "instagramUrl",
      title: "📸 Instagram-URL",
      type: "url",
      group: "contact",
      description: "Vollständige URL zum Instagram-Profil, z.B. https://instagram.com/cologne-hunters. Leer lassen = Icon wird im Footer ausgeblendet.",
      validation: (R) =>
        R.uri({ scheme: ["http", "https"] }).error("Bitte eine gültige URL mit https:// eingeben."),
    }),
    defineField({
      name: "facebookUrl",
      title: "📘 Facebook-URL",
      type: "url",
      group: "contact",
      description: "Vollständige URL zur Facebook-Seite, z.B. https://facebook.com/cologne-hunters. Leer lassen = Icon wird im Footer ausgeblendet.",
      validation: (R) =>
        R.uri({ scheme: ["http", "https"] }).error("Bitte eine gültige URL mit https:// eingeben."),
    }),
    defineField({
      name: "linkedinUrl",
      title: "💼 LinkedIn-URL",
      type: "url",
      group: "contact",
      description: "Vollständige URL zum LinkedIn-Profil. Leer lassen = Icon wird im Footer ausgeblendet.",
      validation: (R) =>
        R.uri({ scheme: ["http", "https"] }).error("Bitte eine gültige URL mit https:// eingeben."),
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

    // ── SEO ───────────────────────────────────────────────
    defineField({
      name: "siteUrl",
      title: "Website-URL",
      type: "url",
      group: "seo",
      initialValue: "https://cologne-hunters.de",
      description:
        "Vollständige URL der Website inkl. https://, z.B. https://cologne-hunters.de — wird für Sitemap, og:url und strukturierte Daten verwendet.",
    }),
    defineField({
      name: "siteDescription",
      title: "Meta-Beschreibung (Homepage)",
      type: "text",
      group: "seo",
      rows: 3,
      initialValue:
        "Cologne Hunters ist ein Full-Service-Dienstleister für Veranstaltungstechnik: Licht, Ton, Video, Rigging und Konferenztechnik auf Broadcast-Niveau.",
      validation: (R) =>
        R.max(160).warning("Empfohlen: max. 160 Zeichen für optimale Darstellung in Google."),
      description: "Wird in Google-Suchergebnissen und beim Teilen in sozialen Medien angezeigt.",
    }),
    defineField({
      name: "ogImage",
      title: "Social Media Bild (OG Image)",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description:
        "Vorschaubild für Facebook, LinkedIn, Twitter etc. Empfohlen: 1200 × 630 px, JPG oder PNG.",
    }),
  ],
});
