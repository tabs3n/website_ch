import PageHeader from "./PageHeader";
import Reveal from "./Reveal";
import RichText from "./RichText";
import { telHref } from "@/lib/phone";
import type { LegalPageData, SanitySettings } from "@/sanity/lib/types";

/**
 * Darstellung einer Rechtstext-Seite (Impressum, Datenschutz).
 *
 * Die Pflichtangaben oben werden aus den Website-Einstellungen erzeugt, nicht
 * aus dem Seitentext — so steht die Anschrift nur an einer Stelle im CMS.
 */
export default function LegalPageView({
  page,
  settings,
}: {
  page: LegalPageData;
  settings: SanitySettings;
}) {
  const sections = page.sections ?? [];

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow ?? undefined}
        title={page.title ?? "Rechtliches."}
      />

      <section className="py-10 md:py-20">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="space-y-12 text-sm leading-relaxed text-steel-300">
              {page.showCompanyDetails && <CompanyDetails settings={settings} />}

              {sections.map((section, i) => (
                <Block key={section.heading ?? i} title={section.heading}>
                  <RichText value={section.body} />
                </Block>
              ))}

              {page.lastUpdated && (
                <p className="text-steel-500">
                  Stand: {formatDate(page.lastUpdated)}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Pflichtangaben nach § 5 DDG aus den Website-Einstellungen. */
function CompanyDetails({ settings }: { settings: SanitySettings }) {
  const {
    legalName,
    companyName,
    addressStreet,
    addressCity,
    addressCountry,
    phone,
    email,
    managingDirector,
    registerCourt,
    registerNumber,
    vatId,
    contentResponsible,
  } = settings;

  const name = legalName || companyName;
  const hasRegister = registerCourt || registerNumber;

  return (
    <>
      {(name || addressStreet || addressCity) && (
        <Block title="Anbieterkennzeichnung">
          {name && (
            <p className="font-display text-lg font-semibold text-white">{name}</p>
          )}
          {(addressStreet || addressCity) && (
            <address className="mt-2 not-italic">
              {addressStreet && (
                <>
                  {addressStreet}
                  <br />
                </>
              )}
              {addressCity && (
                <>
                  {addressCity}
                  <br />
                </>
              )}
              {addressCountry}
            </address>
          )}
        </Block>
      )}

      {(phone || email) && (
        <Block title="Kontakt">
          {phone && (
            <Row label="Telefon">
              <a href={telHref(phone)} className="transition-colors hover:text-white">
                {phone}
              </a>
            </Row>
          )}
          {email && (
            <Row label="E-Mail">
              <a
                href={`mailto:${email}`}
                className="transition-colors hover:text-white"
              >
                {email}
              </a>
            </Row>
          )}
        </Block>
      )}

      {managingDirector && (
        <Block title="Vertreten durch">
          <p>{managingDirector}</p>
        </Block>
      )}

      {hasRegister && (
        <Block title="Handelsregister">
          {registerCourt && <Row label="Registergericht">{registerCourt}</Row>}
          {registerNumber && <Row label="Registernummer">{registerNumber}</Row>}
        </Block>
      )}

      {vatId && (
        <Block title="Umsatzsteuer-Identifikationsnummer">
          <p>
            USt-IdNr.: {vatId}
            <br />
            (gemäß § 27a Umsatzsteuergesetz)
          </p>
        </Block>
      )}

      {contentResponsible && (
        <Block title="Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)">
          <p className="whitespace-pre-line">{contentResponsible}</p>
        </Block>
      )}
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

/** "2026-04-01" → "April 2026" */
function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}
