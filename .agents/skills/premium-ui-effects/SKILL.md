---
name: premium-ui-effects
description: Triggers when designing high-performance web animations, floating particle reactions, dynamic brand color contrast, pulsing status beacons, shimmer skeletons, or gradient loaders. Enforces compositor-only CSS motion and self-pruning particles — preventing layout-thrashing animations and frame drops.
metadata:
  version: "1.0.0"
  author: Fola Oluwafemi
  adapted_from: Harpenin premium-ui-effects (React Native Animated) — rewritten for CSS/web
---

# 🎨 Premium UI Effects & Micro-Animations (Web)

The visual rendering guidelines for this project's signature effects. Web
port of the Harpenin skill: `Animated`/`useNativeDriver` becomes CSS
keyframes and transitions (which run on the compositor by construction),
and the discipline carries over unchanged.

---

## 📐 The Repeating Patterns

### 1. High-Performance Particle Reactions

Floating sparkle/emoji bursts on user actions (see
`src/tools/components/common/FloatingSparkles.tsx`):
- **Event-Driven State**: React state only grows on `burst()` and shrinks on
  animation end — never per frame. The animation itself is 100% CSS.
- **CSS Keyframe Driver**: each particle animates `transform` + `opacity`
  via the `.particle` keyframe (rise, random drift via `--drift`, fade after
  60% of the 2s timeline) — compositor-only properties, no layout thrash.
- **Self-Pruning Elements**: each particle unmounts itself in
  `onAnimationEnd` (guard on `event.animationName === "particle-rise"`), so
  the pool can never leak.

```tsx
const { burst, layer } = useFloatingSparkles(["✨", "💡", "✨"]);
// on action: burst(); render {layer} inside a relatively positioned parent
```

### 2. Dynamic POV Contrast & Contrast Matching

Server/data-driven accent colors (per-work brand colors) must compute their
readable text at runtime (`src/tools/utils/Contrast.ts`):
```typescript
export function getContrastColor(hexColor: string): "#FFFFFF" | "#000000" {
  const cleanHex = hexColor.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}
```
- **Translucent Highlighting**: frame accent surfaces with
  `withAlpha(accent, 0.28)` hairlines and tint fills at `0.06–0.1`; never
  place raw accent + hardcoded white/black pairs.
- **Rule**: `onPrimary` values are never stored in data — always derived via
  `getContrastColor` at render time (see `WorkDetailScreen`).

### 3. Pulsing Status Beacon

Infinite soft opacity pulse for "live"/"in progress" signals — the `.beacon`
class (900ms ease-in-out, opacity 0.4 ↔ 1.0). Pure CSS, so the global
reduced-motion switch disables it automatically. Use sparingly: one beacon
per surface, always paired with real meaning (e.g. "content coming").

### 4. Shimmer Skeletons

Loading placeholders mirror the real content's geometry
(`src/tools/components/common/Shimmer.tsx` + `.shimmer-box`): a masked
gradient sweep (900ms loop) over `surface-card`. Rules:
- Skeleton for **content loading** (images, async media) — size the box to
  the element it replaces, not a generic spinner.
- Never wrap tiny inline actions in full-skeletons.

### 5. Tri-Gradient Brand Loader

The SVG arc spinner (`TriGradientLoader.tsx`) stroked with the brand
tri-gradient `#FF4D00 → #E000E0 → #1D4ED8` over a 30% track, 1200ms linear
spin. It is the loading identity — use it for inline action loading and for
honest "not ready yet" placeholders (e.g. inside the phone mock-up).

### 6. High-Fidelity Typography & Letter Spacing

**Always pay attention to letter spacing**: letter spacing is critical for
premium typography, especially for headlines, displays, and inputs. Ensure
letter-spacing values from design specs are faithfully translated to
Tailwind `tracking-*` utilities (display sizes carry negative tracking in
`Typography`). Avoid using browser/default spacing when custom spacing is
specified.

---

## ⚡ Performance Contract

- Animate **only** `transform` and `opacity`. Never transition `top`, `left`,
  `width`, or `height` for motion (layout properties force reflow each frame;
  see the work-listings choreography for the translateY/scale pattern).
- Add `will-change: transform` only to elements that are actively animating
  and short-lived — not as a permanent hint.
- All effects are CSS transitions/keyframes so `prefers-reduced-motion`
  (globals.css) collapses them to 0.01ms — never ship JS-driven rAF loops
  for ambient effects.
- Stress-test particles: a burst of 3 glyphs × several rapid triggers must
  not drop frames; if it can, reduce glyph count instead of adding throttle
  machinery.

## ✅ Verification Checklist

- [ ] Particles self-prune (DOM node count returns to baseline after 2s).
- [ ] Particle/particle-adjacent state changes only on discrete events.
- [ ] Dynamic accent text passes through `getContrastColor` (grep for
      hardcoded `onPrimary` fields — there should be none).
- [ ] Beacons/shimmer/loader all freeze under reduced motion.
- [ ] No layout properties in any `transition:` declaration.
