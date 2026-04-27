import Link from "next/link";
import { draftMode } from "next/headers";
import { getFeaturedProjects } from "@/lib/getProjects";
import Reveal from "@/components/Reveal";
import type { SanityProject } from "@/sanity/lib/types";

function ProjectCard({
  project,
  index,
}: {
  project: SanityProject;
  index: number;
}) {
  return (
    <Reveal delay={(index % 3) * 0.05}>
      <Link
        href={`/projekte/${project.slug}`}
        className="project-preview-card group"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 6,
          border: "1px solid var(--line)",
          background: "#111",
          display: "block",
          minHeight: "100%",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${project.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
            filter: "brightness(.62) saturate(.95)",
          }}
          className="project-preview-image"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,.1) 30%, rgba(10,10,10,.78) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 16,
            left: 18,
            right: 18,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
          }}
          className="mono"
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(242,238,232,.85)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.year} · {project.client}
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(242,238,232,.7)",
              flexShrink: 0,
            }}
          >
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
          <div
            className="serif"
            style={{
              fontSize: "clamp(22px, 2.4vw, 36px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#F2EEE8",
              marginBottom: 10,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(project.services ?? [project.category]).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    border: "1px solid rgba(242,238,232,.25)",
                    borderRadius: 999,
                    color: "rgba(242,238,232,.85)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "rgba(242,238,232,.85)",
                whiteSpace: "nowrap",
              }}
            >
              Case Study →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default async function ProjectsPreview() {
  const { isEnabled: preview } = draftMode();
  const projects = (await getFeaturedProjects({ preview })).slice(0, 5);

  if (projects.length === 0) return null;

  return (
    <section
      id="arbeiten"
      style={{
        padding: "clamp(80px,12vh,160px) var(--pad-x)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "clamp(20px, 4vw, 60px)",
          alignItems: "end",
          borderTop: "1px solid var(--line)",
          paddingTop: 22,
          marginBottom: "clamp(40px, 7vh, 80px)",
        }}
        className="sh-grid2"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}
          >
            II/IV
          </span>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Ausgewählte Arbeiten
          </span>
        </div>
        <div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(40px, 6vw, 96px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            Produktionen,
            <br />
            die <span style={{ fontStyle: "italic" }}>bleiben</span>.
          </h2>
          <p
            style={{
              maxWidth: "52ch",
              color: "var(--ink-dim)",
              marginTop: 20,
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            Ein Auszug aus unseren jüngsten Projekten — Corporate, Broadcast und
            Live-Entertainment.
          </p>
        </div>
        <Link
          href="/projekte"
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-dim)",
            whiteSpace: "nowrap",
            borderBottom: "1px solid var(--line-strong)",
            paddingBottom: 4,
          }}
        >
          Alle Projekte →
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "minmax(260px, 32vh)",
          gap: "var(--gap)",
        }}
        className="proj-grid"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

      <style>{`
        .project-preview-card:hover .project-preview-image { transform: scale(1.05); }
        .proj-grid > *:nth-child(1){grid-column:span 4;grid-row:span 2}
        .proj-grid > *:nth-child(2){grid-column:span 2;grid-row:span 2}
        .proj-grid > *:nth-child(3){grid-column:span 2;grid-row:span 1}
        .proj-grid > *:nth-child(4){grid-column:span 2;grid-row:span 1}
        .proj-grid > *:nth-child(5){grid-column:span 2;grid-row:span 1}
        @media (max-width:1100px){
          .sh-grid2{grid-template-columns:1fr !important}
          .proj-grid{grid-template-columns:repeat(2,1fr) !important;grid-auto-rows: 260px !important}
          .proj-grid > *{grid-column:span 1 !important;grid-row:span 1 !important}
          .proj-grid > *:nth-child(1){grid-column:span 2 !important}
        }
        @media (max-width:640px){
          .proj-grid{grid-template-columns:1fr !important;grid-auto-rows: 260px !important}
          .proj-grid > *:nth-child(1){grid-column:span 1 !important}
        }
      `}</style>
    </section>
  );
}
