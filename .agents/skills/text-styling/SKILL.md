---
name: text-styling
description: Triggers when applying typography to any component, configuring font loading, or referencing the centralized Typography design system for headings (Spline Sans) and body text (Manrope). Prevents hardcoded font families, weight/line-height drift, and off-scale type.
metadata:
  version: "1.0.0"
  author: Fola Oluwafemi
  adapted_from: Harpenin text-styling — same token scale, retargeted from expo-font to next/font/local + Tailwind
---

# Text Styling Standard

## Architecture

This project uses a **centralised Typography token system** in
`src/core/design_system/theme/Typography.ts`. Two font families are used,
both self-hosted (no CDN, no Google Fonts links) via `next/font/local` in
`src/core/design_system/theme/Fonts.ts`:

- **Spline Sans** (600/700) → headings/display ONLY (`font-heading`)
- **Manrope** (400/500/600/700) → body, labels, buttons (`font-body`)

`layout.tsx` exposes both as CSS variables
(`--font-spline-sans-var` / `--font-manrope-var`); the Tailwind theme maps
them to the `font-heading` / `font-body` utilities. `body` defaults to
Manrope.

## The Token Scale

Headings — Spline Sans (negative tracking on display sizes):

| Token | Weight | Size/Leading | Tracking | Use |
|---|---|---|---|---|
| `displayHero` | 700 | clamp(3rem,15vw,220px) / 0.95 | -0.02em | Monumental hero display |
| `displayWork` | 700 | 60 / 64 | -1.5px | Work listing names, detail titles |
| `displayLarge` | 700 | 40 / 44 | -1.5px | Hero titles |
| `heading1` | 700 | 24 / 30 | -0.5px | Page titles |
| `heading2` | 600 | 21 / 28 | -0.3px | Section headers |
| `heading3` | 600 | 18 / 24 | — | Card titles, sub-headers |

Body / labels — Manrope:

| Token | Weight | Size/Leading | Use |
|---|---|---|---|
| `bodyLarge` | 400 | 15 / 20 | Primary body text |
| `bodyMedium` | 400 | 13 / 18 | Secondary body, descriptions |
| `bodySmall` | 400 | 11 / 16 | Meta text, timestamps |
| `bodyLargeSemibold` | 600 | 15 / 20 | Emphasised body |
| `bodyMediumSemibold` | 600 | 13 / 18 | List titles, emphasised meta |
| `labelLarge` | 500 | 15 / 20 | Large labels |
| `labelMedium` | 500 | 13 / 18 | Form labels, chip text |
| `labelSmall` | 500 | 11 / 16 | Tiny labels |
| `labelBold` | 700 | 13 / 18 | Bold labels, emphasis |
| `button` | 700 | 15 / 20 | Button text |
| `caption` | 400 | 11 / 16 | Captions, legal text |

## Usage Rules

**Always use tokens from `Typography`. Never hardcode font utilities ad hoc.**

Correct — spread a token:
```tsx
import { Typography } from "@core/design_system/theme/Typography";

<h1 className={Typography.heading1.className}>Work</h1>
```

Correct — spread and override only what you need (NOT the family):
```tsx
<h1 className={`${Typography.displayWork.className} desktop:text-[72px] desktop:leading-[76px]`}>
  {work.name}
</h1>
```

Wrong — banned:
```tsx
// NEVER do this:
<h1 className="font-heading font-bold text-[40px]">Work</h1>   // off-token assembly
<p className="text-[15px]">…</p>                               // no family, no token
<span className={`${Typography.bodyLarge.className} font-bold`}> // stacking a weight onto a token
```

Custom sizes: "Pick the closest token and override only `text-[…]` and
`leading-[…]` **together**" — size and line height are a pair.

## Common Pitfalls (the four hard rules)

1. **Never hardcode a font family** — always a `Typography` token
   (`font-heading`/`font-body` come from the token, never hand-picked).
2. **If you override the size, also set the line height** proportionally.
3. **Don't set a font-weight utility alongside a Typography token** — the
   token already encodes the weight.
4. **Spline Sans = headings only** — body text always uses Manrope.

## Verification Checklist

- [ ] Every text element traces to a `Typography` token (or a documented
      size+leading pair override).
- [ ] No `font-heading` on body/label/button text.
- [ ] No `font-bold`/`font-semibold` utilities appended to a token className.
- [ ] Display sizes carry negative tracking.
