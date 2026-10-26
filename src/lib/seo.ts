import type { Metadata, MetadataRoute } from "next";
import { services } from "./site-data";

// The canonical host and service regions were confirmed by the business owner.
// Never derive public search URLs from a request header or a preview hostname.
export const site = {
  name: "Alexander Stephen & Co.",
  shortName: "AS & Co.",
  // Live hosting redirects www to this apex host (verified 26 October 2026).
  url: "https://alexanderstephen.com",
  description: "Brand strategy, social media management, digital marketing and web development for businesses in Nigeria, across Africa, the US and the UK.",
  image: "/seo/clear-momentum-social.png",
  imageAlt: "Alexander Stephen & Co. — Clear thinking. Real momentum.",
  regions: [
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Continent", name: "Africa" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
} as const;

export const seoPages = {
  "/": { title: "Branding & Digital Marketing Agency", label: "Home", description: site.description },
  "/about": { title: "About Our Strategy & Creative Agency", label: "About", description: "Meet Alexander Stephen & Co., a strategy, branding and digital marketing partner for businesses in Nigeria, across Africa, the US and the UK." },
  "/services": { title: "Branding, Social Media & Digital Services", label: "Services", description: "Explore branding, social media management, digital marketing, web development, photography and production services from Alexander Stephen & Co." },
  "/approach": { title: "Our Approach: Strategy, Systems & Execution", label: "Our approach", description: "See how Alexander Stephen & Co. connects business strategy, digital systems and disciplined execution to turn your marketing plans into measurable progress." },
  "/contact": { title: "Contact Our Branding & Marketing Team", label: "Contact", description: "Discuss branding, social media, digital marketing or a web project with Alexander Stephen & Co. Serving Nigeria, Africa, the United States and the UK." },
} as const;

export type PublicPagePath = keyof typeof seoPages;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function canIndex(env: Record<string, string | undefined> = process.env) {
  const deployment = env.VERCEL_TARGET_ENV || env.VERCEL_ENV;
  return env.NODE_ENV === "production" && (!deployment || deployment === "production") && env.SEO_NOINDEX !== "true";
}

export function pageMetadata(path: PublicPagePath): Metadata {
  const page = seoPages[path];
  const title = page.title + " | " + site.name;
  const index = canIndex();
  const image = { url: absoluteUrl(site.image), width: 1200, height: 630, alt: site.imageAlt };
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index, follow: true, ...(index ? { googleBot: { index: true, follow: true, "max-image-preview": "large" } } : {}) },
    openGraph: {
      type: "website", title, description: page.description, url: absoluteUrl(path),
      siteName: site.name, locale: "en_NG", images: [image],
    },
    twitter: { card: "summary_large_image", title, description: page.description, images: [image] },
  };
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  // No invented lastmod dates or fragment URLs; each entry is a real public page.
  return canIndex() ? (Object.keys(seoPages) as PublicPagePath[]).map((path) => ({ url: absoluteUrl(path) })) : [];
}

export function robotsRules(): MetadataRoute.Robots {
  // Pages must remain crawlable for crawlers to see their noindex directive.
  // The thank-you page is excluded by metadata, not a robots.txt disallow.
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(canIndex() ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}

export function pageSchema(path: PublicPagePath) {
  const url = absoluteUrl(path);
  const page = seoPages[path];
  const organizationId = absoluteUrl("/#organization");
  const websiteId = absoluteUrl("/#website");
  const graph: Record<string, unknown>[] = [];

  if (path === "/") {
    graph.push({
      "@type": "Organization", "@id": organizationId,
      name: site.name, alternateName: site.shortName, url: absoluteUrl(),
      description: site.description,
      logo: { "@type": "ImageObject", url: absoluteUrl("/seo/alexander-stephen-logo.png"), width: 512, height: 512 },
      areaServed: site.regions,
    }, {
      "@type": "WebSite", "@id": websiteId, name: site.name, alternateName: site.shortName,
      url: absoluteUrl(), inLanguage: "en", publisher: { "@id": organizationId },
    });
  }

  graph.push({
    "@type": path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : path === "/services" ? "CollectionPage" : "WebPage",
    "@id": url + "#webpage", url, name: page.title + " | " + site.name,
    description: page.description, inLanguage: "en", isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    ...(path === "/services" ? { mainEntity: { "@id": url + "#catalogue" } } : {}),
    ...(path !== "/" ? { breadcrumb: { "@id": url + "#breadcrumb" } } : {}),
  });

  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
        { "@type": "ListItem", position: 2, name: page.label, item: url },
      ],
    });
  }

  if (path === "/services") {
    graph.push({
      "@type": "OfferCatalog", "@id": url + "#catalogue", name: "Alexander Stephen & Co. services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", name: service.title.replace(/\n/g, " "),
          description: service.description, url: url + "#" + service.id,
          provider: { "@id": organizationId }, areaServed: site.regions,
        },
      })),
    });
    graph.push({ "@type": "Organization", "@id": organizationId, name: site.name, url: absoluteUrl(), hasOfferCatalog: { "@id": url + "#catalogue" } });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function serializeJsonLd(value: unknown) {
  // Prevent data containing a closing script tag from escaping the JSON-LD node.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
