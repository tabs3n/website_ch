import { sanityFetch } from "@/sanity/lib/client";
import { legalPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { LegalPageData, SanitySettings } from "@/sanity/lib/types";
import { toBlocks } from "@/lib/portableText";
import {
  LEGAL_FALLBACK,
  COMPANY_FALLBACK,
  type LegalSectionSource,
} from "@/data/legalContent";

export type LegalPageId = keyof typeof LEGAL_FALLBACK;

function fallbackFor(id: LegalPageId): LegalPageData {
  const source = LEGAL_FALLBACK[id];
  return {
    title: source.title,
    eyebrow: source.eyebrow,
    showCompanyDetails: source.showCompanyDetails,
    lastUpdated: source.lastUpdated,
    sections: source.sections.map((s: LegalSectionSource, i) => ({
      heading: s.heading,
      body: toBlocks(s.lines, `s${i}b`),
    })),
  };
}

/**
 * Ergänzt leere Pflichtangaben durch die Werte aus data/legalContent.ts.
 *
 * Ein im CMS gepflegter Wert gewinnt immer; ergänzt wird nur, was dort fehlt
 * oder nur aus Leerzeichen besteht. So kann im Impressum keine gesetzlich
 * vorgeschriebene Angabe verloren gehen.
 */
function withCompanyFallback(settings: SanitySettings): SanitySettings {
  const merged: SanitySettings = { ...settings };

  for (const [key, value] of Object.entries(COMPANY_FALLBACK)) {
    const field = key as keyof SanitySettings;
    const current = merged[field];
    if (typeof current !== "string" || current.trim() === "") {
      (merged as Record<string, unknown>)[field] = value;
    }
  }

  return merged;
}

/**
 * Lädt eine Rechtstext-Seite samt Website-Einstellungen.
 *
 * Solange im CMS noch nichts gepflegt ist — oder Sanity nicht erreichbar ist —
 * greifen die Bestandstexte aus data/legalContent.ts. Die Seite ist also nie
 * leer, was bei einer Pflichtseite wie dem Impressum wichtig ist.
 */
export async function getLegalPage(
  id: LegalPageId,
  { preview = false }: { preview?: boolean } = {}
): Promise<{ page: LegalPageData; settings: SanitySettings }> {
  try {
    const [page, settings] = await Promise.all([
      sanityFetch<LegalPageData | null>(legalPageQuery, { id }, { preview }),
      sanityFetch<SanitySettings | null>(siteSettingsQuery, {}, { preview }),
    ]);

    // Ein Dokument ohne Abschnitte zählt als "noch nicht gepflegt"
    const hasContent = Boolean(page?.sections?.length);

    return {
      page: hasContent ? (page as LegalPageData) : fallbackFor(id),
      settings: withCompanyFallback(settings ?? {}),
    };
  } catch {
    return { page: fallbackFor(id), settings: withCompanyFallback({}) };
  }
}
