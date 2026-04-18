import Link from "next/link";
import Reveal from "./Reveal";

type Props = {
  heading?: string;
  intro?: string;
};

export default function ContactCTA({
  heading = "Lassen Sie uns Ihr nächstes Event realisieren.",
  intro = "Von der ersten technischen Konzeption bis zur finalen Show — sprechen Sie direkt mit unserem Projektteam.",
}: Props) {
  return (
    <section className="relative py-28 md:py-40">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[120px]"
            />
            <div
              aria-hidden
              className="bg-grid absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
            />
            <div className="relative grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-7">
                <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  Projektanfrage
                </div>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tightest text-white md:text-5xl">
                  <span className="text-balance">{heading}</span>
                </h2>
                <p className="mt-5 max-w-xl text-steel-300 md:text-lg">
                  {intro}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition hover:bg-accent-hover"
                  >
                    Projekt anfragen
                    <span aria-hidden>→</span>
                  </Link>
                  <a
                    href="mailto:kontakt@cologne-hunters.de"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    kontakt@cologne-hunters.de
                  </a>
                </div>
              </div>
              <div className="md:col-span-5">
                <dl className="grid gap-6 border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.24em] text-steel-400">
                      Projektbüro Köln
                    </dt>
                    <dd className="mt-2 text-sm text-steel-200">
                      Deutz-Mülheimer Straße 129
                      <br />
                      51063 Köln
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.24em] text-steel-400">
                      Telefon
                    </dt>
                    <dd className="mt-2 text-sm text-steel-200">
                      <a href="tel:+4922112345678" className="hover:text-white">
                        +49 221 1234 5678
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.24em] text-steel-400">
                      Erreichbarkeit
                    </dt>
                    <dd className="mt-2 text-sm text-steel-200">
                      Mo–Fr 08:00–18:00 · 24/7 Show-Support
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
