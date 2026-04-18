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

export type SanitySettings = {
  companyName: string;
  tagline: string;
  heroHeadline: string;
  heroSubline?: string;
  email: string;
  phone: string;
  address: string;
  clients: string[];
};
