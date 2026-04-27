import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Cologne Hunters GmbH gemäß DSGVO.",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutz." />

      <section className="py-10 md:py-20">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="space-y-12 text-sm leading-relaxed text-steel-300">

              <Block title="1. Verantwortlicher">
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <address className="mt-3 not-italic">
                  Cologne Hunters Licht & Ton Service GmbH<br />
                  Bonner Wall 31<br />
                  50677 Köln<br />
                  <br />
                  Telefon:{" "}
                  <a href="tel:+49221279020" className="hover:text-white transition-colors">
                    +49 (0) 221 2790-20
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a href="mailto:kontakt@cologne-hunters.de" className="hover:text-white transition-colors">
                    kontakt@cologne-hunters.de
                  </a>
                </address>
              </Block>

              <Block title="2. Erhebung und Speicherung personenbezogener Daten">
                <p>
                  Beim Besuch unserer Website werden durch den Webserver
                  automatisch folgende Daten erfasst (Server-Logfiles):
                </p>
                <ul className="mt-3 list-disc list-inside space-y-1 text-steel-400">
                  <li>IP-Adresse (anonymisiert)</li>
                  <li>Datum und Uhrzeit der Anfrage</li>
                  <li>Aufgerufene URL</li>
                  <li>Browsertyp und -version</li>
                  <li>Betriebssystem</li>
                  <li>Referrer-URL</li>
                </ul>
                <p className="mt-3">
                  Diese Daten werden ausschließlich zur Sicherstellung des
                  störungsfreien Betriebs und zur Verbesserung unseres Angebots
                  genutzt und nicht mit anderen Datenquellen zusammengeführt.
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                  Interesse).
                </p>
              </Block>

              <Block title="3. Kontaktformular">
                <p>
                  Wenn Sie uns über das Kontaktformular eine Anfrage senden,
                  werden Ihre Angaben (Name, E-Mail-Adresse, Telefonnummer,
                  Nachricht sowie optionale Angaben zu Veranstaltung und
                  Leistungen) zur Bearbeitung Ihrer Anfrage und für eventuelle
                  Anschlussfragen bei uns gespeichert.
                </p>
                <p className="mt-3">
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
                  (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse). Die Daten werden nicht an Dritte
                  weitergegeben, außer zur technischen Übermittlung per E-Mail
                  (Resend Inc., USA — Datenübertragung auf Basis der
                  EU-Standardvertragsklauseln).
                </p>
              </Block>

              <Block title="4. Hosting und Infrastruktur">
                <p>
                  Diese Website wird bei{" "}
                  <strong className="text-white">Vercel Inc.</strong> (USA)
                  gehostet. Vercel verarbeitet Server-Logfiles und ist als
                  Auftragsverarbeiter gemäß Art. 28 DSGVO unter Abschluss eines
                  DPA tätig. Details:{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    vercel.com/legal/privacy-policy
                  </a>
                  .
                </p>
                <p className="mt-3">
                  Inhalte (Projekte, Texte) werden über{" "}
                  <strong className="text-white">Sanity.io</strong> (USA)
                  bereitgestellt. Sanity verarbeitet Inhalte als
                  Auftragsverarbeiter:{" "}
                  <a
                    href="https://www.sanity.io/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    sanity.io/legal/privacy
                  </a>
                  .
                </p>
              </Block>

              <Block title="5. Cookies">
                <p>
                  Diese Website setzt keine Tracking- oder Werbe-Cookies ein.
                  Es werden ausschließlich technisch notwendige Session-Cookies
                  verwendet, die nach dem Schließen des Browsers gelöscht
                  werden. Eine Einwilligung ist nach § 25 Abs. 2 TDDDG nicht
                  erforderlich.
                </p>
              </Block>

              <Block title="6. Ihre Rechte">
                <p>Sie haben gegenüber uns folgende Rechte:</p>
                <ul className="mt-3 list-disc list-inside space-y-1 text-steel-400">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                </ul>
                <p className="mt-3">
                  Zur Ausübung Ihrer Rechte wenden Sie sich an:{" "}
                  <a
                    href="mailto:kontakt@cologne-hunters.de"
                    className="text-accent hover:underline"
                  >
                    kontakt@cologne-hunters.de
                  </a>
                </p>
                <p className="mt-3">
                  Außerdem haben Sie das Recht, sich bei einer
                  Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist die
                  Landesbeauftragte für Datenschutz und Informationsfreiheit
                  Nordrhein-Westfalen (LDI NRW).
                </p>
              </Block>

              <Block title="7. Änderungen dieser Datenschutzerklärung">
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung
                  anzupassen, um sie an geänderte Rechtslagen oder Leistungen
                  anzupassen. Die jeweils aktuelle Version ist auf dieser Seite
                  abrufbar.
                </p>
                <p className="mt-3 text-steel-500">Stand: April 2026</p>
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
