"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <circle cx="17" cy="17" r="16" stroke="currentColor" strokeOpacity=".25" />
      <circle cx="17" cy="17" r="4" fill="var(--accent)" />
      <path
        d="M17 1 v7 M17 26 v7 M1 17 h7 M26 17 h7"
        stroke="currentColor"
        strokeOpacity=".6"
      />
    </svg>
  );
}

function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  if (!time) return null;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="mono" style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: "0.1em" }}>
      KÖLN · {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
    </span>
  );
}

const NAV_LINKS = [
  { label: "Arbeiten", href: "/#arbeiten" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Studio", href: "/#studio" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "18px var(--pad-x)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background .35s ease, border-color .35s ease, backdrop-filter .35s ease",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <LogoMark />
        <div style={{ lineHeight: 1.05 }}>
          <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>
            Cologne Hunters
          </div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.12em" }}>
            LICHT · TON · VIDEO
          </div>
        </div>
      </Link>

      {/* Desktop nav */}
      <nav
        className="mono"
        style={{
          display: "flex",
          gap: 28,
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <NavAnchor key={link.href} href={link.href} index={i}>
            {link.label}
          </NavAnchor>
        ))}
      </nav>

      {/* Right: clock + CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Clock />
        <ContactBtn />
      </div>

      <style>{`
        @media (max-width: 900px) {
          header nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function NavAnchor({
  href,
  children,
  index,
}: {
  href: string;
  children: React.ReactNode;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "var(--ink)" : "var(--ink-dim)", transition: "color .2s" }}
    >
      <span style={{ color: "var(--accent)", marginRight: 6, opacity: 0.8 }}>0{index + 1}</span>
      {children}
    </a>
  );
}

function ContactBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#kontakt"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--line-strong)"}`,
        padding: "10px 16px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: hovered ? "var(--accent)" : "transparent",
        color: hovered ? "#0A0A0A" : "var(--ink)",
        transition: "all .25s",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: hovered ? "#0A0A0A" : "var(--accent)",
          boxShadow: hovered ? "none" : "0 0 12px var(--accent)",
        }}
      />
      Projekt anfragen
    </a>
  );
}
