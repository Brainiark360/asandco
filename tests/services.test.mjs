import test from "node:test";
import assert from "node:assert/strict";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const { services, featuredServices } = loadTypeScript("../../src/lib/site-data.ts");

test("includes all eleven non-PR service categories from the requested reference list", () => {
  assert.deepEqual(Array.from(services, (service) => service.shortcut), [
    "Brand identity & design",
    "Social media management",
    "Digital marketing",
    "Web & app development",
    "Strategy & consultancy",
    "Billboard placement",
    "Photography",
    "TV & radio advertising",
    "Documentaries",
    "Printing services",
    "Event coverage",
  ]);
});
test("makes social media management a standalone featured service with a practical scope", () => {
  const social = services.find((service) => service.id === "social-media-management");
  assert.ok(social);
  assert.ok(featuredServices.some((service) => service.id === social.id));
  const scope = social.inclusions.join(" ");
  for (const term of ["calendars", "scheduling", "Community", "reporting"]) assert.ok(scope.includes(term));
});
test("has unique link targets, complete service copy and no PR offering", () => {
  assert.equal(new Set(services.map((service) => service.id)).size, services.length);
  for (const [index, service] of services.entries()) {
    assert.match(service.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(service.eyebrow.startsWith(String(index + 1).padStart(2, "0") + " / "));
    for (const field of ["title", "shortcut", "description", "intent", "outcome"]) assert.ok(service[field].trim());
    assert.equal(service.inclusions.length, 4);
    assert.doesNotMatch(JSON.stringify(service), /\bPR\b|public relations|press relations|crisis communications/i);
  }
});
test("preserves the original service URLs for existing links and bookmarks", () => {
  for (const id of ["brand-presence", "growth-marketing", "digital-systems"]) assert.ok(services.some((service) => service.id === id));
});
