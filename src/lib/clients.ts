type Client = {
  id: string;
  name: string;
  logo: { src: string; width: number; height: number; presentation?: "symbol" | "small" } | null;
  tone?: "navy" | "black";
};

// Original third-party artwork, stored locally. Sources and launch checks:
// design/client-logo-sources.md. A missing logo stays text-only, never invented.
export const clients: readonly Client[] = [
  { id: "alpha-nobis", name: "Alpha Nobis Limited", logo: { src: "/clients/alpha-nobis.png", width: 500, height: 119 } },
  { id: "stephen-akintayo-consulting", name: "Stephen Akintayo Consulting", logo: { src: "/clients/stephen-akintayo-consulting.png", width: 150, height: 180, presentation: "symbol" } },
  { id: "gtext-holdings", name: "Gtext Holdings", logo: { src: "/clients/gtext-holdings.png", width: 1438, height: 1878, presentation: "symbol" } },
  { id: "ger-holdings", name: "GER Holdings", logo: null },
  { id: "google", name: "Google", logo: { src: "/clients/google.png", width: 544, height: 184 } },
  { id: "gates-foundation", name: "Gates Foundation", tone: "black", logo: { src: "/clients/gates-foundation.svg", width: 250, height: 64 } },
  { id: "oppo-nigeria", name: "Oppo Nigeria", logo: { src: "/clients/oppo.svg", width: 85, height: 22 } },
  { id: "tunga-nutrition", name: "Tunga Nutrition", tone: "navy", logo: { src: "/clients/tunga-nutrition.png", width: 600, height: 210 } },
  { id: "avipro-rwanda", name: "Avipro Rwanda", logo: { src: "/clients/avipro-rwanda.jpg", width: 200, height: 200, presentation: "symbol" } },
  { id: "iziwacu", name: "Iziwacu", logo: { src: "/clients/iziwacu.jpg", width: 71, height: 53, presentation: "small" } },
  { id: "kukuyacu", name: "Kukuyacu", logo: { src: "/clients/kukuyacu.jpg", width: 320, height: 320, presentation: "symbol" } },
  { id: "brainiark-technologies", name: "Brainiark Technologies", logo: { src: "/clients/brainiark-technologies.png", width: 1405, height: 272 } },
];
