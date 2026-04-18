import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * Wird von Sanity-Webhook aufgerufen, sobald Inhalt gespeichert wird.
 * → Alle Projektseiten und die Homepage werden sofort neu generiert.
 *
 * Absicherung: Header "x-revalidate-token" muss mit REVALIDATE_SECRET übereinstimmen.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  // Token-Prüfung (optional, aber empfohlen)
  if (secret) {
    const token = req.headers.get("x-revalidate-token");
    if (token !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Alle Seiten mit Projektdaten invalidieren
    revalidatePath("/", "layout");
    revalidatePath("/projekte", "page");
    revalidatePath("/projekte/[slug]", "page");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: ["/", "/projekte", "/projekte/[slug]"],
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Revalidation failed", detail: String(err) },
      { status: 500 }
    );
  }
}

// GET für schnellen Funktionstest
export async function GET() {
  return NextResponse.json({ status: "Revalidate endpoint active" });
}
