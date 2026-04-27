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
 * GET /api/disable-draft?slug=<path>
 * Exits preview / draft mode and redirects back to the page.
 */
export async function GET(req: NextRequest) {
  draftMode().disable();
  redirect(safeRedirectPath(req.nextUrl.searchParams.get("slug")));
}
