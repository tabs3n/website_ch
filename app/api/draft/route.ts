import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

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

  // Validate the secret token (optional but strongly recommended)
  if (secret && searchParams.get("secret") !== secret) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable draft mode — this sets a cookie that bypasses static cache
  draftMode().enable();

  // Redirect to the requested slug, or homepage as fallback
  const slug = searchParams.get("slug") ?? "/";
  redirect(slug);
}
