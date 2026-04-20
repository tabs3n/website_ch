"use client";

import Image from "next/image";
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
    <span className="mono nav-clock" style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: "0.1em" }}>
      KÖLN · {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
    </span>
  );
}

const NAV_LINKS = [
  { label: "Arbeiten", href: "/#arbeiten" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Referenzen", href: "/projekte" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Navbar({
  logoUrl,
  companyName,
  tagline,
}: {
  logoUrl?: string | null;
  companyName?: string | null;
  tagline?: string | null;
} = {}) {
  const name = companyName ?? "Cologne Hunters";
  const sub = tagline ?? "LICHT · TON · VIDEO";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  // Close menu on escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <>
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
          background: scrolled || menuOpen ? "rgba(10,10,10,0.78)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(14px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(14px) saturate(1.2)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid var(--line)" : "1px solid transparent",
          transition: "background .35s ease, border-color .35s ease, backdrop-filter .35s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={() => setMenuOpen(false)}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={name}
              height={36}
              width={120}
              style={{ height: 36, width: "auto", objectFit: "contain" }}
              priority
            />
          ) : (
            <>
              <LogoMark />
              <div style={{ lineHeight: 1.05 }}>
                <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>
                  {name}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.12em" }}
                >
                  {sub}
                </div>
              </div>
            </>
          )}
        </Link>

        {/* Desktop nav */}
        <nav
          className="mono nav-desktop"
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

        {/* Right: clock + CTA (desktop) */}
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Clock />
          <ContactBtn />
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            width: 44,
            height: 44,
            background: "transparent",
            border: "1px solid var(--line-strong)",
            borderRadius: 999,
            color: "var(--ink)",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color .2s",
          }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
            {menuOpen ? (
              <>
                <line x1="2" y1="2" x2="16" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="2" y1="12" x2="16" y2="2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="1" y1="3" x2="17" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="1" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            top: 72,
            zIndex: 49,
            background: "rgba(10,10,10,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            animation: "fadeIn .2s ease",
          }}
          className="nav-drawer-overlay"
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "40px var(--pad-x) 48px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              maxWidth: 640,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="mono"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  padding: "18px 0",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 20,
                  color: "var(--ink)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: "var(--accent)", fontSize: 12, opacity: 0.8, minWidth: 24 }}>
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}

            <Link
              href="/#kontakt"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 32,
                padding: "16px 24px",
                borderRadius: 999,
                background: "var(--accent)",
                color: "#0A0A0A",
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                alignSelf: "flex-start",
              }}
            >
              Projekt anfragen →
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-right { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (max-width: 1100px) {
          .nav-clock { display: none; }
        }
      `}</style>
    </>
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
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "var(--ink)" : "var(--ink-dim)", transition: "color .2s" }}
    >
      <span style={{ color: "var(--accent)", marginRight: 6, opacity: 0.8 }}>0{index + 1}</span>
      {children}
    </Link>
  );
}

function ContactBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/#kontakt"
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
    </Link>
  );
}
