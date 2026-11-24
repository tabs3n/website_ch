import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  groups: [
    { name: "branding", title: "🎨 Branding", default: true },
    { name: "navigation", title: "🧭 Navigationsleiste" },
    { name: "company", title: "🏢 Unternehmen" },
    { name: "contact", title: "📞 Kontakt" },
    { name: "legal", title: "⚖️ Rechtsangaben" },
    { name: "footer", title: "🔗 Footer" },
    { name: "notFound", title: "🚧 404-Seite" },
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
      initialValue: "#2563EB",
      description:
        "Hex-Farbcode für Buttons, Highlights und interaktive Elemente. z.B. #2563EB (Cologne-Hunters-Blau · Standard) · #1D4ED8 (dunkleres Blau) · #0EA5E9 (Hellblau). Auf Buttons steht weiße Schrift – sehr helle Farben daher vermeiden.",
      validation: (R) =>
        R.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
          name: "hex-color",
          invert: false,
        }).error("Bitte einen gültigen Hex-Farbcode eingeben, z.B. #2563EB"),
    }),
    defineField({
      name: "headlineFont",
      title: "Überschriften-Schrift",
      type: "string",
      group: "branding",
      initialValue: "inter-tight",
      description: "Schriftart für Überschriften (H1, H2, H3) und den Markennamen.",
      options: {
        list: [
          { title: "Inter Tight — klar, sachlich (Standard)", value: "inter-tight" },
          { title: "DM Sans — freundlich, rund", value: "dm-sans" },
          { title: "Montserrat — markant, geometrisch", value: "montserrat" },
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

    // ── Navigationsleiste ─────────────────────────────────
    defineField({
      name: "showNavClock",
      title: "Ortszeit in der Navigationsleiste anzeigen",
      type: "boolean",
      group: "navigation",
      initialValue: false,
      description:
        'Blendet oben rechts "KÖLN · 14:32:07" mit mitlaufender Uhr ein. Standardmässig ausgeblendet.',
    }),
    defineField({
      name: "navClockCity",
      title: "Stadt für die Ortszeit",
      type: "string",
      group: "navigation",
      initialValue: "KÖLN",
      hidden: ({ document }) => !document?.showNavClock,
      description: "Nur relevant, wenn die Ortszeit oben aktiviert ist.",
    }),
    defineField({
      name: "showNavCta",
      title: "Button in der Navigationsleiste anzeigen",
      type: "boolean",
      group: "navigation",
      initialValue: false,
      description:
        'Blendet den Button "Projekt anfragen" oben rechts ein. Standardmässig ausgeblendet — im mobilen Menü bleibt der Button unabhängig davon bestehen.',
    }),
    defineField({
      name: "navCtaLabel",
      title: "Beschriftung des Buttons",
      type: "string",
      group: "navigation",
      initialValue: "Projekt anfragen",
      hidden: ({ document }) => !document?.showNavCta,
      description: "Nur relevant, wenn der Button oben aktiviert ist.",
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

    // ── Rechtsangaben ─────────────────────────────────────
    // Diese Felder speisen Impressum, Datenschutz und die strukturierten
    // Daten für Google. Einmal hier pflegen — überall aktuell.
    defineField({
      name: "legalName",
      title: "Vollständiger Firmenname (Handelsregister)",
      type: "string",
      group: "legal",
      initialValue: "Cologne Hunters Licht & Ton Service GmbH",
      description:
        "Der komplette Name inkl. Rechtsform, wie er im Handelsregister steht. Erscheint im Impressum und auf der Kontaktseite.",
    }),
    defineField({
      name: "managingDirector",
      title: "Geschäftsführung",
      type: "string",
      group: "legal",
      initialValue: "Daniel Hentze",
      description:
        'Name der vertretungsberechtigten Person. Bei mehreren Personen mit Komma trennen, z.B. "Daniel Hentze, Maria Muster".',
    }),
    defineField({
      name: "registerCourt",
      title: "Registergericht",
      type: "string",
      group: "legal",
      initialValue: "Amtsgericht Köln",
    }),
    defineField({
      name: "registerNumber",
      title: "Registernummer",
      type: "string",
      group: "legal",
      initialValue: "HRB 22475",
      description: 'z.B. "HRB 22475"',
    }),
    defineField({
      name: "vatId",
      title: "Umsatzsteuer-Identifikationsnummer",
      type: "string",
      group: "legal",
      initialValue: "DE153241514",
      description: 'Ohne Präfix-Text, z.B. "DE153241514"',
    }),
    defineField({
      name: "contentResponsible",
      title: "Inhaltlich verantwortlich (§ 18 Abs. 2 MStV)",
      type: "text",
      group: "legal",
      rows: 3,
      initialValue: "Daniel Hentze\nBonner Wall 31\n50677 Köln",
      description:
        "Name und Anschrift der inhaltlich verantwortlichen Person. Zeilenumbrüche werden übernommen.",
    }),
    defineField({
      name: "addressCountry",
      title: "Land",
      type: "string",
      group: "legal",
      initialValue: "Deutschland",
      description: "Wird in der Impressums-Anschrift unter PLZ und Stadt ausgegeben.",
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

    // ── 404-Seite ─────────────────────────────────────────
    defineField({
      name: "notFoundEyebrow",
      title: "404 – Kleiner Text oben",
      type: "string",
      group: "notFound",
      initialValue: "404 · Seite nicht gefunden",
    }),
    defineField({
      name: "notFoundTitle",
      title: "404 – Überschrift",
      type: "string",
      group: "notFound",
      initialValue: "Diese Seite existiert nicht mehr.",
    }),
    defineField({
      name: "notFoundBody",
      title: "404 – Beschreibungstext",
      type: "text",
      group: "notFound",
      rows: 3,
      initialValue:
        "Möglicherweise wurde sie verschoben oder umbenannt. Kehren Sie zur Startseite zurück oder sprechen Sie uns direkt an.",
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
    defineField({
      name: "geoLat",
      title: "Breitengrad (Firmenstandort)",
      type: "number",
      group: "seo",
      initialValue: 50.9386,
      description:
        "Wird an Google für den Eintrag als lokales Unternehmen übergeben. Koordinaten findest du, indem du bei Google Maps mit der rechten Maustaste auf den Standort klickst.",
    }),
    defineField({
      name: "geoLng",
      title: "Längengrad (Firmenstandort)",
      type: "number",
      group: "seo",
      initialValue: 6.9603,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Website-Einstellungen" }),
  },
});
