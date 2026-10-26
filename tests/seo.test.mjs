import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const data = loadTypeScript("../../src/lib/site-data.ts");
function loadSeo(env = { NODE_ENV: "production" }) {
  return loadTypeScript("../../src/lib/seo.ts", {
    process: { env },
    require(name) {
      if (name === "./site-data") return data;
      throw new Error("Unexpected dependency: " + name);
    },
  });
}
const seo = loadSeo();

test("all public pages have unique, consistent canonical, search and share metadata", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const path of Object.keys(seo.seoPages)) {
    const metadata = seo.pageMetadata(path);
    titles.add(metadata.title.absolute);
    descriptions.add(metadata.description);
    assert.equal(metadata.alternates.canonical, "https://alexanderstephen.com" + (path === "/" ? "/" : path));
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.equal(metadata.openGraph.title, metadata.title.absolute);
    assert.equal(metadata.twitter.title, metadata.title.absolute);
    assert.equal(metadata.openGraph.description, metadata.description);
    assert.equal(metadata.twitter.description, metadata.description);
    assert.equal(metadata.openGraph.locale, "en_NG");
    assert.equal(metadata.twitter.card, "summary_large_image");
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.robots.follow, true);
    assert.equal(metadata.openGraph.images[0].url, seo.absoluteUrl(seo.site.image));
    assert.ok(metadata.description.length >= 100 && metadata.description.length <= 165);
  }
  assert.equal(titles.size, 5);
  assert.equal(descriptions.size, 5);
});

test("only production is indexable; preview, custom staging and explicit opt-out remain noindex", () => {
  assert.equal(seo.canIndex(), true);
  for (const env of [
    {}, { NODE_ENV: "development" }, { NODE_ENV: "test" },
    { NODE_ENV: "production", VERCEL_ENV: "preview" },
    { NODE_ENV: "production", VERCEL_ENV: "production", VERCEL_TARGET_ENV: "staging" },
    { NODE_ENV: "production", SEO_NOINDEX: "true" },
  ]) {
    const preview = loadSeo(env);
    assert.equal(preview.canIndex(), false);
    assert.equal(preview.pageMetadata("/").robots.index, false);
    assert.equal(preview.pageMetadata("/").robots.follow, true);
    assert.equal(preview.sitemapEntries().length, 0);
    assert.equal(preview.robotsRules().sitemap, undefined);
    assert.equal(preview.robotsRules().rules.allow, "/", "allow crawling so noindex is readable");
    assert.equal(preview.pageMetadata("/").alternates.canonical, seo.absoluteUrl());
  }
  assert.equal(seo.canIndex({ NODE_ENV: "production", VERCEL_ENV: "production" }), true);
});

test("sitemap and robots expose exactly the five canonical pages and allow noindex to be read", () => {
  assert.deepEqual(Array.from(seo.sitemapEntries(), (entry) => entry.url), [
    "https://alexanderstephen.com/", "https://alexanderstephen.com/about", "https://alexanderstephen.com/services",
    "https://alexanderstephen.com/approach", "https://alexanderstephen.com/contact",
  ]);
  assert.equal(seo.robotsRules().sitemap, "https://alexanderstephen.com/sitemap.xml");
  assert.equal(seo.robotsRules().rules.disallow, "/api/");
  for (const entry of seo.sitemapEntries()) {
    assert.doesNotMatch(entry.url, /#|thank-you|api|localhost|vercel/);
    assert.equal(entry.lastModified, undefined, "do not invent freshness timestamps");
  }
});

test("JSON-LD represents the real organization, regions, navigation and eleven services only", () => {
  const home = seo.pageSchema("/")["@graph"];
  const organization = home.find((node) => node["@type"] === "Organization");
  assert.equal(organization.name, "Alexander Stephen & Co.");
  assert.equal(organization.logo.url, "https://alexanderstephen.com/seo/alexander-stephen-logo.png");
  assert.deepEqual(Array.from(organization.areaServed, (area) => area.name), ["Nigeria", "Africa", "United States", "United Kingdom"]);
  assert.ok(home.some((node) => node["@type"] === "WebSite"));
  const graph = seo.pageSchema("/services")["@graph"];
  const catalogue = graph.find((node) => node["@type"] === "OfferCatalog");
  assert.equal(catalogue.itemListElement.length, 11);
  for (const [index, offer] of catalogue.itemListElement.entries()) {
    assert.equal(offer.itemOffered.url, "https://alexanderstephen.com/services#" + data.services[index].id);
    assert.equal(offer.itemOffered.name, data.services[index].title.replace(/\n/g, " "));
    assert.equal(offer.itemOffered.provider["@id"], organization["@id"]);
  }
  for (const path of Object.keys(seo.seoPages).filter((path) => path !== "/")) {
    const breadcrumb = seo.pageSchema(path)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement[1].item, seo.absoluteUrl(path));
  }
  const all = JSON.stringify(graph) + JSON.stringify(home);
  assert.doesNotMatch(all, /aggregateRating|reviewCount|streetAddress|telephone|sameAs|LocalBusiness|FAQPage|Client A|Client B|Public Relations/);
});

test("structured data is serialized safely and rendered without client JavaScript", () => {
  const attack = { text: "</script><script>alert('test')</script>" };
  const serialized = seo.serializeJsonLd(attack);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), attack);
  const component = readFileSync(new URL("../src/components/StructuredData.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(component, /use client|useEffect|next\/script/);
  assert.match(component, /application\/ld\+json/);
  assert.match(component, /serializeJsonLd\(pageSchema\(path\)\)/);
  for (const path of Object.keys(seo.seoPages)) {
    const file = path === "/" ? "page.tsx" : path.slice(1) + "/page.tsx";
    const source = readFileSync(new URL("../src/app/" + file, import.meta.url), "utf8");
    assert.ok(source.includes(`pageMetadata("${path}")`));
    assert.ok(source.includes(`<StructuredData path="${path}" />`));
  }
  const thankYou = readFileSync(new URL("../src/app/contact/thank-you/page.tsx", import.meta.url), "utf8");
  assert.match(thankYou, /index: false/);
  const work = readFileSync(new URL("../src/components/WorkSection.tsx", import.meta.url), "utf8");
  assert.match(work, /className="project-grid" data-nosnippet=""/);
  assert.match(work, /<span data-nosnippet="">Case study/);
});

test("share and organization images are valid raster assets with declared dimensions", async () => {
  for (const [path, width, height] of [
    ["public/seo/clear-momentum-social.png", 1200, 630],
    ["public/seo/alexander-stephen-logo.png", 512, 512],
    ["src/app/apple-icon.png", 180, 180],
  ]) {
    const image = await sharp(readFileSync(new URL("../" + path, import.meta.url))).metadata();
    assert.equal(image.format, "png");
    assert.equal(image.width, width);
    assert.equal(image.height, height);
  }
  const ico = readFileSync(new URL("../src/app/favicon.ico", import.meta.url));
  assert.equal(ico.readUInt16LE(2), 1);
  const embedded = await sharp(ico.subarray(ico.readUInt32LE(18))).metadata();
  assert.equal(embedded.width, 48);
  assert.equal(embedded.height, 48);
});
