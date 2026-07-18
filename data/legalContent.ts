/**
 * Ausgangsinhalte der Rechtstexte.
 *
 * Diese Datei erfüllt zwei Zwecke:
 *  1. Sie ist der Fallback, solange im CMS noch nichts gepflegt ist —
 *     die Seiten sind also nie leer.
 *  2. Das Seed-Skript (scripts/seed.ts) schreibt genau diese Inhalte
 *     einmalig ins Sanity-Dataset.
 *
 * Ab dem Seed-Lauf ist das CMS die führende Quelle; Änderungen hier wirken
 * sich dann nicht mehr aus.
 *
 * Notation der Zeilen: "- " für Aufzählungspunkte, "**fett**" und
 * "[Label](URL)" für Links. Siehe lib/portableText.ts.
 */

export type LegalSectionSource = {
  heading: string;
  lines: string[];
};

/**
 * Pflichtangaben nach § 5 DDG.
 *
 * Diese Werte greifen nur, solange das entsprechende Feld in den
 * Website-Einstellungen leer ist. Sie stellen sicher, dass im Impressum keine
 * gesetzlich vorgeschriebene Angabe fehlt — auch dann nicht, wenn das
 * Sanity-Dokument noch aus der Zeit vor diesen Feldern stammt.
 *
 * Sobald die Angaben im CMS gepflegt sind, hat das CMS Vorrang.
 */
export const COMPANY_FALLBACK = {
  legalName: "Cologne Hunters Licht & Ton Service GmbH",
  addressStreet: "Bonner Wall 31",
  addressCity: "50677 Köln",
  addressCountry: "Deutschland",
  phone: "+49 (0) 221 2790-20",
  email: "kontakt@cologne-hunters.de",
  managingDirector: "Daniel Hentze",
  registerCourt: "Amtsgericht Köln",
  registerNumber: "HRB 22475",
  vatId: "DE153241514",
  contentResponsible: "Daniel Hentze\nBonner Wall 31\n50677 Köln",
} as const;

// ─── Impressum ─────────────────────────────────────────────────────────────────
// Die Pflichtangaben (Anschrift, Geschäftsführung, Handelsregister, USt-IdNr.)
// stehen bewusst NICHT hier — sie kommen aus den Website-Einstellungen und
// werden über "Pflichtangaben automatisch einblenden" darüber ausgegeben.

export const IMPRESSUM_SECTIONS: LegalSectionSource[] = [
  {
    heading: "Streitschlichtung",
    lines: [
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: [https://ec.europa.eu/consumers/odr/](https://ec.europa.eu/consumers/odr/). Unsere E-Mail-Adresse finden Sie oben im Impressum.",
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
  {
    heading: "Haftung für Inhalte",
    lines: [
      "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    ],
  },
  {
    heading: "Haftung für Links",
    lines: [
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
    ],
  },
  {
    heading: "Urheberrecht",
    lines: [
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    ],
  },
];

// ─── Datenschutzerklärung ──────────────────────────────────────────────────────

export const DATENSCHUTZ_SECTIONS: LegalSectionSource[] = [
  {
    heading: "1. Verantwortlicher",
    lines: [
      "Verantwortlich für die Datenverarbeitung auf dieser Website ist die im [Impressum](/impressum) genannte Stelle. Dort finden Sie auch unsere vollständige Anschrift sowie Telefonnummer und E-Mail-Adresse.",
    ],
  },
  {
    heading: "2. Erhebung und Speicherung personenbezogener Daten",
    lines: [
      "Beim Besuch unserer Website werden durch den Webserver automatisch folgende Daten erfasst (Server-Logfiles):",
      "- IP-Adresse (anonymisiert)",
      "- Datum und Uhrzeit der Anfrage",
      "- Aufgerufene URL",
      "- Browsertyp und -version",
      "- Betriebssystem",
      "- Referrer-URL",
      "Diese Daten werden ausschließlich zur Sicherstellung des störungsfreien Betriebs und zur Verbesserung unseres Angebots genutzt und nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).",
    ],
  },
  {
    heading: "3. Kontaktformular",
    lines: [
      "Wenn Sie uns über das Kontaktformular eine Anfrage senden, werden Ihre Angaben (Name, E-Mail-Adresse, Telefonnummer, Nachricht sowie optionale Angaben zu Veranstaltung und Leistungen) zur Bearbeitung Ihrer Anfrage und für eventuelle Anschlussfragen bei uns gespeichert.",
      "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Die Daten werden nicht an Dritte weitergegeben, außer zur technischen Übermittlung per E-Mail (Resend Inc., USA — Datenübertragung auf Basis der EU-Standardvertragsklauseln).",
    ],
  },
  {
    heading: "4. Hosting und Infrastruktur",
    lines: [
      "Diese Website wird bei **Vercel Inc.** (USA) gehostet. Vercel verarbeitet Server-Logfiles und ist als Auftragsverarbeiter gemäß Art. 28 DSGVO unter Abschluss eines DPA tätig. Details: [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy).",
      "Inhalte (Projekte, Texte) werden über **Sanity.io** (USA) bereitgestellt. Sanity verarbeitet Inhalte als Auftragsverarbeiter: [sanity.io/legal/privacy](https://www.sanity.io/legal/privacy).",
    ],
  },
  {
    heading: "5. Cookies",
    lines: [
      "Diese Website setzt keine Tracking- oder Werbe-Cookies ein. Es werden ausschließlich technisch notwendige Session-Cookies verwendet, die nach dem Schließen des Browsers gelöscht werden. Eine Einwilligung ist nach § 25 Abs. 2 TDDDG nicht erforderlich.",
    ],
  },
  {
    heading: "6. Ihre Rechte",
    lines: [
      "Sie haben gegenüber uns folgende Rechte:",
      "- Recht auf Auskunft (Art. 15 DSGVO)",
      "- Recht auf Berichtigung (Art. 16 DSGVO)",
      "- Recht auf Löschung (Art. 17 DSGVO)",
      "- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
      "- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
      "- Widerspruchsrecht (Art. 21 DSGVO)",
      "Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die im [Impressum](/impressum) genannte E-Mail-Adresse.",
      "Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).",
    ],
  },
  {
    heading: "7. Änderungen dieser Datenschutzerklärung",
    lines: [
      "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder Leistungen anzupassen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar.",
    ],
  },
];

export const LEGAL_FALLBACK = {
  impressum: {
    title: "Impressum.",
    eyebrow: "Rechtliches",
    showCompanyDetails: true,
    sections: IMPRESSUM_SECTIONS,
    lastUpdated: null as string | null,
  },
  datenschutz: {
    title: "Datenschutz.",
    eyebrow: "Rechtliches",
    showCompanyDetails: false,
    sections: DATENSCHUTZ_SECTIONS,
    lastUpdated: "2026-04-01",
  },
} as const;
