"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const services = ["Licht", "Ton", "Video", "Rigging", "Konferenztechnik", "Streaming"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Client-side submit — in production wire up an API route or 3rd-party form service.
    await new Promise((r) => setTimeout(r, 900));
    try {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setSelected([]);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
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
          {status === "submitting" ? "Sende…" : "Anfrage senden"}
          <span aria-hidden>→</span>
        </button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-white"
          >
            Danke — Ihre Anfrage ist bei uns eingegangen. Wir melden uns
            innerhalb eines Werktages.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-white"
          >
            Beim Senden ist etwas schiefgelaufen. Bitte schreiben Sie uns direkt
            an kontakt@cologne-hunters.de.
          </motion.div>
        )}
      </AnimatePresence>
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
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-steel-400">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
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
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-steel-400">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-steel-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
