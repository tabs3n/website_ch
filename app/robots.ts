import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanitySettings } from "@/sanity/lib/types";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await sanityFetch<SanitySettings | null>(
    siteSettingsQuery,
    {},
    { revalidate: 3600 }
  ).catch(() => null);

  const base: string = settings?.siteUrl ?? "https://cologne-hunters.de";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
