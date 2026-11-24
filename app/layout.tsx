import type { Metadata } from "next";
import { cache } from "react";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreviewBanner from "@/components/PreviewBanner";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanitySettings } from "@/sanity/lib/types";
import { getAllServices } from "@/lib/getServices";

// ─── Default fonts (preloaded at build time) ──────────────────────────────────
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Google Fonts URLs for alternative fonts ──────────────────────────────────
const GOOGLE_FONT_URLS: Record<string, string> = {
  "playfair-display":
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap",
  "cormorant-garamond":
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap",
  "dm-serif-display":
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
  "dm-sans":
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap",
  "montserrat":
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap",
  "ibm-plex-mono":
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap",
};

// ─── Cached settings fetch (deduplicates between generateMetadata + RootLayout) ─
const fetchSettings = cache((preview = false): Promise<SanitySettings | null> =>
  sanityFetch<SanitySettings | null>(siteSettingsQuery, {}, { preview, revalidate: 60 }).catch(
    () => null
  )
);

// Font-family CSS values for each option
const FONT_FAMILIES: Record<string, string> = {
  "playfair-display": '"Playfair Display", serif',
  "cormorant-garamond": '"Cormorant Garamond", serif',
  "dm-serif-display": '"DM Serif Display", serif',
  "inter-tight": 'var(--font-sans), "Inter Tight", system-ui, sans-serif',
  "dm-sans": '"DM Sans", system-ui, sans-serif',
  "montserrat": '"Montserrat", system-ui, sans-serif',
  "jetbrains-mono": 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace',
  "ibm-plex-mono": '"IBM Plex Mono", ui-monospace, monospace',
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings(false);

  const siteUrl: string = settings?.siteUrl ?? "https://cologne-hunters.de";
  const companyName: string = settings?.companyName ?? "Cologne Hunters";
  const description: string =
    settings?.siteDescription ??
    "Cologne Hunters — Veranstaltungstechnik aus Köln: Licht, Ton, Video, Konferenz- und Streamingtechnik für Messen, TV-Produktionen und Events weltweit.";
  const ogImage: string | null = settings?.ogImage ?? null;
  const defaultTitle = `${companyName} · Licht und Ton Service GmbH`;

  return {
    title: {
      default: defaultTitle,
      template: `%s · ${companyName}`,
    },
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: defaultTitle,
      description,
      type: "website",
      locale: "de_DE",
      url: siteUrl,
      siteName: companyName,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: companyName }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: preview } = draftMode();

  const [settings, services] = await Promise.all([
    fetchSettings(preview),
    getAllServices({ preview }),
  ]);

  // Leistungs-Links im Footer folgen der Reihenfolge aus dem CMS
  const serviceLinks = services.map((s) => ({
    label: s.title,
    href: `/leistungen/${s.slug}`,
  }));

  // ─── Branding tokens from Sanity ─────────────────────────────────────────────
  // Standard: Blau + serifenlose Überschriften. Die alten Standardwerte
  // (Amber, Instrument Serif) stehen als Startwert in bestehenden
  // Sanity-Dokumenten – sie gelten deshalb als "nicht gesetzt".
  const DEFAULT_ACCENT = "#2563EB";
  const LEGACY_ACCENTS = ["#E8B54A", "#e8b54a"];
  const DEFAULT_HEADLINE_FONT = "inter-tight";
  const LEGACY_HEADLINE_FONTS = ["instrument-serif"];

  const rawAccent = settings?.accentColor;
  const accentColor: string =
    rawAccent && !LEGACY_ACCENTS.includes(rawAccent) ? rawAccent : DEFAULT_ACCENT;
  const rawHeadlineFont = settings?.headlineFont;
  const headlineFont: string =
    rawHeadlineFont && !LEGACY_HEADLINE_FONTS.includes(rawHeadlineFont)
      ? rawHeadlineFont
      : DEFAULT_HEADLINE_FONT;
  const bodyFont: string = settings?.bodyFont ?? "inter-tight";
  const labelFont: string = settings?.labelFont ?? "jetbrains-mono";

  // Build CSS overrides — only inject what differs from the CSS default
  const cssLines: string[] = [];
  if (accentColor !== DEFAULT_ACCENT) cssLines.push(`--accent: ${accentColor};`);
  if (headlineFont !== DEFAULT_HEADLINE_FONT && FONT_FAMILIES[headlineFont])
    cssLines.push(`--font-headline: ${FONT_FAMILIES[headlineFont]};`);
  if (bodyFont !== "inter-tight" && FONT_FAMILIES[bodyFont])
    cssLines.push(`--font-body: ${FONT_FAMILIES[bodyFont]};`);
  if (labelFont !== "jetbrains-mono" && FONT_FAMILIES[labelFont])
    cssLines.push(`--font-label: ${FONT_FAMILIES[labelFont]};`);

  // Deduplicate Google Font URLs (one font might be picked for multiple roles)
  const fontUrls = Array.from(
    new Set(
      [headlineFont, bodyFont, labelFont]
        .map((key) => GOOGLE_FONT_URLS[key])
        .filter(Boolean)
    )
  );

  return (
    <html
      lang="de"
      className={`${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Load alternative Google Fonts only when selected */}
        {fontUrls.map((url) => (
          <link key={url} rel="stylesheet" href={url} />
        ))}
        {/* CSS variable overrides from Sanity branding */}
        {cssLines.length > 0 && (
          <style>{`:root { ${cssLines.join(" ")} }`}</style>
        )}
      </head>
      <body
        style={{
          fontFamily: "var(--font-body)",
          background: "#0A0A0A",
          color: "#F2EEE8",
          minHeight: "100vh",
        }}
      >
        <Navbar
          logoUrl={settings?.logo}
          companyName={settings?.companyName}
          tagline={settings?.tagline}
          showClock={settings?.showNavClock}
          clockCity={settings?.navClockCity}
          showCta={settings?.showNavCta}
          ctaLabel={settings?.navCtaLabel}
        />
        <main style={{ position: "relative" }}>{children}</main>
        <Footer
          companyName={settings?.companyName}
          footerTagline={settings?.footerTagline}
          email={settings?.email}
          phone={settings?.phone}
          addressStreet={settings?.addressStreet}
          addressCity={settings?.addressCity}
          instagramUrl={settings?.instagramUrl}
          facebookUrl={settings?.facebookUrl}
          linkedinUrl={settings?.linkedinUrl}
          serviceLinks={serviceLinks}
        />
        {preview && <PreviewBanner />}
      </body>
    </html>
  );
}
