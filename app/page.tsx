import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import ServicesPreview from "@/components/ServicesPreview";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import ProjectsPreview from "@/components/ProjectsPreview";
import MapSection from "@/components/MapSection";
import ContactCTA from "@/components/ContactCTA";
import StudioSection from "@/components/StudioSection";
import { client } from "@/sanity/lib/client";
import { homepageQuery, siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 30;

async function getData() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [hp, settings] = await Promise.all([
      (client.fetch as any)(homepageQuery, {}, { next: { revalidate: 30 } }),
      (client.fetch as any)(siteSettingsQuery, {}, { next: { revalidate: 30 } }),
    ]);
    // hp === null bedeutet: Dokument existiert noch nicht in Sanity
    // hp === {} / { field: null } bedeutet: Dokument existiert, Felder ggf. geleert
    return { hp: hp ?? null, settings: settings ?? {} };
  } catch {
    return { hp: null, settings: {} };
  }
}

export default async function HomePage() {
  const { hp, settings } = await getData();

  // Wenn das Sanity-Dokument noch nicht existiert (hp === null):
  // → alle Props als undefined übergeben → Komponenten nutzen eingebaute Fallback-Texte
  // Wenn das Dokument existiert (hp ist ein Objekt):
  // → Sanity-Werte direkt übergeben; null = Feld geleert = Bereich ausblenden
  const docExists = hp !== null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = (val: any) => (docExists ? val : undefined);

  // Sichtbarkeits-Toggles (Standard: ausgeblendet, bis in Sanity aktiviert)
  const showCapabilities = docExists ? (hp.showCapabilities ?? false) : false;
  const showProjectsPreview = docExists ? (hp.showProjectsPreview ?? false) : false;
  const showStudio = docExists ? (hp.showStudio ?? false) : false;

  return (
    <>
      <Hero
        heroImage={g(hp?.heroImage)}
        heroEyebrow={g(hp?.heroEyebrow)}
        heroHeadline={g(hp?.heroHeadline)}
        heroDescription={g(hp?.heroDescription)}
        heroStats={g(hp?.heroStats)}
      />

      <LogosStrip clients={settings.clients} />

      <ServicesPreview
        servicesHeading={g(hp?.servicesHeading)}
        servicesBody={g(hp?.servicesBody)}
        disciplines={g(hp?.disciplines)}
      />

      {showCapabilities && (
        <CapabilitiesStrip
          capabilitiesHeading={g(hp?.capabilitiesHeading)}
          capabilities={g(hp?.capabilities)}
        />
      )}

      {showProjectsPreview && <ProjectsPreview />}

      <MapSection />

      {showStudio && (
        <StudioSection
          studioHeading={g(hp?.studioHeading)}
          studioBody={g(hp?.studioBody)}
          studioImage={g(hp?.studioImage)}
          processSteps={g(hp?.processSteps)}
        />
      )}

      <ContactCTA
        contactHeading={g(hp?.contactHeading)}
        contactResponseTime={g(hp?.contactResponseTime)}
        email={settings.email}
        phone={settings.phone}
        addressStreet={settings.addressStreet}
        addressCity={settings.addressCity}
        businessHours={settings.businessHours}
      />
    </>
  );
}
