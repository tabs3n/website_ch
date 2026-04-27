"use client";

import Link from "next/link";

type FootItem = { label: string; href: string };

function FootCol({ t, items }: { t: string; items: FootItem[] }) {
  return (
    <div>
      <div
        className="mono"
        style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-mute)", marginBottom: 12 }}
      >
        {t.toUpperCase()}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0, margin: 0 }}>
        {items.map((item) => {
          const isExternal =
            item.href.startsWith("mailto:") ||
            item.href.startsWith("tel:") ||
            item.href.startsWith("http");
          const className = "footer-link";
          return (
            <li key={item.label} style={{ fontSize: 14, color: "var(--ink-dim)" }}>
              {isExternal ? (
                <a href={item.href} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.5-1.5h1.6V3.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8v2.2H7.9V13h2.6v8h3z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-4V9z" />
    </svg>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-social"
    >
      {children}
    </a>
  );
}

export default function Footer({
  companyName,
  footerTagline,
  email,
  phone,
  addressStreet,
  addressCity,
  instagramUrl,
  facebookUrl,
  linkedinUrl,
}: {
  companyName?: string | null;
  footerTagline?: string | null;
  email?: string | null;
  phone?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
} = {}) {
  const tagline =
    footerTagline ??
    "Licht und Ton Service GmbH · Veranstaltungstechnik auf Broadcast-Niveau — von der Konzeption bis zur schlüsselfertigen Umsetzung.";
  const resolvedEmail = email ?? "kontakt@cologne-hunters.de";
  const resolvedPhone = phone ?? "+49 (0) 221 2790-20";
  const street = addressStreet ?? "Bonner Wall 31";
  const city = addressCity ?? "50677 Köln";

  const phoneHref = `tel:${resolvedPhone.replace(/[^+\d]/g, "")}`;
  const hasSocials = instagramUrl || facebookUrl || linkedinUrl;

  return (
    <footer
      style={{
        padding: "clamp(48px, 8vh, 80px) var(--pad-x) 36px",
        borderTop: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "clamp(20px, 3vw, 32px)",
          marginTop: "clamp(24px, 5vh, 64px)",
          paddingTop: 28,
          borderTop: "1px solid var(--line)",
        }}
        className="foot-grid"
      >
        <div>
          <div
            className="mono"
            style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-mute)", marginBottom: 10 }}
          >
            STUDIO
          </div>
          <div style={{ color: "var(--ink-dim)", maxWidth: "40ch", fontSize: 15, lineHeight: 1.55 }}>
            {tagline}
          </div>

          {hasSocials && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
              }}
            >
              {instagramUrl && (
                <SocialLink href={instagramUrl} label="Instagram">
                  <InstagramIcon />
                </SocialLink>
              )}
              {facebookUrl && (
                <SocialLink href={facebookUrl} label="Facebook">
                  <FacebookIcon />
                </SocialLink>
              )}
              {linkedinUrl && (
                <SocialLink href={linkedinUrl} label="LinkedIn">
                  <LinkedinIcon />
                </SocialLink>
              )}
            </div>
          )}
        </div>
        <FootCol
          t="Leistungen"
          items={[
            { label: "Lichttechnik", href: "/leistungen/licht" },
            { label: "Tontechnik", href: "/leistungen/ton" },
            { label: "Videotechnik", href: "/leistungen/video" },
            { label: "Alle Leistungen", href: "/leistungen" },
          ]}
        />
        <FootCol
          t="Studio"
          items={[
            { label: "Arbeiten", href: "/projekte" },
            { label: "Projektkarte", href: "/projektkarte" },
            { label: "Kontakt", href: "/kontakt" },
            { label: "Impressum", href: "/impressum" },
            { label: "Datenschutz", href: "/datenschutz" },
          ]}
        />
        <FootCol
          t="Kontakt"
          items={[
            { label: resolvedEmail, href: `mailto:${resolvedEmail}` },
            { label: resolvedPhone, href: phoneHref },
            { label: street, href: "/kontakt" },
            { label: city, href: "/kontakt" },
          ]}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginTop: "clamp(32px, 6vh, 48px)",
          paddingTop: 20,
          borderTop: "1px solid var(--line)",
        }}
        className="mono"
      >
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}>
          © {new Date().getFullYear()} COLOGNE HUNTERS GMBH
        </span>
        <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}>
          BUILT IN KÖLN
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .foot-grid { grid-template-columns: 1fr 1fr !important; gap: 28px 20px !important; }
        }
        @media (max-width: 560px) {
          .foot-grid { grid-template-columns: 1fr !important; }
        }
        .footer-link { transition: color .2s; color: var(--ink-dim); }
        .footer-link:hover { color: var(--ink); }
        .footer-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          color: var(--ink-dim);
          transition: color .2s, border-color .2s, background .2s;
        }
        .footer-social:hover {
          color: #0A0A0A;
          background: var(--accent);
          border-color: var(--accent);
        }
      `}</style>
    </footer>
  );
}
