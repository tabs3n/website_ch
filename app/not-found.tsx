import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanitySettings } from "@/sanity/lib/types";

// Texte, solange im CMS noch nichts gepflegt ist
const FALLBACK = {
  eyebrow: "404 · Seite nicht gefunden",
  title: "Diese Seite existiert nicht mehr.",
  body: "Möglicherweise wurde sie verschoben oder umbenannt. Kehren Sie zur Startseite zurück oder sprechen Sie uns direkt an.",
} as const;

export default async function NotFound() {
  // Die 404-Seite muss auch dann funktionieren, wenn Sanity nicht erreichbar
  // ist — deshalb Fehler bewusst schlucken und auf die Standardtexte fallen.
  const settings = await sanityFetch<SanitySettings | null>(
    siteSettingsQuery,
    {},
    { revalidate: 300 }
  ).catch(() => null);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center py-32">
      <div className="container text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
          {settings?.notFoundEyebrow || FALLBACK.eyebrow}
        </div>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-tightest text-white md:text-7xl">
          {settings?.notFoundTitle || FALLBACK.title}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-steel-300">
          {settings?.notFoundBody || FALLBACK.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Zur Startseite
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </section>
  );
}
