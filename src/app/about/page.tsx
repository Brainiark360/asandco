// src/app/about/page.tsx
import AboutBeliefs from '@/src/components/about/AboutBeliefs';
import AboutClosing from '@/src/components/about/AboutClosing';
import AboutHero from '@/src/components/about/AboutHero';
import AboutPhilosophy from '@/src/components/about/AboutPhilosophy';
import AboutWork from '@/src/components/about/AboutWork';

export const metadata = {
  title: 'About | Alexander Stephen & Co.',
  description: 'A strategy-first consultancy built on clarity, discipline, and structured growth thinking.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutPhilosophy />
      <AboutBeliefs />
      <AboutWork />
      <AboutClosing />
    </main>
  );
}