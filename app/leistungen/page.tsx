import Link from "next/link";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";
import { getAllServices } from "@/lib/getServices";
import { sanityFetch } from "@/sanity/lib/client";
import { servicesPageQuery } from "@/sanity/lib/queries";
import type { ServicesPageData } from "@/sanity/lib/types";
import { buildMetadata, getSettingsForMetadata } from "@/lib/seo";

export const revalidate = 300;

// Texte, solange im CMS noch nichts gepflegt ist
const FALLBACK = {
  eyebrow: "Leistungen",
  title: "Integrierte Technik für Events, Broadcast und Konferenzen.",
  intro:
    "Wir verstehen Veranstaltungstechnik als ein zusammenhängendes System — mit einer einzigen Crew, einem gemeinsamen Plan und kompromissloser Ausführungsqualität.",
  linkLabel: "Details ansehen",
  description:
    "Licht, Ton, Video, Rigging und Konferenztechnik — integriert aus einer Hand.",
} as const;

async function getPage(preview = false): Promise<ServicesPageData | null> {
  return sanityFetch<ServicesPageData | null>(
    servicesPageQuery,
    {},
    { preview, revalidate: 300 }
  ).catch(() => null);
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(), getSettingsForMetadata()]);

  return buildMetadata({
    seo: page?.seo,
    settings,
    fallbackTitle: "Leistungen",
    fallbackDescription: FALLBACK.description,
    path: "/leistungen",
  });
}

export default async function LeistungenPage() {
  const { isEnabled: preview } = await draftMode();
  const [page, services] = await Promise.all([
    getPage(preview),
    getAllServices({ preview }),
  ]);

  const linkLabel = page?.linkLabel || FALLBACK.linkLabel;

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow ?? FALLBACK.eyebrow}
        title={page?.title || FALLBACK.title}
        intro={page?.intro ?? FALLBACK.intro}
      />

      <section className="py-8 md:py-16">
        <div className="container space-y-6">
          {services.map((s, i) => {
            // Fehlt die Kennziffer im CMS, aus der Position ableiten
            const number = s.number || String(i + 1).padStart(2, "0");

            return (
              <Reveal key={s._id} delay={i * 0.05}>
                <Link
                  href={`/leistungen/${s.slug}`}
                  className="group relative grid overflow-hidden rounded-3xl border border-white/5 bg-ink-800 md:grid-cols-12"
                >
                  <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto">
                    {s.cardImage && (
                      <div
                        className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url(${s.cardImage})` }}
                        {...(s.cardImageAlt
                          ? { role: "img", "aria-label": s.cardImageAlt }
                          : { role: "presentation" })}
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-ink-950/10 md:from-ink-950/10 md:to-ink-800"
                    />
                  </div>

                  <div className="relative flex flex-col justify-between gap-8 p-8 md:col-span-7 md:p-12">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-accent">
                        <span>{number}</span>
                        <span aria-hidden className="h-px w-6 bg-accent/60" />
                        <span className="text-steel-400">Leistung</span>
                      </div>
                      <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-5xl">
                        {s.title}
                      </h2>
                      {s.shortDescription && (
                        <p className="mt-4 max-w-lg text-steel-300">
                          {s.shortDescription}
                        </p>
                      )}
                    </div>

                    {s.bullets && s.bullets.length > 0 && (
                      <ul className="grid grid-cols-1 gap-2 text-sm text-steel-200 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 border-t border-white/5 pt-3"
                          >
                            <span
                              aria-hidden
                              className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white">
                      {linkLabel}
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ContactCTA contactHeading={page?.ctaHeading ?? undefined} />
    </>
  );
}
