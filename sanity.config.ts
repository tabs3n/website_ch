import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { IframePreview } from "./sanity/components/PreviewPane";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Dokumenttypen, von denen es genau ein Dokument geben darf.
 * Sie erscheinen in der linken Navigation als einzelner Menüpunkt und sind
 * bewusst aus dem "Neu erstellen"-Menü ausgeblendet — sonst könnten aus
 * Versehen zwei Startseiten oder zwei Impressen entstehen und die Website
 * würde willkürlich eines davon anzeigen.
 */
const SINGLETON_TYPES = new Set([
  "homepage",
  "servicesPage",
  "projectsPage",
  "mapPage",
  "contactPage",
  "legalPage",
  "siteSettings",
]);

export default defineConfig({
  name: "cologne-hunters",
  title: "Cologne Hunters CMS",
  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      // Neben dem Formular für jeden Dokumenttyp eine Live-Vorschau anzeigen
      defaultDocumentNode: (S) =>
        S.document().views([
          S.view.form().title("Bearbeiten"),
          S.view.component(IframePreview).title("Vorschau"),
        ]),

      structure: (S) =>
        S.list()
          .title("Inhalt")
          .items([
            // ── Seiten ──────────────────────────────────────
            S.listItem()
              .title("🏠 Startseite")
              .id("homepage")
              .schemaType("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Startseite")
              ),

            S.listItem()
              .title("⚡ Leistungen-Seite")
              .id("servicesPage")
              .schemaType("servicesPage")
              .child(
                S.document()
                  .schemaType("servicesPage")
                  .documentId("servicesPage")
                  .title("Leistungen-Seite")
              ),

            S.listItem()
              .title("🎬 Projekte-Seite")
              .id("projectsPage")
              .schemaType("projectsPage")
              .child(
                S.document()
                  .schemaType("projectsPage")
                  .documentId("projectsPage")
                  .title("Projekte-Seite")
              ),

            S.listItem()
              .title("🗺 Projektkarte-Seite")
              .id("mapPage")
              .schemaType("mapPage")
              .child(
                S.document()
                  .schemaType("mapPage")
                  .documentId("mapPage")
                  .title("Projektkarte-Seite")
              ),

            S.listItem()
              .title("📧 Kontakt-Seite")
              .id("contactPage")
              .schemaType("contactPage")
              .child(
                S.document()
                  .schemaType("contactPage")
                  .documentId("contactPage")
                  .title("Kontakt-Seite")
              ),

            S.divider(),

            // ── Inhalte ─────────────────────────────────────
            S.listItem()
              .title("🎞 Projekte")
              .schemaType("project")
              .child(
                S.documentTypeList("project")
                  .title("Alle Projekte")
                  .defaultOrdering([{ field: "year", direction: "desc" }])
              ),

            S.listItem()
              .title("🔧 Leistungen")
              .schemaType("service")
              .child(
                S.documentTypeList("service")
                  .title("Alle Leistungen")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            S.divider(),

            // ── Rechtstexte ─────────────────────────────────
            S.listItem()
              .title("⚖️ Rechtstexte")
              .id("legal")
              .child(
                S.list()
                  .title("Rechtstexte")
                  .items([
                    S.listItem()
                      .title("Impressum")
                      .id("impressum")
                      .schemaType("legalPage")
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("impressum")
                          .title("Impressum")
                      ),
                    S.listItem()
                      .title("Datenschutzerklärung")
                      .id("datenschutz")
                      .schemaType("legalPage")
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("datenschutz")
                          .title("Datenschutzerklärung")
                      ),
                  ])
              ),

            S.divider(),

            // ── Einstellungen ───────────────────────────────
            S.listItem()
              .title("⚙️ Website-Einstellungen")
              .id("siteSettings")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Website-Einstellungen")
              ),
          ]),
    }),
  ],

  document: {
    // Singletons aus dem globalen "Neu erstellen"-Menü ausblenden
    newDocumentOptions: (prev) =>
      prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)),

    // Bei Singletons "Löschen", "Duplizieren" und "Veröffentlichung zurückziehen"
    // entfernen — beides würde die Seite auf die Fallback-Texte zurückwerfen.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(
            ({ action }) =>
              action !== "delete" && action !== "duplicate" && action !== "unpublish"
          )
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
});
