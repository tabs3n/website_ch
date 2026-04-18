import { defineConfig, definePlugin } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Base URL of the Next.js site — used for preview links */
const SITE_URL =
  typeof window !== "undefined"
    ? window.location.origin.replace(":3000", ":3000")
    : "https://website-ch.vercel.app";

/**
 * Adds a "🔍 Vorschau öffnen" action to every document in the Studio.
 * Clicking it opens the live site in Next.js Draft Mode so editors can
 * see unpublished changes in the actual design.
 */
const previewPlugin = definePlugin(() => ({
  name: "cologne-hunters-preview",
  document: {
    actions: (prev, ctx) => {
      const previewAction = {
        label: "🔍 Vorschau öffnen",
        onHandle: () => {
          // Derive the page path from schema type
          let path = "/";
          if (ctx.schemaType === "project") {
            // Open projects listing — slug is not easily available here
            path = "/projekte";
          } else if (ctx.schemaType === "service") {
            path = "/leistungen";
          }

          const secret = "";
          const url = `${SITE_URL}/api/draft?${secret ? `secret=${secret}&` : ""}slug=${encodeURIComponent(path)}`;
          window.open(url, "_blank");
        },
        tone: "primary" as const,
      };
      return [previewAction, ...prev];
    },
  },
}));

export default defineConfig({
  name: "cologne-hunters",
  title: "Cologne Hunters CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("🎬 Projekte")
              .schemaType("project")
              .child(S.documentTypeList("project")),
            S.divider(),
            S.listItem()
              .title("⚡ Leistungen")
              .schemaType("service")
              .child(S.documentTypeList("service")),
            S.divider(),
            S.listItem()
              .title("⚙️ Einstellungen")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    previewPlugin(),
  ],
  schema: {
    types: schemaTypes,
  },
});
