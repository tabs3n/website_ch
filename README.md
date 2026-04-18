# Cologne Hunters — Licht und Ton Service GmbH

Premium, production-ready Next.js 14 website for a Cologne-based event technology company (lighting, sound, video, rigging, conferencing).

Built with:
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom dark palette: ink / steel / accent blue)
- **Framer Motion** for page transitions, scroll-reveals, hover interactions
- Fully responsive, SEO-ready (metadata, sitemap, robots)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
```

## Deployment

Zero-config deploy to Vercel — just push to a GitHub repo and import the project.

## Structure

- `app/` — App Router routes
  - `/` · homepage
  - `/leistungen` · services overview
  - `/leistungen/{licht,ton,video}` · service detail pages
  - `/projekte` · case study grid
  - `/projekte/[slug]` · dynamic case study pages (prerendered via `generateStaticParams`)
  - `/kontakt` · contact page with client-side form
- `components/` — shared UI (Hero, Navbar, Footer, ProjectCard, ServiceDetail, ContactForm, …)
- `data/projects.ts` — central case-study data source. Add a new object to the array → a new page.

## Adding a project

Open `data/projects.ts` and append a new `Project` object. No other changes needed — the overview grid and `/projekte/[slug]` route pick it up automatically.

## Hero video

Drop an MP4 at `public/videos/hero.mp4`. The `Hero` component auto-detects it and cross-fades from the fallback image. If no video is present, the fallback image stays visible.

## Contact form

The form posts client-side and shows a success state. For production, wire the handler in `components/ContactForm.tsx` to an API route, Resend, Formspree, or similar.
