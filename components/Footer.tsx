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

export default function Footer({
  companyName,
  footerTagline,
  email,
  phone,
  addressStreet,
  addressCity,
}: {
  companyName?: string | null;
  footerTagline?: string | null;
  email?: string | null;
  phone?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
} = {}) {
  const tagline =
    footerTagline ??
    "Licht und Ton Service GmbH · Veranstaltungstechnik auf Broadcast-Niveau — von der Konzeption bis zur schlüsselfertigen Umsetzung.";
  const resolvedEmail = email ?? "kontakt@cologne-hunters.de";
  const resolvedPhone = phone ?? "+49 221 1234 5678";
  const street = addressStreet ?? "Deutz-Mülheimer Str. 129";
  const city = addressCity ?? "51063 Köln";

  const phoneHref = `tel:${resolvedPhone.replace(/[^+\d]/g, "")}`;

  return (
    <footer
      style={{
        padding: "80px var(--pad-x) 36px",
        borderTop: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 32,
          marginTop: 64,
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
          marginTop: 48,
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
        @media (max-width:900px){ .foot-grid{grid-template-columns:1fr 1fr !important} }
        .footer-link{transition:color .2s;color:var(--ink-dim);}
        .footer-link:hover{color:var(--ink);}
      `}</style>
    </footer>
  );
}
