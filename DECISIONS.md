# Decision Log

The three hardest trade-offs I made while building the Group Staff Portal prototype.

---

## 1. CSS Custom Properties vs. Tailwind Config for Company Theming

**Decision:** Use CSS custom properties (`--accent`, `--accent-light`, `--accent-dark`) updated at runtime, referenced by Tailwind via `theme.extend.colors`.

**Alternative rejected:** Generating a separate Tailwind build per company, or using Tailwind's `data-theme` attribute with static colour classes.

**Why this wins:** The portal must re-theme instantly when the user switches companies — no page reload, no class-name swapping across dozens of elements. CSS custom properties propagate everywhere a Tailwind `accent` utility is used, so a single `style.setProperty` call on `:root` re-themes the entire page. This also makes adding a 7th subsidiary trivial: add one config object with three hex values. The rejected approach would have required either build-time duplication (6 CSS bundles) or verbose conditional class mappings throughout every component.

**Trade-off:** CSS custom properties aren't statically analysable by Tailwind's purge step, so the `accent` colour utilities are always included in the output CSS even if unused. In practice this adds a negligible amount (<1 KB) since it's only three colour shades.

---

## 2. Critical Alert Banner: Persistent vs. Dismissible

**Decision:** Critical alerts render in a **persistent sticky banner** pinned above all content, always visible on scroll. Users can dismiss individual alerts once acknowledged, but the banner never auto-dismisses or times out.

**Alternative rejected:** A toast/snackbar notification that auto-dismisses after a few seconds, or a fully non-dismissible banner with no user control.

**Why this wins:** The brief states critical alerts "must be impossible to miss." An auto-dismissing toast disappears before the user acts on it. A fully non-dismissible banner wastes space after the user has acknowledged the issue. The middle ground — persistent by default, manually dismissible per-alert — guarantees every user sees the alert while allowing them to reclaim screen space once they've read it. The banner uses `fixed` positioning with `z-50` so it overlays all content, `role="alert"` and `aria-live="assertive"` so screen readers announce it immediately, and a high-contrast red background that stands out in both light and dark mode.

**Trade-off:** A persistent banner takes vertical space on small screens. I mitigated this by keeping the banner compact (tight padding, small text) and filtering to only critical-severity alerts. On mobile, the banner is roughly 60-80px tall — noticeable but not overwhelming. If real usage showed this was too intrusive, a reasonable next step would be collapsing (not hiding) — a toggle that shrinks the banner to a single red bar with a count badge.

---

## 3. Single Page vs. Routing

**Decision:** Build the portal as a **single page** with no client-side router.

**Alternative rejected:** React Router with separate routes for `/apps`, `/alerts`, `/settings`, etc.

**Why this wins:** The portal is a dashboard — all content (apps, alerts, search) is relevant on one screen. Adding routing would introduce URL management, route guards, code-splitting boundaries, and navigation state that the prototype doesn't need. The brief asks for a "home experience," not a multi-page application. A single page also means faster initial load (one route, one chunk) and simpler mental model: the company switcher and search filter what's visible, they don't navigate between pages.

**Trade-off:** If the portal grows to include dedicated pages (detailed alert view, app settings, user profile), a router becomes necessary. I designed the component structure so this migration is straightforward: `AppLauncher`, `AlertsFeed`, and `Header` are independent components that can be placed on separate routes without refactoring. The `PortalContext` already lives above the component tree and would wrap a router naturally.
