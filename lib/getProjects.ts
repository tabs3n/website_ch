/**
 * Unified data access layer.
 * — NEXT_PUBLIC_SANITY_PROJECT_ID gesetzt → Sanity CMS via @sanity/client
 * — Nicht gesetzt → statische Fallback-Daten aus data/projects.ts
 */

import type { SanityProject } from "@/sanity/lib/types";

function isSanityConfigured(): boolean {
  const id =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu";
  return id !== "" && id !== "placeholder";
}

// ── Statischer Adapter ─────────────────────────────────────────────────────────

function staticToSanity(
  p: import("@/data/projects").Project
): SanityProject {
  return {
    _id: p.slug,
    title: p.title,
    slug: p.slug,
    client: p.client,
    year: p.year,
    location: p.location,
    category: p.category,
    summary: p.summary,
    description: p.description,
    services: p.services,
    hero: p.hero,
    gallery: p.gallery,
    stats: p.stats,
  };
}

// ── Sanity fetch helper (Next.js cache) ────────────────────────────────────────

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 60
): Promise<T> {
  const { client } = await import("@/sanity/lib/client");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.fetch(query, params, { next: { revalidate } } as any) as Promise<T>;
}

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<SanityProject[]> {
  if (isSanityConfigured()) {
    const { allProjectsQuery } = await import("@/sanity/lib/queries");
    return sanityFetch<SanityProject[]>(allProjectsQuery);
  }
  const { projects } = await import("@/data/projects");
  return projects.map(staticToSanity);
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  if (isSanityConfigured()) {
    const { featuredProjectsQuery, allProjectsQuery } = await import(
      "@/sanity/lib/queries"
    );
    const featured = await sanityFetch<SanityProject[]>(featuredProjectsQuery);
    if (featured.length > 0) return featured;
    const all = await sanityFetch<SanityProject[]>(allProjectsQuery);
    return all.slice(0, 4);
  }
  const { projects } = await import("@/data/projects");
  return projects.slice(0, 4).map(staticToSanity);
}

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  if (isSanityConfigured()) {
    const { projectBySlugQuery } = await import("@/sanity/lib/queries");
    return sanityFetch<SanityProject | null>(projectBySlugQuery, { slug });
  }
  const { getProjectBySlug: getStatic } = await import("@/data/projects");
  const p = getStatic(slug);
  return p ? staticToSanity(p) : null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (isSanityConfigured()) {
    const { allProjectSlugsQuery } = await import("@/sanity/lib/queries");
    const docs = await sanityFetch<{ slug: string }[]>(
      allProjectSlugsQuery,
      {},
      3600
    );
    return docs.map((d) => d.slug);
  }
  const { getAllProjectSlugs: getStatic } = await import("@/data/projects");
  return getStatic();
}
