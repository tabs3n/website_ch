import type { Metadata } from "next";
import { draftMode } from "next/headers";
import LegalPageView from "@/components/LegalPageView";
import { getLegalPage } from "@/lib/getLegalPage";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await getLegalPage("impressum");

  return {
    ...buildMetadata({
      seo: page.seo,
      settings,
      fallbackTitle: "Impressum",
      fallbackDescription: `Impressum der ${
        settings.legalName ?? settings.companyName ?? "Cologne Hunters"
      }.`,
      path: "/impressum",
    }),
    // Rechtstexte gehören unabhängig von der CMS-Einstellung nicht in den
    // Suchindex — deshalb hier fest gesetzt.
    robots: { index: false, follow: true },
  };
}

export default async function ImpressumPage() {
  const { isEnabled: preview } = await draftMode();
  const { page, settings } = await getLegalPage("impressum", { preview });

  return <LegalPageView page={page} settings={settings} />;
}
