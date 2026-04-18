import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactCTA from "@/components/ContactCTA";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import LogosStrip from "@/components/LogosStrip";

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
