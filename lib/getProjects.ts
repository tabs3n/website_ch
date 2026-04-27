/**
 * Unified data access layer.
 *
 * Reihenfolge:
 * 1. Sanity-Daten holen (Dataset hat Inhalt) → zurückgeben
 * 2. Sanity liefert leeres Ergebnis (Dataset noch leer) → statische Fallback-Daten
 * 3. Sanity nicht konfiguriert → immer statische Daten
 */

import type { SanityProject } from "@/sanity/lib/types";
import { sanityFetch } from "@/sanity/lib/client";
import {
  projects as staticProjects,
  getProjectBySlug as staticGetBySlug,
  getAllProjectSlugs as staticGetSlugs,
} from "@/data/projects";

type FetchOptions = {
  preview?: boolean;
};

// ── Statischer Adapter ─────────────────────────────────────────────────────────

function toSanity(
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

const staticFallback = staticProjects.map(toSanity);

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getAllProjects({
  preview = false,
}: FetchOptions = {}): Promise<SanityProject[]> {
  try {
    const { allProjectsQuery } = await import("@/sanity/lib/queries");
    const results = await sanityFetch<SanityProject[]>(allProjectsQuery, {}, { preview });
    return results.length > 0 ? results : staticFallback;
  } catch {
    return staticFallback;
  }
}

export async function getFeaturedProjects({
  preview = false,
}: FetchOptions = {}): Promise<SanityProject[]> {
  try {
    const { featuredProjectsQuery, allProjectsQuery } = await import(
      "@/sanity/lib/queries"
    );
    const featured = await sanityFetch<SanityProject[]>(featuredProjectsQuery, {}, { preview });
    if (featured.length > 0) return featured;

    const all = await sanityFetch<SanityProject[]>(allProjectsQuery, {}, { preview });
    if (all.length > 0) return all.slice(0, 4);

    return staticFallback.slice(0, 4);
  } catch {
    return staticFallback.slice(0, 4);
  }
}

export async function getProjectBySlug(
  slug: string,
  { preview = false }: FetchOptions = {}
): Promise<SanityProject | null> {
  try {
    const { projectBySlugQuery } = await import("@/sanity/lib/queries");
    const result = await sanityFetch<SanityProject | null>(
      projectBySlugQuery,
      { slug },
      { preview }
    );
    if (result) return result;
    // Fallback: statisches Projekt
    const p = staticGetBySlug(slug);
    return p ? toSanity(p) : null;
  } catch {
    const p = staticGetBySlug(slug);
    return p ? toSanity(p) : null;
  }
}

export async function getAllProjectSlugs({
  preview = false,
}: FetchOptions = {}): Promise<string[]> {
  try {
    const { allProjectSlugsQuery } = await import("@/sanity/lib/queries");
    const docs = await sanityFetch<{ slug: string }[]>(
      allProjectSlugsQuery,
      {},
      { preview, revalidate: 3600 }
    );
    if (docs.length > 0) return docs.map((d) => d.slug);
    return staticGetSlugs();
  } catch {
    return staticGetSlugs();
  }
}
