import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanitySeo, SanitySettings } from "@/sanity/lib/types";

/**
 * Baut die Seiten-Metadaten aus drei Ebenen — die jeweils speziellere gewinnt:
 *   1. der SEO-Block der Seite im CMS
 *   2. die im Code hinterlegten Standardwerte der Seite
 *   3. die globalen Website-Einstellungen
 *
 * So kann jede Seite im CMS übersteuert werden, ohne dass eine leere
 * Eingabe die Seite ohne Titel oder Beschreibung zurücklässt.
 */
export function buildMetadata({
  seo,
  settings,
  fallbackTitle,
  fallbackDescription,
  path,
}: {
  seo?: SanitySeo;
  settings?: SanitySettings | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  /** Pfad ab der Domain, z.B. "/kontakt". Für die Canonical-URL. */
  path?: string;
}): Metadata {
  const title = seo?.metaTitle?.trim() || fallbackTitle;
  const description =
    seo?.metaDescription?.trim() ||
    fallbackDescription ||
    settings?.siteDescription ||
    undefined;
  const ogImage = seo?.ogImage || settings?.ogImage || null;
  const siteUrl = settings?.siteUrl ?? "https://cologne-hunters.de";

  return {
    title,
    ...(description ? { description } : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
    ...(path ? { alternates: { canonical: `${siteUrl}${path}` } } : {}),
    openGraph: {
      title,
      ...(description ? { description } : {}),
      type: "website",
      locale: "de_DE",
      ...(path ? { url: `${siteUrl}${path}` } : {}),
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/**
 * Website-Einstellungen für generateMetadata laden.
 * Schlägt der Abruf fehl, liefert die Funktion null und die aufrufende Seite
 * fällt auf ihre eingebauten Texte zurück — die Seite baut also weiterhin.
 */
export async function getSettingsForMetadata(): Promise<SanitySettings | null> {
  return sanityFetch<SanitySettings | null>(
    siteSettingsQuery,
    {},
    { revalidate: 60 }
  ).catch(() => null);
}
