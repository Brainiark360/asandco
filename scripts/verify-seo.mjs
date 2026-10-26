import assert from "node:assert/strict";

// Read-only smoke check against a running production build, never external forms.
// Usage: node scripts/verify-seo.mjs http://localhost:3000
//        node scripts/verify-seo.mjs http://localhost:3001 --noindex
const base = new URL(process.argv[2] || "http://localhost:3000");
const indexable = !process.argv.includes("--noindex");
const canonical = "https://alexanderstephen.com";
const paths = ["/", "/about", "/services", "/approach", "/contact"];
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const tags = (html, tag) => Array.from(html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi")), (match) => {
  const attrs = {};
  for (const attr of match[0].matchAll(/([\w:-]+)="([^"]*)"/g)) attrs[attr[1]] = decode(attr[2]);
  return attrs;
});
const request = async (path) => {
  const response = await fetch(new URL(path, base), { headers: { "User-Agent": "Googlebot" }, redirect: "manual", signal: AbortSignal.timeout(15000) });
  return { response, html: await response.text() };
};
const titles = new Set();
const descriptions = new Set();
for (const path of paths) {
  const { response, html } = await request(path);
  assert.equal(response.status, 200, path);
  const metas = tags(html, "meta");
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
  const meta = (name) => metas.find((tag) => tag.name === name || tag.property === name)?.content;
  const links = tags(html, "link").filter((link) => link.rel === "canonical");
  const expected = canonical + (path === "/" ? "/" : path);
  assert.equal(links.length, 1, "one canonical: " + path);
  // Next.js omits the optional trailing slash on an origin-only canonical.
  assert.equal(new URL(links[0].href).href, expected, path);
  assert.equal(new URL(meta("og:url")).href, expected);
  assert.equal(meta("og:title"), title);
  assert.equal(meta("twitter:title"), title);
  assert.equal(meta("description"), meta("og:description"));
  assert.equal(meta("description"), meta("twitter:description"));
  assert.equal(meta("twitter:card"), "summary_large_image");
  assert.equal(meta("og:image"), canonical + "/seo/clear-momentum-social.png");
  assert.equal(meta("robots").includes("noindex"), !indexable, "indexing: " + path);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, "one h1: " + path);
  const schemas = Array.from(html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g), (match) => JSON.parse(match[1]));
  assert.equal(schemas.length, indexable ? 1 : 0, "server-rendered JSON-LD: " + path);
  if (path === "/services" && indexable) {
    assert.equal(schemas[0]["@graph"].find((node) => node["@type"] === "OfferCatalog").itemListElement.length, 11);
  }
  titles.add(title);
  descriptions.add(meta("description"));
  console.log(`PASS ${path}: unique search/share metadata, canonical, heading, robots, JSON-LD`);
}
assert.equal(titles.size, 5);
assert.equal(descriptions.size, 5);

const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.response.status, 200);
const locations = Array.from(sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
assert.deepEqual(locations, indexable ? paths.map((path) => canonical + (path === "/" ? "/" : path)) : []);
const robots = await request("/robots.txt");
assert.equal(robots.response.status, 200);
assert.match(robots.html, /Allow: \/\s/);
assert.match(robots.html, /Disallow: \/api\//);
assert.equal(robots.html.includes("Sitemap: " + canonical + "/sitemap.xml"), indexable);
assert.ok(!robots.html.includes("Disallow: /contact"));
console.log("PASS sitemap and robots: canonical pages only, success page remains crawlable for noindex");

for (const [path, status] of [["/contact/thank-you", 200], ["/this-page-does-not-exist-seo-check", 404]]) {
  const { response, html } = await request(path);
  assert.equal(response.status, status);
  assert.ok(tags(html, "meta").some((tag) => tag.name === "robots" && tag.content.includes("noindex")));
  console.log(`PASS ${path}: HTTP ${status}, noindex`);
}
for (const path of ["/seo/clear-momentum-social.png", "/seo/alexander-stephen-logo.png", "/apple-icon.png", "/favicon.ico", "/icon.svg"]) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /^image\//);
  console.log("PASS asset " + path);
}
const trailingSlash = await request("/services/");
assert.equal(trailingSlash.response.status, 308);
assert.equal(trailingSlash.response.headers.get("location"), "/services");
console.log("PASS trailing slash normalization: 308 to /services");
console.log(`SEO smoke checks passed (${indexable ? "production" : "noindex preview"}).`);
