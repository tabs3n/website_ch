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

// ─── Projektkarte ──────────────────────────────────────────────────────────────
// Fetches only projects that have a countryIso set (= visible on the map)
export const mapProjectsQuery = groq`
  *[_type == "project" && defined(countryIso)] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    city,
    location,
    country,
    countryIso,
    summary,
    lat,
    lng,
    "hero": hero.asset->url
  }
`;

// ─── Homepage ──────────────────────────────────────────────────────────────────

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    "heroImage": heroImage.asset->url,
    heroEyebrow,
    heroHeadline,
    heroDescription,
    heroStats,
    servicesHeading,
    servicesBody,
    "disciplines": disciplines[] {
      num,
      abbr,
      title,
      description,
      "image": image.asset->url,
      href
    },
    capabilitiesHeading,
    "capabilities": capabilities[] {
      tag,
      title,
      description
    },
    studioHeading,
    studioBody,
    "studioImage": studioImage.asset->url,
    "processSteps": processSteps[] {
      num,
      title,
      description
    },
    contactHeading,
    contactResponseTime,
    "contactLocationImage": contactLocationImage.asset->url
  }
`;

// ─── Site Settings ─────────────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    clients,
    email,
    phone,
    addressStreet,
    addressCity,
    businessHours,
    footerTagline
  }
`;
