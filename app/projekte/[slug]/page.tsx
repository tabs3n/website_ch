import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Projekt" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjektPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <>
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
              {project.services.map((s) => (
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
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-steel-400">
              Kunde
            </div>
            <div className="mt-2 font-display text-lg text-white">
              {project.client}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-steel-400">
              Jahr
            </div>
            <div className="mt-2 font-display text-lg text-white">
              {project.year}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-steel-400">
              Kategorie
            </div>
            <div className="mt-2 font-display text-lg text-white">
              {project.category}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-steel-400">
              Ort
            </div>
            <div className="mt-2 font-display text-lg text-white">
              {project.location ?? "—"}
            </div>
          </div>
        </div>
      </section>

      {/* Description + stats */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7 space-y-5 text-steel-300">
            {project.description.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="leading-relaxed md:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          {project.stats && (
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
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="py-20">
        <div className="container">
          <Reveal>
            <Link
              href={`/projekte/${nextProject.slug}`}
              className="group relative grid overflow-hidden rounded-2xl border border-white/10 bg-ink-800 md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto">
                <div
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

      <ContactCTA />
    </>
  );
}
