# AGENTS.md — Fola Oluwafemi Portfolio (Web)

> **Read this first.** Project rules for agents working in this codebase.
> Onboarding docs: [`about/about.md`](./about/about.md) ·
> [`about/status.md`](./about/status.md).

## What is this codebase?

The production web rewrite of the Flutter portfolio in `../flutter`
(read-only reference). Next.js App Router + TypeScript + Tailwind CSS v4.
Feature-first architecture imported from the Harpenin app
(`../harpenin/harpenin-app`) — see `about/about.md` for the structure map
and the rationale.

## Key rules for agents

1. **Read `about/` first** — project context, architecture map, and current
   status before touching anything.
2. **Never invent content.** Every string traces to a feature domain
   registry (`src/features/*/domain/`) or a truthful placeholder. Owner
   content gaps live in `CONTENT.md` — never fabricate values to fill them.
3. **Semantic tokens only.** Colors: `surface-*`, `content-*`,
   `border-default`, `brand*`. Fonts: `font-heading`/`font-body` via
   `Typography` tokens. No raw hex, no arbitrary palette classes in
   components (dynamic accents go through `tools/utils/Contrast.ts`).
4. **Feature-first structure.** New screens/features go in
   `src/features/<snake_case>/presentation/` with `domain/` beside them;
   `src/app/*` route files stay thin (server exports + feature re-exports).
   Shared UI lives in `src/tools/components/common/`; design-system pieces
   in `src/core/design_system/`.
5. **Every surface needs complete states**: hover, active, focus-visible,
   disabled where applicable; loading (Shimmer), empty, and error states
   wherever content can be absent.
6. **Motion via CSS, not libraries.** Compositor-only (`transform`/
   `opacity`); the global `prefers-reduced-motion` switch must silence
   everything. No animation dependencies.
7. **Respect the signature interactions**: the work-listings hover
   choreography (timings documented in `WorkListings.tsx`), magic text,
   typewriter, scroll tracker, and the drag-down light-bulb theme toggle.
   Restyle freely; do not change their timing or pointer contracts without
   re-verifying.
8. **Before writing Next.js-specific code**, read the Next.js block below —
   this version has breaking changes vs. training data.

## Commands

```bash
npm run dev      # development (Turbopack) → http://localhost:3000
npm run lint     # ESLint
npm run build    # production build (static prerender)
npm run start    # serve the production build
```

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
