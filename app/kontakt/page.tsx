import type { Metadata } from "next";
import { draftMode } from "next/headers";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { sanityFetch } from "@/sanity/lib/client";
import { contactPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { ContactPageData, SanitySettings } from "@/sanity/lib/types";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/phone";

export const revalidate = 300;

// Texte, solange im CMS noch nichts gepflegt ist
const FALLBACK = {
  eyebrow: "Kontakt",
  title: "Sprechen Sie direkt mit unserem Projektteam.",
  intro:
    "Wir beantworten Anfragen in der Regel innerhalb eines Werktages. Für kurzfristige Produktionen erreichen Sie uns direkt im Projektbüro.",
  description:
    "Sprechen Sie direkt mit unserem Projektteam — für Events, Broadcast, Konferenzen und Live-Produktionen.",
  officeLabel: "Projektbüro Köln",
  hoursLabel: "Öffnungszeiten",
  openingHours: [
    { day: "Mo–Fr", time: "08:00 – 18:00", highlight: false },
    { day: "Sa", time: "nach Absprache", highlight: false },
    { day: "Show-Support", time: "24/7", highlight: true },
  ],
  formEyebrow: "Projektanfrage",
  formHeading: "Erzählen Sie uns von Ihrem Projekt.",
  formBody:
    "Je mehr wir über Anlass, Location und Umfang wissen, desto präziser können wir Ihnen ein erstes Konzept zurückspielen.",
} as const;

async function getData(preview = false): Promise<{
  page: ContactPageData | null;
  settings: SanitySettings;
}> {
  try {
    const [page, settings] = await Promise.all([
      sanityFetch<ContactPageData | null>(contactPageQuery, {}, { preview, revalidate: 300 }),
      sanityFetch<SanitySettings | null>(siteSettingsQuery, {}, { preview, revalidate: 300 }),
    ]);
    return { page: page ?? null, settings: settings ?? {} };
  } catch {
    return { page: null, settings: {} };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await getData();

  return buildMetadata({
    seo: page?.seo,
    settings,
    fallbackTitle: "Kontakt",
    fallbackDescription: FALLBACK.description,
    path: "/kontakt",
  });
}

export default async function KontaktPage() {
  const { isEnabled: preview } = draftMode();
  const { page, settings } = await getData(preview);

  // Adresse und Rufnummern stehen nur in den Website-Einstellungen — die
  // Kontaktseite greift darauf zu, statt sie ein zweites Mal zu führen.
  const legalName = settings.legalName || settings.companyName;
  const street = settings.addressStreet;
  const city = settings.addressCity;
  const phone = settings.phone;
  const email = settings.email;

  const openingHours =
    page?.openingHours?.length ? page.openingHours : FALLBACK.openingHours;

  const showProjectPhone = Boolean(page?.showProjectPhone && page.projectPhone);

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow ?? FALLBACK.eyebrow}
        title={page?.title || FALLBACK.title}
        intro={page?.intro ?? FALLBACK.intro}
      />

      <section className="py-10 md:py-20">
        <div className="container grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-800 p-8">
                <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  {page?.officeLabel || FALLBACK.officeLabel}
                </div>
                {legalName && (
                  <div className="mt-4 font-display text-xl text-white">{legalName}</div>
                )}
                {(street || city) && (
                  <address className="mt-2 not-italic text-sm leading-relaxed text-steel-300">
                    {street}
                    {street && city && <br />}
                    {city}
                  </address>
                )}

                {(phone || email || showProjectPhone) && (
                  <dl className="mt-8 space-y-5 text-sm">
                    {phone && (
                      <ContactRow label="Telefon" href={telHref(phone)} value={phone} />
                    )}
                    {email && (
                      <ContactRow label="E-Mail" href={`mailto:${email}`} value={email} />
                    )}
                    {showProjectPhone && page?.projectPhone && (
                      <ContactRow
                        label="Projekttelefon"
                        href={telHref(page.projectPhone)}
                        value={page.projectPhone}
                      />
                    )}
                  </dl>
                )}
              </div>
            </Reveal>

            {openingHours.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-6 rounded-2xl border border-white/10 bg-ink-900 p-8 text-sm text-steel-300">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-steel-400">
                    {page?.hoursLabel || FALLBACK.hoursLabel}
                  </div>
                  <div className="mt-4 space-y-1">
                    {openingHours.map((entry) => (
                      <div
                        key={`${entry.day}-${entry.time}`}
                        className="flex items-center justify-between"
                      >
                        <span>{entry.day}</span>
                        <span className={entry.highlight ? "text-accent" : "text-white"}>
                          {entry.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-800 p-8 md:p-10">
                <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  {page?.formEyebrow || FALLBACK.formEyebrow}
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
                  {page?.formHeading || FALLBACK.formHeading}
                </h2>
                {(page?.formBody ?? FALLBACK.formBody) && (
                  <p className="mt-3 max-w-lg text-sm text-steel-300">
                    {page?.formBody ?? FALLBACK.formBody}
                  </p>
                )}
                <div className="mt-10">
                  <ContactForm
                    successMessage={page?.formSuccessMessage ?? undefined}
                    privacyNote={page?.privacyNote ?? undefined}
                    contactEmail={email ?? undefined}
                    businessHours={settings.businessHours ?? undefined}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.24em] text-steel-400">{label}</dt>
      <dd className="mt-1">
        <a href={href} className="text-white hover:text-accent">
          {value}
        </a>
      </dd>
    </div>
  );
}
