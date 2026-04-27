import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sprechen Sie direkt mit unserem Projektteam — für Events, Broadcast, Konferenzen und Live-Produktionen.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Sprechen Sie direkt mit unserem Projektteam."
        intro="Wir beantworten Anfragen in der Regel innerhalb eines Werktages. Für kurzfristige Produktionen erreichen Sie uns direkt im Projektbüro."
      />

      <section className="py-10 md:py-20">
        <div className="container grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-800 p-8">
                <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  Projektbüro Köln
                </div>
                <div className="mt-4 font-display text-xl text-white">
                  Cologne Hunters Licht & Ton Service GmbH
                </div>
                <address className="mt-2 not-italic text-sm leading-relaxed text-steel-300">
                  Bonner Wall 31
                  <br />
                  50677 Köln
                </address>

                <dl className="mt-8 space-y-5 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.24em] text-steel-400">
                      Telefon
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="tel:+49221279020"
                        className="text-white hover:text-accent"
                      >
                        +49 (0) 221 2790-20
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.24em] text-steel-400">
                      E-Mail
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:kontakt@cologne-hunters.de"
                        className="text-white hover:text-accent"
                      >
                        kontakt@cologne-hunters.de
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.24em] text-steel-400">
                      Projekttelefon
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="tel:+49221279020"
                        className="text-white hover:text-accent"
                      >
                        +49 (0) 221 2790-20
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 rounded-2xl border border-white/10 bg-ink-900 p-8 text-sm text-steel-300">
                <div className="text-[11px] uppercase tracking-[0.28em] text-steel-400">
                  Öffnungszeiten
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Mo–Fr</span>
                    <span className="text-white">08:00 – 18:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sa</span>
                    <span className="text-white">nach Absprache</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show-Support</span>
                    <span className="text-accent">24/7</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-800 p-8 md:p-10">
                <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  Projektanfrage
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
                  Erzählen Sie uns von Ihrem Projekt.
                </h2>
                <p className="mt-3 max-w-lg text-sm text-steel-300">
                  Je mehr wir über Anlass, Location und Umfang wissen, desto
                  präziser können wir Ihnen ein erstes Konzept zurückspielen.
                </p>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
