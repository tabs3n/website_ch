import { sanityFetch } from "@/sanity/lib/client";
import { mapProjectsQuery } from "@/sanity/lib/queries";

export type MapProject = {
  id: string;
  iso: string;
  country: string;
  title: string;
  city: string | null;
  year: number | null;
  client: string | null;
  blurb: string | null;
  quote: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
  project_images?: { url: string; sort_order: number }[];
};

const FALLBACK_MAP_PROJECTS: MapProject[] = [
  {
    id: "demo-1",
    iso: "DEU",
    country: "Deutschland",
    title: "Lanxess Global Kick-off",
    city: "Köln",
    year: 2025,
    client: "Lanxess AG",
    blurb: "Komplettes Licht-, Ton- und Video-Setup in der Lanxess Arena.",
    quote: null,
    lat: 50.93,
    lng: 6.97,
    created_at: "",
    project_images: [],
  },
  {
    id: "demo-2",
    iso: "DEU",
    country: "Deutschland",
    title: "RTL Primetime Studio",
    city: "Köln",
    year: 2024,
    client: "RTL Deutschland",
    blurb: "Permanentes Studiobeleuchtungskonzept auf grandMA3.",
    quote: null,
    lat: 50.95,
    lng: 6.99,
    created_at: "",
    project_images: [],
  },
  {
    id: "demo-3",
    iso: "GBR",
    country: "Großbritannien",
    title: "IBC Side Event",
    city: "London",
    year: 2024,
    client: "Broadcaster Consortium",
    blurb: "Licht und Sound für Side Events während der IBC.",
    quote: null,
    lat: 51.5,
    lng: -0.12,
    created_at: "",
    project_images: [],
  },
  {
    id: "demo-4",
    iso: "USA",
    country: "USA",
    title: "NAB Show Booth",
    city: "Las Vegas",
    year: 2023,
    client: "Technology Partner",
    blurb: "Messeauftritt mit Full LED Wall Setup und Broadcast-Demo.",
    quote: null,
    lat: 36.17,
    lng: -115.14,
    created_at: "",
    project_images: [],
  },
  {
    id: "demo-5",
    iso: "ARE",
    country: "Vereinigte Arabische Emirate",
    title: "Corporate Gala Dubai",
    city: "Dubai",
    year: 2023,
    client: "MENA Corp",
    blurb: "Premium Gala-Abend mit Moving Lights, Line-Array und 4K LED Wall.",
    quote: null,
    lat: 25.2,
    lng: 55.27,
    created_at: "",
    project_images: [],
  },
  {
    id: "demo-6",
    iso: "CHE",
    country: "Schweiz",
    title: "World Economic Forum",
    city: "Davos",
    year: 2024,
    client: "WEF",
    blurb: "Konferenztechnik und hybrides Streaming für das WEF.",
    quote: null,
    lat: 46.82,
    lng: 9.84,
    created_at: "",
    project_images: [],
  },
  {
    id: "demo-7",
    iso: "FRA",
    country: "Frankreich",
    title: "MIPCOM Booth",
    city: "Cannes",
    year: 2023,
    client: "Media Group",
    blurb: "LED Wall und Tontechnik für den Messeauftritt in Cannes.",
    quote: null,
    lat: 43.55,
    lng: 7.02,
    created_at: "",
    project_images: [],
  },
];

type SanityMapProject = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  year: number;
  city?: string;
  location?: string;
  country?: string;
  countryIso: string;
  summary?: string;
  lat?: number;
  lng?: number;
  hero?: string;
};

function toMapProject(d: SanityMapProject): MapProject {
  return {
    id: d._id,
    iso: d.countryIso,
    country: d.country ?? d.location ?? d.countryIso,
    title: d.title,
    city: d.city ?? d.location ?? null,
    year: d.year ?? null,
    client: d.client ?? null,
    blurb: d.summary ?? null,
    quote: null,
    lat: d.lat ?? null,
    lng: d.lng ?? null,
    created_at: "",
    project_images: d.hero ? [{ url: d.hero, sort_order: 0 }] : [],
  };
}

export function isDemoMapData(projects: MapProject[]) {
  return projects[0]?.id?.startsWith("demo-") ?? false;
}

export async function getMapProjects({
  preview = false,
  revalidate = 60,
}: {
  preview?: boolean;
  revalidate?: number;
} = {}): Promise<MapProject[]> {
  try {
    const docs = await sanityFetch<SanityMapProject[]>(
      mapProjectsQuery,
      {},
      { preview, revalidate }
    );

    if (!docs?.length) return FALLBACK_MAP_PROJECTS;
    return docs.map(toMapProject);
  } catch {
    return FALLBACK_MAP_PROJECTS;
  }
}
