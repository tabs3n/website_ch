"use client";

import { useRef, useState, type FormEvent } from "react";

const SERVICES = ["Licht", "Ton", "Video", "Konferenz", "Rigging", "Stage-Design"];

type Status = "idle" | "submitting" | "success" | "error";

export interface ContactData {
  contactHeading?: string | null;
  contactResponseTime?: string | null;
  email?: string | null;
  phone?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  businessHours?: string[] | null;
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  full,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  full?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const id = `cta-${name}`;

  const sharedStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "var(--accent)" : "var(--line-strong)"}`,
    color: "var(--ink)",
    fontFamily: "inherit",
    fontSize: 16,
    padding: "10px 0",
    outline: "none",
    transition: "border-color .2s",
  } as const;

  return (
    <label
      htmlFor={id}
      style={{ gridColumn: full ? "1 / -1" : "auto", display: "block", position: "relative" }}
    >
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: focused ? "var(--accent)" : "var(--ink-mute)",
          marginBottom: 8,
          transition: "color .2s",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--accent)" }}> *</span>}
      </div>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, resize: "vertical" }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}

function ChipsField({ label, name, full }: { label: string; name: string; full?: boolean }) {
  const [active, setActive] = useState<string[]>([]);

  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {SERVICES.map((c) => {
          const on = active.includes(c);
          return (
            <button
              type="button"
              key={c}
              onClick={() =>
                setActive((a) => (on ? a.filter((x) => x !== c) : [...a, c]))
              }
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 12px",
                borderRadius: 999,
                border: `1px solid ${on ? "var(--accent)" : "var(--line-strong)"}`,
                background: on ? "var(--accent)" : "transparent",
                color: on ? "#0A0A0A" : "var(--ink)",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={active.join(", ")} />
    </div>
  );
}

function InfoBlock({ label, lines }: { label: string; lines: React.ReactNode[] }) {
  return (
    <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)" }}>
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink)" }}>
          {l}
        </div>
      ))}
    </div>
  );
}

function SubmitBtn({ status }: { status: Status }) {
  const [hovered, setHovered] = useState(false);
  const disabled = status === "submitting";
  return (
    <button
      type="submit"
      disabled={disabled}
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
        background: hovered && !disabled ? "var(--ink)" : "var(--accent)",
        color: "#0A0A0A",
        border: "1px solid var(--accent)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all .25s",
      }}
    >
      {status === "submitting" ? "Sende…" : "Anfrage senden"}
      <span
        style={{
          transform: hovered && !disabled ? "translateX(4px)" : "none",
          transition: "transform .25s",
        }}
      >
        →
      </span>
    </button>
  );
}

export default function ContactCTA({
  contactHeading,
  contactResponseTime,
  email,
  phone,
  addressStreet,
  addressCity,
  businessHours,
}: ContactData = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const heading = contactHeading !== undefined
    ? contactHeading
    : "Lassen Sie uns Ihr nächstes Event realisieren.";
  const responseTime = contactResponseTime !== undefined
    ? contactResponseTime
    : "Antwort innerhalb von 24 h werktags";
  const resolvedEmail = email ?? "kontakt@cologne-hunters.de";
  const resolvedPhone = phone ?? "+49 (0) 221 2790-20";
  const street = addressStreet ?? "Bonner Wall 31";
  const city = addressCity ?? "50677 Köln";
  const hours = businessHours?.length
    ? businessHours
    : ["Mo–Fr · 08:00–18:00", "Kurzfristige Produktionen nach Absprache"];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setErrorMessage(
          typeof payload?.error === "string"
            ? payload.error
            : "Beim Senden ist etwas schiefgelaufen."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error("[ContactCTA] network error", err);
      setErrorMessage("Netzwerkfehler — bitte erneut versuchen.");
      setStatus("error");
    }
  }

  return (
    <section
      id="kontakt"
      style={{
        padding: "clamp(80px,12vh,160px) var(--pad-x)",
        borderTop: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "clamp(20px, 4vw, 60px)",
          alignItems: "end",
          borderTop: "1px solid var(--line)",
          paddingTop: 22,
          marginBottom: "clamp(48px, 8vh, 100px)",
        }}
        className="ctc-head"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}
          >
            IV/IV
          </span>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            ● Projektanfrage
          </span>
        </div>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
          }}
        >
          {heading}
        </h2>
        <style>{`@media (max-width:900px){ .ctc-head{grid-template-columns:1fr !important} }`}</style>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "clamp(28px, 5vw, 80px)",
          alignItems: "start",
        }}
        className="ctc-grid"
      >
        {status === "success" ? (
          <div
            style={{
              padding: "40px",
              border: "1px solid var(--accent)",
              borderRadius: 8,
              background: "rgba(232, 181, 74, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: 32,
                color: "var(--accent)",
                marginBottom: 16,
              }}
            >
              ✓
            </div>
            <h3
              className="serif"
              style={{
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 12,
                color: "var(--ink)",
              }}
            >
              Anfrage eingegangen.
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-mute)", marginBottom: 20 }}>
              Vielen Dank — wir melden uns in der Regel innerhalb eines Werktages bei Ihnen.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
                background: "transparent",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Weitere Anfrage senden
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            {/* Honeypot — display:none blocks browser autofill while still submitting via FormData */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label>
                Nicht ausfüllen
                <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" defaultValue="" />
              </label>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
              className="ctc-fields"
            >
              <Field label="Name" name="name" required />
              <Field label="Unternehmen" name="company" />
              <Field label="E-Mail" name="email" type="email" required />
              <Field label="Telefon" name="phone" type="tel" />
              <Field label="Eventdatum (optional)" name="date" full />
              <ChipsField label="Gewerke" name="services" full />
              <Field label="Kurzbeschreibung" name="message" full textarea required />
            </div>

            {status === "error" && (
              <div
                role="alert"
                style={{
                  marginTop: 20,
                  padding: "14px 18px",
                  borderRadius: 6,
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  background: "rgba(239, 68, 68, 0.08)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--ink)",
                }}
              >
                {errorMessage ?? "Beim Senden ist etwas schiefgelaufen."}
                {" "}Bitte schreiben Sie uns direkt an{" "}
                <a href={`mailto:${resolvedEmail}`} style={{ color: "var(--accent)" }}>
                  {resolvedEmail}
                </a>
                .
              </div>
            )}

            <div
              style={{
                marginTop: 28,
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <SubmitBtn status={status} />
              <span
                className="mono"
                style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--ink-mute)" }}
              >
                {responseTime}
              </span>
            </div>
          </form>
        )}

        <aside style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <InfoBlock label="Projektbüro Köln" lines={[street, city]} />
          <InfoBlock
            label="Telefon"
            lines={[
              <a key="t" href={`tel:${resolvedPhone.replace(/\s/g, "")}`}>
                {resolvedPhone}
              </a>,
            ]}
          />
          <InfoBlock
            label="E-Mail"
            lines={[
              <a key="e" href={`mailto:${resolvedEmail}`}>
                {resolvedEmail}
              </a>,
            ]}
          />
          <InfoBlock label="Erreichbarkeit" lines={hours} />
        </aside>
      </div>

      <style>{`@media (max-width:900px){ .ctc-grid, .ctc-fields{grid-template-columns:1fr !important} }`}</style>
    </section>
  );
}
