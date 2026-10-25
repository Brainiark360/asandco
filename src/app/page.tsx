import ApproachSection from "../components/ApproachSection";
import ClientsSection from "../components/ClientsSection";
import FinalCTASection from "../components/FinalCTASection";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WorkSection from "../components/WorkSection";
import { Eyebrow, Lines, Section, TextLink } from "../components/ui";

export default function Home() {
  return <>
    <HeroSection />
    <ClientsSection />
    <ServicesSection />
    <WorkSection />
    <ApproachSection />
    <Section tone="amber" className="partnership-section">
      <Eyebrow>A STRATEGIC PARTNER</Eyebrow>
      <h2 className="heading-lg" data-reveal><Lines text={"Better together.\nBy design."} /></h2>
      <p className="body-copy measure-partnership">We work with founders and leadership teams to bring the bigger picture and the practical next step into focus.</p>
      <TextLink href="/about">Meet Alexander Stephen</TextLink>
    </Section>
    <FinalCTASection />
  </>;
}
