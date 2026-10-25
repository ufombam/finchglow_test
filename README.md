# Finchglow Group Staff Portal

A unified front-end portal prototype for Finchglow Holdings' six subsidiaries. Employees sign in once, see personalised alerts and news, and launch the tools they need — all themed to their company's brand.

## Quick Start

```bash
npm install
npm run dev        # Development server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run test suite
```

Requires **Node.js 18+**.

## Architecture

### Tech Stack

| Layer       | Choice                          | Why                                                                 |
| ----------- | ------------------------------- | ------------------------------------------------------------------- |
| Build       | Vite 8                          | Sub-second HMR, tree-shaking, tiny output                           |
| Framework   | React 19 + TypeScript           | Component-driven, type-safe, large ecosystem                        |
| Styling     | Tailwind CSS v4                 | Utility-first, CSS custom properties for theming, purged in prod    |
| Testing     | Vitest + React Testing Library  | Fast, co-located with Vite, accessible queries                      |

### Project Structure

```
src/
├── components/        # UI components (Header, AppCard, AlertCard, etc.)
├── config/            # Company branding configuration (add a 7th subsidiary here)
├── context/           # React context for company selection, dark mode, search
├── data/              # Mock data (user, apps, alerts)
├── hooks/             # Custom hooks (useSearch, useMockApi)
├── types/             # TypeScript interfaces
├── __tests__/         # Test files
├── App.tsx            # Main layout composition
└── main.tsx           # Entry point
```

### Key Design Decisions

**Company theming via CSS custom properties** — Each company defines an accent colour in `config/companies.ts`. Switching companies updates `--accent`, `--accent-light`, and `--accent-dark` on `:root`, which Tailwind picks up via `theme.extend.colors`. Adding a 7th subsidiary is a single object in the config array — no code changes, no component duplication.

**Critical alerts as a persistent banner** — Critical alerts render in a sticky `CriticalBanner` above the header. They use `role="alert"` and `aria-live="assertive"` so screen readers announce them immediately. Group-wide critical alerts remain visible regardless of which company is selected.

**Dark mode (chosen extra)** — Tailwind's `darkMode: 'class'` with `localStorage` persistence and `prefers-color-scheme` detection on first visit. Chosen because late-shift contact-centre and travel desk staff work in low-light environments — dark mode reduces eye strain and screen glare.

### Bundle Size

| Asset | Size     | Gzipped  |
| ----- | -------- | -------- |
| CSS   | 24.9 KB  | 5.6 KB   |
| JS    | 242.7 KB | 75.3 KB  |

The JS bundle is predominantly React itself (~140 KB). The application code is lightweight with no additional runtime dependencies beyond React and ReactDOM. Tailwind CSS purges unused styles in production.

### How Sign-In Would Work

In production, the portal would integrate with an **OpenID Connect / SAML SSO** provider (e.g., Azure AD, Okta):

1. Unauthenticated users are redirected to the IdP's login page
2. After authentication, the IdP redirects back with an authorization code
3. The backend exchanges the code for a JWT, set as an `httpOnly` cookie
4. JWT claims include the user's `companyId`, `role`, and `permissions`
5. The portal reads these claims to determine which apps, alerts, and company themes to show

No secrets are stored client-side. The mock data in `src/data/mockData.ts` simulates what the JWT claims and API responses would provide.

### Error Handling

The `useMockApi` hook simulates network conditions:
- **600ms delay** — realistic latency for loading states
- **10% random failure** — triggers error UI with a "Retry" button
- Loading states use **skeleton placeholders** (not spinners) for better perceived performance

### Accessibility (WCAG 2.1 AA)

- Skip-to-content link for keyboard users
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`)
- Heading hierarchy (h1 → h2 → h3)
- `aria-live="assertive"` on critical alert banners
- `aria-label` on all icon-only buttons and interactive elements
- `role="search"` on the search container
- `role="listbox"` and `role="option"` on the company switcher dropdown
- Focus-visible outlines using `focus:outline-2`
- Colour contrast ratios meet 4.5:1 minimum (Tailwind defaults)
- All interactions accessible via keyboard (Tab, Enter, Escape)

### Tests

14 tests across 3 test files:

- **CompanySwitcher** — renders, opens dropdown, shows all companies, switches company (verifies CSS variable update), closes on Escape
- **AlertsFeed** — renders all alerts, sorts by severity, loading/error/empty states
- **SearchBar** — accessible label, clear button, search role

Run with: `npm run test`

## What I Would Do With Another Week

1. **Service worker for offline support** — Cache critical alerts and app launcher data so staff in buildings with patchy Wi-Fi still see the most recent state, with a clear "You are offline" banner
2. **Real API integration** — Replace mock data with actual API calls, add request caching (SWR/React Query), and implement optimistic updates
3. **Role-based views** — Different launcher shortcuts per role (contact-centre agent, travel consultant, facilities technician)
4. **E2E tests with Playwright** — Cross-browser testing on mobile and desktop viewports
5. **Push notifications** — Web Push API for critical alerts so they reach staff even when the portal tab isn't active
6. **Component documentation** — Storybook with visual regression tests for each component
7. **Internationalisation** — i18n support for multi-language teams
8. **Performance monitoring** — Core Web Vitals tracking with Lighthouse CI in the pipeline
