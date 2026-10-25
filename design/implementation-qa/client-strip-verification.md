# Client scrolling strip verification

25 October 2026. Story: the homepage renders the supplied client list and local logo assets, progressively enhances it into a continuous scrolling strip, and lets visitors stop/resume motion without losing client information.

## Evidence

- Production build and TypeScript pass; ESLint passes. All 21 tests pass, including original/duplicate group identity, semantic visibility, asset validity, static SSR fallback and reduced-motion CSS contracts.
- Production server reported `Ready in 990ms`; no browser warnings/errors were recorded during this check. This feature needs no external API, credentials or environment configuration.
- Desktop 1440px: document width and scroll width both 1425px (Windows scrollbar excluded). Both groups measure 2928px; track measures 5856px. The -50% endpoint therefore equals exactly one full group, including its trailing spacing. Computed animation is `84s linear infinite client-scroll`.
- Mobile 390px: document width and scroll width both 375px. Both groups measure approximately 2304px, tile width 176px, animation duration 72s.
- Additional 320px, 768px and 1280px checks: no page-level horizontal overflow. Document/scroll widths match at 305px, 753px and 1265px respectively.
- Pause button: `data-paused=true`, computed play state `paused`; the transform remained at `matrix(1, 0, 0, 1, -561.17, 0)` across separate observations. Resume switched play state to `running` without resetting the transform.
- Keyboard Tab from the control focused `client-strip-viewport` and paused the track. Hover also paused the track while the explicit manual pause state was false. Mobile pause/resume was verified separately.
- Accessibility tree exposes one Selected clients list with all twelve names. The repeated group is aria-hidden, with no focusable descendants.
- Reduced-motion fallback is covered by a CSS contract test, not browser preference emulation: animation is disabled, repeat group/control are hidden, and the original list is horizontally scrollable. Without JavaScript the same single-copy scrolling list is the default.
- Browser viewport overrides were reset after testing. Screenshots: `client-strip-desktop.jpg` and `client-strip-mobile.jpg`.

No client artwork, client names, case-study placeholders, unrelated services or delivery settings were changed.
