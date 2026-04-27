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
};
