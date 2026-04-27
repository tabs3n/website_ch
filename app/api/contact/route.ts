import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

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

async function fetchEmailConfig(): Promise<{ recipient: string | null; from: string }> {
  // Env vars take precedence (useful for local dev / overrides)
  const envRecipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const envFrom = process.env.CONTACT_FROM_EMAIL;

  if (envRecipient) {
    return { recipient: envRecipient, from: envFrom ?? "onboarding@resend.dev" };
  }

  // Fall back to Sanity siteSettings
  try {
    const sanity = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6vse62qu",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    });

    const settings = await sanity.fetch<{
      contactRecipientEmail?: string;
      contactFromEmail?: string;
    }>(
      `*[_type == "siteSettings"][0]{ contactRecipientEmail, contactFromEmail }`,
      {},
      { cache: "no-store" }
    );

    return {
      recipient: settings?.contactRecipientEmail ?? null,
      from: settings?.contactFromEmail || envFrom || "onboarding@resend.dev",
    };
  } catch {
    return { recipient: null, from: envFrom ?? "onboarding@resend.dev" };
  }
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill this field, real users don't
  if (body.honeypot) {
    console.warn("[contact] Honeypot triggered — payload discarded");
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

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      { error: "E-Mail-Versand nicht konfiguriert. Bitte hinterlegen Sie RESEND_API_KEY in den Vercel-Umgebungsvariablen." },
      { status: 503 }
    );
  }

  const { recipient, from } = await fetchEmailConfig();
  if (!recipient) {
    return NextResponse.json(
      { error: "Kein Empfänger konfiguriert. Bitte tragen Sie die Anfragen-E-Mail im Sanity Studio unter Website-Einstellungen → Kontakt ein." },
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
    <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.6;max-width:600px;">
      <div style="background:#E8B54A;padding:16px 24px;border-radius:4px 4px 0 0;">
        <h2 style="margin:0;color:#0A0A0A;font-size:18px;letter-spacing:-0.01em;">
          Neue Anfrage über cologne-hunters.de
        </h2>
      </div>
      <div style="border:1px solid #e5e5e5;border-top:none;padding:24px;border-radius:0 0 4px 4px;">
        <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
          ${rows
            .map(
              ([k, v]) =>
                `<tr>
                  <td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap;vertical-align:top;font-size:13px;">${escapeHtml(k)}</td>
                  <td style="padding:6px 0;font-weight:600;font-size:14px;">${escapeHtml(v)}</td>
                </tr>`
            )
            .join("")}
        </table>
        <div style="background:#f8f8f8;border-left:3px solid #E8B54A;padding:14px 16px;border-radius:2px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(message)}</div>
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e5e5;font-size:12px;color:#999;">
          Antwort direkt auf diese E-Mail klicken — Reply-To ist auf ${escapeHtml(email)} gesetzt.
        </div>
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from,
      to: recipient,
      reply_to: email,
      subject: `Anfrage: ${name}${body.company ? ` · ${body.company}` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Resend error:", res.status, detail);
    return NextResponse.json({ error: "Versand fehlgeschlagen. Bitte schreiben Sie uns direkt per E-Mail." }, { status: 502 });
  }

  const resendResult = await res.json().catch(() => ({}));
  console.info("[contact] Resend accepted:", { id: resendResult.id });
  return NextResponse.json({ ok: true });
}
