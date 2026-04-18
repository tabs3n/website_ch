import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Licht, Ton, Video, Rigging und Konferenztechnik — integriert aus einer Hand.",
};

const services = [
  {
    slug: "licht",
    number: "01",
    title: "Lichttechnik",
    desc: "Moving Lights, LED-Flächen, kinetische Systeme und DMX-Netzwerke — gesteuert aus einer Hand.",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "grandMA3 & ETC EOS Lichtregie",
      "MDG Hazer & Atmospheric FX",
      "Kinetische Lichtsysteme",
      "Truss- und Rigging-Integration",
    ],
  },
  {
    slug: "ton",
    number: "02",
    title: "Tontechnik",
    desc: "Line-Array-Systeme, Monitoring, digitale Konsolen und Dante-Netzwerke für alle Venue-Größen.",
    image:
      "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "d&b audiotechnik GSL & KSL",
      "DiGiCo SD-Serie · Yamaha RIVAGE",
      "IEM Monitoring · Shure Axient",
      "Dante- & MADI-Netzwerke",
    ],
  },
  {
    slug: "video",
    number: "03",
    title: "Videotechnik",
    desc: "LED-Walls, Broadcast-Kameras, Medienserver und hybrides Streaming in 4K.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "ROE Visual LED-Walls bis 1.2 mm",
      "disguise VX4 · Resolume Arena",
      "Blackmagic URSA · Sony PXW-Kameras",
      "Multi-Feed Live-Streaming",
    ],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Integrierte Technik für Events, Broadcast und Konferenzen."
        intro="Wir verstehen Veranstaltungstechnik als ein zusammenhängendes System — mit einer einzigen Crew, einem gemeinsamen Plan und kompromissloser Ausführungsqualität."
      />

      <section className="py-8 md:py-16">
        <div className="container space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link
                href={`/leistungen/${s.slug}`}
                className="group relative grid overflow-hidden rounded-3xl border border-white/5 bg-ink-800 md:grid-cols-12"
              >
                <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto">
                  <div
                    className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-ink-950/10 md:from-ink-950/10 md:to-ink-800" />
                </div>

                <div className="relative flex flex-col justify-between gap-8 p-8 md:col-span-7 md:p-12">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-accent">
                      <span>{s.number}</span>
                      <span className="h-px w-6 bg-accent/60" />
                      <span className="text-steel-400">Leistung</span>
                    </div>
                    <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-steel-300">{s.desc}</p>
                  </div>

                  <ul className="grid grid-cols-1 gap-2 text-sm text-steel-200 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 border-t border-white/5 pt-3"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white">
                    Details ansehen
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
