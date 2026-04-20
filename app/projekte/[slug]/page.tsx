import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/getProjects";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

type Params = { slug: string };

export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const [project, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client.fetch as any)(siteSettingsQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
  ]);
  if (!project) return { title: "Projekt" };

  const siteUrl: string = settings?.siteUrl ?? "https://cologne-hunters.de";
  const companyName: string = settings?.companyName ?? "Cologne Hunters";
  const ogImage: string | null = project.hero ?? null;
  const pageUrl = `${siteUrl}/projekte/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${project.title} · ${companyName}`,
      description: project.summary ?? undefined,
      type: "article",
      locale: "de_DE",
      url: pageUrl,
      siteName: companyName,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · ${companyName}`,
      description: project.summary ?? undefined,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ProjektPage({ params }: { params: Params }) {
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getAllProjects(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client.fetch as any)(siteSettingsQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
  ]);

  if (!project) notFound();

  const idx = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(idx + 1) % allProjects.length];

  const siteUrl: string = settings?.siteUrl ?? "https://cologne-hunters.de";
  const companyName: string = settings?.companyName ?? "Cologne Hunters";
  const pageUrl = `${siteUrl}/projekte/${project.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Referenzen", item: `${siteUrl}/projekte` },
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
    ],
  };

  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: pageUrl,
    dateCreated: project.publishedAt ?? String(project.year),
    creator: {
      "@type": "Organization",
      name: companyName,
      url: siteUrl,
    },
    ...(project.hero ? { image: project.hero } : {}),
    ...(project.location ? { locationCreated: { "@type": "Place", name: project.location } } : {}),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={creativeWorkLd} />
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-48">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.hero})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/50 via-ink-950/80 to-ink-950"
        />

        <div className="container">
          <Reveal>
            <Link
              href="/projekte"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-steel-400 transition hover:text-white"
            >
              <span aria-hidden>←</span> Projekte
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-accent">
              <span>{project.year}</span>
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-steel-400">{project.category}</span>
              {project.location && (
                <>
                  <span className="h-px w-8 bg-accent/60" />
                  <span className="text-steel-400">{project.location}</span>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white md:text-6xl lg:text-7xl">
              <span className="text-balance">{project.title}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg text-steel-300">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-2">
              {(project.services ?? []).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-steel-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Meta row */}
      <section className="border-y border-white/5 bg-ink-900/60 py-10">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Kunde", value: project.client },
            { label: "Jahr", value: String(project.year) },
            { label: "Kategorie", value: project.category },
            { label: "Ort", value: project.location ?? "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-[10px] uppercase tracking-[0.28em] text-steel-400">
                {label}
              </div>
              <div className="mt-2 font-display text-lg text-white">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Description + stats */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-16 md:grid-cols-12">
          <div className="space-y-5 text-steel-300 md:col-span-7">
            {(project.description ?? [project.summary]).map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="leading-relaxed md:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          {project.stats && project.stats.length > 0 && (
            <aside className="md:col-span-5 md:border-l md:border-white/10 md:pl-10">
              <Reveal>
                <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-accent">
                  Kennzahlen
                </div>
              </Reveal>
              <dl className="grid grid-cols-2 gap-6">
                {project.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.05}>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.24em] text-steel-400">
                        {s.label}
                      </dt>
                      <dd className="mt-2 font-display text-3xl font-semibold text-white md:text-4xl">
                        {s.value}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {project.gallery.map((src, i) => (
                <Reveal key={src + i} delay={i * 0.05}>
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/5 ${
                      i === 0
                        ? "col-span-2 row-span-2 aspect-[4/3]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <div
                      role="img"
                      aria-label={`${project.title} – Galeriebild ${i + 1} von ${project.gallery.length}`}
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      {nextProject && nextProject.slug !== project.slug && (
        <section className="py-20">
          <div className="container">
            <Reveal>
              <Link
                href={`/projekte/${nextProject.slug}`}
                className="group relative grid overflow-hidden rounded-2xl border border-white/10 bg-ink-800 md:grid-cols-2"
              >
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${nextProject.hero})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 to-ink-800/60" />
                </div>
                <div className="flex flex-col justify-center gap-4 p-10 md:p-14">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-steel-400">
                    Nächstes Projekt
                  </div>
                  <div className="font-display text-3xl font-semibold text-white md:text-5xl">
                    {nextProject.title}
                  </div>
                  <div className="text-steel-300">{nextProject.client}</div>
                  <div className="mt-2 inline-flex items-center gap-2 text-sm text-white">
                    Projekt ansehen
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
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
