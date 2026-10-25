import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const { mountPageMotion, revealDelay, revealKind } = loadTypeScript("../../src/lib/page-motion.ts");

class MotionNode {
  constructor(classes = [], top = 1200, parent = null) {
    this.classList = new Set(classes);
    this.classList.contains = this.classList.has.bind(this.classList);
    this.parentElement = parent;
    this.rect = { top, bottom: top + 100, width: 320 };
    this.attributes = new Map();
    this.properties = new Map();
    this.style = {
      getPropertyValue: (name) => this.properties.get(name) || "",
      setProperty: (name, value) => this.properties.set(name, value),
      removeProperty: (name) => this.properties.delete(name),
    };
    this.dataset = new Proxy({}, { set: (_, key, value) => { this.attributes.set("data-" + key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase()), value); return true; } });
    this.animations = [];
  }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  removeAttribute(name) { this.attributes.delete(name); }
  getBoundingClientRect() { return this.rect; }
  contains(node) { for (let current = node; current; current = current.parentElement) if (current === this) return true; return false; }
  closest(selector) {
    if (selector === "[data-reveal]" && this.attributes.has("data-reveal")) return this;
    if (selector.split(",").some((part) => this.classList.has(part.trim().slice(1)))) return this;
    return this.parentElement?.closest(selector) || null;
  }
  animate(frames, options) {
    const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; } };
    this.animations.push(animation);
    return animation;
  }
}

function fixture(nodes, { reduced = false, observerAvailable = true, hash = "", anchors = {} } = {}) {
  const mediaListeners = new Set();
  const documentListeners = new Map();
  const windowListeners = new Map();
  const observers = [];
  const preference = {
    matches: reduced,
    addEventListener: (_, callback) => mediaListeners.add(callback),
    removeEventListener: (_, callback) => mediaListeners.delete(callback),
  };
  const root = {
    documentElement: new MotionNode(), activeElement: null,
    querySelectorAll: () => nodes,
    getElementById: (id) => anchors[id] || null,
    addEventListener: (name, callback) => documentListeners.set(name, callback),
    removeEventListener: (name) => documentListeners.delete(name),
  };
  const browser = {
    innerHeight: 800, location: { hash }, HTMLElement: MotionNode,
    matchMedia: () => preference,
    getComputedStyle: () => ({ getPropertyValue: (name) => ({ "--duration-reveal": "540ms", "--ease-enter": "cubic-bezier(.16, 1, .3, 1)", "--reveal-y": "28px" })[name] || "" }),
    addEventListener: (name, callback) => windowListeners.set(name, callback),
    removeEventListener: (name) => windowListeners.delete(name),
    IntersectionObserver: observerAvailable ? class {
      constructor(callback, options) { this.callback = callback; this.options = options; this.observed = new Set(); this.disconnected = false; observers.push(this); }
      observe(node) { this.observed.add(node); }
      unobserve(node) { this.observed.delete(node); }
      disconnect() { this.observed.clear(); this.disconnected = true; }
    } : undefined,
  };
  return { root, browser, observers, preference, mediaListeners, documentListeners, windowListeners,
    setReduced(value) { preference.matches = value; mediaListeners.forEach((listener) => listener()); },
  };
}

test("motion kinds match the content, and stagger never exceeds 120ms", () => {
  assert.deepEqual(Array.from([-1, 0, 1, 2, 3, 99], revealDelay), [0, 0, 40, 80, 120, 120]);
  for (const [name, kind] of [["divider", "line"], ["project-card", "scale"], ["service-intent", "left"], ["service-inclusions", "right"], ["contact-form", "right"], ["body-copy", "up"]]) {
    const node = new MotionNode([name]);
    assert.equal(revealKind(node), kind);
    node.setAttribute("data-reveal", "true");
    assert.equal(revealKind(node), kind);
  }
  const custom = new MotionNode(["service-intent"]);
  custom.setAttribute("data-reveal", "scale");
  assert.equal(revealKind(custom), "scale");
});

test("visible content enters once, off-screen content waits, nested content is not double-animated", () => {
  const visible = new MotionNode([], 100);
  const card = new MotionNode(["project-card"]);
  const nested = new MotionNode([], 1250, card);
  const f = fixture([visible, card, nested]);
  const cleanup = mountPageMotion(f.root, f.browser);
  assert.equal(f.observers.length, 1);
  assert.equal(visible.getAttribute("data-reveal-state"), "visible");
  assert.equal(visible.animations.length, 1);
  assert.equal(visible.animations[0].options.fill, "backwards");
  assert.equal(visible.animations[0].options.duration, 540);
  assert.equal(card.getAttribute("data-reveal-state"), "pending");
  assert.equal(nested.getAttribute("data-reveal-state"), null);
  assert.ok(f.observers[0].observed.has(card));
  f.observers[0].callback([{ target: card, isIntersecting: true }]);
  assert.equal(card.getAttribute("data-reveal-state"), "visible");
  assert.ok(!f.observers[0].observed.has(card));
  cleanup();
  assert.equal(card.getAttribute("data-reveal"), null);
  assert.equal(visible.animations[0].cancelled, true);
});

test("keyboard focus immediately reveals a pending panel and cancels an entrance", () => {
  const panel = new MotionNode(["contact-form"]);
  const input = new MotionNode([], 1250, panel);
  input.setAttribute("data-reveal", "up");
  const visible = new MotionNode([], 100);
  const f = fixture([panel, visible]);
  const cleanup = mountPageMotion(f.root, f.browser);
  f.documentListeners.get("focusin")({ target: input });
  assert.equal(panel.getAttribute("data-reveal-state"), "instant");
  f.documentListeners.get("focusin")({ target: visible });
  assert.equal(visible.animations[0].cancelled, true);
  assert.equal(visible.getAttribute("data-reveal-state"), "instant");
  cleanup();
});

test("reduced motion is respected on load, responds to changes, and cleans up listeners", () => {
  const node = new MotionNode();
  node.setAttribute("data-reveal", "left");
  node.style.setProperty("--reveal-delay", "19ms");
  const f = fixture([node], { reduced: true });
  const cleanup = mountPageMotion(f.root, f.browser);
  assert.equal(f.observers.length, 0);
  assert.equal(node.getAttribute("data-reveal-state"), null);
  f.setReduced(false);
  assert.equal(node.getAttribute("data-reveal-state"), "pending");
  f.setReduced(true);
  assert.equal(node.getAttribute("data-reveal-state"), null);
  assert.equal(node.getAttribute("data-reveal"), "left");
  assert.equal(node.style.getPropertyValue("--reveal-delay"), "19ms");
  assert.ok(f.observers[0].disconnected);
  cleanup();
  assert.equal(f.mediaListeners.size, 0);
  assert.equal(f.documentListeners.size, 0);
  assert.equal(f.windowListeners.size, 0);
});

test("deep links reveal their destination immediately, including later hash navigation", () => {
  const anchor = new MotionNode();
  const title = new MotionNode([], 1300, anchor);
  const other = new MotionNode();
  const f = fixture([title, other], { hash: "#social", anchors: { social: anchor, other } });
  const cleanup = mountPageMotion(f.root, f.browser);
  assert.equal(title.getAttribute("data-reveal-state"), "instant");
  assert.equal(other.getAttribute("data-reveal-state"), "pending");
  f.browser.location.hash = "#other";
  f.windowListeners.get("hashchange")();
  assert.equal(other.getAttribute("data-reveal-state"), "instant");
  f.browser.location.hash = "#%broken";
  assert.doesNotThrow(() => f.windowListeners.get("hashchange")());
  cleanup();
});

test("missing browser APIs and restored scroll positions cannot leave content hidden", () => {
  const node = new MotionNode();
  const f = fixture([node], { observerAvailable: false });
  const cleanup = mountPageMotion(f.root, f.browser);
  assert.equal(node.getAttribute("data-reveal-state"), null);
  cleanup();
  const above = new MotionNode([], -200);
  const onscreen = new MotionNode([], 200);
  onscreen.animate = undefined;
  const restored = fixture([above, onscreen]);
  const restoreCleanup = mountPageMotion(restored.root, restored.browser);
  assert.equal(above.animations.length, 0);
  assert.equal(onscreen.getAttribute("data-reveal-state"), "visible");
  restoreCleanup();
});

test("CSS provides page entrances and safe native scroll enhancements", () => {
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.page-enter \{ animation: page-in/);
  assert.match(css, /@supports \(animation-timeline: scroll\(root block\)\)/);
  assert.match(css, /animation-timeline: --artwork-view/);
  assert.match(css, /\.service-card\[data-reveal-state="instant"\], \.service-card\[data-reveal\]:focus-within \{ transition: none; \}/);
  const reduced = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"), css.indexOf("@media print"));
  assert.match(reduced, /\.brand-sculpture__motion \{ animation: none; translate: none; rotate: none; \}/);
  assert.match(reduced, /\.reading-progress \{ display: none; \}/);
  assert.match(reduced, /\[data-reveal-state\] \{ opacity: 1; translate: none; scale: 1; \}/);
});
