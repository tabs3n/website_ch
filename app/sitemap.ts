import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allProjectSlugsQuery, siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 3600; // rebuild sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, slugDocs] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client.fetch as any)(siteSettingsQuery, {}, { next: { revalidate: 3600 } }).catch(() => null),
    (client.fetch as any)(allProjectSlugsQuery, {}, { next: { revalidate: 3600 } }).catch(() => []),
  ]);

  const base: string = settings?.siteUrl ?? "https://cologne-hunters.de";
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }> = [
    { path: "",              priority: 1.0, changeFrequency: "weekly"  },
    { path: "/projekte",     priority: 0.8, changeFrequency: "weekly"  },
    { path: "/projektkarte", priority: 0.7, changeFrequency: "monthly" },
    { path: "/leistungen",   priority: 0.7, changeFrequency: "monthly" },
    { path: "/leistungen/licht",  priority: 0.6, changeFrequency: "monthly" },
    { path: "/leistungen/ton",    priority: 0.6, changeFrequency: "monthly" },
    { path: "/leistungen/video",  priority: 0.6, changeFrequency: "monthly" },
    { path: "/kontakt",      priority: 0.6, changeFrequency: "monthly" },
  ];

  const docs: Array<{ slug: string; publishedAt?: string }> = Array.isArray(slugDocs)
    ? slugDocs
    : [];

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...docs.map(({ slug, publishedAt }) => ({
      url: `${base}/projekte/${slug}`,
      lastModified: publishedAt ? new Date(publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
