import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import ServicesPreview from "@/components/ServicesPreview";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactCTA from "@/components/ContactCTA";

// Revalidate every 30s so Sanity changes appear quickly
export const revalidate = 30;

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <ServicesPreview />
      <CapabilitiesStrip />
      <ProjectsPreview />
      <ContactCTA />
    </>
  );
}
