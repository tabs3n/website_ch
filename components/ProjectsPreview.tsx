import Link from "next/link";
import { getFeaturedProjects } from "@/lib/getProjects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default async function ProjectsPreview() {
  const projects = await getFeaturedProjects();

  return (
    <section className="relative py-28 md:py-40">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Referenzen"
            title="Ausgewählte Produktionen."
            intro="Ein Auszug aus unseren jüngsten Projekten im Bereich Corporate, Broadcast und Live-Entertainment."
          />
          <Reveal delay={0.15}>
            <Link
              href="/projekte"
              className="group inline-flex items-center gap-2 text-sm text-steel-200 transition hover:text-white"
            >
              Alle Projekte
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
