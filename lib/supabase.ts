import { createClient } from "@supabase/supabase-js";

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

/** Returns a Supabase client, or null if env vars are not configured. */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon || url.includes("your-project") || url === "") return null;
  return createClient(url, anon);
}
