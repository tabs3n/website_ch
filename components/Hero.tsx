"use client";

import { useEffect, useState } from "react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=2400&q=80",
];

export interface HeroData {
  heroImage?: string | null;
  heroImages?: string[] | null;
  heroSlideshowEnabled?: boolean | null;
  heroSlideshowInterval?: number | null;
  heroEyebrow?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  heroStats?: Array<{ value: string; label: string }> | null;
}

const DEFAULT_STATS = [
  { value: "20+", label: "Jahre" },
  { value: "800+", label: "Produktionen" },
  { value: "24/7", label: "On-Site Support" },
  { value: "4K", label: "Broadcast-Ready" },
];

const FADE_DURATION = 1500;

function HeroBackground({
  images,
  enabled,
  interval,
}: {
  images: string[];
  enabled: boolean;
  interval: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!enabled || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [enabled, images.length, interval]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {images.map((src, i) => (
        <div
          key={src}
          aria-hidden
          style={{
            position: "absolute",
            inset: "-6%",
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "kenburns 22s ease-in-out infinite alternate",
            filter: "brightness(.55) contrast(1.05) saturate(.9)",
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,10,10,.35) 0%, rgba(10,10,10,.1) 35%, rgba(10,10,10,.35) 65%, var(--bg) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(10,10,10,.6) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.015) 0 1px, transparent 1px 3px)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}

function CTA({
  children,
  href,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "14px 22px",
        borderRadius: 999,
        background: primary
          ? hovered
            ? "var(--ink)"
            : "var(--accent)"
          : hovered
          ? "rgba(242,238,232,.08)"
          : "transparent",
        color: primary ? "#0A0A0A" : "var(--ink)",
        border: primary ? "1px solid var(--accent)" : "1px solid var(--line-strong)",
        transition: "all .25s",
      }}
    >
      {children}
      <span
        style={{
          display: "inline-block",
          transform: hovered ? "translateX(4px)" : "none",
          transition: "transform .25s",
        }}
      >
        →
      </span>
    </a>
  );
}

export default function Hero({
  heroImage,
  heroImages,
  heroSlideshowEnabled,
  heroSlideshowInterval,
  heroEyebrow,
  heroHeadline,
  heroDescription,
  heroStats,
}: HeroData = {}) {
  const images: string[] =
    heroImages && heroImages.length > 0
      ? heroImages
      : heroImage
      ? [heroImage]
      : FALLBACK_IMAGES;

  // null/undefined aus Sanity → Standardwerte
  const slideshowEnabled = heroSlideshowEnabled !== false;
  const slideshowInterval = Math.max(2, (heroSlideshowInterval ?? 6)) * 1000;
  const eyebrow = heroEyebrow !== undefined ? heroEyebrow : "Veranstaltungstechnik · Köln · seit 2003";
  const headline = heroHeadline !== undefined ? heroHeadline : "Licht. Ton. Video auf Broadcast-Niveau.";
  const description =
    heroDescription !== undefined
      ? heroDescription
      : "Integrierte Technik-Setups für Events, Konferenzen und Broadcast-Produktionen — von der ersten CAD-Zeichnung bis zur schlüsselfertigen Show.";
  const stats = heroStats !== undefined ? (heroStats ?? []) : DEFAULT_STATS;

  return (
    <section
      id="top"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", paddingTop: 110 }}
    >
      <HeroBackground images={images} enabled={slideshowEnabled} interval={slideshowInterval} />

      {/* top meta rail */}
      <div
        className="mono"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 var(--pad-x)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>
          REEL · 2024 — 2026
        </span>
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>
          N 50° 56′ · E 6° 58′
        </span>
      </div>

      {/* main headline */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 var(--pad-x)",
          marginTop: "clamp(60px, 14vh, 160px)",
          paddingBottom: stats.length > 0 ? "clamp(100px, 14vh, 140px)" : "clamp(48px, 8vh, 80px)",
        }}
      >
        {eyebrow && (
          <div
            className="eyebrow"
            style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            {eyebrow}
          </div>
        )}

        <h1
          className="serif"
          style={{
            fontSize: "clamp(48px, 10.5vw, 184px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            maxWidth: "14ch",
          }}
        >
          {headline}
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "28px 40px",
            marginTop: "clamp(28px, 5vh, 56px)",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {description && (
            <p
              style={{
                maxWidth: "46ch",
                color: "var(--ink-dim)",
                fontSize: "clamp(15px, 1.1vw, 17px)",
                lineHeight: 1.55,
              }}
            >
              {description}
            </p>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <CTA href="#kontakt" primary>
              Projekt anfragen
            </CTA>
            <CTA href="#arbeiten">Arbeiten ansehen</CTA>
          </div>
        </div>
      </div>

      {/* bottom stat rail — wird ausgeblendet wenn stats in Sanity geleert */}
      {stats.length > 0 && (
      <div
        className="hero-stats"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          borderTop: "1px solid var(--line)",
          padding: "20px var(--pad-x)",
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, minmax(0,1fr))`,
          gap: 24,
          background: "linear-gradient(180deg, transparent, rgba(10,10,10,.55))",
        }}
      >
        {stats.map((s) => (
          <div key={s.value + s.label} style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0 }}>
            <span
              className="serif"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1 }}
            >
              {s.value}
            </span>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-dim)",
                textTransform: "uppercase",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
      )}
      <style>{`
        @media (max-width: 760px) {
          .hero-stats {
            grid-template-columns: repeat(2, minmax(0,1fr)) !important;
            gap: 14px 20px !important;
            padding: 16px var(--pad-x) !important;
          }
        }
      `}</style>
    </section>
  );
}
