/**
 * Einmaliges Befüllen des Sanity-Datasets mit den Bestandsinhalten.
 *
 *   npm run seed          → legt nur an, was noch nicht existiert
 *   npm run seed -- --force → überschreibt auch vorhandene Dokumente
 *
 * Standardmässig wird ausschliesslich "createIfNotExists" verwendet: bereits
 * im Studio gepflegte Inhalte bleiben also unangetastet. Erst --force ersetzt
 * sie — das verwirft redaktionelle Änderungen und fragt deshalb vorher nach.
 *
 * Voraussetzung: ein Schreib-Token in SANITY_API_WRITE_TOKEN
 * (sanity.io/manage → API → Tokens → Editor-Rechte).
 *
 * Bilder werden bewusst NICHT geseedet. Sie gehören ins Media-Modul und
 * werden von Hand hochgeladen; bis dahin zeigt die Website die bisherigen
 * Platzhalter (siehe lib/getServices.ts).
 */

import { createClient } from "@sanity/client";
import { createInterface } from "node:readline/promises";
import { SERVICE_SEEDS } from "../data/services";
import { LEGAL_FALLBACK } from "../data/legalContent";
import { toBlocks } from "../lib/portableText";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const force = process.argv.includes("--force");

if (!token) {
  console.error(
    "\n  Fehlt: SANITY_API_WRITE_TOKEN\n\n" +
      "  Token erstellen unter https://sanity.io/manage → Projekt → API → Tokens\n" +
      "  (Berechtigung: Editor), dann in .env.local eintragen:\n\n" +
      "    SANITY_API_WRITE_TOKEN=sk...\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Doc = { _id: string; _type: string } & Record<string, unknown>;

// ─── Dokumente ─────────────────────────────────────────────────────────────────

const legalDocs: Doc[] = (
  Object.entries(LEGAL_FALLBACK) as Array<
    [keyof typeof LEGAL_FALLBACK, (typeof LEGAL_FALLBACK)[keyof typeof LEGAL_FALLBACK]]
  >
).map(([id, source]) => ({
  _id: id,
  _type: "legalPage",
  title: source.title,
  eyebrow: source.eyebrow,
  showCompanyDetails: source.showCompanyDetails,
  ...(source.lastUpdated ? { lastUpdated: source.lastUpdated } : {}),
  sections: source.sections.map((section, i) => ({
    _type: "section",
    _key: `sec${i}`,
    heading: section.heading,
    body: toBlocks(section.lines, `s${i}b`),
  })),
  seo: { _type: "seo", noIndex: true },
}));

const serviceDocs: Doc[] = SERVICE_SEEDS.map((s) => ({
  _id: `service-${s.slug}`,
  _type: "service",
  title: s.title,
  slug: { _type: "slug", current: s.slug },
  order: s.order,
  number: s.number,
  shortDescription: s.shortDescription,
  bullets: s.bullets,
  hidden: false,
  eyebrow: s.eyebrow,
  headline: s.headline,
  intro: s.intro,
  lead: s.lead,
  paragraphs: s.paragraphs,
  capabilitiesHeading: "Capabilities",
  capabilities: s.capabilities?.map((c, i) => ({
    _type: "object",
    _key: `cap${i}`,
    title: c.title,
    body: c.body,
  })),
  stackHeading: "Technologie-Stack",
  stack: s.stack,
  seo: {
    _type: "seo",
    metaTitle: s.seo?.metaTitle,
    metaDescription: s.seo?.metaDescription,
  },
}));

const pageDocs: Doc[] = [
  {
    _id: "servicesPage",
    _type: "servicesPage",
    eyebrow: "Leistungen",
    title: "Integrierte Technik für Events, Broadcast und Konferenzen.",
    intro:
      "Wir verstehen Veranstaltungstechnik als ein zusammenhängendes System — mit einer einzigen Crew, einem gemeinsamen Plan und kompromissloser Ausführungsqualität.",
    linkLabel: "Details ansehen",
  },
  {
    _id: "projectsPage",
    _type: "projectsPage",
    eyebrow: "Projekte",
    title: "Ausgewählte Referenzen.",
    intro:
      "Eine Auswahl unserer jüngsten Produktionen — vom Corporate Kick-off bis zum täglichen Broadcast-Studio.",
    emptyStateText: "Aktuell sind keine Projekte veröffentlicht.",
    ctaHeading: "Ihr Projekt als nächstes?",
  },
  {
    _id: "mapPage",
    _type: "mapPage",
    eyebrow: "● Referenzen weltweit",
    title: "Projekt*karte*.",
    intro:
      "Cologne Hunters realisiert Produktionen weltweit. Klicken Sie auf ein markiertes Land, um die Projekte dort zu sehen.",
    countriesLabel: "Länder",
    projectsLabel: "Projekte",
    demoNotice: "Demo-Daten — Projekte im Studio mit ISO-Code veröffentlichen",
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: "Kontakt",
    title: "Sprechen Sie direkt mit unserem Projektteam.",
    intro:
      "Wir beantworten Anfragen in der Regel innerhalb eines Werktages. Für kurzfristige Produktionen erreichen Sie uns direkt im Projektbüro.",
    officeLabel: "Projektbüro Köln",
    showProjectPhone: false,
    hoursLabel: "Öffnungszeiten",
    openingHours: [
      { _type: "object", _key: "h1", day: "Mo–Fr", time: "08:00 – 18:00", highlight: false },
      { _type: "object", _key: "h2", day: "Sa", time: "nach Absprache", highlight: false },
      { _type: "object", _key: "h3", day: "Show-Support", time: "24/7", highlight: true },
    ],
    formEyebrow: "Projektanfrage",
    formHeading: "Erzählen Sie uns von Ihrem Projekt.",
    formBody:
      "Je mehr wir über Anlass, Location und Umfang wissen, desto präziser können wir Ihnen ein erstes Konzept zurückspielen.",
    formSuccessMessage:
      "Vielen Dank — wir haben Ihre Anfrage erhalten und melden uns in der Regel innerhalb eines Werktages bei Ihnen.",
    privacyNote:
      "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Bearbeitung Ihrer Anfrage zu.",
  },
];

const allDocs: Doc[] = [...pageDocs, ...legalDocs, ...serviceDocs];

/**
 * Neue Felder in den Website-Einstellungen.
 *
 * Das Dokument existiert in bestehenden Datasets bereits, deshalb wird es
 * nicht ersetzt, sondern per setIfMissing ergänzt: vorhandene Werte bleiben
 * unverändert, nur bisher leere Felder werden gefüllt.
 *
 * Die Rechtsangaben sind Pflichtangaben nach § 5 DDG — ohne sie fehlen im
 * Impressum Handelsregister, USt-IdNr. und Geschäftsführung.
 */
const SETTINGS_DEFAULTS: Record<string, unknown> = {
  // Ortszeit und Button in der Navigationsleiste sind bewusst ausgeschaltet
  showNavClock: false,
  navClockCity: "KÖLN",
  showNavCta: false,
  navCtaLabel: "Projekt anfragen",
  legalName: "Cologne Hunters Licht & Ton Service GmbH",
  managingDirector: "Daniel Hentze",
  registerCourt: "Amtsgericht Köln",
  registerNumber: "HRB 22475",
  vatId: "DE153241514",
  contentResponsible: "Daniel Hentze\nBonner Wall 31\n50677 Köln",
  addressCountry: "Deutschland",
  notFoundEyebrow: "404 · Seite nicht gefunden",
  notFoundTitle: "Diese Seite existiert nicht mehr.",
  notFoundBody:
    "Möglicherweise wurde sie verschoben oder umbenannt. Kehren Sie zur Startseite zurück oder sprechen Sie uns direkt an.",
  geoLat: 50.9386,
  geoLng: 6.9603,
};

// ─── Ausführung ────────────────────────────────────────────────────────────────

async function confirmOverwrite(existing: string[]): Promise<boolean> {
  console.log(
    `\n  --force überschreibt ${existing.length} vorhandene Dokumente:\n` +
      existing.map((id) => `    · ${id}`).join("\n") +
      "\n\n  Dabei gehen im Studio vorgenommene Änderungen an diesen Dokumenten verloren."
  );

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question("\n  Fortfahren? (ja/nein) ");
  rl.close();
  return ["ja", "j", "yes", "y"].includes(answer.trim().toLowerCase());
}

async function main() {
  console.log(`\n  Dataset: ${projectId}/${dataset}`);

  const ids = allDocs.map((d) => d._id);
  const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, { ids });

  if (force && existing.length > 0) {
    const ok = await confirmOverwrite(existing);
    if (!ok) {
      console.log("\n  Abgebrochen — es wurde nichts geändert.\n");
      return;
    }
  }

  const tx = client.transaction();
  for (const doc of allDocs) {
    if (force) tx.createOrReplace(doc);
    else tx.createIfNotExists(doc);
  }

  // Website-Einstellungen anlegen, falls noch nicht vorhanden, und in jedem
  // Fall die neuen Felder ergänzen — ohne bestehende Werte zu überschreiben.
  tx.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
  tx.patch("siteSettings", (p) => p.setIfMissing(SETTINGS_DEFAULTS));

  await tx.commit();

  const created = allDocs.filter((d) => !existing.includes(d._id));
  const skipped = allDocs.filter((d) => existing.includes(d._id));

  console.log(`\n  Angelegt:      ${created.length}`);
  created.forEach((d) => console.log(`    + ${d._id}`));

  if (skipped.length > 0) {
    console.log(
      force
        ? `\n  Ersetzt:       ${skipped.length}`
        : `\n  Übersprungen:  ${skipped.length} (existieren bereits)`
    );
    skipped.forEach((d) => console.log(`    ${force ? "~" : "·"} ${d._id}`));
  }

  console.log(
    "\n  Website-Einstellungen: fehlende Rechtsangaben und 404-Texte ergänzt."
  );
  console.log(
    "\n  Fertig. Bilder bitte im Studio unter der jeweiligen Leistung hochladen.\n"
  );
}

main().catch((err) => {
  console.error("\n  Seed fehlgeschlagen:", err.message ?? err, "\n");
  process.exit(1);
});
