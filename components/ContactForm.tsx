"use client";

import { useRef, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const services = ["Licht", "Ton", "Video", "Rigging", "Konferenztechnik", "Streaming"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

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
        setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
        return;
      }

      setStatus("success");
      setSelected([]);
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      console.error("[ContactForm] network error", err);
      setErrorMessage("Netzwerkfehler — bitte erneut versuchen.");
      setStatus("error");
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={feedbackRef}
        className="rounded-2xl border border-accent/30 bg-ink-800 p-8 md:p-12"
      >
        <div className="flex items-start gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-2xl text-accent">
            ✓
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Anfrage eingegangen.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              Vielen Dank — wir haben Ihre Anfrage erhalten und melden uns in der Regel{" "}
              <strong className="text-white">innerhalb eines Werktages</strong> bei Ihnen.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.22em] text-steel-400">
              <span className="flex items-center gap-2">
                <span className="h-px w-4 bg-accent/60" />
                Mo–Fr · 08:00–18:00
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-4 bg-accent/60" />
                Kurzfristige Produktionen nach Absprache
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs text-steel-400 underline decoration-steel-400/40 underline-offset-2 transition hover:text-white"
            >
              Weitere Anfrage senden
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* Honeypot — display:none blocks browser autofill while still submitting via FormData */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label>
          Nicht ausfüllen
          <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Unternehmen" name="company" />
        <Field label="E-Mail" name="email" type="email" required />
        <Field label="Telefon" name="phone" type="tel" />
      </div>

      <div>
        <label className="mb-3 block text-[11px] uppercase tracking-[0.24em] text-steel-400">
          Gewünschte Leistungen
        </label>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const active = selected.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-white/15 bg-white/[0.03] text-steel-200 hover:border-white/30 hover:text-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="services" value={selected.join(", ")} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Veranstaltungsdatum" name="date" type="date" />
        <Field label="Veranstaltungsort" name="location" />
      </div>

      <Textarea
        label="Projektbeschreibung"
        name="message"
        placeholder="Bitte beschreiben Sie kurz Anlass, Umfang und Rahmen Ihrer Veranstaltung."
        rows={5}
        required
      />

      {status === "error" && (
        <div
          ref={feedbackRef}
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-white"
        >
          {errorMessage ?? "Beim Senden ist etwas schiefgelaufen."}{" "}
          Bitte schreiben Sie uns direkt an{" "}
          <a
            href="mailto:kontakt@cologne-hunters.de"
            className="underline decoration-accent/60 underline-offset-2 hover:text-accent"
          >
            kontakt@cologne-hunters.de
          </a>
          .
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="max-w-md text-xs text-steel-400">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur
          Bearbeitung Ihrer Anfrage zu.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                aria-hidden
              />
              Sende…
            </>
          ) : (
            <>
              Anfrage senden
              <span aria-hidden>→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const { label, name, type = "text", required } = props;
  const id = `contact-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-steel-400">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-steel-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}

function Textarea(props: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}) {
  const { label, name, rows = 4, placeholder, required } = props;
  const id = `contact-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-steel-400">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-steel-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
