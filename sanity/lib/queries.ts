import groq from "groq";

// ─── Projects ─────────────────────────────────────────────────────────────────

export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    location,
    category,
    summary,
    services,
    "hero": hero.asset->url,
    featured
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(year desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    location,
    category,
    summary,
    services,
    "hero": hero.asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    location,
    category,
    summary,
    description,
    services,
    "hero": hero.asset->url,
    "gallery": gallery[].asset->url,
    stats,
    publishedAt
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`;

// ─── Site Settings ─────────────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    heroHeadline,
    heroSubline,
    email,
    phone,
    address,
    clients
  }
`;
