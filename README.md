# Portfolio — Adam Paľo

A premium, animated personal portfolio for a Data Analytics / AI student, built to feel like an Awwwards / Framer-showcase piece.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** (CSS-variable theming, dark by default)
- **Framer Motion** for animation, **GSAP** available where needed
- **Lucide** icons
- Fully responsive, accessible, SEO-optimized (OG + JSON-LD)

## Getting started

```bash
cd portfolio
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## ✏️ Editing content — one file

**All** content lives in [`src/config/portfolio.ts`](src/config/portfolio.ts):
projects, skills, experience, education, certifications, tech stack, stats,
testimonials, social links, and personal info. Update that file and the whole
site updates — no component edits required.

Site-level metadata (title, description, domain, nav order) lives in
[`src/config/site.ts`](src/config/site.ts). Set `site.url` to your real domain
before deploying.

Icons are referenced by string key and resolved in
[`src/lib/icons.tsx`](src/lib/icons.tsx) — add new ones to that registry.

## Structure

```
src/
  app/            # routes, layout, globals, SEO (sitemap/robots), 404
  components/
    providers/    # Theme, CommandPalette (⌘K), Cursor
    layout/       # Navbar, Footer, LoadingScreen, ScrollProgress, BackToTop
    ui/           # primitives: Section, Reveal, SpotlightCard, Magnetic…
    sections/     # Hero, About, Skills, Projects, Experience, Education…
  hooks/          # useMediaQuery, useScrollSpy, useMousePosition, useLockBody
  config/         # portfolio.ts (content) + site.ts (meta)
  lib/            # utils + icon registry
```

## Features

Loading screen · custom cursor · command palette (⌘K) · scroll progress ·
back-to-top · light/dark toggle with persistence · animated particle background ·
project filtering + search + detail modal · expandable experience timeline ·
animated counters · testimonial carousel · magnetic buttons · scroll reveals ·
parallax hero · reduced-motion support · structured data.

## Notes

- The contact form has no backend; it composes a `mailto:` as a graceful
  fallback. Wire it to an API route / form service when ready.
- Add real assets to `/public`: `resume.pdf`, `og.png` (1200×630). Project
  covers render as generated monograms, so no per-project images are required.
