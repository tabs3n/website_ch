// ClientMarquee — animated scrolling strip with client names

const FALLBACK_CLIENTS = [
  "RTL",
  "ZDF",
  "FORD",
  "LANXESS",
  "KOELNMESSE",
  "DEUTSCHE TELEKOM",
  "REWE",
  "BAYER",
  "DMEXCO",
  "BURDA",
  "AXEL SPRINGER",
  "VODAFONE",
];

export default function LogosStrip({ clients }: { clients?: string[] | null }) {
  const list = clients?.length ? clients : FALLBACK_CLIENTS;
  const items = [...list, ...list];

  return (
    <section
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "22px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 var(--pad-x)",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
          }}
        />
        <span className="eyebrow">Im Vertrauen führender Marken &amp; Sender</span>
      </div>

      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "mq 48s linear infinite",
          willChange: "transform",
        }}
      >
        {items.map((c, i) => (
          <span
            key={i}
            className="serif"
            style={{
              fontSize: "clamp(32px, 4.4vw, 64px)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              opacity: 0.85,
              marginRight: "64px",
            }}
          >
            {c}
            <span style={{ color: "var(--accent)", margin: "0 28px" }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
