import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const { clients } = loadTypeScript("../../src/lib/clients.ts");

test("includes all twelve supplied clients in the supplied order", () => {
  assert.deepEqual(Array.from(clients, (client) => client.name), [
    "Alpha Nobis Limited", "Stephen Akintayo Consulting", "Gtext Holdings",
    "GER Holdings", "Google", "Gates Foundation", "Oppo Nigeria",
    "Tunga Nutrition", "Avipro Rwanda", "Iziwacu", "Kukuyacu", "Brainiark Technologies",
  ]);
  assert.equal(new Set(clients.map((client) => client.id)).size, clients.length);
});

test("every available logo is a valid local image with accurate intrinsic dimensions", async () => {
  const logos = clients.filter((client) => client.logo);
  assert.equal(logos.length, 11);
  for (const { logo } of logos) {
    assert.match(logo.src, /^\/clients\/[a-z-]+\.(png|jpg|svg)$/);
    const asset = readFileSync(new URL("../public" + logo.src, import.meta.url));
    const metadata = await sharp(asset).metadata();
    assert.equal(metadata.width, logo.width, logo.src);
    assert.equal(metadata.height, logo.height, logo.src);
    if (metadata.format === "svg") {
      const svg = asset.toString("utf8");
      assert.doesNotMatch(svg, /<script|<foreignObject|https?:\/\/(?!www\.w3\.org)/i);
    }
  }
});

test("an unavailable logo stays explicitly missing and its source is documented", () => {
  assert.deepEqual(Array.from(clients.filter((client) => !client.logo), (client) => client.name), ["GER Holdings"]);
  const sources = readFileSync(new URL("../design/client-logo-sources.md", import.meta.url), "utf8");
  for (const client of clients) assert.ok(sources.includes(client.name));
  assert.match(sources, /permission/i);
});
