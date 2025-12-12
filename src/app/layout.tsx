// src/app/layout.tsx - UPDATED
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alexander Stephen & Co. | Strategy-Led Marketing Consultancy',
  description: 'A strategy-first consultancy and digital marketing firm helping businesses grow through clarity, systems, and disciplined execution.',
  keywords: ['strategy-led marketing', 'growth consultancy', 'digital systems', 'marketing strategy firm', 'business growth'],
  authors: [{ name: 'Alexander Stephen & Co.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Alexander Stephen & Co.',
    description: 'Strategy-Led Marketing and Digital Systems for Structured Business Growth',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-gray-900 antialiased selection:bg-gray-900 selection:text-white">
        <div className="fixed inset-0 pointer-events-none">
          {/* Structural grid overlay - subtle visual anchor */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
          }} />
        </div>
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}