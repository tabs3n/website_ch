/**
 * Unified data access layer.
 * — When NEXT_PUBLIC_SANITY_PROJECT_ID is set → fetch from Sanity CMS.
 * — Otherwise fall back to the local static data file (zero breaking changes
 *   during development before Sanity is wired up).
 */

import type { SanityProject } from "@/sanity/lib/types";

function isSanityConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

// ── Static fallback ────────────────────────────────────────────────────────────

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

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<SanityProject[]> {
  if (isSanityConfigured()) {
    const { client } = await import("@/sanity/lib/client");
    const { allProjectsQuery } = await import("@/sanity/lib/queries");
    return client.fetch<SanityProject[]>(allProjectsQuery, {}, { next: { revalidate: 60 } });
  }
  const { projects } = await import("@/data/projects");
  return projects.map(staticToSanity);
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  if (isSanityConfigured()) {
    const { client } = await import("@/sanity/lib/client");
    const { featuredProjectsQuery } = await import("@/sanity/lib/queries");
    const featured = await client.fetch<SanityProject[]>(
      featuredProjectsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    // if no featured docs yet, return first 4
    if (featured.length === 0) {
      const all = await client.fetch<SanityProject[]>(
        (await import("@/sanity/lib/queries")).allProjectsQuery,
        {},
        { next: { revalidate: 60 } }
      );
      return all.slice(0, 4);
    }
    return featured;
  }
  const { projects } = await import("@/data/projects");
  return projects.slice(0, 4).map(staticToSanity);
}

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  if (isSanityConfigured()) {
    const { client } = await import("@/sanity/lib/client");
    const { projectBySlugQuery } = await import("@/sanity/lib/queries");
    return client.fetch<SanityProject | null>(
      projectBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
  }
  const { getProjectBySlug: getStatic, projects } = await import(
    "@/data/projects"
  );
  const p = getStatic(slug);
  return p ? staticToSanity(p) : null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (isSanityConfigured()) {
    const { client } = await import("@/sanity/lib/client");
    const { allProjectSlugsQuery } = await import("@/sanity/lib/queries");
    const docs = await client.fetch<{ slug: string }[]>(
      allProjectSlugsQuery,
      {},
      { next: { revalidate: 3600 } }
    );
    return docs.map((d) => d.slug);
  }
  const { getAllProjectSlugs: getStatic } = await import("@/data/projects");
  return getStatic();
}
