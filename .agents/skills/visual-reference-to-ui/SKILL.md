---
name: visual-reference-to-ui
description: Triggers when turning a screenshot, wireframe, Figma mock, or visual description into production React web UI (Next.js App Router + Tailwind CSS v4). Enforces the 4-phase derivation pipeline, semantic design tokens, complete interaction states, and the borderless rounded-surface aesthetic — preventing off-system colors, hardcoded fonts, and dummy data.
metadata:
  version: "1.0.0"
  author: Fola Oluwafemi
  adapted_from: Harpenin visual-reference-to-ui (React Native) — rewritten for React web
---

# Visual Reference to UI Generation Skill

Internal 4-phase protocol for deriving production-ready, interactive React web
UI from visual references, screenshots, wireframes, or detailed UI
descriptions. Web port of the Harpenin skill: the methodology is preserved;
React Native / NativeWind / haptics / Supabase mechanics are replaced with
Tailwind CSS v4, semantic tokens, and CSS motion.

## Internal Execution Protocol (Zero-Fluff Output)

This skill is an *internal cognitive pipeline*. Do not dump step-by-step
metadata, summaries, or phase outputs to the user. Perform all 4 stages
internally and directly output production-grade, state-complete code.

## Strict Prohibitions

1. **No Borders or Drop Shadows as decoration**: elevation comes from surface
   contrast (`bg-surface-primary` #171717 vs `bg-surface-card` #262626) and
   rounded corners (12/16/24px, pills fully rounded). Structural hairlines are
   the exception and always `border-border-default` at low alpha — never a
   1px+ solid frame around a card, row, pill, or button.
2. **No Fallback Objects in UI Components**: never hardcode dummy strings,
   fake names, placeholder image URLs, or mock data inside UI components.
   Bind to the real registries in `src/features/*/domain/`. Missing content
   renders an honest empty state, never an invented one.
3. **Strict Data Contract Binding**: UI binds exclusively to real content
   (feature domain modules, `public/` assets). If data is absent, render the
   truthful placeholder the project already ships (see `CONTENT.md` for
   owner-supplied gaps). Never invent values to fill a layout.
4. **Semantic Tokens Only**: colors via `bg-surface-*`, `text-content-*`,
   `border-border-default`, `bg-brand`, `bg-brand-magenta`, `bg-brand-blue`,
   `text-success`, `text-error`; fonts via `font-heading` / `font-body` and
   the `Typography` tokens. NEVER raw hex (`#171717`, `#ffffff`) or arbitrary
   Tailwind palette colors (`zinc-900`, `gray-100`) in components. The only
   sanctioned dynamic color is a per-work accent derived through
   `getContrastColor` / `withAlpha` (`src/tools/utils/Contrast.ts`).

## Phase 1 — UX Intent & Mental Model (The Why)

Before mapping pixels, establish:
1. **User Goal & Primary CTA** — the single action this surface exists for.
2. **Visual Weight Hierarchy (3 levels)**:
   - *Focal (L1)*: the display type or primary action (Spline Sans display
     token, inverted pill button).
   - *Supporting (L2)*: content structure — rows, cards, nav items.
   - *Secondary (L3)*: helper text, timestamps, meta — `text-content-tertiary`,
     `Typography.bodySmall`/`caption`.
3. **Prediction vs. Reference loop**: predict the layout from UX heuristics
   (F-pattern scanning on desktop, bottom-anchored actions on mobile), then
   compare with the reference. If the reference shows a custom pattern, bias
   strongly towards the reference while keeping the project's token system.

## Phase 2 — Infrastructure & Data Discovery (The Data)

Identify where every piece of content lives before writing markup:
- Static registries: `src/features/<feature>/domain/*.ts` (e.g. `Works.ts`,
  `Navigation.ts`) — the only data sources; there is no backend.
- Media: `public/images/*`, loaded through `next/image` with a `Shimmer`
  skeleton behind it while loading.
- State categorization: persistent UI state via React state; theme via
  `useTheme` (root `data-theme`); nothing else — do not introduce state
  libraries or fake stores.

## Phase 3 — Semantic UI Decomposition & Token Mapping (The Components)

Map every visual element to existing primitives before creating anything new:
- Buttons/actions: inverted pill (`bg-content-strong text-surface-primary
  rounded-full` + `Typography.button`), `PressableScale` for press feedback,
  `AnimatingPillButton` for nav pills with the cursor-following underline.
- Containers: `bg-surface-card rounded-2xl` (16) / `rounded-3xl` (24) cards;
  `bg-surface-subtle` inset chips.
- Type: spread a `Typography` token (`src/core/design_system/theme/Typography.ts`);
  see the text-styling skill for the four hard rules.
- Spacing rhythm: 4/8/12/16/20; content constrained to the 1440px max-width
  column on desktop.
- Responsive: `tablet:` 744px, `desktop:` 1280px, `monitor:` 1728px — all
  variants render from SSR via CSS, never client-side detection for layout.

## Phase 4 — State Machine & Compound Interaction Engineering (The Interactions)

Every interactive element implements the full state machine:
- **Idle**: default token styling.
- **Hover**: `hover:opacity-80/90` or surface step-up (`hover:bg-surface-subtle`);
  never a new font weight (reflow).
- **Active/Pressed**: `active:scale-[0.96]` (buttons) via `PressableScale`, or
  `active:opacity-90`.
- **Focus-visible**: the global `:focus-visible` brand ring — never remove it.
- **Disabled**: `disabled:opacity-40 disabled:pointer-events-none`.
- **Loading**: imagery → `Shimmer` skeleton matching real geometry; actions →
  inline `TriGradientLoader` + disable double-submits.
- **Empty**: friendly centered state (see `CraftsScreen`) — beacon dot +
  heading + tertiary copy + recovery CTA. Never a blank area.
- **Error**: `app/error.tsx` pattern — display heading, secondary copy,
  inverted-pill retry.
- **Reduced motion**: all motion must be CSS transitions/keyframes so the
  global `prefers-reduced-motion` kill switch silences it. Never animate
  layout properties; animate `transform`/`opacity` only.

## Verification Checklist

- [ ] Zero raw hex/RGB in component markup (grep for `#` in className/style).
- [ ] Zero hardcoded `fontFamily`/`font-` utilities outside `font-heading`/`font-body`.
- [ ] Every interactive element: hover + active + focus-visible + disabled.
- [ ] Loading (shimmer), empty, and error states exist wherever content can be absent.
- [ ] Surface hierarchy achieved by background contrast, not borders/shadows.
- [ ] Motion is CSS-only, compositor-friendly, and reduced-motion safe.
- [ ] No invented data: every string traces to a domain registry or a truthful
      placeholder documented in `CONTENT.md`.
