import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * GET /api/disable-draft?slug=<path>
 * Exits preview / draft mode and redirects back to the page.
 */
export async function GET(req: NextRequest) {
  draftMode().disable();
  const slug = req.nextUrl.searchParams.get("slug") ?? "/";
  redirect(slug);
}
