import Reveal from "./Reveal";

const items = [
  {
    kicker: "Planung",
    title: "Konzeption & Engineering",
    body: "CAD-basierte Planung, Rigging-Statik, Power-Kalkulation und Netzwerk-Design.",
  },
  {
    kicker: "Rigging",
    title: "Traversen & Motorsysteme",
    body: "Zertifizierte Rigger, Chain Hoists bis 2 t, Ground Support und Arena-Systeme.",
  },
  {
    kicker: "Konferenz",
    title: "Dolmetschtechnik & Streaming",
    body: "Personenführungsanlagen, Simultandolmetschen, hybride Konferenzen mit Multi-Feed-Streaming.",
  },
  {
    kicker: "Crew",
    title: "Techniker & Operator",
    body: "Eigene, qualifizierte Crew — von SFX und Pyro bis zu FOH-Engineer und Show-Caller.",
  },
];

export default function CapabilitiesStrip() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-900 py-20 md:py-28">
      <div aria-hidden className="bg-noise absolute inset-0 opacity-60" />
      <div className="container relative">
        <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="flex h-full flex-col">
                <div className="text-[11px] uppercase tracking-[0.28em] text-accent">
                  {item.kicker}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
