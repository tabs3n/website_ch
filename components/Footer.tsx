"use client";

function FootCol({ t, items }: { t: string; items: string[] }) {
  return (
    <div>
      <div
        className="mono"
        style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-mute)", marginBottom: 12 }}
      >
        {t.toUpperCase()}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <li key={item} style={{ fontSize: 14, color: "var(--ink-dim)" }}>
            <a
              href="#"
              style={{ transition: "color .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
            >
              {item}
            </a>
          </li>
        ))}
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
  const company = companyName ?? "Cologne Hunters";
  const tagline =
    footerTagline ??
    "Licht und Ton Service GmbH · Veranstaltungstechnik auf Broadcast-Niveau — von der Konzeption bis zur schlüsselfertigen Umsetzung.";
  const resolvedEmail = email ?? "kontakt@cologne-hunters.de";
  const resolvedPhone = phone ?? "+49 221 1234 5678";
  const street = addressStreet ?? "Deutz-Mülheimer Str. 129";
  const city = addressCity ?? "51063 Köln";

  return (
    <footer
      style={{
        padding: "80px var(--pad-x) 36px",
        borderTop: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Footer links */}
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
          items={["Lichttechnik", "Tontechnik", "Videotechnik", "Rigging", "Konferenz"]}
        />
        <FootCol
          t="Studio"
          items={["Arbeiten", "Kunden", "Karriere", "Impressum", "Datenschutz"]}
        />
        <FootCol t="Kontakt" items={[resolvedEmail, resolvedPhone, street, city]} />
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

      <style>{`@media (max-width:900px){ .foot-grid{grid-template-columns:1fr 1fr !important} }`}</style>
    </footer>
  );
}
