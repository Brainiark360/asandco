// A single observer per route. No scroll listeners, React scroll state or
// permanently hidden server-rendered content.
const targets = [
  "[data-reveal]",
  ".section__content > .eyebrow", ".section__content > .body-copy", ".section__content > .small-copy",
  ".section__content > .button", ".section__content > .text-link", ".section__content > .divider",
  ".section__content > .heading-sm", ".section__content > .brand-sculpture",
  ".service-directory > .eyebrow", ".service-directory li", ".service-detail__actions > *",
  ".faq-row", ".client-marquee__header", ".contact-form",
  ".contact-invitation > :not(.heading-enter)",
  ".footer-top > *", ".footer-inner > .divider", ".footer-inner > .small-copy",
].join(",");

type MotionBrowser = Pick<Window, "matchMedia" | "getComputedStyle" | "innerHeight" | "location" | "addEventListener" | "removeEventListener"> & {
  IntersectionObserver?: typeof IntersectionObserver;
  HTMLElement: typeof HTMLElement;
};

export function revealDelay(index: number) {
  return Math.min(Math.max(index, 0), 3) * 40;
}

export function revealKind(node: HTMLElement) {
  const specified = node.getAttribute("data-reveal");
  // JSX's boolean data-reveal renders as the string "true". Treat it as
  // an opt-in flag, not a named variant, so legacy markup can be inferred.
  if (specified && ["up", "left", "right", "scale", "line"].includes(specified)) return specified;
  if (node.classList.contains("divider")) return "line";
  if (node.classList.contains("project-card") || node.classList.contains("brand-sculpture")) return "scale";
  if (node.classList.contains("service-intent")) return "left";
  if (node.classList.contains("service-inclusions") || node.classList.contains("contact-form")) return "right";
  return "up";
}

export function mountPageMotion(root: Document, browser: MotionBrowser) {
  const preference = browser.matchMedia("(prefers-reduced-motion: reduce)");
  let stop = () => {};

  function enhance() {
    const Observer = browser.IntersectionObserver;
    if (!Observer) return () => {};

    // Do not animate a container and its descendants at the same time.
    // Hero/intro/confirmation entrances are handled by CSS on every mount.
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(targets)).filter((node) =>
      !node.closest(".home-hero, .page-intro, .success-section")
    );
    const candidateSet = new Set(candidates);
    const nodes = candidates.filter((node) => {
      for (let parent = node.parentElement; parent; parent = parent.parentElement) {
        if (candidateSet.has(parent)) return false;
      }
      return true;
    });
    // Batch geometry reads before preparing off-screen targets.
    const saved = nodes.map((node) => ({
      node, rect: node.getBoundingClientRect(),
      reveal: node.getAttribute("data-reveal"), state: node.getAttribute("data-reveal-state"),
      delay: node.style.getPropertyValue("--reveal-delay"),
    }));
    const animations = new Map<HTMLElement, Animation>();
    const pending = new Set<HTMLElement>();
    let active = true;
    const groups = new Map<HTMLElement | null, number>();
    const tokens = browser.getComputedStyle(root.documentElement);
    const duration = Number.parseFloat(tokens.getPropertyValue("--duration-reveal")) || 540;
    const easing = tokens.getPropertyValue("--ease-enter").trim() || "cubic-bezier(.16, 1, .3, 1)";
    const observer = new Observer((entries) => {
      if (!active) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        node.dataset.revealState = "visible";
        pending.delete(node);
        observer.unobserve(node);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    for (const { node, rect } of saved) {
      const index = groups.get(node.parentElement) || 0;
      groups.set(node.parentElement, index + 1);
      const delay = revealDelay(index);
      node.dataset.reveal = revealKind(node);
      node.style.setProperty("--reveal-delay", delay + "ms");
      if (rect.top >= browser.innerHeight - 24) {
        node.dataset.revealState = "pending";
        pending.add(node);
        observer.observe(node);
      } else {
        node.dataset.revealState = "visible";
        if (rect.bottom <= 0 || rect.width === 0 || node.contains(root.activeElement) || typeof node.animate !== "function") continue;
        const appearance = browser.getComputedStyle(node);
        const x = appearance.getPropertyValue("--reveal-x").trim() || "0px";
        const y = appearance.getPropertyValue("--reveal-y").trim() || "24px";
        const scale = appearance.getPropertyValue("--reveal-scale").trim() || "1";
        const animation = node.animate([
          { opacity: 0, translate: x + " " + y, scale },
          { opacity: 1, translate: "0px 0px", scale: "1" },
        ], { duration, delay, easing, fill: "backwards" });
        animations.set(node, animation);
        animation.onfinish = () => { animations.delete(node); };
      }
    }

    function showImmediately(node: HTMLElement) {
      animations.get(node)?.cancel();
      animations.delete(node);
      node.dataset.revealState = "instant";
      pending.delete(node);
      observer.unobserve(node);
    }
    function onFocus(event: Event) {
      if (!(event.target instanceof browser.HTMLElement)) return;
      for (let node: HTMLElement | null = event.target; node; node = node.parentElement) {
        if (pending.has(node) || animations.has(node)) showImmediately(node);
      }
    }
    function onHash() {
      let id: string;
      try { id = decodeURIComponent(browser.location.hash.slice(1)); } catch { return; }
      const anchor = id ? root.getElementById(id) : null;
      if (anchor) for (const { node } of saved) {
        if (anchor === node || anchor.contains(node)) showImmediately(node);
      }
    }
    onHash();
    root.addEventListener("focusin", onFocus);
    browser.addEventListener("hashchange", onHash);

    return () => {
      active = false;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      root.removeEventListener("focusin", onFocus);
      browser.removeEventListener("hashchange", onHash);
      for (const { node, reveal, state, delay } of saved) {
        if (reveal === null) node.removeAttribute("data-reveal"); else node.setAttribute("data-reveal", reveal);
        if (state === null) node.removeAttribute("data-reveal-state"); else node.setAttribute("data-reveal-state", state);
        if (delay) node.style.setProperty("--reveal-delay", delay); else node.style.removeProperty("--reveal-delay");
      }
    };
  }

  function syncPreference() {
    stop();
    stop = preference.matches ? () => {} : enhance();
  }
  syncPreference();
  preference.addEventListener("change", syncPreference);
  return () => {
    stop();
    preference.removeEventListener("change", syncPreference);
  };
}
