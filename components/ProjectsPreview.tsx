"use client";

import { useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    y: "2025",
    c: "Lanxess AG",
    t: "Lanxess Global Kick-off",
    loc: "Köln · Lanxess Arena",
    tags: ["Licht", "Ton", "Video"],
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80",
    slug: "lanxess-global-kickoff",
  },
  {
    y: "2024",
    c: "Ford Motor Company",
    t: "Ford EV Launch Europe",
    loc: "Köln · Messe Halle 11",
    tags: ["Licht", "Video", "Medienserver"],
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    slug: "ford-ev-launch",
  },
  {
    y: "2024",
    c: "RTL Deutschland",
    t: "RTL Primetime Studio",
    loc: "Köln · MMC Studios",
    tags: ["Licht", "Ton", "Broadcast"],
    img: "https://images.unsplash.com/photo-1540304453527-62f979142a17?auto=format&fit=crop&w=1200&q=80",
    slug: "rtl-primetime-studio",
  },
  {
    y: "2024",
    c: "Koelnmesse GmbH",
    t: "DMEXCO Hauptbühne",
    loc: "Köln · Congress-Centrum",
    tags: ["Ton", "Video", "Streaming"],
    img: "https://images.unsplash.com/photo-1561489401-fc2876ced162?auto=format&fit=crop&w=1400&q=80",
    slug: "dmexco-hauptbuehne",
  },
  {
    y: "2023",
    c: "Deutsche Telekom",
    t: "Capital Markets Day",
    loc: "Bonn · WCCB",
    tags: ["Ton", "Video", "Konferenz"],
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    slug: "telekom-capital-markets-day",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/projekte/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="reveal"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        border: "1px solid var(--line)",
        background: "#111",
        display: "block",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.img}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
          filter: "brightness(.62) saturate(.95)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(180deg, rgba(10,10,10,.15) 0%, rgba(10,10,10,.85) 100%)"
            : "linear-gradient(180deg, rgba(10,10,10,.1) 30%, rgba(10,10,10,.7) 100%)",
          transition: "background .4s",
        }}
      />

      {/* top row */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 18,
          right: 18,
          display: "flex",
          justifyContent: "space-between",
        }}
        className="mono"
      >
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(242,238,232,.85)" }}>
          {project.y} · {project.c}
        </span>
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(242,238,232,.7)" }}>
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* bottom content */}
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
          {project.t}
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
            {project.tags.map((tag) => (
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
              color: hovered ? "var(--accent)" : "rgba(242,238,232,.85)",
              transition: "color .25s",
              whiteSpace: "nowrap",
            }}
          >
            Case Study →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPreview() {
  return (
    <section
      id="arbeiten"
      style={{
        padding: "clamp(80px,12vh,160px) var(--pad-x)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Section header */}
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
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}>
            II/IV
          </span>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Ausgewählte Arbeiten
          </span>
        </div>
        <div>
          <h2
            className="serif reveal"
            style={{ fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
          >
            Produktionen,
            <br />
            die <span style={{ fontStyle: "italic" }}>bleiben</span>.
          </h2>
          <p
            className="reveal"
            style={{ maxWidth: "52ch", color: "var(--ink-dim)", marginTop: 20, fontSize: 17, lineHeight: 1.55 }}
          >
            Ein Auszug aus unseren jüngsten Projekten — Corporate, Broadcast und Live-Entertainment.
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
        <style>{`@media (max-width:900px){ .sh-grid2{grid-template-columns:1fr !important} }`}</style>
      </div>

      {/* Bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "minmax(260px, 32vh)",
          gap: "var(--gap)",
        }}
        className="proj-grid"
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <style>{`
        .proj-grid > *:nth-child(1){grid-column:span 4;grid-row:span 2}
        .proj-grid > *:nth-child(2){grid-column:span 2;grid-row:span 2}
        .proj-grid > *:nth-child(3){grid-column:span 2;grid-row:span 1}
        .proj-grid > *:nth-child(4){grid-column:span 2;grid-row:span 1}
        .proj-grid > *:nth-child(5){grid-column:span 2;grid-row:span 1}
        @media (max-width:1100px){
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
