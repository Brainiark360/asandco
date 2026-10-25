import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const clientData = loadTypeScript("../../src/lib/clients.ts");
const strip = loadTypeScript("../../src/components/ClientLogoStrip.tsx", {
  require(name) {
    if (name === "react") return React;
    if (name === "react/jsx-runtime") return jsxRuntime;
    throw new Error("Unexpected dependency: " + name);
  },
});
const section = loadTypeScript("../../src/components/ClientsSection.tsx", {
  require(name) {
    if (name === "react/jsx-runtime") return jsxRuntime;
    if (name === "../lib/clients") return clientData;
    if (name === "./ClientLogoStrip") return strip;
    if (name === "next/image") return { default: (props) => React.createElement("img", props) };
    if (name === "./ui") return { Section: ({ children, ...props }) => React.createElement("section", props, children) };
    throw new Error("Unexpected dependency: " + name);
  },
});

test("renders identical original and assistive-technology-hidden repeat groups", () => {
  const html = renderToStaticMarkup(React.createElement(section.default));
  const groups = [...html.matchAll(/<ul([^>]*)>(.*?)<\/ul>/gs)];
  assert.equal(groups.length, 2);
  assert.match(groups[0][1], /aria-label="Selected clients"/);
  assert.doesNotMatch(groups[0][1], /aria-hidden/);
  assert.match(groups[1][1], /aria-hidden="true"/);
  assert.equal(groups[0][2], groups[1][2]);
  assert.equal((groups[0][2].match(/<li /g) || []).length, 12);
  assert.equal((groups[0][2].match(/<img /g) || []).length, 11);
  assert.doesNotMatch(groups[0][2], /data-reveal|tabindex|<a /i);
});

test("starts with accessible pause controls and a focusable static SSR fallback", () => {
  const html = renderToStaticMarkup(React.createElement(section.default));
  assert.match(html, /data-paused="false"/);
  assert.doesNotMatch(html, /data-animated=/);
  assert.match(html, /<button[^>]+type="button"[^>]+aria-controls="client-strip-viewport"[^>]+aria-label="Pause client logo scrolling"/);
  assert.match(html, /id="client-strip-viewport"[^>]+role="region"[^>]+aria-labelledby="client-strip-title"[^>]+tabindex="0"/);
});

test("loop motion is linear, pauses on intent, and has a single-copy reduced-motion fallback", () => {
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  assert.match(css, /animation: client-scroll var\(--duration-client-loop\) linear infinite/);
  assert.match(css, /@keyframes client-scroll \{ to \{ transform: translateX\(-50%\); \} \}/);
  assert.match(css, /data-paused="true"[\s\S]*?animation-play-state: paused/);
  assert.match(css, /viewport:focus-within[\s\S]*?animation-play-state: paused/);
  assert.match(css, /viewport:hover[\s\S]*?animation-play-state: paused/);
  const reduced = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"), css.indexOf("@media print"));
  assert.match(reduced, /client-marquee__track \{ animation: none; transform: none; \}/);
  assert.match(reduced, /client-marquee__viewport \{ overflow-x: auto; \}/);
  assert.match(reduced, /group\[aria-hidden="true"\][\s\S]*?display: none/);
});
