# Fola Oluwafemi — Portfolio (Web)

Production web rewrite of the Flutter portfolio in `../flutter` (read-only
reference). Built with Next.js App Router, TypeScript, and Tailwind CSS v4 —
no animation libraries; every motion is CSS transitions or timers.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static production build
```

## Structure

- `src/app/` — routes: `/` (hero + work listings), `/works/[slug]` (case
  studies), `/crafts`, `/about-me`, `/contact` (truthful placeholders).
- `src/components/works/` — the work listings hover choreography (ported
  1:1 from the Flutter `listings` views, timings included) and the phone
  preview mock-up.
- `src/components/hero/` — magic-text reveal, typewriter, scroll progress
  tracker, angle-tracking theme bulb.
- `src/data/works.ts` — the work registry (content source of truth for code).
- `src/lib/` — fonts (self-hosted via `next/font/local`), theme, helpers.

## Project docs

- `PLAN.md` — the migration spec and QA gates.
- `CONTENT.md` — registry of owner-supplied content gaps (copy, URLs,
  screenshots, domain). Nothing there is invented in this codebase.
- `VERIFICATION.md` — build/lint/a11y verification record.
- `../flutter` — the original app; do not modify.

## Conventions

- Semantic color/font tokens only (`grey-100…800`, `font-aeonik`, …) — no raw
  hex in components.
- Motion via CSS, not libraries; `prefers-reduced-motion` disables it.
- No placeholder content and no dead controls: anything unverified is
  omitted or honestly labeled until the owner supplies it.
