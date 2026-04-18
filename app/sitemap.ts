import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/getProjects";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://website-ch.vercel.app";
  const slugs = await getAllProjectSlugs();

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
    ...slugs.map((slug) => ({
      url: `${base}/projekte/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
