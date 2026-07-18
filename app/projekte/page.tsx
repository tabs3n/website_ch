import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getAllProjects } from "@/lib/getProjects";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsPageQuery } from "@/sanity/lib/queries";
import type { ProjectsPageData } from "@/sanity/lib/types";
import { buildMetadata, getSettingsForMetadata } from "@/lib/seo";

export const revalidate = 60;

// Texte, solange im CMS noch nichts gepflegt ist
const FALLBACK = {
  eyebrow: "Projekte",
  title: "Ausgewählte Referenzen.",
  intro:
    "Eine Auswahl unserer jüngsten Produktionen — vom Corporate Kick-off bis zum täglichen Broadcast-Studio.",
  emptyState: "Aktuell sind keine Projekte veröffentlicht.",
  ctaHeading: "Ihr Projekt als nächstes?",
  description:
    "Referenzen aus Corporate, Broadcast, Live und Konferenz — realisiert von Cologne Hunters.",
} as const;

async function getPage(preview = false): Promise<ProjectsPageData | null> {
  return sanityFetch<ProjectsPageData | null>(
    projectsPageQuery,
    {},
    { preview, revalidate: 300 }
  ).catch(() => null);
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(), getSettingsForMetadata()]);

  return buildMetadata({
    seo: page?.seo,
    settings,
    fallbackTitle: "Projekte",
    fallbackDescription: FALLBACK.description,
    path: "/projekte",
  });
}

export default async function ProjekteIndex() {
  const { isEnabled: preview } = draftMode();
  const [page, projects] = await Promise.all([
    getPage(preview),
    getAllProjects({ preview }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow ?? FALLBACK.eyebrow}
        title={page?.title || FALLBACK.title}
        intro={page?.intro ?? FALLBACK.intro}
      />

      <section className="py-8 md:py-16">
        <div className="container">
          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-steel-300">
              {page?.emptyStateText || FALLBACK.emptyState}
            </p>
          )}
        </div>
      </section>

      <ContactCTA contactHeading={page?.ctaHeading ?? FALLBACK.ctaHeading} />
    </>
  );
}
