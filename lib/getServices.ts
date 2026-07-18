import { sanityFetch } from "@/sanity/lib/client";
import {
  allServicesQuery,
  allServiceSlugsQuery,
  serviceBySlugQuery,
} from "@/sanity/lib/queries";
import type { ServiceDetailData, ServiceListItem } from "@/sanity/lib/types";
import { SERVICE_LIST_FALLBACK, getServiceFallback, SERVICE_SEEDS } from "@/data/services";

type Options = { preview?: boolean };

/**
 * Ergänzt fehlende Bilder durch die Platzhalter aus data/services.ts.
 *
 * Das Seed-Skript legt die Leistungen ohne Bilder an — Bilder gehören ins
 * Media-Modul und werden von Hand hochgeladen. Bis das geschehen ist, zeigt
 * die Seite den bisherigen Platzhalter statt einer leeren Fläche. Ein im CMS
 * hochgeladenes Bild hat immer Vorrang.
 */
function withImageFallback<T extends { slug: string }>(
  item: T,
  keys: { cms: keyof T; seed: "cardImage" | "headerImage" }
): T {
  if (item[keys.cms]) return item;

  const seed = SERVICE_SEEDS.find((s) => s.slug === item.slug);
  const placeholder = seed?.[keys.seed];
  if (!placeholder) return item;

  return { ...item, [keys.cms]: placeholder };
}

/**
 * Alle sichtbaren Leistungen für die Übersichtsseite.
 * Ist im CMS noch keine Leistung angelegt, greifen die Bestandsinhalte.
 */
export async function getAllServices({
  preview = false,
}: Options = {}): Promise<ServiceListItem[]> {
  try {
    const results = await sanityFetch<ServiceListItem[]>(
      allServicesQuery,
      {},
      { preview, revalidate: 300 }
    );
    if (!results?.length) return SERVICE_LIST_FALLBACK;
    return results.map((s) => withImageFallback(s, { cms: "cardImage", seed: "cardImage" }));
  } catch {
    return SERVICE_LIST_FALLBACK;
  }
}

/**
 * Eine Leistung samt Detailinhalt.
 *
 * "next" zeigt auf die nächste Leistung in der Reihenfolge; bei der letzten
 * wird auf die erste zurückverwiesen, damit der Link am Seitenende nie ins
 * Leere führt.
 */
export async function getServiceBySlug(
  slug: string,
  { preview = false }: Options = {}
): Promise<ServiceDetailData | null> {
  try {
    const result = await sanityFetch<ServiceDetailData | null>(
      serviceBySlugQuery,
      { slug },
      { preview, revalidate: 300 }
    );
    if (result) {
      const withHeader = withImageFallback(result, {
        cms: "headerImage",
        seed: "headerImage",
      });
      // Ohne eigene Galerie die Platzhalter-Galerie zeigen
      if (withHeader.gallery?.length) return withHeader;
      const seed = SERVICE_SEEDS.find((s) => s.slug === slug);
      return { ...withHeader, gallery: seed?.gallery ?? null };
    }
    return getServiceFallback(slug);
  } catch {
    return getServiceFallback(slug);
  }
}

/** Slugs für generateStaticParams und die Sitemap. */
export async function getAllServiceSlugs({
  preview = false,
}: Options = {}): Promise<string[]> {
  try {
    const docs = await sanityFetch<Array<{ slug: string }>>(
      allServiceSlugsQuery,
      {},
      { preview, revalidate: 3600 }
    );
    const slugs = docs?.map((d) => d.slug).filter(Boolean) ?? [];
    return slugs.length ? slugs : SERVICE_SEEDS.map((s) => s.slug);
  } catch {
    return SERVICE_SEEDS.map((s) => s.slug);
  }
}
