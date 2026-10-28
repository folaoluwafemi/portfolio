# About this project

## What & why

This is the **React web rewrite** of the Flutter portfolio (`../../flutter`,
read-only reference). It exists because the Flutter app cannot serve the open
web with static hosting, SEO, and deep-linkable routes.

The architecture and visual language are imported from the **Harpenin app**
(`../../harpenin/harpenin-app`, an Expo/React Native product): feature-first
folder structure, semantic design tokens, agent skills, and the borderless
rounded-surface aesthetic with Spline Sans + Manrope. Harpenin's React Native
patterns were translated to Next.js/React web idioms — nothing Expo-specific
was copied.

## Structure

```
src/
├── app/                      # Next.js App Router — thin route layer
│   └── works/[slug]/         #   server exports (generateStaticParams,
│                             #   metadata) + feature screen re-exports;
│                             #   no UI logic lives here
├── core/
│   └── design_system/theme/  # Fonts.ts (next/font/local), Typography.ts
│                             # (token scale), Theme.tsx + theme-script.ts
├── features/                 # snake_case, one folder per product feature
│   ├── home/                 #   presentation/screens/HomeScreen
│   ├── hero/                 #   presentation/components (hero, magic text,
│   │                         #   typewriter, scroll tracker, light bulb)
│   ├── works/                #   domain/Works.ts (registry) +
│   │                         #   presentation/{components,screens}
│   ├── navigation/           #   domain/Navigation.ts + presentation/components
│   └── crafts|about_me|contact/  # presentation/screens
└── tools/                    # cross-feature shared code
    ├── components/common/    #   Icons, PressableScale, Shimmer,
    │                         #   FloatingSparkles, TriGradientLoader
    ├── hooks/                #   useMediaQuery
    └── utils/                #   Contrast (YIQ), Urls
```

Conventions: feature folders `snake_case`; component/screen files `PascalCase`;
path aliases `@core/*`, `@features/*`, `@tools/*` (plus `@/*`); routes stay
thin re-exports; only folders with real content exist (no scaffolding).

## Data flow

Static registries in `features/*/domain/` are the single content source
(`Works.ts`, `Navigation.ts`). Screens/components import them directly —
there is no backend, no client store, no fetching. Owner-supplied content
gaps (real case-study copy, store URLs, socials, screenshots, domain) are
catalogued in `../CONTENT.md` and render truthful placeholders until
supplied.

## Design system

- **Tokens** (`globals.css`): `surface-primary #171717` / `surface-card
  #262626` / `surface-subtle` (light theme flips to Harpenin's light
  neutrals), `content-strong/secondary/tertiary`, `border-default`,
  `brand #FF4D00` + magenta/blue triad. Elevation by surface contrast —
  borders only as low-alpha hairlines.
- **Type**: Spline Sans (headings only, negative tracking on display) +
  Manrope (everything else); token table in `core/design_system/theme/Typography.ts`.
- **Effects**: see `.agents/skills/premium-ui-effects` — shimmer, beacon,
  particles, tri-gradient loader, press-scale, all CSS/compositor-only.

## Agent skills

`.agents/skills/` — four skills govern work in this repo:
`visual-reference-to-ui` (deriving UI from references), `premium-ui-effects`
(motion/effects rules), `text-styling` (typography tokens), and
`create-agent-skill` (how to author more skills in this format).

## Status

See `status.md` for what is done, what superseded what, and what is pending.
