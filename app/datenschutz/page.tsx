import type { Metadata } from "next";
import { draftMode } from "next/headers";
import LegalPageView from "@/components/LegalPageView";
import { getLegalPage } from "@/lib/getLegalPage";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await getLegalPage("datenschutz");

  return {
    ...buildMetadata({
      seo: page.seo,
      settings,
      fallbackTitle: "Datenschutzerklärung",
      fallbackDescription: `Datenschutzerklärung der ${
        settings.legalName ?? settings.companyName ?? "Cologne Hunters"
      } gemäß DSGVO.`,
      path: "/datenschutz",
    }),
    robots: { index: false, follow: true },
  };
}

export default async function DatenschutzPage() {
  const { isEnabled: preview } = draftMode();
  const { page, settings } = await getLegalPage("datenschutz", { preview });

  return <LegalPageView page={page} settings={settings} />;
}
