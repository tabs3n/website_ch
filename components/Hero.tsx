"use client";

import { useState } from "react";
import Link from "next/link";

function HeroVideo() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: "-6%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "kenburns 22s ease-in-out infinite alternate",
          filter: "brightness(.55) contrast(1.05) saturate(.9)",
        }}
      />
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
      {/* scan line overlay */}
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

function CTA({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#kontakt"
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

export default function Hero() {
  return (
    <section
      id="top"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", paddingTop: 110 }}
    >
      <HeroVideo />

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
        }}
      >
        <div
          className="eyebrow"
          style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ width: 28, height: 1, background: "var(--accent)", display: "inline-block" }} />
          Veranstaltungstechnik · Köln · seit 2003
        </div>

        <h1
          className="serif"
          style={{
            fontSize: "clamp(48px, 10.5vw, 184px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            maxWidth: "14ch",
          }}
        >
          Licht. Ton.
          <br />
          Video auf
          <br />
          <span style={{ fontStyle: "italic", color: "var(--ink)" }}>Broadcast</span>—Niveau.
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
          <p
            style={{
              maxWidth: "46ch",
              color: "var(--ink-dim)",
              fontSize: "clamp(15px, 1.1vw, 17px)",
              lineHeight: 1.55,
            }}
          >
            Integrierte Technik-Setups für Events, Konferenzen und Broadcast-Produktionen — von der
            ersten CAD-Zeichnung bis zur schlüsselfertigen Show.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <CTA primary>Projekt anfragen</CTA>
            <CTA>Arbeiten ansehen</CTA>
          </div>
        </div>
      </div>

      {/* bottom stat rail */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          borderTop: "1px solid var(--line)",
          padding: "20px var(--pad-x)",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          gap: 24,
          background: "linear-gradient(180deg, transparent, rgba(10,10,10,.55))",
        }}
      >
        {[
          ["20+", "Jahre"],
          ["800+", "Produktionen"],
          ["24/7", "On-Site Support"],
          ["4K", "Broadcast-Ready"],
        ].map(([num, label]) => (
          <div key={num} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span
              className="serif"
              style={{ fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1 }}
            >
              {num}
            </span>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-dim)",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
