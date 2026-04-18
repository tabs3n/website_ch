"use client";

import Link from "next/link";

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
            <a href="#" style={{ transition: "color .2s" }}
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

export default function Footer() {
  return (
    <footer
      id="studio"
      style={{
        padding: "80px var(--pad-x) 36px",
        borderTop: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Studio / process section */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          paddingTop: 22,
          marginBottom: "clamp(40px, 7vh, 80px)",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "clamp(20px, 4vw, 60px)",
          alignItems: "end",
        }}
        className="studio-head"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}>
            III/IV
          </span>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Studio
          </span>
        </div>
        <div>
          <h2
            className="serif"
            style={{ fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
          >
            Ein Team.
            <br />
            Ein <span style={{ fontStyle: "italic" }}>Signal-Weg</span>.
          </h2>
          <p style={{ maxWidth: "52ch", color: "var(--ink-dim)", marginTop: 20, fontSize: 17, lineHeight: 1.55 }}>
            Unsere Techniker, Operator und Projektleiter arbeiten seit Jahren zusammen. Keine
            Subunternehmer-Kette, keine Übergabe-Verluste.
          </p>
        </div>
        <style>{`@media (max-width:900px){ .studio-head{grid-template-columns:1fr !important} }`}</style>
      </div>

      {/* 4-step process */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--gap)",
          marginBottom: "clamp(80px,12vh,160px)",
        }}
        className="studio-grid"
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            border: "1px solid var(--line)",
            aspectRatio: "4/5",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1400&q=80"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(.72) saturate(.9)",
            }}
          />
          <div
            className="mono"
            style={{
              position: "absolute",
              top: 18,
              left: 20,
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(242,238,232,.85)",
            }}
          >
            KÖLN · LAGER 01
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap)" }}>
          {[
            ["01", "Brief", "Anforderungen, Gewerke, Budget, Termine."],
            ["02", "Engineering", "CAD · Statik · Power · Netzwerk."],
            ["03", "Proben", "Technische Proben und Show-Programmierung."],
            ["04", "Showtime", "FOH · Operator · Crew · Backup on-site."],
          ].map(([n, t, d]) => (
            <div
              key={n}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 24,
                padding: "24px 26px",
                border: "1px solid var(--line)",
                borderRadius: 6,
                background: "rgba(242,238,232,.02)",
              }}
            >
              <span className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--accent)" }}>
                —— {n}
              </span>
              <div>
                <div
                  className="serif"
                  style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 8 }}
                >
                  {t}
                </div>
                <div style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.55 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width:900px){ .studio-grid{grid-template-columns:1fr !important} }`}</style>

      {/* Oversized wordmark */}
      <div
        className="serif"
        style={{
          fontSize: "clamp(56px, 16vw, 260px)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          opacity: 0.94,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        Cologne <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Hunters</span>.
      </div>

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
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-mute)", marginBottom: 10 }}>
            STUDIO
          </div>
          <div style={{ color: "var(--ink-dim)", maxWidth: "40ch", fontSize: 15, lineHeight: 1.55 }}>
            Licht und Ton Service GmbH · Veranstaltungstechnik auf Broadcast-Niveau — von der
            Konzeption bis zur schlüsselfertigen Umsetzung.
          </div>
        </div>
        <FootCol t="Leistungen" items={["Lichttechnik", "Tontechnik", "Videotechnik", "Rigging", "Konferenz"]} />
        <FootCol t="Studio" items={["Arbeiten", "Kunden", "Karriere", "Impressum", "Datenschutz"]} />
        <FootCol t="Kontakt" items={["kontakt@cologne-hunters.de", "+49 221 1234 5678", "Deutz-Mülheimer Str. 129", "51063 Köln"]} />
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
