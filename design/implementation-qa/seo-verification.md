# SEO verification — 26 October 2026

Story: a visitor, search crawler or social-sharing client requests a public page and receives useful server-rendered content, route-specific search/share metadata, a consistent canonical URL and accurate structured data; previews and non-content pages are not indexed.

| Boundary | Result | Evidence |
| --- | --- | --- |
| Source → production | Pass | All 34 automated tests, ESLint and `next build` pass. Final build compiles in 4.3s and prerenders all 14 generated entries. Final local production server reports `Ready in 669ms`. |
| Request → five public HTML pages | Pass | Read-only `scripts/verify-seo.mjs` sends a crawler user agent and checks Home, About, Services, Approach and Contact: 200 responses, one H1 and canonical each, five unique titles/descriptions, matching OG/Twitter metadata and an SSR JSON-LD graph per page. No JavaScript execution is required for these checks. |
| Domain → canonical identity | Pass, local configuration | Live HTTP headers show www → apex with 307, then 200. All generated canonical/OG/schema/sitemap URLs target the final `https://alexanderstephen.com` host. A permanent-host redirect remains a hosting follow-up, not a change claimed here. |
| Crawler → sitemap and robots | Pass | Sitemap contains exactly five canonical public page URLs; no success, API, fragment or fake lastmod entries. Robots allows public pages and assets, excludes API paths and advertises the production sitemap. |
| Request → non-indexable pages | Pass | Thank-you returns 200 plus noindex; a deliberately unknown route returns real 404 plus noindex. The success route is not blocked from crawling, so its directive is readable. |
| Environment → indexing control | Pass | A separate `next dev` server at port 3001 passes the smoke script with `--noindex`: every public page noindex, no business JSON-LD, sitemap empty and no sitemap advertisement. Unit tests cover Vercel preview, custom target environment and explicit staging opt-out. A separately deployed Vercel preview was not created. |
| Metadata → share assets | Pass | Both declared PNGs, Apple icon, favicon and SVG icon return image content with 200. Tests validate the actual 1200 × 630 share PNG, 512 × 512 logo, 180 × 180 Apple icon and the ICO's embedded 48px PNG. Share card visually inspected. |
| Navigation → updated page metadata | Pass | In the 390px browser, Contact → mobile menu → Services updates the document title and canonical to Services, keeps exactly one JSON-LD script and closes the dialog. |
| Copy → responsive rendering | Pass | Home/About/Services/Contact checked at 390px and 320px; client/scroll widths match 375/375 and 305/305 respectively. Desktop Home at 1440px is 1425/1425 excluding the scrollbar. Desktop and mobile screenshots saved. |
| Browser diagnostics | Pass | No warning/error logs in the final responsive and mobile-navigation checks. Viewport overrides reset and browser returned to Home. |
| React quality review | Pass | New SEO modules/components stay server-side; no client hooks, per-frame work, remote request waterfalls or third-party tracking added. JSON-LD escapes `<`; existing motion, semantic structure and form delivery remain intact. |

The final source adds `data-nosnippet` to the mock case-study cards/review note; a regression assertion verifies this. These placeholders are not represented as real client projects or ratings in structured data.

The production build retains the existing baseline-browser-mapping freshness notice. This work does not claim a measured Lighthouse/Core Web Vitals score or search ranking gain.

Screenshots: `seo-home-desktop.png`, `seo-contact-mobile.png`. No real enquiry was sent. The temporary development server used for noindex checks was stopped; the final production preview remains at port 3000.

Not verified or changed: deployment/publication of this working tree, Search Console ownership, sitemap submission to Google, Google-selected canonical/indexing, external Rich Results/Schema.org validator output, account configuration, DNS, permanent host redirects, analytics and field performance. See `../seo-plan.md` for the launch checklist.
