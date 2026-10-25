import { BrandSculpture } from "./Brand";
import { ButtonLink, Eyebrow, Lines, Section, TextLink } from "./ui";

export default function HeroSection() {
  return <Section tone="cobalt" className="home-hero">
    <Eyebrow>STRATEGY / MARKETING / DIGITAL SYSTEMS</Eyebrow>
    <div className="hero-composition">
      <div className="hero-message">
        <h1 className="heading-display heading-enter"><Lines text={"Make your\nnext move\ncount."} /></h1>
        <p className="hero-description">We bring clear strategy, disciplined marketing and the right technology together to move your business forward.</p>
        <div className="hero-actions"><ButtonLink inverse /><TextLink href="/services" light>Explore services</TextLink></div>
      </div>
      <div className="hero-sculpture">
        <BrandSculpture context="hero" />
        <p className="eyebrow">CLEAR THINKING. REAL MOMENTUM.</p>
      </div>
    </div>
  </Section>;
}
