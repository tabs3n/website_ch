export type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  year: number;
  location?: string;
  category: "Corporate" | "Broadcast" | "Live" | "Konferenz";
  summary: string;
  description?: string[];
  services?: string[] | null;
  hero: string;
  gallery?: string[];
  stats?: { label: string; value: string }[];
  publishedAt?: string;
  featured?: boolean;
};

export type HomepageData = {
  showCapabilities?: boolean | null;
  showProjectsPreview?: boolean | null;
  showStudio?: boolean | null;
  heroImage?: string | null;
  heroImages?: string[] | null;
  heroSlideshowEnabled?: boolean | null;
  heroSlideshowInterval?: number | null;
  heroMetaLeft?: string | null;
  heroMetaRight?: string | null;
  heroEyebrow?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  heroStats?: Array<{ value: string; label: string }> | null;
  servicesHeading?: string | null;
  servicesBody?: string | null;
  disciplines?: Array<{
    num: string;
    abbr: string;
    title: string;
    description: string;
    image?: string | null;
    href?: string | null;
  }> | null;
  capabilitiesHeading?: string | null;
  capabilities?: Array<{
    tag: string;
    title: string;
    description: string;
  }> | null;
  studioHeading?: string | null;
  studioBody?: string | null;
  studioImage?: string | null;
  processSteps?: Array<{
    num: string;
    title: string;
    description: string;
  }> | null;
  contactHeading?: string | null;
  contactResponseTime?: string | null;
  contactLocationImage?: string | null;
};

export type SanitySettings = {
  logo?: string | null;
  accentColor?: string | null;
  headlineFont?: string | null;
  bodyFont?: string | null;
  labelFont?: string | null;
  showNavClock?: boolean | null;
  navClockCity?: string | null;
  showNavCta?: boolean | null;
  navCtaLabel?: string | null;
  companyName?: string | null;
  tagline?: string | null;
  clients?: string[] | null;
  email?: string | null;
  phone?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  businessHours?: string[] | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  footerTagline?: string | null;
  siteUrl?: string | null;
  siteDescription?: string | null;
  ogImage?: string | null;
  // Rechtsangaben
  legalName?: string | null;
  managingDirector?: string | null;
  registerCourt?: string | null;
  registerNumber?: string | null;
  vatId?: string | null;
  contentResponsible?: string | null;
  addressCountry?: string | null;
  // 404-Seite
  notFoundEyebrow?: string | null;
  notFoundTitle?: string | null;
  notFoundBody?: string | null;
  // Strukturierte Daten
  geoLat?: number | null;
  geoLng?: number | null;
};

// ─── SEO ───────────────────────────────────────────────────────────────────────

export type SanitySeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  noIndex?: boolean | null;
} | null;

/** Gemeinsame Kopffelder aller Seiten-Singletons. */
type PageHeaderFields = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  seo?: SanitySeo;
};

// ─── Leistungen ────────────────────────────────────────────────────────────────

export type ServiceListItem = {
  _id: string;
  title: string;
  slug: string;
  order?: number | null;
  number?: string | null;
  shortDescription?: string | null;
  bullets?: string[] | null;
  cardImage?: string | null;
  cardImageAlt?: string | null;
};

export type SanityGalleryImage = {
  url: string;
  alt?: string | null;
};

export type ServiceDetailData = {
  _id: string;
  title: string;
  slug: string;
  order?: number | null;
  number?: string | null;
  shortDescription?: string | null;
  eyebrow?: string | null;
  headline?: string | null;
  intro?: string | null;
  lead?: string | null;
  paragraphs?: string[] | null;
  capabilitiesHeading?: string | null;
  capabilities?: Array<{ title: string; body?: string | null }> | null;
  stackHeading?: string | null;
  stack?: string[] | null;
  headerImage?: string | null;
  headerImageAlt?: string | null;
  gallery?: SanityGalleryImage[] | null;
  seo?: SanitySeo;
  next?: { title: string; slug: string } | null;
  first?: { title: string; slug: string } | null;
};

// ─── Seiten-Singletons ─────────────────────────────────────────────────────────

export type ServicesPageData = PageHeaderFields & {
  linkLabel?: string | null;
  ctaHeading?: string | null;
};

export type ProjectsPageData = PageHeaderFields & {
  emptyStateText?: string | null;
  ctaHeading?: string | null;
};

export type MapPageData = PageHeaderFields & {
  countriesLabel?: string | null;
  projectsLabel?: string | null;
  demoNotice?: string | null;
};

export type ContactPageData = PageHeaderFields & {
  officeLabel?: string | null;
  showProjectPhone?: boolean | null;
  projectPhone?: string | null;
  hoursLabel?: string | null;
  openingHours?: Array<{
    day: string;
    time: string;
    highlight?: boolean | null;
  }> | null;
  formEyebrow?: string | null;
  formHeading?: string | null;
  formBody?: string | null;
  formSuccessMessage?: string | null;
  privacyNote?: string | null;
};

// ─── Rechtstexte ───────────────────────────────────────────────────────────────

/**
 * Portable-Text-Blöcke. Bewusst lose typisiert — die Struktur kommt von Sanity
 * und wird ausschliesslich an <PortableText> weitergereicht.
 */
export type PortableTextBlock = { _type: string; _key?: string } & Record<
  string,
  unknown
>;

export type LegalPageData = {
  title?: string | null;
  eyebrow?: string | null;
  showCompanyDetails?: boolean | null;
  sections?: Array<{
    heading: string;
    body?: PortableTextBlock[] | null;
  }> | null;
  lastUpdated?: string | null;
  seo?: SanitySeo;
};
