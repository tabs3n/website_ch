import Reveal from "./Reveal";

const clients = [
  "RTL",
  "ZDF",
  "Ford",
  "Lanxess",
  "Koelnmesse",
  "Deutsche Telekom",
  "REWE",
  "Bayer",
];

export default function LogosStrip() {
  return (
    <section className="border-y border-white/5 bg-ink-900/60 py-12">
      <div className="container">
        <Reveal>
          <div className="mb-8 text-center text-[11px] uppercase tracking-[0.3em] text-steel-400">
            Im Vertrauen führender Marken & Sender
          </div>
        </Reveal>
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-8">
          {clients.map((c, i) => (
            <Reveal key={c} delay={i * 0.04}>
              <div className="text-center font-display text-lg font-medium tracking-wide text-steel-300/80">
                {c}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
