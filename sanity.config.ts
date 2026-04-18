import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { IframePreview } from "./sanity/components/PreviewPane";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "cologne-hunters",
  title: "Cologne Hunters CMS",
  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      // Add an iframe preview view next to the form for every document type
      defaultDocumentNode: (S) =>
        S.document().views([
          S.view.form().title("Bearbeiten"),
          S.view.component(IframePreview).title("Vorschau"),
        ]),

      structure: (S) =>
        S.list()
          .title("Inhalt")
          .items([
            // ── Startseite (singleton) ──────────────────────
            S.listItem()
              .title("🏠 Startseite")
              .schemaType("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Startseite bearbeiten")
              ),

            S.divider(),

            // ── Projekte ────────────────────────────────────
            S.listItem()
              .title("🎬 Projekte")
              .schemaType("project")
              .child(S.documentTypeList("project").title("Alle Projekte")),

            // ── Leistungen ──────────────────────────────────
            S.listItem()
              .title("⚡ Leistungen")
              .schemaType("service")
              .child(S.documentTypeList("service").title("Alle Leistungen")),

            S.divider(),

            // ── Einstellungen (singleton) ───────────────────
            S.listItem()
              .title("⚙️ Einstellungen")
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

  schema: {
    types: schemaTypes,
  },
});
