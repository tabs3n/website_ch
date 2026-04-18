import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

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
              .title("Projekte")
              .schemaType("project")
              .child(S.documentTypeList("project")),
            S.divider(),
            S.listItem()
              .title("Leistungen")
              .schemaType("service")
              .child(S.documentTypeList("service")),
            S.divider(),
            S.listItem()
              .title("Einstellungen")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
