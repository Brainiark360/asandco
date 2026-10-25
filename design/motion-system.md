# Clear Momentum / website motion

The motion extends the identity's combination of structure and forward progress. It guides attention through the content while keeping navigation and enquiry entry immediate.

## Vocabulary

| Motion | Behaviour |
| --- | --- |
| Page load / route entry | 400ms fade and 14px lift on every template mount. Headline lines rise in 600ms, 40ms apart. |
| Intro copy / actions | 400ms lift/fade, 120–220ms after the headline starts. Service-index links use three short stagger positions. |
| Scroll reveals | 540ms ease-out, once per route visit. Copy rises; opposing service columns enter from their respective sides; project artwork scales from 96%; dividers draw from the left. |
| Group choreography | 40ms sibling steps, capped at 120ms. A reveal finishes within 660ms, not a long cascading queue. |
| Scroll-linked artwork | Decorative brand symbols drift and turn gently with their position in the viewport. 24px / 3 degrees desktop, 12px / 1.5 degrees mobile. |
| Reading progress / header | Native scroll timeline fills a 3px cobalt line and introduces a subtle header shadow. |
| Client strip | Existing 84s desktop / 72s mobile linear loop, independent pause/resume and hover/focus pause. |

Tokens and keyframes live in `src/app/globals.css`; observer lifecycle is in `src/lib/page-motion.ts`, mounted by `MotionExperience` on pathname changes. Static artwork and content remain server-rendered.

## Safety and fallbacks

- No scroll hijacking, blocking transitions, animation-based navigation delays, scroll-triggered React renders or per-frame JavaScript scroll listeners.
- One IntersectionObserver per route; unobserve revealed nodes, release finished entrance animations, and cancel/disconnect everything on route changes.
- Avoid simultaneous parent/child reveals. Client-logo copies and form inputs are not individually animated.
- Focused content appears immediately; validation focus is never left on a hidden control. Fragment destinations also appear immediately.
- Respect reduced motion on first load and when the OS preference changes. Remove observer-driven transforms/animations, disable artwork drift and progress effects, and preserve the client strip's manual-scroll fallback.
- Without JavaScript or IntersectionObserver, normal content stays visible. CSS page entrances still finish naturally; native scroll extras are feature-gated.
- Native scroll timelines are progressive enhancement, not a condition for reading or navigating the site. Unsupported browsers retain the entrance/observer experience.
- Print removes motion and reveals all content.

## Implementation references

[MDN: animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline), [named view timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline), [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API).
