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
npm run typecheck
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
- `SANITY_API_WRITE_TOKEN` only for `npm run seed`

## Content Model

Every page's text is editable in the Studio. Documents fall into three groups.

**Page singletons** — exactly one document each, reachable from the Studio sidebar.
The Studio blocks creating, duplicating or deleting them so a page can never end up
with two competing documents.

| Document | Controls |
| --- | --- |
| `homepage` | start page sections and visibility toggles |
| `servicesPage` | header, link label and CTA on `/leistungen` |
| `projectsPage` | header, empty state and CTA on `/projekte` |
| `mapPage` | header, counter labels and demo notice on `/projektkarte` |
| `contactPage` | header, office card, opening hours and form texts on `/kontakt` |
| `legalPage` | two fixed documents, `impressum` and `datenschutz` |

**Content types** — any number of documents.

| Document | Controls |
| --- | --- |
| `project` | `/projekte`, `/projekte/[slug]`, featured projects, and the map when `countryIso` is set |
| `service` | `/leistungen` cards, `/leistungen/[slug]` detail pages, and the footer service links |

**Global settings** — `siteSettings` holds branding, contact details, legal
particulars (managing director, register, VAT ID), footer, 404 texts, social links,
SEO defaults and contact form routing.

### Conventions

- **Adding a service** creates its detail page automatically — the route is
  `/leistungen/<slug>`, and sitemap, footer and the "next service" link follow along.
  No code change needed.
- **Legal particulars live only in `siteSettings`.** The Impressum renders them from
  there via the "Pflichtangaben automatisch einblenden" toggle, so the address exists
  in exactly one place. `data/legalContent.ts` fills in any field left empty, so a
  mandatory disclosure can never go missing.
- **Every page has an optional SEO block.** Empty fields fall back to the page's own
  title and the site-wide description, so a blank field never yields a blank tag.
- **Headings support `*italic*`** — e.g. `Projekt*karte*.` renders "karte" in italics.

### Fallbacks

Nothing on the site depends on Sanity being reachable. `data/projects.ts`,
`data/services.ts` and `data/legalContent.ts` supply the original content whenever a
document is missing, empty, or the dataset is unavailable. Images work the same way:
an image uploaded in the Studio always wins, and the previous Unsplash placeholder
shows until then.

### Seeding

To move the original hardcoded content into an empty dataset:

```bash
# Needs SANITY_API_WRITE_TOKEN (Editor permissions) in .env.local
npm run seed              # only creates what does not exist yet
npm run seed -- --force   # also replaces existing documents (asks first)
```

The default run never touches documents already edited in the Studio. It also
back-fills the legal fields on an existing `siteSettings` document without
overwriting values that are already set. Images are not seeded — upload them in the
Studio.

## Deployment

The project is Vercel-ready. Configure the same environment variables in Vercel
and add a Sanity webhook:

- URL: `https://<domain>/api/revalidate`
- Method: `POST`
- Header: `x-revalidate-token: <REVALIDATE_SECRET>`

The revalidation endpoint refreshes the homepage, the legal pages, and the project,
service, map and contact routes. Detail pages are refreshed by route pattern, so
newly created projects and services are covered without editing that list.
