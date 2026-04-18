"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const services = [
  {
    slug: "licht",
    title: "Lichttechnik",
    subtitle: "01",
    description:
      "Moving Lights, Konventionell, LED-Paneele, DMX-Netzwerke und kinetische Elemente — gesteuert auf grandMA3.",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "ton",
    title: "Tontechnik",
    subtitle: "02",
    description:
      "Line-Array Systeme, Monitoring auf IEM-Basis, digitale Konsolen und Dante-Netzwerke für Events jeder Größenordnung.",
    image:
      "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "video",
    title: "Videotechnik",
    subtitle: "03",
    description:
      "LED-Walls, 4K-Kameraketten, Bildregie, Live-Streaming und Stage-Design — nahtlos in Broadcast-Qualität.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Leistungen"
            title="Integrierte Veranstaltungstechnik, aus einer Hand."
            intro="Wir planen, liefern und betreiben komplette Technik-Setups. Jede Gewerkelinie spricht miteinander — konzeptionell, technisch, operativ."
          />
          <Reveal delay={0.15}>
            <Link
              href="/leistungen"
              className="group hidden items-center gap-2 text-sm text-steel-200 transition hover:text-white md:inline-flex"
            >
              Alle Leistungen
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/leistungen/${s.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-ink-800"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/10" />
                  <div className="absolute left-5 top-5 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
                    {s.subtitle}
                  </div>
                  <div className="absolute inset-x-5 bottom-5">
                    <div className="font-display text-2xl font-semibold text-white md:text-3xl">
                      {s.title}
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm text-steel-300">
                      {s.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white">
                      Mehr erfahren
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
