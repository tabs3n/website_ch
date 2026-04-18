"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface Discipline {
  num: string;
  abbr: string;
  title: string;
  description: string;
  image?: string | null;
  href?: string | null;
}

export interface ServicesData {
  servicesHeading?: string | null;
  servicesBody?: string | null;
  disciplines?: Discipline[] | null;
}

const FALLBACK_DISCIPLINES: Discipline[] = [
  {
    num: "01",
    abbr: "Licht",
    title: "Lichttechnik",
    description:
      "Moving Lights · Konventionell · LED-Paneele · DMX-Netzwerke · kinetische Elemente. Gesteuert auf grandMA3.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80",
    href: "/leistungen/licht",
  },
  {
    num: "02",
    abbr: "Ton",
    title: "Tontechnik",
    description:
      "Line-Array Systeme · IEM-Monitoring · digitale Konsolen · Dante-Netzwerke. Für Events jeder Größenordnung.",
    image:
      "https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&w=1400&q=80",
    href: "/leistungen/ton",
  },
  {
    num: "03",
    abbr: "Video",
    title: "Videotechnik",
    description:
      "LED-Walls · 4K-Kameraketten · Bildregie · Live-Streaming · Stage-Design. Nahtlos in Broadcast-Qualität.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    href: "/leistungen/video",
  },
];

function SectionHead({
  n,
  tag,
  title,
  body,
  link,
}: {
  n: string;
  tag: string;
  title: React.ReactNode;
  body?: string;
  link?: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: "clamp(20px, 4vw, 60px)",
        alignItems: "end",
        borderTop: "1px solid var(--line)",
        paddingTop: 22,
      }}
      className="sh-grid"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}
        >
          {n}
        </span>
        <span className="eyebrow" style={{ color: "var(--accent)" }}>
          ● {tag}
        </span>
      </div>
      <div>
        <h2
          className="serif reveal"
          style={{
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h2>
        {body && (
          <p
            className="reveal"
            style={{
              maxWidth: "52ch",
              color: "var(--ink-dim)",
              marginTop: 20,
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            {body}
          </p>
        )}
      </div>
      {link && (
        <a
          href="#"
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
          {link} →
        </a>
      )}
      <style>{`@media (max-width:900px){ .sh-grid{grid-template-columns:1fr !important} }`}</style>
    </div>
  );
}

function DisciplineCard({ num, abbr, title, description, image, href }: Discipline) {
  const [hovered, setHovered] = useState(false);
  const imgSrc =
    image ??
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80";

  return (
    <Link
      href={href ?? "/leistungen"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="reveal"
      style={{
        position: "relative",
        display: "block",
        overflow: "hidden",
        border: "1px solid var(--line)",
        borderRadius: 6,
        padding: "22px 22px 26px",
        background: hovered ? "rgba(242,238,232,.03)" : "transparent",
        transition: "background .3s, border-color .3s",
        minHeight: 540,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
        }}
      >
        <span
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)" }}
        >
          —— {num}
        </span>
        <span
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}
        >
          {abbr.toUpperCase()}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          borderRadius: 4,
          marginBottom: 24,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1s cubic-bezier(.2,.7,.2,1)",
            filter: "brightness(.78) saturate(.92)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,.55) 100%)",
          }}
        />
      </div>

      <h3
        className="serif"
        style={{
          fontSize: "clamp(28px, 2.6vw, 40px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginBottom: 14,
        }}
      >
        {title}
      </h3>
      <p style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.55, marginBottom: 22 }}>
        {description}
      </p>

      <div
        className="mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          paddingTop: 16,
          borderTop: "1px solid var(--line)",
          color: hovered ? "var(--accent)" : "var(--ink-dim)",
          transition: "color .3s",
        }}
      >
        <span>Mehr erfahren</span>
        <span
          style={{
            transform: hovered ? "translateX(4px)" : "none",
            transition: "transform .25s",
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

export default function ServicesPreview({
  servicesHeading,
  servicesBody,
  disciplines,
}: ServicesData = {}) {
  const heading = servicesHeading ?? "Drei Gewerke, eine Regie.";
  const body =
    servicesBody ??
    "Wir planen, liefern und betreiben komplette Technik-Setups. Jede Linie spricht miteinander — konzeptionell, technisch, operativ.";
  const discs = disciplines?.length ? disciplines : FALLBACK_DISCIPLINES;

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <section id="leistungen" style={{ padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
      <SectionHead
        n="I/IV"
        tag="Leistungen"
        title={<>{heading}</>}
        body={body}
        link="Alle Leistungen"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0,1fr))",
          gap: "var(--gap)",
          marginTop: "clamp(40px, 7vh, 80px)",
        }}
        className="disc-grid"
      >
        {discs.map((d) => (
          <DisciplineCard
            key={d.num}
            num={d.num}
            abbr={d.abbr}
            title={d.title}
            description={d.description}
            image={d.image}
            href={d.href}
          />
        ))}
      </div>

      <style>{`@media (max-width:900px){ .disc-grid{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}
