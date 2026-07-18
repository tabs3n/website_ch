import groq from "groq";

// ─── Projects ─────────────────────────────────────────────────────────────────

export const allProjectsQuery = groq`
  *[_type == "project" && showInReferenzen != false] | order(year desc, publishedAt desc) {
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
  *[_type == "project" && featured == true && showInReferenzen != false] | order(year desc) [0...4] {
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
  *[_type == "project"] { "slug": slug.current, publishedAt }
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
    showCapabilities,
    showProjectsPreview,
    showStudio,
    "heroImage": heroImage.asset->url,
    "heroImages": heroImages[].asset->url,
    heroSlideshowEnabled,
    heroSlideshowInterval,
    heroMetaLeft,
    heroMetaRight,
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
    "logo": logo.asset->url,
    accentColor,
    headlineFont,
    bodyFont,
    labelFont,
    showNavClock,
    navClockCity,
    showNavCta,
    navCtaLabel,
    companyName,
    tagline,
    clients,
    email,
    phone,
    addressStreet,
    addressCity,
    businessHours,
    instagramUrl,
    facebookUrl,
    linkedinUrl,
    footerTagline,
    siteUrl,
    siteDescription,
    "ogImage": ogImage.asset->url,
    legalName,
    managingDirector,
    registerCourt,
    registerNumber,
    vatId,
    contentResponsible,
    addressCountry,
    notFoundEyebrow,
    notFoundTitle,
    notFoundBody,
    geoLat,
    geoLng
  }
`;

// ─── Leistungen ────────────────────────────────────────────────────────────────

/** Gemeinsame SEO-Projektion — in jeder Seiten-Query wiederverwendet. */
const SEO_PROJECTION = `
  seo {
    metaTitle,
    metaDescription,
    noIndex,
    "ogImage": ogImage.asset->url
  }
`;

/** Alle sichtbaren Leistungen für die Übersichtsseite. */
export const allServicesQuery = groq`
  *[_type == "service" && hidden != true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    order,
    number,
    shortDescription,
    bullets,
    "cardImage": coalesce(cardImage.asset->url, headerImage.asset->url),
    "cardImageAlt": coalesce(cardImage.alt, headerImage.alt)
  }
`;

/**
 * Eine Leistung samt Detailseiten-Inhalt.
 * "next" liefert zusätzlich die nachfolgende Leistung für den Link am
 * Seitenende — die letzte verweist zurück auf die erste.
 */
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    order,
    number,
    shortDescription,
    eyebrow,
    headline,
    intro,
    lead,
    paragraphs,
    capabilitiesHeading,
    capabilities[] { title, body },
    stackHeading,
    stack,
    "headerImage": headerImage.asset->url,
    "headerImageAlt": headerImage.alt,
    "gallery": gallery[] {
      "url": asset->url,
      alt
    },
    ${SEO_PROJECTION},
    "next": *[_type == "service" && hidden != true && order > ^.order]
      | order(order asc)[0] { title, "slug": slug.current },
    "first": *[_type == "service" && hidden != true]
      | order(order asc)[0] { title, "slug": slug.current }
  }
`;

/** Slugs aller Leistungen — für statische Generierung und Sitemap. */
export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    "slug": slug.current
  }
`;

// ─── Seiten-Singletons ─────────────────────────────────────────────────────────

export const servicesPageQuery = groq`
  *[_id == "servicesPage"][0] {
    eyebrow,
    title,
    intro,
    linkLabel,
    ctaHeading,
    ${SEO_PROJECTION}
  }
`;

export const projectsPageQuery = groq`
  *[_id == "projectsPage"][0] {
    eyebrow,
    title,
    intro,
    emptyStateText,
    ctaHeading,
    ${SEO_PROJECTION}
  }
`;

export const mapPageQuery = groq`
  *[_id == "mapPage"][0] {
    eyebrow,
    title,
    intro,
    countriesLabel,
    projectsLabel,
    demoNotice,
    ${SEO_PROJECTION}
  }
`;

export const contactPageQuery = groq`
  *[_id == "contactPage"][0] {
    eyebrow,
    title,
    intro,
    officeLabel,
    showProjectPhone,
    projectPhone,
    hoursLabel,
    openingHours[] { day, time, highlight },
    formEyebrow,
    formHeading,
    formBody,
    formSuccessMessage,
    privacyNote,
    ${SEO_PROJECTION}
  }
`;

// ─── Rechtstexte ───────────────────────────────────────────────────────────────

/** Impressum bzw. Datenschutz — $id ist "impressum" oder "datenschutz". */
export const legalPageQuery = groq`
  *[_id == $id][0] {
    title,
    eyebrow,
    showCompanyDetails,
    sections[] {
      heading,
      body
    },
    lastUpdated,
    ${SEO_PROJECTION}
  }
`;
