# SEO foundation and growth plan

Confirmed business brief, 26 October 2026: Nigeria is the primary market; additional service regions are African countries, the United States and the United Kingdom. Use English. No physical office, telephone number, social profile, accreditation, client result or review has been invented.

## Canonical host

The supplied address was `www.alexanderstephen.com`. A live HTTP check on 26 October 2026 returned `307 Location: https://alexanderstephen.com/`, followed by `200 OK`. Canonicals, sitemap, share URLs and JSON-LD therefore use `https://alexanderstephen.com`, matching the final live host. Root URLs with and without the optional slash are equivalent; Next.js serializes the homepage canonical without it.

The hosting owner should change the existing www-to-apex redirect from temporary 307 to permanent 301/308 if this remains the preferred host, and redirect public alternate deployment domains to the same host where appropriate. No hosting/DNS/account settings were changed by this implementation.

## Implemented

- Shared `src/lib/seo.ts` defines the confirmed identity, canonical host, service regions and metadata for all five public pages.
- Unique search titles/descriptions, self-canonicals, matching Open Graph/Twitter metadata and a 1200 × 630 branded raster share image. No keyword meta tags or unsupported ranking claims.
- An organization logo image, branded favicon and Apple touch icon derived from the approved original vectors. Asset generation is local and does not add network work to page loads.
- `/sitemap.xml` lists only the five real canonical pages. No fragment anchors, success page, fabricated update dates or keyword-only URLs.
- `/robots.txt` permits public pages and assets, excludes `/api/` and advertises the production sitemap. The success page remains crawlable so its `noindex` can be read.
- Production pages have Organization/WebSite, WebPage/AboutPage/ContactPage, breadcrumb and service-catalogue JSON-LD as appropriate. All eleven real services are derived from the shared service catalogue. No invented ratings, addresses, SearchAction, LocalBusiness or FAQ rich-result claims.
- All substantive content, metadata and JSON-LD remain server-rendered. No additional client-side SEO scripts, analytics dependencies or animation changes.
- Visible copy on Home, Services, About, Contact and the footer describes the work and confirmed regions. Case-study placeholders remain visible, but their cards/review note use `data-nosnippet`; they are not represented as real projects in JSON-LD. This is snippet control, not a promise that the text cannot be indexed.
- Development and Vercel previews/custom non-production environments return `noindex`, omit business JSON-LD and publish no sitemap URLs. They remain crawlable for the `noindex` to work. This is not privacy or access control: protect private previews separately.

## Page intent

These are editorial target themes, not measured search-volume or ranking estimates.

| Page | Primary intent | Content focus |
| --- | --- | --- |
| Home | Branding and digital marketing agency in Nigeria | Agency identity, capabilities, service overview and enquiry |
| About | Alexander Stephen & Co. / AS & Co. | Who the agency helps, principles and service regions |
| Services | Branding, social media management and digital services | Eleven defined service scopes, inclusions, outcomes and enquiry links |
| Approach | Strategy-led marketing process | Strategy, systems, delivery and useful measurement |
| Contact | Contact Alexander Stephen & Co. | Project enquiry, service scope and next steps |

No country-specific duplicate landing pages or `hreflang` tags were added: there are not yet distinct localized versions to annotate. An `en_NG` Open Graph locale does not prevent serving the US/UK or other African markets.

## Launch and measurement checklist

1. Deploy these changes, then check the real production HTML, `/robots.txt`, `/sitemap.xml`, share-image URL and HTTP status codes. Local verification is not evidence of deployment or Google indexing.
2. Keep `SEO_NOINDEX` blank on the real production build. For a staging build outside Vercel, set it to `true`. Vercel builds use `VERCEL_TARGET_ENV`/`VERCEL_ENV` automatically. These settings are baked into static output: rebuild/redeploy after changing them, including when promoting a preview artifact.
3. Verify a Google Search Console **Domain property** for `alexanderstephen.com` using its supplied DNS record, covering both www and non-www. Alternatively, an exact URL-prefix property can use the optional `GOOGLE_SITE_VERIFICATION` HTML-tag value from `.env.example`; it is a public verification token, not an API credential. No token or account access has been assumed.
4. Submit `https://alexanderstephen.com/sitemap.xml` in Search Console. Inspect the homepage, Services and Contact URLs; check chosen canonicals and rendered content. Validate deployed structured data with Google's Rich Results Test and Schema.org's validator. Not every schema type produces a Google rich result.
5. Establish Search Console baselines for non-brand impressions/clicks, country mix, landing pages and qualified enquiries. Add analytics/conversion tracking only after choosing a platform and appropriate privacy setup. No tracking vendor was installed in this pass.
6. Review real-user Core Web Vitals and mobile experience once field data is available. This work does not claim a Lighthouse score or measured ranking improvement.
7. Publish approved case studies with real scope, team/process details and verifiable results; resolve outstanding client-logo permission checks before launch. Keep placeholder work out of paid/organic campaign promises.

Search Console verification, sitemap submission, DNS changes, permanent-host redirects, external schema validation and indexing have not been performed by this local code change.

## Next content phase

Start with original, substantial pages for **social media management**, **brand identity/design**, **digital marketing** and **web/app development**, using real delivery details, relevant examples, audience questions and an enquiry CTA. Give each a clean service URL and preserve the existing `/services#…` links. Do not create eleven thin pages solely to increase page count.

Prioritize Nigeria first. Build US/UK or individual African-market content only when it can explain genuinely different client needs, delivery arrangements or evidence. Add office-specific LocalBusiness data/Google Business Profiles only when an eligible real-world business location and details are confirmed. Add verified official social profile URLs to Organization `sameAs` when supplied.

## Verification commands

    npm test
    npm run lint
    npm run build
    npm run start -- --hostname 127.0.0.1 --port 3000
    node scripts/verify-seo.mjs http://localhost:3000

For a running development or separately built noindex instance:

    node scripts/verify-seo.mjs http://localhost:3001 --noindex

Recreate raster derivatives after a brand change with `node scripts/generate-seo-assets.mjs`. The generator uses `sharp`, already supplied with this Next.js project and used by the existing image tests.

## Primary references

- [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: noindex and crawlability](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: snippet controls](https://developers.google.com/search/docs/appearance/snippet)
- [Next.js: Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
