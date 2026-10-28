# Fola Oluwafemi Portfolio Web Rewrite

Implementation specification for a cheaper agent. The target is a production-ready web
rewrite in `/portfolio`, based on the audited Flutter application in `/flutter`.

## 0. Operating Rules

- Work only inside `/portfolio`. Treat `/flutter` as read-only reference material.
- The rewrite is **React for web**, not React Native.
- The selected stack is **Next.js App Router + TypeScript + Tailwind CSS**.
- Do not add Framer Motion or another animation library. Use CSS transitions/keyframes and
  React/browser event handlers.
- Do not port Flutter architecture, package names, dead code, or placeholder content.
- Work milestone by milestone. A milestone is complete only when its acceptance checks pass.
- Do not claim visual parity without checking the rendered page at the required viewports.
- Read `.opencode/skills/visual-reference-to-ui/SKILL.md` before implementing any screen.
- Preserve existing user files in `/portfolio/public`; do not delete, casually rename, or
  replace copied assets. Updating stale metadata inside `manifest.json` is explicitly allowed.

### Requirement labels

- **Source fact** means behavior verified in `/flutter`; preserve it unless an adaptation is
  explicitly recorded.
- **Web adaptation** means a deliberate change needed for URLs, browser history, semantics,
  responsive CSS, or web accessibility.
- **Owner input** means copy, URLs, handles, or product media that are not present in this
  repository. Never invent it.
- **Acceptance criterion** means something the implementing agent must demonstrate, not merely
  describe.

## 1. Verified Source Audit

The original app is a single continuous home experience:

1. Full-height hero/splash section.
2. Work listings below the hero.
3. Detail view replacing the home content when a work is selected.
4. A 1,000 logical-pixel bottom spacer in the original Flutter home screen.

The original has only one registered route, `/`. The enum declares `/crafts`, `/about-me`,
and `/contact`, but those routes are not registered. Their buttons are effectively broken.
The rewrite must make navigation honest and functional.

The four surviving work preview folders contain only color definitions. There are no embedded
Flutter project builds, iframes, WebViews, product screenshots, or real network data in the
repository. Do not promise interactive embedded apps unless actual builds and URLs are later
provided.

The four original work records are:

| Display order | Name | Industry | Original state |
|---:|---|---|---|
| 1 | GoCreative | Mentorship Focused Social for Creatives | unverified Android/iOS/Web URLs; generic unverified overview |
| 2 | Pfund | Offline First Fintech App | empty Android/iOS URLs; unverified Web URL; generic unverified overview |
| 3 | Haven | Complex Story-sharing App | empty Android/iOS URLs; unverified Web URL; generic unverified overview |
| 4 | TaskSphere | Productivity App for Gen-Z's | empty Android/iOS URLs; unverified Web URL; generic unverified overview |

The registry copy is identical across all four records and is not verified final work-specific
copy. The detail implementation also repeats it three and five times to fill space. Do not
reuse that repetition. Mark each work `needs-copy` until the owner approves work-specific text.

The original work IDs are random and regenerate on every launch. The rewrite must use stable
slugs and never use random IDs for routing or React keys.

## 2. Product Decisions

### 2.1 Routes

Implement these routes:

- `/` — hero and work list in one continuous document.
- `/works/[slug]` — deep-linkable work detail page.
- `/crafts` — intentional page or clearly designed unavailable state.
- `/about-me` — intentional page or clearly designed unavailable state.
- `/contact` — a real, navigable contact route. A contact CTA is required only after the owner
  supplies a verified destination.

Use `generateStaticParams()` from the work registry, set `dynamicParams = false` if the
implementation uses static-only known slugs, and use `notFound()` for unknown work slugs. Do
not silently render the first work for an invalid slug. Generate metadata from the work record.

The Flutter detail view was an in-memory view switch with no URL change. A web route is the
required adaptation because it supports refresh, sharing, browser history, and accessibility.
The home listing button may navigate to `/works/[slug]`; the detail page's Go Back control must
use browser history when possible and have a deterministic fallback to `/`.

### 2.2 Content policy

The repository does not contain verified final copy, store links, social handles, or contact
details. The implementing agent must not invent them.

Use one typed registry in `src/data/works.ts`. Until the owner supplies missing values:

- Store links must be `undefined`, not fake URLs.
- Social links must be `undefined` or omitted; do not render dead Twitter/GitHub controls.
- Overview/challenges must use an explicit content state such as `contentStatus: 'needs-copy'`
  and a restrained, truthful message, or the section may be omitted. Never repeat text to fill
  space.
- Crafts/About/Contact must be marked as unfinished in the data or route implementation and
  must remain visually intentional. Do not manufacture biography, client names, email, or
  product claims.

This is a content gap, not an excuse for random placeholder prose. Add a short `CONTENT.md`
inside `/portfolio` listing every missing value and its source requirement. Do not block the
technical rewrite on those values.

Until a verified contact destination exists, `/contact` is considered functional when it loads
directly, has metadata, is keyboard accessible, and presents a truthful unavailable state. It
must not expose an unsendable form. A verified `mailto:` link may be added later.

### 2.3 Static versus dynamic behavior

This is a static portfolio. No API, database, authentication, analytics, upload service, or
network data layer is needed for the initial rewrite. Keep content local and typed.

Use Server Components by default. Add `"use client"` only to components that need browser
state, events, `window`, `document`, `matchMedia`, `localStorage`, pointer input, or scrolling.
Do not access browser APIs during server rendering.

## 3. Stack and Configuration Contract

- Next.js App Router, TypeScript, Tailwind CSS, ESLint.
- No animation package.
- Use `next/font/local` for the copied fonts. Do not load fonts from a remote CDN.
- Use semantic HTML and normal `<a>`/`<Link>` behavior. External links must use
  `target="_blank" rel="noopener noreferrer"`.
- Prefer CSS variables for theme values and work accent values. If Tailwind cannot express a
  dynamic work color safely, set a typed `data-work` attribute or CSS custom properties at a
  route boundary and consume those variables in CSS.
- Do not place raw hex colors in JSX class strings or component-level style objects. Raw values
  belong in the token definition/data boundary only.
- Do not use `dangerouslySetInnerHTML` for portfolio copy.
- Keep dependencies minimal. Any new dependency needs a concrete justification in the PR or
  handoff notes; animation libraries are prohibited.

Recommended scripts:

```text
npm run dev
npm run lint
npm run build
```

If the agent adds tests, use the repository's chosen test runner consistently. Do not add a
test framework merely to satisfy this plan; browser verification is required for interaction
heavy work.

## 4. Asset Contract

Assets have already been copied from `/flutter` into `/portfolio/public`. The agent must use
these files and must not re-copy them, rename them casually, or replace them with remote stock
assets.

```text
portfolio/public/
  fonts/aeonik/Aeonik-Bold.otf
  fonts/aeonik/Aeonik-Regular.otf
  fonts/aeonik/Aeonik-RegularItalic.otf
  fonts/helvetica_now/HelveticaNowDisplay-Medium.ttf
  fonts/helvetica_now/HelveticaNowDisplay-Regular.ttf
  fonts/landsans_demo01/Landasans_demo01-Regular.ttf
  images/fola_image_1.jpg ... fola_image_9.jpg
  images/programmer.png
  vectors/arrow.svg
  vectors/arrow_up_right.svg
  favicon.png
  icons/Icon-192.png
  icons/Icon-512.png
  icons/Icon-maskable-192.png
  icons/Icon-maskable-512.png
  manifest.json
```

Use `/images/fola_image_8.jpg` for desktop/monitor/mobile hero and `/images/fola_image_3.jpg`
for the tablet hero, matching the Flutter implementation. The remaining images are retained
for later authored content; do not assign them arbitrary meanings. `programmer.png` and images
1, 2, 4, 5, 6, 7, 9 are currently unused.

Use `/vectors/arrow.svg` for the work-row arrow and `/vectors/arrow_up_right.svg` for the
unselected navigation mark. Verify SVGs render under the production build; do not assume
Flutter's asset resolver behavior applies to Next.js.

Use `/favicon.png`, `/icons/*`, and `/manifest.json` only after checking the manifest's existing
metadata. Update stale Flutter title/description values as part of the metadata milestone;
do not leave “A new Flutter project” in the web head.

## 5. Design System Contract

### 5.1 Theme colors

Define theme tokens centrally. The original palette intentionally inverts the greys between
light and dark themes:

| Token | Light | Dark |
|---|---|---|
| grey-100 | `#FFFFFF` | `#000000` |
| grey-200 | `#F9F9F9` | `#090E10` |
| grey-300 | `#D9D9D9` | `#676767` |
| grey-400 | `#BEBEBE` | `#7A7A7A` |
| grey-500 | `#929292` | `#929292` |
| grey-600 | `#676767` | `#D9D9D9` |
| grey-700 | `#090E10` | `#F9F9F9` |
| grey-800 | `#000000` | `#FFFFFF` |

Blues are shared by both themes: light `#C5E0FF`, main `#3F97FF`, variant `#49A1FF`.

Default theme is dark. Theme switching must avoid a flash of the wrong theme where feasible,
must work without JavaScript-dependent color contrast becoming unreadable, and must persist
only a validated `light`/`dark` value. If `localStorage` is unavailable, use the current
document/system fallback without throwing.

### 5.2 Work accents

These values come from the surviving project color files and may be stored in the typed data
boundary:

| Work | Primary | Primary variant | Secondary |
|---|---|---|---|
| GoCreative | `#FF5D00` | `#FF7D33` | `#34A853` |
| Pfund | `#007AFF` | `#006ECF` | `#12C27B` |
| Haven | `#0CADC9` | `#35BBD2` | `#7FC048` |
| TaskSphere | `#EF8001` | `#CB9374` | `#A3582F` |

Check text contrast for each work accent. Do not blindly use white or black text; the data
model may provide `onPrimary` and `onPrimaryInverse`, or the component may use the neutral
theme tokens where contrast is insufficient.

### 5.3 Typography

Register:

- Aeonik Regular, Bold, and Regular Italic for general/body text.
- Helvetica Now Display Regular and Medium for menus, decorative body copy, and pills.
- Landsans Demo 01 for the oversized display heading.

Do not use a variable font declaration for these static files. Verify font weights in the
browser and use a safe fallback stack. Do not use negative letter spacing. Use fluid `clamp()`
values only for true display type; keep compact controls and body copy within readable ranges.

### 5.4 Responsive contract

The Flutter source has these width ranges: mobile 320–430, tablet 744–1440, desktop 1280–1728,
monitor 1728–2560. It resolves primarily by width and has gaps/overlaps handled by heuristics.
The web implementation must define non-overlapping CSS behavior:

- mobile: `< 744px`
- tablet: `744px–1279px`
- desktop: `1280px–1727px`
- monitor: `≥ 1728px`

Test at 320x640, 360x852, 430x932, 744x960, 834x1194, 1024x768, 1280x720, 1440x900,
1728x1024, and 1920x1080. Also test a narrow-height desktop and a portrait tablet. The
content shell must cap at 1440px on large screens without causing horizontal overflow.

Never use viewport-scaled text as the only responsive strategy. Use stable min/max dimensions,
wrapping, `min-width: 0`, and overflow rules so long work names and labels cannot enlarge or
clip their parent.

## 6. Data Contracts

Create `src/data/works.ts` with stable, typed records. A recommended shape is:

```ts
type Platform = 'android' | 'ios' | 'web';
type ContentStatus = 'ready' | 'needs-copy';

type WorkListing = {
  slug: string;
  name: string;
  industry: string;
  overview?: string;
  challenges?: string;
  contentStatus: ContentStatus;
  platformLinks: Partial<Record<Platform, string>>;
  styles: {
    primary: string;
    primaryVariant: string;
    secondary: string;
    onPrimary?: string;
    onPrimaryInverse?: string;
  };
};
```

Required records and display order: `gocreative`, `pfund`, `haven`, `tasksphere`.

Rules:

- Use slugs as React keys and route params.
- Validate that every slug is unique and every non-empty URL is an absolute `http` or `https`
  URL before rendering it.
- Render only available platform links. A missing link is not a disabled fake button.
- Keep industry labels exactly as authored unless the owner updates them.
- Do not fabricate screenshots. `AppPreview` may remain a clearly labelled stylized phone
  frame until real product media is supplied.
- Separate display order from data declaration order; never rely on `.reverse()` as an
  unexplained presentation rule.

Also create a small site/navigation data source for Work, Crafts, About me, Contact, and any
real social destinations. Navigation must not contain a button with an empty handler.

## 7. Component and Rendering Architecture

Suggested structure:

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx
    works/[slug]/page.tsx
    crafts/page.tsx
    about-me/page.tsx
    contact/page.tsx
  components/
    site/              # shared shell, theme provider, metadata helpers
    nav/               # desktop menu, mobile menu, nav items, pill buttons
    hero/              # hero, magic text, bulb, angle tracking, scroll tracker
    works/             # listing row, detail page, action bar, phone preview
    ui/                # flat button, image wrapper, unavailable state
  data/
    works.ts
    navigation.ts
  lib/
    urls.ts
    theme.ts
    accessibility.ts   # only if a shared helper is actually needed
```

Server/client boundaries:

- `layout.tsx`, route pages, work lookup, and static content should remain Server Components.
- Interactive pieces such as mobile navigation, theme switching, magic text, light bulb,
  scroll tracker, and hover rows are Client Components.
- Do not turn the entire page into a Client Component just to support one interaction.
- Avoid prop-drilling browser-only state through Server Components; keep interactive state near
  the interaction and pass serializable data down.

## 8. Feature Specifications

### 8.1 Hero

Desktop/monitor source behavior:

- Full viewport height.
- `/images/fola_image_8.jpg` as cover background with theme-responsive color treatment.
- Desktop menu at top: WORKS, CRAFT, ABOUT, CONTACT. Social links appear only when real URLs
  exist; otherwise omit them rather than rendering no-op controls.
- Giant “FOLA OLUWAFEMI” display line, divider, “- ENGINEER” line, and intro paragraph.
- Magic text uses cursor position to move a radial highlight inside the text. Use a pointer
  region, throttle or coalesce updates with `requestAnimationFrame` if needed, and disable it
  for touch/reduced-motion contexts.
- Hanging light bulb: pointer drag extends the cord; release toggles theme and resets the cord.
  Desktop/monitor may rotate the hanging assembly based on cursor horizontal offset. Clamp
  angles and never let the hit target leave the viewport.
- Scroll tracker is a visual affordance and must not trap page scrolling. Progress is based
  on document scroll; dragging the tip maps pointer movement to a bounded document scroll.

Mobile/tablet behavior:

- Use the mobile/tablet composition from the Flutter source: dark hero surface, image, title,
  paragraph, nav, and expandable menu.
- Tablet portrait should use the mobile-style composition; tablet landscape may use the split
  composition.
- Mobile menu must be a real `button`, expose `aria-expanded` and `aria-controls`, trap no
  focus unnecessarily, close on Escape and outside click, and restore focus to its trigger.

### 8.2 Navigation

- Work links to `/` and scrolls to the work section when already on home.
- Crafts/About/Contact links to their actual routes.
- Active state must be derived from the current route, not a manually maintained global route
  notifier.
- Use `aria-current="page"` for the active route.
- Unselected items may use the copied arrow-up-right asset as in the original.
- Do not render Twitter/GitHub unless the destination is verified and present in data.

### 8.3 Work listings

- Render the four registry records in the specified display order.
- Desktop hover choreography: row expands, detail card slides down, phone frame enters and
  scales, arrow rotates, main button appears, and sibling rows dim while a row is hovered.
- Preserve the original approximate timings: 50ms initial delay, roughly 500ms primary
  transition, 450–550ms staggered elements. Treat these as targets, not reasons to create
  brittle chained timers.
- Keyboard focus must provide an equivalent visible state. Touch devices have no hover: use a
  tap/focus affordance or keep the row compact and make the row CTA navigate to detail.
- Do not use nested interactive elements. A row cannot be both an `<a>` and contain a nested
  `<button>`; choose one semantic interaction model.
- On large screens, the phone preview must not cover text or escape the viewport. On mobile,
  simplify the preview rather than forcing desktop geometry.

### 8.4 Work detail

- Lookup by slug; unknown slug returns `notFound()`.
- Action bar contains a working Go Back control and route-aware navigation.
- Apply work accents through CSS custom properties/data attributes at the detail boundary.
- Render name, industry, available download links, overview, and challenges only when data is
  ready. Use the intentional `needs-copy` state otherwise.
- Avoid the Flutter implementation's repeated overview/challenges strings.
- If no real product screenshots exist, use the phone frame as a visual placeholder explicitly
  labelled as a preview frame, not as a claim that it is the real app.
- Do not create nested scroll containers unless keyboard, touch, and wheel behavior have been
  tested. Prefer one page scroll for the detail body.

### 8.5 Remaining pages

Build the route shell and a truthful intentional state for Crafts/About/Contact. The Contact
page may expose a real `mailto:` link only if the owner supplies a verified address. Do not
invent an email address or add a form that cannot deliver messages.

## 9. Motion and Interaction Engineering

Implement motion with CSS transitions/keyframes and React state. Use pointer events rather than
mouse-only events where possible. Clean up global listeners in effects.

Required states for interactive controls: idle, hover, focus-visible, pressed, disabled or
unavailable where applicable, and reduced-motion.

Required motion checks:

- `prefers-reduced-motion: reduce` removes or materially simplifies transform-heavy motion while
  preserving information and usable controls.
- No animation depends on a timer that can leave state stuck after unmount.
- No pointer listener updates React state on every raw event without considering frame budget.
- Drag controls have pointer capture, bounds, cancellation behavior, and work with keyboard or
  an alternate control where the action is important.
- Theme switcher and mobile menu work before hydration completes enough to avoid fatal errors.

## 10. Accessibility and SEO Contract

- Use one logical `h1` on the home page and a logical heading hierarchy on every route.
- Every meaningful image has useful alt text; decorative images use empty alt text.
- Decorative background images must not be the only source of important information.
- All controls are keyboard reachable and have visible `:focus-visible` styling.
- Color is not the only signal for active/hover states.
- Check text/background contrast, especially on work accent panels.
- Respect reduced motion and touch input.
- Add page titles/descriptions and Open Graph metadata without inventing claims.
- Update copied manifest metadata so it no longer says `fola_oluwafemi_portfolio` or “A new
  Flutter project” unless that is intentionally the final brand text.
- Confirm favicon, manifest, and production asset paths after `next build`.

## 11. Milestones and Gates

### M0 — Scaffold and contracts

Create the Next app inside `/portfolio`, install only required dependencies, register local
fonts, add Tailwind tokens, global theme variables, typed data/navigation registries, and the
base layout.

Gate:

- `npm run lint` passes.
- `npm run build` passes.
- No browser API is evaluated in a Server Component.
- All copied assets remain present and are referenced by public-root URLs.
- No raw colors appear in component markup.

### M1 — Hero and shell

Implement responsive hero, navigation, mobile menu, theme toggle, magic text, and scroll
tracker.

Gate:

- Test every viewport in §5.4.
- Test mouse, touch-sized viewport, keyboard, Escape, focus-visible, and reduced motion.
- Confirm no horizontal overflow and no clipped title/menu text.
- Confirm light/dark colors and theme persistence across refresh.

### M2 — Listings

Implement registry-driven listing rows and responsive interaction states.

Gate:

- Four works appear in the exact intended order.
- Hover, focus, keyboard, and touch behavior all lead to a usable work detail path.
- No nested interactive controls.
- Phone preview, card, arrow, and row expansion do not overlap critical text at tested widths.

### M3 — Detail routes

Implement `/works/[slug]`, accent theming, action bar, content states, and platform links.

Gate:

- Direct navigation and refresh work for every valid slug.
- Invalid slug returns a real 404/not-found response.
- Back navigation works from direct and in-app entry.
- Missing URLs/copy render intentional unavailable states and never fake links.
- Work accents pass contrast review.

### M4 — Remaining routes and metadata

Implement Crafts/About/Contact route states, route-aware nav, metadata, favicon, and manifest.

Gate:

- Every visible nav control has a working destination or is omitted.
- Every route has a title, description, h1, and no invented personal/contact claims.
- Production asset paths load.

### M5 — Adversarial QA and polish

Run the checklist in §12, fix findings, then document remaining owner-supplied content gaps in
`CONTENT.md`.

Gate:

- Lint and build pass after final changes.
- No console errors or hydration warnings in a production-like run.
- Responsive, keyboard, reduced-motion, and asset checks pass.
- The handoff report states exactly what was verified and what remains unavailable.

## 12. Adversarial QA Checklist

Run this before calling the rewrite complete:

### Routing and data

- Visit every route directly in a fresh browser tab.
- Refresh every work detail route.
- Visit `/works/not-a-real-work` and verify a 404/not-found response.
- Temporarily remove each platform URL and verify no dead control remains.
- Search source for `google.com`, `balablu`, `onPressed: ()`, repeated-string operators, random
  ID generation, and fake social/store URLs.
- Confirm work keys/slugs are stable across builds.

### Assets and build

- Verify every copied file from §4 exists.
- Verify fonts load with no 404s or MIME errors.
- Verify both SVGs, hero images, favicon, icons, and manifest load from production paths.
- Run the production build and inspect the generated output for accidental `/flutter` paths.

### Layout and input

- Test all required viewports, including narrow-height desktop and portrait tablet.
- Test long labels, missing content, and unavailable links.
- Test keyboard-only navigation from the address bar through every visible control.
- Test touch/mobile where hover does not exist.
- Test reduced motion and high zoom without clipped or overlapping content.
- Check for horizontal scrolling at every viewport.

### Visual and performance

- Compare hero and listings against the Flutter source at representative widths.
- Confirm background images are not dark/blank due to incorrect blend/filter behavior.
- Confirm the magic-text pointer effect does not cause obvious frame drops.
- Confirm no large image causes layout shift; use stable dimensions/aspect ratios.
- Check browser console for hydration warnings, failed assets, and uncaught event errors.

## 13. Explicitly Do Not Port

Do not port Flutter-only or dead infrastructure: `dio` error machinery, `bamboo`, disabled
shimmer implementation, Hive handlers, podcast `genres`, random ID generation, get_it DI,
go_router observers/redirect placeholders, empty presenter files, commented-out typewriter,
`NamePart` string repetition, debug prints, fake URLs, or the Flutter web bootstrap.

Port the observable design and interaction intent, then implement it with the web platform.

## 14. Handoff Artifacts

The implementing agent must leave:

- Working source in `/portfolio`.
- `CONTENT.md` listing missing owner-supplied copy/URLs and the exact files that consume them.
- A short verification report containing commands run, viewports checked, routes checked, and
  any known limitations.
- No changes to `/flutter`.
