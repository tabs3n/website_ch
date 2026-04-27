# Cologne Hunters — Licht & Ton Service GmbH

Next.js 14 website for Cologne Hunters, backed by Sanity for editable pages,
projects, global settings, preview mode, and webhook-based revalidation.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS with custom brand tokens
- Sanity Studio at `/studio`
- Framer Motion for page reveals and transitions
- Resend-compatible contact form endpoint at `/api/contact`

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run start
```

Local dev runs at `http://localhost:3000`.

## Environment

Copy `.env.local.example` to `.env.local` and fill the missing values.

Required for production contact forms:

- `RESEND_API_KEY`
- `CONTACT_RECIPIENT_EMAIL` or `contactRecipientEmail` in Sanity settings

Recommended for CMS workflows:

- `SANITY_API_READ_TOKEN` for draft documents
- `SANITY_PREVIEW_SECRET` for `/api/draft`
- `REVALIDATE_SECRET` for Sanity webhooks to `/api/revalidate`

## Content Model

- `homepage` controls the start page sections and visibility toggles.
- `project` controls `/projekte`, `/projekte/[slug]`, featured projects, and the project map when `countryIso` is set.
- `siteSettings` controls branding, contact details, footer, SEO, social links, and contact form routing.

Static project data in `data/projects.ts` is only a fallback for empty or unavailable
Sanity datasets.

## Deployment

The project is Vercel-ready. Configure the same environment variables in Vercel
and add a Sanity webhook:

- URL: `https://<domain>/api/revalidate`
- Method: `POST`
- Header: `x-revalidate-token: <REVALIDATE_SECRET>`

The revalidation endpoint refreshes homepage, project, service, map, and contact
routes.
