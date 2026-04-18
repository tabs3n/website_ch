import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import ServicesPreview from "@/components/ServicesPreview";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import ProjectsPreview from "@/components/ProjectsPreview";
import MapSection from "@/components/MapSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { homepageQuery, siteSettingsQuery } from "@/sanity/lib/queries";

// Revalidate every 30s so Sanity changes appear quickly
export const revalidate = 30;

async function getData() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [hp, settings] = await Promise.all([
      (client.fetch as any)(homepageQuery, {}, { next: { revalidate: 30 } }),
      (client.fetch as any)(siteSettingsQuery, {}, { next: { revalidate: 30 } }),
    ]);
    return { hp: hp ?? {}, settings: settings ?? {} };
  } catch {
    return { hp: {}, settings: {} };
  }
}

export default async function HomePage() {
  const { hp, settings } = await getData();

  return (
    <>
      <Hero
        heroImage={hp.heroImage}
        heroEyebrow={hp.heroEyebrow}
        heroHeadline={hp.heroHeadline}
        heroDescription={hp.heroDescription}
        heroStats={hp.heroStats}
      />

      <LogosStrip clients={settings.clients} />

      <ServicesPreview
        servicesHeading={hp.servicesHeading}
        servicesBody={hp.servicesBody}
        disciplines={hp.disciplines}
      />

      <CapabilitiesStrip
        capabilitiesHeading={hp.capabilitiesHeading}
        capabilities={hp.capabilities}
      />

      <ProjectsPreview />

      <MapSection />

      <ContactCTA
        contactHeading={hp.contactHeading}
        contactResponseTime={hp.contactResponseTime}
        contactLocationImage={hp.contactLocationImage}
        email={settings.email}
        phone={settings.phone}
        addressStreet={settings.addressStreet}
        addressCity={settings.addressCity}
        businessHours={settings.businessHours}
      />

      <Footer
        studioHeading={hp.studioHeading}
        studioBody={hp.studioBody}
        studioImage={hp.studioImage}
        processSteps={hp.processSteps}
        footerTagline={settings.footerTagline}
        companyName={settings.companyName}
      />
    </>
  );
}
