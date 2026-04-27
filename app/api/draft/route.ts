import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

function safeRedirectPath(slug: string | null): string {
  if (!slug || !slug.startsWith("/") || slug.startsWith("//")) return "/";

  try {
    const url = new URL(slug, "https://cologne-hunters.local");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

/**
 * GET /api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=<path>
 *
 * Enables Next.js Draft Mode so that unpublished Sanity documents
 * become visible. Called automatically when editors click the
 * "Vorschau öffnen" button in Sanity Studio.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_PREVIEW_SECRET;
  const { searchParams } = req.nextUrl;

  if (!secret) {
    return new Response("Preview secret is not configured", { status: 500 });
  }

  if (!process.env.SANITY_API_READ_TOKEN) {
    return new Response("Sanity read token is not configured", { status: 500 });
  }

  if (searchParams.get("secret") !== secret) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable draft mode — this sets a cookie that bypasses static cache
  draftMode().enable();

  // Redirect to the requested slug, or homepage as fallback
  redirect(safeRedirectPath(searchParams.get("slug")));
}
