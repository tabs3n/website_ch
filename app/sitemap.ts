import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cologne-hunters.de";
  const staticRoutes = [
    "",
    "/leistungen",
    "/leistungen/licht",
    "/leistungen/ton",
    "/leistungen/video",
    "/projekte",
    "/kontakt",
  ];

  const now = new Date();
  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
    ...projects.map((p) => ({
      url: `${base}/projekte/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
