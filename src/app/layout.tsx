import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import MotionExperience from "../components/MotionExperience";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: "500", variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Alexander Stephen & Co. | Clear thinking. Real momentum.", template: "%s | Alexander Stephen & Co." },
  description: "Strategy, branding, social media management, digital marketing and creative production for ambitious businesses. Make your next move count.",
  openGraph: {
    title: "Alexander Stephen & Co.",
    description: "Clear thinking. Real momentum. Strategy, branding, social media, digital delivery and creative production.",
    type: "website",
  },
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
