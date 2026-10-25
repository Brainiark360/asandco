# Alexander Stephen & Co. — Clear Momentum

Responsive implementation of the approved Figma identity and Home, About, Services, Approach and Contact mockups. Next.js App Router, React, TypeScript and token-based CSS. The client section uses the supplied client names and sourced logo assets; case-study names/visuals intentionally remain placeholders.

## Run locally

    npm ci
    npm run dev

Open http://localhost:3000. The development server may choose another port if 3000 is occupied.

    npm run lint
    npm test
    npm run build

Tests exercise the real TypeScript validator and API route, with outbound delivery mocked. No test sends a real enquiry.

## Design source

[Figma mockups](https://www.figma.com/design/jl4MtQR9H7ZDWewqWJiOu9)

- Fonts: Space Grotesk Medium, Manrope, IBM Plex Mono. Served locally by next/font after build.
- Colours and motion tokens: src/app/globals.css.
- Shared content: src/lib/site-data.ts.
- Client names and local artwork: src/lib/clients.ts and public/clients/. Source provenance, missing assets and pre-launch brand-permission checks: design/client-logo-sources.md.
- Service catalogue: eleven services adapted from Rage Media’s published list, excluding PR. Social media management is featured on the homepage; every service is listed in the directory and Services index. See design/service-catalogue-reference.md for coverage.
- Original, unchanged SVG exports: public/brand/.
- Retrieved Figma layout references and asset provenance: design/reference/.
- Desktop reference: 1440px. Mobile reference: 390px. Intermediate sizes reflow without fixed canvas widths.
- Motion: coordinated 400ms page entries, 600ms headline choreography and 540ms once-only directional reveals with a 40ms stagger capped at 120ms. Brand artwork and a reading-progress line use native scroll timelines where supported. The client strip retains its seamless 84s/72s loop and pause controls. Reduced-motion, focus, deep-link and no-JavaScript fallbacks are built in; no scroll hijacking. See design/motion-system.md.
- The superseded grayscale section components have been replaced with the shared Clear Momentum components.
- Small accessibility adjustment from the mockup: body copy on cobalt is white (5.96:1 contrast), rather than muted blue-gray (3.43:1).

## Enquiry delivery — configure before launch

The form validates on the client and server. It never claims an enquiry was received without a successful delivery acknowledgement.

Copy .env.example to .env.local and configure CONTACT_WEBHOOK_URL with an HTTPS endpoint that you control. Optionally set CONTACT_WEBHOOK_TOKEN; the server sends it as a Bearer authorization header. Keep both variables private. Do not prefix them with NEXT_PUBLIC_. Restart the local server after changing configuration. Configure the same server-only values in your hosting environment.

The endpoint receives a POST with this JSON shape:

    {
      "name": "Test Person",
      "email": "person@example.com",
      "company": "Optional company",
      "website": "https://example.com",
      "message": "The enquiry",
      "source": "alexander-stephen-website",
      "submittedAt": "ISO timestamp"
    }

Return a 2xx response only after accepting the enquiry for delivery/storage. Any other response, redirect or an 8-second timeout is treated as a failure. The UI keeps the entered details and offers a retry. An unconfigured destination returns 503, not a false success. No form entries are logged or stored in this application. Add production rate limiting/spam controls at your hosting layer before public launch.

The success design is at /contact/thank-you and is not indexed by search engines. It is reached by the form only on successful delivery.

## Accessibility and interaction

One main landmark per page, semantic headings, visible keyboard focus, skip link, native modal focus trapping/Escape, accessible FAQ disclosures, labelled fields and inline validation. The navigation and all service shortcuts use real links. Static page content remains server-rendered; only navigation, enquiry handling and reveal enhancement need client JavaScript.
