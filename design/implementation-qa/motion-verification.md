# Site-wide motion verification

Story: loading or navigating to any page starts a coordinated entrance; scrolling reveals new content and moves decorative artwork, while links, deep links, forms and the existing client strip remain usable.

## Verification results

| Boundary | Result | Evidence |
| --- | --- | --- |
| Source to production build | Pass | ESLint, all 28 tests, TypeScript and `next build` pass. Final production server reports `Ready in 1096ms`. |
| Route to entrance | Pass | Home, About, Services, Approach, Contact and the thank-you page render `page-in`; computed page duration is 0.4s. Desktop navigation and mobile menu navigation were exercised. |
| Scroll to reveal | Pass | Homepage targets change from pending to visible on scroll. Service cards use 0ms / 40ms / 80ms delays and 0.54s reveal transitions. Service columns resolve to left/right, project cards to scale, dividers to line. |
| Scroll timeline to feedback | Pass | Native computed timelines are `scroll(root)` and `--artwork-view`. At document scroll 776.8px, the progress transform was `matrix(0.179848, 0, 0, 1, 0, 0)`; decorative artwork rotation also changes with scroll position. |
| Accessibility / focus | Pass | Mobile keyboard navigation reaches the name field with input and panel opacity 1. Unit tests cover immediate pending-panel reveal, cancellation of an entrance on focus, restoration on reduced-motion changes, and cleanup of observers/listeners. Focused service links explicitly bypass reveal transitions. |
| Fragment navigation | Pass | Services/social-media-management destination content becomes immediately visible rather than remaining pending. Initial and later fragment navigation are also unit-tested. |
| Responsive rendering | Pass | All six pages checked at 390px; Home/About/Services additionally checked at 320px; Home checked at 768px and 1440px. Document and scroll widths match: 305, 375, 753 and 1425px respectively, excluding the Windows scrollbar. |
| Mobile menu to next page | Pass | Menu opens, Home link closes it, body overflow is restored, and the next page entrance runs. |
| Browser diagnostics | Pass | No browser errors or warnings recorded during the final checks. |

Reduced-motion changes, missing-API/no-JavaScript safety and lifecycle cleanup are covered by controller and CSS contract tests. The OS preference itself was not changed through browser automation. Native scroll effects are feature-gated, so unsupported browsers retain observer reveals and normal scrolling.

Browser testing caught legacy JSX `data-reveal` attributes rendering as the string `true`; the controller now normalizes those flags before inferring a directional variant. A regression test covers that case.

No external API or environment configuration is involved in these visual enhancements. The contact API, client artwork and client-strip controls were not changed. No real enquiry was submitted. Build output retains the pre-existing baseline-browser-mapping freshness notice.

Preview screenshots: `motion-home-desktop.jpg`, `motion-home-mobile.jpg`, `motion-services-desktop.jpg`, `motion-contact-mobile.jpg`. Viewport overrides were reset after testing. Verification covers the local production preview; publication is tracked in Git history.
