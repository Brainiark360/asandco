import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Raster derivatives of the approved, unchanged Clear Momentum vector assets.
// Run explicitly when updating the identity; no network requests at build/runtime.
const root = new URL("../", import.meta.url);
const output = new URL("public/seo/", root);
await mkdir(output, { recursive: true });
const navyMark = await readFile(new URL("public/brand/home-desktop-imgMomentumAperture1.svg", root));
const amberMark = await readFile(new URL("public/brand/home-desktop-imgMomentumAperture3.svg", root));
const cobaltMark = await readFile(new URL("src/app/icon.svg", root));

const squareLogo = await sharp({ create: { width: 512, height: 512, channels: 4, background: "#F5F3EC" } })
  .composite([{ input: await sharp(navyMark).resize(432, 432).png().toBuffer(), left: 40, top: 40 }])
  .png().toBuffer();
await writeFile(new URL("alexander-stephen-logo.png", output), squareLogo);

const shareCard = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#142443"/>
  <rect x="0" y="0" width="12" height="630" fill="#244BFF"/>
  <text x="64" y="82" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="600" fill="#FFFFFF">alexander stephen &amp; co.</text>
  <text x="64" y="227" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="600" letter-spacing="-3" fill="#FFFFFF">Clear thinking.</text>
  <text x="64" y="321" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="600" letter-spacing="-3" fill="#FFCE73">Real momentum.</text>
  <image x="799" y="145" width="340" height="340" href="data:image/svg+xml;base64,${amberMark.toString("base64")}"/>
  <text x="66" y="403" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#B8C5DF">Branding. Social media. Digital marketing.</text>
  <text x="66" y="439" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#B8C5DF">Web development. Creative production.</text>
  <path d="M64 507H1136" stroke="#B8C5DF" stroke-opacity="0.25"/>
  <text x="64" y="560" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#FFFFFF">NIGERIA / AFRICA / US / UK</text>
  <text x="1136" y="560" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#FFCE73">alexanderstephen.com</text>
</svg>`);
await sharp(shareCard).png().toFile(fileURLToPath(new URL("clear-momentum-social.png", output)));

await sharp(squareLogo).resize(180, 180).png().toFile(fileURLToPath(new URL("src/app/apple-icon.png", root)));
const faviconPng = await sharp({ create: { width: 48, height: 48, channels: 4, background: "#F5F3EC" } })
  .composite([{ input: await sharp(cobaltMark).resize(44, 44).png().toBuffer(), left: 2, top: 2 }])
  .png().toBuffer();
// A single 48px PNG entry inside the standard ICO container.
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader[6] = 48;
icoHeader[7] = 48;
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(faviconPng.length, 14);
icoHeader.writeUInt32LE(22, 18);
await writeFile(new URL("src/app/favicon.ico", root), Buffer.concat([icoHeader, faviconPng]));
console.log("Generated social card, organization logo, Apple icon and favicon from approved brand marks.");
