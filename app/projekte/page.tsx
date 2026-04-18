import type { Metadata } from "next";
import { getAllProjects } from "@/lib/getProjects";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Referenzen aus Corporate, Broadcast, Live und Konferenz — realisiert von Cologne Hunters.",
};

export const revalidate = 60;

export default async function ProjekteIndex() {
  const projects = await getAllProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projekte"
        title="Ausgewählte Referenzen."
        intro="Eine Auswahl unserer jüngsten Produktionen — vom Corporate Kick-off bis zum täglichen Broadcast-Studio."
      />

      <section className="py-8 md:py-16">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA heading="Ihr Projekt als nächstes?" />
    </>
  );
}
