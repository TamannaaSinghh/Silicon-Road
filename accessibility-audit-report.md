# Accessibility Audit Report — silicon-road.vercel.app

**Date:** 2026-04-23
**Auditor:** keyboard-accessibility-testing-skill (axe-core 4.10.2 + manual review)
**Standards:** WCAG 2.1/2.2 Level A & AA + best practices
**Scope:** All 4 internal pages of `https://silicon-road.vercel.app/`

---

## 1. Quick Stats

| Metric | Value |
|--------|-------|
| Pages audited | 4 |
| Unique issues identified | 12 |
| P0 Blocker | 1 |
| P1 Critical | 4 |
| P2 Significant | 5 |
| P3 Enhancement | 2 |
| Pages with axe violations | 3 of 4 |
| Pages without axe violations | 1 (Home) |

---

## 2. Per-Page Summary

| Page | axe Violations | Critical | Serious | Moderate | Manual Issues |
|------|---------------:|---------:|--------:|---------:|--------------:|
| `/` (Home) | 0 | 0 | 0 | 0 | 4 (modal, video captions, title, focus tabindex) |
| `/our-team` | 1 | 0 | 0 | 1 | 1 (title) |
| `/portfolio` | 1 | 0 | 0 | 1 | 1 (title) |
| `/contact` | 1 | 0 | 1 | 0 | 2 (focus removal, title) |

---

## 3. Detailed Findings (grouped by issue type)

### F-01 — Modal dialog is not accessible (Home)
- **WCAG:** 2.1.2 No Keyboard Trap, 2.4.3 Focus Order, 4.1.2 Name/Role/Value, 1.3.1 Info & Relationships
- **Impact:** Critical
- **Affected pages:** `/` (Home — "Watch the Video" modal)
- **Element:** `sections/Hero.tsx` lines 52–70
- **Current state:**
  - The opened overlay is a plain `<div>` with no `role="dialog"`, no `aria-modal="true"`, no `aria-labelledby`/`aria-label`.
  - Focus is **not trapped** inside the modal — Tab walks back into the page beneath.
  - Focus is **not moved** to the modal on open.
  - Focus is **not restored** to the "Watch the Video" trigger on close.
  - **Escape key does not close** the dialog.
  - Background page is **not made inert** (`aria-hidden`/`inert`); screen readers can still navigate behind it.
  - The close button is the bare glyph `✕` with **no accessible name** — assistive tech announces it as "multiplication sign" or skips it.
- **Recommended fix:**
  ```tsx
  // In Hero.tsx
  // 1. Use a real dialog primitive (Radix UI Dialog or @headlessui/react Dialog) which handles
  //    focus trap, ESC, focus restore, scroll lock, and aria-modal automatically.
  // 2. If keeping the hand-rolled version, add:
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="video-dialog-title"
    onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
  >
    <h2 id="video-dialog-title" className="sr-only">Silicon Road intro video</h2>
    <button onClick={() => setOpen(false)} aria-label="Close video">✕</button>
    ...
  </div>
  // 3. On open: capture document.activeElement, focus the close button.
  // 4. On close: restore focus to the trigger element.
  ```
- **Screen reader impact:** NVDA/JAWS/VoiceOver users cannot perceive the dialog as a dialog, will not be informed it has opened, may continue reading the page beneath it, and cannot identify or activate the close control.

---

### F-02 — Modal video has no captions or transcript (Home)
- **WCAG:** 1.2.2 Captions (Prerecorded) — Level A
- **Impact:** Critical (if video has audible narration)
- **Affected pages:** `/` (modal at `Hero.tsx:65-67`)
- **Current state:**
  ```tsx
  <video controls autoPlay className="w-full rounded-lg">
    <source src="/vids/main-video.mp4" type="video/mp4" />
  </video>
  ```
  No `<track kind="captions">`, no transcript link, no on-demand captions.
- **Recommended fix:**
  ```tsx
  <video controls autoPlay>
    <source src="/vids/main-video.mp4" type="video/mp4" />
    <track kind="captions" src="/vids/main-video.en.vtt" srcLang="en" label="English" default />
  </video>
  ```
  Provide a WebVTT file. If the video has no spoken audio, mark it explicitly in adjacent text ("Silent visual loop, no narration") so screen-reader users know there is no missing audio context.
- **Screen reader / Deaf user impact:** Deaf and hard-of-hearing users cannot access spoken content.

---

### F-03 — Hero background video (autoplay) lacks captions / pause control
- **WCAG:** 1.2.2 (if narration), 2.2.2 Pause, Stop, Hide (any motion auto-playing > 5s)
- **Impact:** Serious (vestibular & cognitive)
- **Affected pages:** `/` (hero)
- **Element:** `sections/Hero.tsx:38-46`
  ```tsx
  <video autoPlay loop muted playsInline ...>
    <source src="/vids/helicopter.mp4" type="video/mp4" />
  </video>
  ```
- **Current state:** The video autoplays in an infinite loop with no `controls`, no pause button, and no respect for `prefers-reduced-motion`.
- **Recommended fix:**
  ```tsx
  // Either expose controls, or wrap with a pause toggle, AND respect reduced motion:
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  <video
    autoPlay={!reduce}
    loop muted playsInline
    aria-label="Aerial helicopter footage of a city"
  />
  ```
  Add a visible "Pause animation" button if the video must auto-play. Add a `<track kind="descriptions">` if the visual content conveys meaning.
- **Screen reader impact:** A `<video>` with no accessible name shows as "video" to screen readers. Add `aria-label` describing the visual content, or `aria-hidden="true"` if purely decorative.

---

### F-04 — `/our-team` is missing an `<h1>` (axe: `page-has-heading-one`)
- **WCAG:** 2.4.6 Headings and Labels (AA), 1.3.1 Info & Relationships, best practice
- **Impact:** Serious
- **Affected pages:** `/our-team`
- **Current state:** Page jumps straight to `<h2>Sid Mookerji</h2>`. No top-level page heading exists.
- **Recommended fix:** Add a visible (or visually-hidden) `<h1>` at the top of `app/our-team/page.tsx`:
  ```tsx
  <h1 className="text-[46px] font-bold uppercase tracking-[4px] mb-12">Our Team</h1>
  ```
  If the design forbids a visible heading, use a screen-reader-only one:
  ```tsx
  <h1 className="sr-only">Our Team</h1>
  ```
- **Screen reader impact:** Users navigating by headings (NVDA `h` key, JAWS `H` key, VoiceOver rotor) cannot identify what page they are on or jump to its main content.

---

### F-05 — `/portfolio` heading order skips a level (axe: `heading-order`)
- **WCAG:** 1.3.1 Info & Relationships, best practice
- **Impact:** Moderate
- **Affected pages:** `/portfolio` (also affects all pages via the footer pattern, but only portfolio has the structural skip from `<h1>` directly to `<h3>`)
- **Current state:** Document outline reads `h1 → h3` because the footer's "Silicon Road Ventures" is rendered as `<h3>` directly under the page `<h1>` with no intervening `<h2>`.
- **Recommended fix:** Either:
  1. Promote the footer brand line from `<h3>` to `<h2>` (recommended — footer columns are conceptually peers of page sections), or
  2. Drop the footer text from being a heading entirely if it isn't a section landmark, and use a styled `<p>` or `<span>`.

---

### F-06 — Subscribe button on `/contact` fails color-contrast (axe: `color-contrast`, serious)
- **WCAG:** 1.4.3 Contrast (Minimum) — AA
- **Impact:** Serious
- **Affected pages:** `/contact`
- **Element:** `app/contact/page.tsx:117-123` (or thereabouts)
  ```html
  <button class="bg-[#777777] hover:bg-[#6b7280] text-white text-[14px] px-6 py-3 rounded-md">
    Subscribe
  </button>
  ```
  - Foreground: `#FFFFFF` (white)
  - Background: `#777777` (rgb 119,119,119)
  - **Measured ratio: ~4.48 : 1** (needs **4.5 : 1** for normal text)
- **Recommended fix:** Darken the background to at least `#717171` (4.54:1) — better, use `#595959` for a comfortable 7:1 AAA pass:
  ```tsx
  className="bg-[#595959] hover:bg-[#4a4a4a] text-white ..."
  // Or use a Tailwind color: bg-gray-700 (rgb 55,65,81 → 8.6:1) or bg-yellow-500 with text-black
  ```

---

### F-07 — Email input on `/contact` removes focus outline with no replacement
- **WCAG:** 2.4.7 Focus Visible — AA
- **Impact:** Critical
- **Affected pages:** `/contact`
- **Element:** `app/contact/page.tsx:106`
  ```tsx
  className="block w-[340px] bg-white text-gray-800 px-4 py-3 mb-3 focus:outline-none"
  ```
  `focus:outline-none` strips the browser's default focus ring; no `focus-visible:ring-*` or `focus:border-*` is added back.
- **Recommended fix:**
  ```tsx
  className="block w-[340px] bg-white text-gray-800 px-4 py-3 mb-3
             focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
             focus-visible:ring-offset-2"
  ```
  Use the same pattern that `app/portfolio/page.tsx:77` already establishes for the up-arrow button — adopt it as the project-wide focus convention.

---

### F-08 — All four pages share the identical `<title>` "Silicon Road"
- **WCAG:** 2.4.2 Page Titled — Level A
- **Impact:** Serious (sitewide)
- **Affected pages:** `/`, `/our-team`, `/portfolio`, `/contact` (and presumably `/blog`, `/newsletter` redirects)
- **Current state:** All four pages have `document.title === "Silicon Road"`. Browser tabs, history, and screen-reader page-load announcements are indistinguishable.
- **Recommended fix:** Add per-route `metadata` exports (Next.js App Router):
  ```tsx
  // app/our-team/page.tsx
  export const metadata = { title: "Our Team | Silicon Road Ventures" };
  // app/portfolio/page.tsx
  export const metadata = { title: "Portfolio | Silicon Road Ventures" };
  // app/contact/page.tsx
  export const metadata = { title: "Contact Us | Silicon Road Ventures" };
  // app/layout.tsx — make the root title a template
  export const metadata = {
    title: { default: "Silicon Road Ventures", template: "%s | Silicon Road Ventures" }
  };
  ```
- **Screen reader impact:** On page load NVDA/JAWS/VoiceOver announce the document title. With identical titles, users hear the same string after every navigation and cannot tell if the page changed.

---

### F-09 — Skip-link target `<main id="main">` is missing `tabindex="-1"`
- **WCAG:** 2.4.1 Bypass Blocks — Level A
- **Impact:** Significant
- **Affected pages:** All four (the skip link is present in the shared header)
- **Current state:** `<main id="main">` receives the URL hash on skip-link activation. In some browsers (notably older Safari and any non-default focus-management setup) focus does not actually advance to `<main>` because non-interactive elements without `tabindex` cannot be focused — the page only scrolls.
- **Recommended fix:**
  ```tsx
  // wherever <main> is rendered
  <main id="main" tabIndex={-1} className="...">
  ```
  Optionally add `outline:none` for `[id="main"]:focus` if the focus ring is unwanted on the landmark itself.

---

### F-10 — Hero close-button "✕" has no accessible name
- **WCAG:** 4.1.2 Name, Role, Value — Level A
- **Impact:** Critical (combined with F-01)
- **Affected pages:** `/` (modal)
- **Element:** `sections/Hero.tsx:58-63`
  ```tsx
  <button onClick={() => setOpen(false)} className="...">✕</button>
  ```
- **Recommended fix:**
  ```tsx
  <button onClick={() => setOpen(false)} aria-label="Close video dialog">✕</button>
  ```

---

### F-11 — Site lacks a consistent custom focus-indicator style
- **WCAG:** 2.4.7 Focus Visible (AA), 2.4.11 Focus Not Obscured (WCAG 2.2 AA), 2.4.13 Focus Appearance (WCAG 2.2 AAA)
- **Impact:** Significant
- **Affected pages:** All
- **Current state:** No global `:focus-visible` rule in `app/globals.css`. Only `app/portfolio/page.tsx:77` defines a custom ring. Other pages rely on the browser's default outline, which Tailwind's preflight does not strip but which is inconsistent across browsers and easily overridden by `bg-*` / `border-*` utilities.
- **Recommended fix:** Add a global rule in `app/globals.css`:
  ```css
  *:focus-visible {
    outline: 2px solid #facc15; /* yellow-400 */
    outline-offset: 2px;
    border-radius: 2px;
  }
  ```
  This guarantees a visible 3:1-contrast focus ring on every interactive element regardless of component-specific styling.

---

### F-12 — Minor content typo: "Subscribe to  our newsletter" (double space)
- **WCAG:** Not a WCAG violation, but noted during heading scrape
- **Impact:** Minor
- **Affected pages:** `/contact` heading, also visible on `/` newsletter section
- **Fix:** Remove the double space.

---

## 4. Issue Priority Matrix

### P0 — Blocker (ship-stoppers; users cannot complete a task or lose orientation)
1. **F-01** Modal dialog without focus trap / ESC / restore / accessible name → keyboard users get trapped behind the modal or lose focus location entirely.

### P1 — Critical (major functionality degraded for AT users)
2. **F-02** Modal video missing captions (WCAG A).
3. **F-04** `/our-team` missing `<h1>`.
4. **F-07** Email input removes focus outline with no replacement.
5. **F-10** Modal close button has no accessible name.

### P2 — Significant (noticeable barriers, easy fixes)
6. **F-03** Autoplay hero video has no pause / `prefers-reduced-motion` handling.
7. **F-06** Subscribe button color contrast 4.48:1 (needs ≥ 4.5:1).
8. **F-08** All pages share identical `<title>`.
9. **F-09** `<main id="main">` missing `tabindex="-1"`.
10. **F-11** No site-wide custom focus-visible style.

### P3 — Enhancement
11. **F-05** Footer `<h3>` causes heading-order skip on `/portfolio`.
12. **F-12** Double-space typo in newsletter heading.

---

## 5. Positive Findings (what the site does well)

- ✅ `<html lang="en">` correctly set on every page.
- ✅ Skip-to-main-content link is the **first focusable element** on every page (`Skip to main content`).
- ✅ Semantic landmarks present: `<header>`, `<nav>`, `<main>`, `<footer>` on every page.
- ✅ `<nav aria-label="Primary">` is uniquely labelled.
- ✅ Logo link has descriptive `aria-label="Silicon Road Ventures — home"`.
- ✅ Portfolio CTA link has `aria-label="View our portfolio of commerce startups"`.
- ✅ Team member photos have descriptive alt text including name and role.
- ✅ Decorative photos correctly use `alt=""` + `role="presentation"`.
- ✅ Social links have descriptive `aria-label`s, `target="_blank"` paired with `rel="noopener noreferrer"`.
- ✅ Newsletter form: `<input type="email" required autocomplete="email">` with `<label for>` association.
- ✅ Google Maps iframe has descriptive `title="Google Maps showing One World Center, Mumbai, India"`.
- ✅ Tab order follows visual/DOM order; **no positive `tabindex` values** anywhere.
- ✅ One example of correct `focus-visible` pattern exists (`portfolio/page.tsx:77`) — can be promoted to a project convention.
- ✅ axe-core: 0 violations on the home page; only 1 best-practice violation each on `/our-team` and `/portfolio`.

---

## 6. Remediation Roadmap

### Sprint 1 (this week) — **P0 + P1**
- [ ] **F-01 + F-10** Replace `Hero.tsx` ad-hoc modal with `@headlessui/react` `<Dialog>` (handles focus trap, ESC, restore, aria-modal automatically). Or apply the manual fix listed above.
- [ ] **F-02** Author and ship `helicopter.en.vtt` and `main-video.en.vtt`; add `<track kind="captions">` to both `<video>` elements. If videos have no spoken audio, document this in adjacent visible text and add `aria-label` to the videos.
- [ ] **F-04** Add `<h1>Our Team</h1>` to `app/our-team/page.tsx`.
- [ ] **F-07** Replace `focus:outline-none` on the contact email input with `focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2`.

### Sprint 2 (next week) — **P2**
- [ ] **F-08** Add per-route `metadata.title` exports + `metadata.title.template` in root layout.
- [ ] **F-06** Darken Subscribe button background to `#595959` (or use `bg-yellow-400 text-black` for brand consistency).
- [ ] **F-11** Add global `*:focus-visible` rule to `app/globals.css`.
- [ ] **F-09** Add `tabIndex={-1}` to the shared `<main id="main">` element.
- [ ] **F-03** Add `prefers-reduced-motion` handling around the hero video; either gate `autoPlay` or expose a pause control. Add `aria-label` describing the video's visual content.

### Sprint 3 (polish) — **P3**
- [ ] **F-05** Demote the footer brand line from `<h3>` to plain text or promote to `<h2>` to fix the heading-order skip on `/portfolio`.
- [ ] **F-12** Fix `"Subscribe to  our newsletter"` double-space.
- [ ] Re-run axe-core on every page after each sprint and target **0 violations + 0 incompletes**.
- [ ] Manual screen-reader smoke test with NVDA (Firefox) and VoiceOver (Safari) on the modal flow + newsletter signup flow.

---

## 7. Methodology Notes

- Browser: Chrome via `claude-in-chrome` MCP, viewport at default desktop width.
- axe-core 4.10.2 invoked with rule sets `wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`.
- Color-contrast spot-checks performed with custom WCAG 2.x relative-luminance computation against resolved background colors (axe was unable to resolve some backgrounds where elements sit over gradient/image fills, hence the 5 "incomplete" entries on Home — those were manually verified to pass).
- Keyboard testing covered tab order, positive `tabindex`, `aria-hidden` on focusable elements, and focus-style coverage. Modal focus-trap behavior was verified by source inspection of `sections/Hero.tsx`.
- Pages excluded from the audit per Phase-1 rules: `/blog` and `/newsletter` (both 307-redirect to external `siliconroad.vc`).
- axe-core catches roughly 30–40% of WCAG issues; the manual findings (F-01, F-02, F-03, F-07, F-08, F-09, F-10, F-11) are not detected by automated scanning alone.
