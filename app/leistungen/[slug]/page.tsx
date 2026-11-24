import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import ServiceDetail from "@/components/ServiceDetail";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/getServices";
import { buildMetadata, getSettingsForMetadata } from "@/lib/seo";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

/**
 * Bekannte Leistungen zur Bauzeit vorrendern. Neue Leistungen aus dem CMS
 * funktionieren trotzdem sofort — sie werden bei der ersten Anfrage erzeugt.
 */
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const [service, settings] = await Promise.all([
    getServiceBySlug(params.slug),
    getSettingsForMetadata(),
  ]);

  if (!service) return { title: "Leistung nicht gefunden" };

  return buildMetadata({
    seo: service.seo,
    settings,
    fallbackTitle: service.title,
    fallbackDescription: service.intro ?? service.shortDescription ?? undefined,
    path: `/leistungen/${params.slug}`,
  });
}

export default async function ServicePage(props: Props) {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  const service = await getServiceBySlug(params.slug, { preview });

  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
