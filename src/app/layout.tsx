import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import MotionExperience from "../components/MotionExperience";
import { canIndex, site } from "../lib/seo";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: "500", variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: "%s | " + site.name },
  description: site.description,
  applicationName: site.name,
  robots: { index: canIndex(), follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "en_NG",
    images: [{ url: site.image, width: 1200, height: 630, alt: site.imageAlt }],
  },
  twitter: { card: "summary_large_image", images: [{ url: site.image, alt: site.imageAlt }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={display.variable + " " + body.variable + " " + mono.variable}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <MotionExperience />
      </body>
    </html>
  );
}
