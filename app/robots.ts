import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = await (client.fetch as any)(
    siteSettingsQuery,
    {},
    { next: { revalidate: 3600 } }
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
