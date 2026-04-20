import { NextResponse } from "next/server";

export const runtime = "edge";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  services?: string;
  date?: string;
  location?: string;
  message?: string;
  honeypot?: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: if a bot fills the hidden field, silently accept.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, E-Mail und Nachricht sind erforderlich." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "Eingabe zu lang." }, { status: 400 });
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!recipient || !resendKey) {
    console.warn("[contact] Missing RESEND_API_KEY or CONTACT_RECIPIENT_EMAIL — form received but not delivered.");
    console.log("[contact] payload:", { name, email, message: message.slice(0, 200) });
    return NextResponse.json(
      { error: "Versand ist aktuell nicht konfiguriert. Bitte schreiben Sie uns direkt per E-Mail." },
      { status: 503 }
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Unternehmen", body.company ?? ""],
    ["E-Mail", email],
    ["Telefon", body.phone ?? ""],
    ["Leistungen", body.services ?? ""],
    ["Datum", body.date ?? ""],
    ["Ort", body.location ?? ""],
  ].filter((r) => r[1]) as [string, string][];

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.5;">
      <h2 style="margin:0 0 16px;">Neue Anfrage über cologne-hunters.de</h2>
      <table style="border-collapse:collapse;margin-bottom:16px;">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(k)}</td><td style="padding:4px 0;"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <div style="padding:12px;background:#f5f5f5;border-radius:4px;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: fromAddress,
      to: recipient,
      reply_to: email,
      subject: `Neue Anfrage: ${name}${body.company ? ` · ${body.company}` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Resend error:", res.status, detail);
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
