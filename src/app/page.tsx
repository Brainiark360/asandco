// app/page.tsx

import ApproachSection from "../components/ApproachSection";
import AudienceSection from "../components/AudienceSection";
import ClientsSection from "../components/ClientsSection";
import FinalCTASection from "../components/FinalCTASection";
import HeroSection from "../components/HeroSection";
import PositioningSection from "../components/PositioningSection";
import ProblemSection from "../components/ProblemSection";
import ServicesSection from "../components/ServicesSection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <PositioningSection />
      <ClientsSection />
      <ServicesSection />
      <ApproachSection />
      <AudienceSection />
      <FinalCTASection />
    </main>
  );
}