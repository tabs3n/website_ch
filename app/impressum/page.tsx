import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Cologne Hunters Licht & Ton Service GmbH.",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum." />

      <section className="py-10 md:py-20">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="space-y-12 text-sm leading-relaxed text-steel-300">

              <Block title="Anbieterkennzeichnung">
                <p className="font-display text-lg font-semibold text-white">
                  Cologne Hunters Licht & Ton Service GmbH
                </p>
                <address className="mt-2 not-italic">
                  Bonner Wall 31<br />
                  50677 Köln<br />
                  Deutschland
                </address>
              </Block>

              <Block title="Kontakt">
                <Row label="Telefon">
                  <a href="tel:+49221279020" className="hover:text-white transition-colors">
                    +49 (0) 221 2790-20
                  </a>
                </Row>
                <Row label="E-Mail">
                  <a href="mailto:kontakt@cologne-hunters.de" className="hover:text-white transition-colors">
                    kontakt@cologne-hunters.de
                  </a>
                </Row>
              </Block>

              <Block title="Vertreten durch">
                <p>
                  Daniel Hentze, Geschäftsführer
                </p>
              </Block>

              <Block title="Handelsregister">
                <Row label="Registergericht">Amtsgericht Köln</Row>
                <Row label="Registernummer">HRB 22475</Row>
              </Block>

              <Block title="Umsatzsteuer-Identifikationsnummer">
                <p>
                  USt-IdNr.: DE153241514<br />
                  (gemäß § 27a Umsatzsteuergesetz)
                </p>
              </Block>

              <Block title="Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)">
                <p>
                  Daniel Hentze<br />
                  Bonner Wall 31<br />
                  50677 Köln
                </p>
              </Block>

              <Block title="Streitschlichtung">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  . Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
                <p className="mt-3">
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </Block>

              <Block title="Haftung für Inhalte">
                <p>
                  Als Diensteanbieter sind wir für eigene Inhalte auf diesen
                  Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind
                  als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p className="mt-3">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </Block>

              <Block title="Haftung für Links">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </Block>

              <Block title="Urheberrecht">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </Block>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-[11px] uppercase tracking-[0.3em] text-accent">
        {title}
      </h2>
      <div className="border-l border-white/10 pl-5">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-32 shrink-0 text-steel-400">{label}</span>
      <span>{children}</span>
    </div>
  );
}
