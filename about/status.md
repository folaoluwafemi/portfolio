# Project status

## Pass 1 — Flutter parity (complete, superseded visually)

The first migration pass reproduced the Flutter app 1:1 (fonts, grey ramp,
bordered rows, hover choreography timings). Its record lives in
`../VERIFICATION.md` ("Parity pass 2"). The **interaction engineering** from
that pass is still live and must be preserved:

- Work-listings hover choreography — timings/z-order/pointer contract
  documented at the top of
  `src/features/works/presentation/components/WorkListings.tsx`
  (50ms slide delay, 500ms tweens, 500ms zoom, 550ms z-flip, instant exit,
  126-unit hit region, pointer-transparent overlays).
- Magic text, typewriter, scroll-progress tracker, drag-down light bulb.

## Pass 2 — Harpenin architecture + redesign (this pass)

- Feature-first restructure: `src/features` + `src/core` + `src/tools`,
  thin `app/` routes, path aliases. Behavior-neutral; build green.
- Design system swap: Spline Sans + Manrope (self-hosted), semantic
  surface/content/border tokens with dark+light themes, Typography tokens,
  Harpenin borderless rounded surfaces, brand triad `#FF4D00/#E000E0/#1D4ED8`.
- Effects ported as real components: PressableScale, Shimmer (hero image
  underlays), FloatingSparkles (light-bulb release), TriGradientLoader
  (phone placeholder), YIQ `getContrastColor` (work accents).
- Surfaces restyled: hero (scrim gradients + display type), work listings
  (surface cards, choreography untouched), work detail (accent panel with
  runtime contrast, inverted pills), crafts/about/contact empty states,
  error/404.
- `.agents/skills/`: 4 skills (3 web-adapted + create-agent-skill verbatim).
- `AGENTS.md` project rules + `about/` docs.

**Superseded**: `PLAN.md`'s Flutter-parity visual specs (sizes/fonts/colors)
are historical — the visual authority is now the Harpenin-derived token
system in `globals.css` + `Typography.ts`. Interaction timings remain
governed by the choreography contract above.

## Pending (owner-blocked)

See `../CONTENT.md`: work-specific copy, verified store URLs, social/contact
destination, hero photo decisions, real product screenshots, production
domain for sitemap/robots.
