# Fola Oluwafemi — Portfolio Web Rewrite: Verification Report

Handoff report for the Flutter → Next.js web rewrite, per PLAN.md §14.

## Adversarial pass (post-review fixes)

A second comparison pass against the Flutter source found and fixed five bugs:

1. **Blank work section** — the desktop listing rows were gated behind a
   hover-timer (`opacity 0` until hover), so the whole section appeared blank
   while still being clickable. The Flutter original renders MainButton in both
   branches (always visible; only padding changes on hover). Fixed: rows are
   always visible; the hover padding swap (`pb-2 → pb-0`) is preserved.
2. **Typewriter** — the Flutter source has a (commented-out) AnimatedTextKit
   typewriter between `-` and `ENGINEER` cycling FLUTTER / TABLET / WEB / MOBILE
   at 250ms/char with no cursor. Now implemented (`TypewriterWord.tsx`) with a
   reserved-width placeholder so the intro paragraph never shifts, and a static
   `MOBILE` fallback under `prefers-reduced-motion`.
3. **Angle-tracking bulb** — two defects: the rotation used the wrong transform
   (Flutter's net rotation is `90 - angle` degrees around the top anchor; the
   exact `angle = 90·dx/dist + 90` formula is now used), and the wrapper's
   `pointer-events-none` made the bulb impossible to drag/click. Fixed
   (`pointer-events-auto` on the bulb), and the bulb now server-renders
   (CSS-hidden below desktop) so it appears immediately.
4. **Work detail page** — mobile action bar overflowed with the full NavWidget
   (Flutter uses the hamburger there); now: hamburger + expanding menu on
   mobile/tablet, NavWidget on desktop. Accent text failed WCAG (white on
   `#FF5D00` = 3.08:1); all four works now use black `onPrimary`/`onPrimaryInverse`
   (computed 5.2–7.8:1), and body text no longer uses 70% opacity.
5. **SSR completeness** — listings variants switched to CSS-only visibility
   (both compact and desktop rows present in SSR HTML), scroll tracker and bulb
   included in SSR markup.
6. **Hover choreography (listing rows)** — restructured to match the Flutter
   Stack semantics exactly: the hovered row stays anchored at the top, its
   container snaps from 110px to 300px tall (pushing all rows below down, the
   "displace" effect), and the detail card / phone preview / arrow slide into
   the newly opened space with the original timings (50ms delay, 500ms
   transitions, phone scale at +450ms). The previous structure moved the row
   itself, which also caused a pointer-leave flicker loop.
7. **Typewriter spacing** — the cycling word now renders inline with natural
   width, so `ENGINEER` follows it dynamically (no fixed reserved-width gap).
   An `sr-only` "MOBILE" keeps the phrase stable for screen readers while the
   visible word animates.
8. **Case-study content check** — searched the current tree AND the full git
   history (`git log -S/-G`, works.dart across all touching commits, the
   deleted `works/task_sphere_preview` project): no work-specific case study
   was ever committed; all four works always shared the same placeholder
   overview. The `needs-copy` states are accurate.

## What was verified

### Build & lint

- `npm run lint` — 0 errors, 0 warnings (ESLint 9 flat config, Next 16 defaults).
- `npm run build` — succeeds on Next.js 16.3.1 (Turbopack). 13 routes prerendered
  statically:
  - `/`, `/crafts`, `/about-me`, `/contact`, `/sitemap.xml`, `/robots.txt`, `/_not-found`
  - `/works/{gocreative,pfund,haven,tasksphere}` (SSG via `generateStaticParams`,
    `dynamicParams = false`)

### Routes (checked against a production server, HTTP status)

| Route | Status |
|---|---|
| `/` | 200 |
| `/works/gocreative`, `/works/pfund`, `/works/haven`, `/works/tasksphere` | 200 |
| `/works/not-a-real-work` | 404 |
| `/crafts`, `/about-me`, `/contact` | 200 |
| `/sitemap.xml`, `/robots.txt` | 200 |

### Assets (served from production paths)

- Fonts: Aeonik (3 files), Helvetica Now Display (2), Landsans Demo (1) — all 200,
  loaded via `next/font/local` (no CDN).
- Images: `fola_image_8.jpg` (hero), `fola_image_3.jpg` (tablet hero) — 200.
- Vectors: `arrow.svg`, `arrow_up_right.svg` — 200 (inlined as `currentColor` icons
  in `src/components/ui/icons.tsx`).
- `favicon.png`, `manifest.json`, PWA icons — 200. Manifest metadata updated
  (no more "fola_oluwafemi_portfolio" / "A new Flutter project").

### SSR integrity (inspected production HTML)

- Theme: inline pre-hydration script present; `data-theme` on `<html>`; default dark.
- Hero: all three compositions server-rendered; exactly one visible per viewport
  (others `display:none`, which removes them from the accessibility tree).
  The flagship desktop hero — Landsans "FOLA OLUWAFEMI" display type, magic-text
  overlay, "- ENGINEER" — is present in SSR HTML (no client-only first paint).
- Detail pages: `--work-primary`/`--work-variant` accent variables server-rendered;
  truthful `needs-copy` state rendered (no invented case-study copy).
- `aria-current="page"` confirmed in SSR HTML on detail and sub pages.
- One visible `h1` per route; exactly one per hero composition.

### Adversarial grep sweep (PLAN.md §12)

No occurrences of: `google.com`, fake store URLs, `balablu`, `onPressed:`,
`console.log`, `debugPrint`, `Math.random`, random ID generation, or `/flutter` path
references in shipped code. Raw hex appears only in `src/data/works.ts` (brand
palettes, the documented data boundary) and the two `onPrimary`/`onPrimaryInverse`
fallbacks in `WorkDetail.tsx` (mirroring the original model's defaults).

### Accessibility / motion contracts implemented

- Keyboard: every control reachable; visible `:focus-visible`; mobile menu opens on
  trigger, Escape/outside-click close, focus moved to first item and restored to the
  trigger on close; scroll-progress tip operable via arrow/Page/Home/End keys.
- `prefers-reduced-motion`: global kill-switch for CSS transitions/animations plus
  `(hover: none)` gating for the magic-text effect; drag interactions remain
  functional (they are state, not motion).
- Semantic HTML: `nav`, `button`, `a`, `section`, single `h1` hierarchy; decorative
  images `alt=""`; the phone mock-up is explicitly labelled "Preview" and never
  fabricates product UI.
- Touch: hover choreography is confined to `(pointer: fine)` desktop; rows are plain
  Links everywhere else.

## What could not be verified here

- Pixel-perfect visual parity at the 10-viewport matrix (needs a browser + screenshots;
  the plan's M5 gate). The code implements the Flutter measurements documented in
  PLAN.md (sizes, spacings, timings: 50ms micro-delays, 500ms primary tweens,
  450–550ms staggers) but no automated screenshot comparison exists.
- Lighthouse / Core Web Vitals numbers.
- Real-browser interaction of the drag gestures (pointer capture paths are
  implemented per spec; needs manual check).

## Known limitations / intentional adaptations

- `sitemap.ts` emits an empty document until `NEXT_PUBLIC_SITE_URL` is configured
  (no placeholder domain is published) — see CONTENT.md §6.
- The three hero compositions coexist in the DOM, toggled by CSS; hidden compositions
  contain their own `h1` (invisible, out of the a11y tree via `display:none`).
- Social buttons (Twitter/GitHub) and "Download on" links are omitted entirely until
  verified URLs are supplied (never rendered as dead controls).
- Work detail pages are real routes (`/works/[slug]`) — a deliberate web adaptation
  of the original in-memory overlay (deep-linkable, refresh-safe, browser history).

## Owner-supplied content gaps

See `CONTENT.md` — work copy (overview/challenges ×4), verified store URLs ×4,
social/contact destination, hero photo decision, product screenshots, production
domain.

## Commands

```text
npm run dev      # development (Turbopack)
npm run lint     # ESLint
npm run build    # production build (static prerender)
npm run start    # serve the production build
```

---

## Parity pass 2 (2026-08-22): work-listing hover choreography

A second parity audit against the Flutter source found and fixed nine defects
in the work-listing hover animation, plus adjacent gaps:

1. Hover card never rendered (gated on `contentStatus === "ready"` which no
   work satisfies) — the Flutter original always shows `ItemDetail`; the
   card now renders from the ported `overview` copy.
2. Hover flicker/collapse loop — overlays stole pointer events from the row;
   they are now `pointer-events: none` and hover is tracked on the item
   container, which at rest is exactly the original's 126-unit hit region
   (8 + 110 + 8), so adjacent items hand the pointer over seamlessly.
3. Phone zoom double-delayed (timer at 500ms plus a 450ms `transitionDelay`
   → ran 950–1450ms instead of 500–1000ms) — the extra delay is removed.
4. Arrow rotated 0°→-90°; the original does a half-turn 180°→0° starting at
   t=50ms — restored; the dead `rotate-180` class is gone.
5. Missing z-order flip — the original keeps the row button above the
   entering overlays for 550ms so the card/phone emerge from behind the row
   (`showButton` dance); reimplemented with a `buttonOnTop` state.
6. Layout-property transitions (`top`) replaced by composited
   `transform: translateY()`/`scale()` with `will-change`.
7. Phone screen placeholder now matches `PreviewScreen`: 72-unit app-bar with
   32-unit name, divider, centered add-home-work glyph on the scaffold token
   (`grey-200`), replacing the "Preview" caption on `grey-100`.
8. Tablet (744–1280px) previously showed mobile compact rows; it now gets
   the original tablet choreography (phone scale 0.3, card top 114/16px
   radius/1px border, 400px expansion, no arrow, tablet row typography with
   portrait variants).
9. Hovered row no longer dims (`hover:opacity-80` removed — the original
   dims only non-hovered rows while the list is hovered).

Also: `overview` copy ported verbatim from `works.dart` for parity
(CONTENT.md §1 updated; `contentStatus` stays `"needs-copy"`); detail page
renders Overview/Challenges independently of each other; the inert
`data-scroll-behavior` attribute replaced by real CSS `scroll-behavior`
(covered by the existing reduced-motion override); README rewritten for the
actual project. Hero image loading was audited and left as-is: the two
compositions share one `fola_image_8.jpg` URL (single fetch) and the tablet
photo is lazy inside `display:none` (not fetched until shown).

Known deviations (deliberate, documented in the parity report): fixed px
sizing with a centered 1440px cap instead of the original's proportional
screenutil scaling and monitor scale-up.
