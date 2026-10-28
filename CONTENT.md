# Owner-Supplied Content Gaps

This document lists every piece of content that must come from the owner. Nothing
below has been invented or speculated; each entry is a verified gap in the
repository. Once a value is supplied, it should be added to the typed registry or
config file named in "Consumed by" and the UI will render it without further
changes.

---

## 1. Work-specific overview and challenges copy (all 4 works)

**What's missing:** A work-specific `overview` and `challenges` paragraph for each
work: GoCreative, Pfund, Haven, TaskSphere. For 100% visual parity with the
original, `overview` now carries the generic Flutter-era copy verbatim (one
paragraph shared by all four works, exactly what the original app rendered in
the hover card and detail view); it is not verified work-specific copy.

**Consumed by:**
- `src/data/works.ts` — `WorkListing.overview` (the ported Flutter-era copy)
  and `WorkListing.challenges` (still absent; all four records keep
  `contentStatus: "needs-copy"`).
- `src/components/works/WorkListings.tsx` — hover card renders `overview`.
- `src/components/works/WorkDetail.tsx` — renders Overview when `overview`
  exists and Challenges when `challenges` exists.

**Current behavior in the UI:** The hover card and the detail Overview section
show the ported Flutter-era paragraph; Challenges shows the intentional
needs-copy note until real copy arrives.

---

## 2. Verified store/app URLs for all 4 works

**What's missing:** Real, verified download URLs for the platforms each app ships
on (Google Play, App Store, and/or web) for GoCreative, Pfund, Haven, TaskSphere.
The original registry holds empty or unverified URLs (some were the literal string
`https://google.com`); no link can be trusted as-is.

**Consumed by:**
- `src/data/works.ts` — `WorkListing.platformLinks` (`Partial<Record<Platform, string>>`;
  currently `{}` for all four records).
- `src/components/works/WorkDetail.tsx` — renders "Download on …" links only for
  platforms whose URL exists; missing platforms are omitted, never shown as dead
  buttons.

**Current behavior in the UI:** No download links are shown anywhere; the detail
page shows no platform row at all until URLs are supplied.

---

## 3. Social/contact destination (Twitter/GitHub or email)

**What's missing:** A verified destination the owner wants published as a contact
channel: a Twitter/X or GitHub profile URL, an email address for a `mailto:` link,
or any other verified handle. None exists in the repository. No email address or
handle may be invented.

**Consumed by:**
- `src/data/navigation.ts` — any social entries (currently none; only Work, Crafts,
  About me, Contact route items).
- Hero desktop menu — social links are rendered only when a real destination
  exists in data; otherwise they are omitted (per plan §8.2).
- `src/app/contact/page.tsx` — may expose a `mailto:` link only once a verified
  address is supplied; a contact CTA/form is otherwise forbidden.

**Current behavior in the UI:** No social controls appear anywhere on the site; the
Contact page shows a truthful "no contact details yet" state with no form and no
email link.

---

## 4. Hero photo crop/swap decisions (fola_image_8 / fola_image_3)

**What's missing:** Owner decision on which hero photo and crop to use. The rewrite
currently follows the Flutter source: `/images/fola_image_8.jpg` for
desktop/monitor/mobile hero and `/images/fola_image_3.jpg` for the tablet hero
(plan §4). The owner may want a different pairing, ordering, or crop.

**Consumed by:**
- Hero implementation (`src/components/hero/*`) — background image and responsive
  swap by breakpoint.
- `public/images/fola_image_8.jpg`, `public/images/fola_image_3.jpg`.

**Current behavior in the UI:** The hero shows `fola_image_8.jpg` on
mobile/desktop/monitor and `fola_image_3.jpg` on tablet. Images 1, 2, 4, 5, 6, 7, 9
and `programmer.png` are retained but unused, awaiting owner direction.

---

## 5. Real product screenshots for the phone previews

**What's missing:** Real product screenshots (per work, per platform if needed) to
display inside the work-listing and work-detail phone previews. No screenshots or
embedded app builds exist in the repository.

**Consumed by:**
- `src/components/works/AppPreview` (phone mock-up used by the listing rows and the
  work detail page).

**Current behavior in the UI:** The phone preview shows a clearly labelled stylized
phone frame as a placeholder — it does not claim to be the real app. Until real
media is supplied, no screenshot can replace it.

---

## 6. Production domain

**What's missing:** The verified production origin (e.g. the owner's real domain)
used by sitemap and robots metadata.

**Consumed by:**
- `src/app/sitemap.ts` — reads `NEXT_PUBLIC_SITE_URL` (set at build time). Until a
  domain is supplied the sitemap is intentionally empty; no placeholder URLs are
  published.
- `src/app/robots.ts` — currently emits no sitemap reference; add one once the
  domain exists.

**Current behavior in the UI:** Not user-visible. The sitemap emits an empty
document until `NEXT_PUBLIC_SITE_URL` is configured for the deployment.
