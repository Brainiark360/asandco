import type { Metadata } from "next";
import ApproachSection from "../../components/ApproachSection";
import FinalCTASection from "../../components/FinalCTASection";
import { BrandSculpture } from "../../components/Brand";
import { Eyebrow, Lines, PageIntro, Section } from "../../components/ui";
import { beliefs } from "../../lib/site-data";

export const metadata: Metadata = { title: "About", description: "A strategic partner for your next stage. Clear thinking, connected systems and disciplined execution." };

export default function AboutPage() {
  return <>
    <PageIntro eyebrow="ABOUT ALEXANDER STEPHEN" title={"Clear thinking.\nCollective progress."} description="We help ambitious businesses bring direction to growth, structure to marketing and purpose to technology." />
    <Section tone="cobalt" className="about-point-of-view section--40">
      <BrandSculpture context="about" />
      <h2 className="heading-lg" data-reveal><Lines text={"A strategic partner\nfor your next stage."} /></h2>
      <p className="body-copy measure-wide">Our work begins with understanding the business. We connect strategy, branding, social media, digital delivery and creative production around the outcomes that matter.</p>
    </Section>
    <Section tone="white" className="beliefs-section">
      <Eyebrow>WHAT WE BELIEVE</Eyebrow>
      <h2 className="heading-lg" data-reveal><Lines text={"Progress begins\nwith a point of view."} /></h2>
      {beliefs.map((belief, i) => <article className="belief-row" key={belief.title} data-reveal>
        <p className="eyebrow">0{i + 1}</p>
        <div><h3 className="heading-md">{belief.title}</h3><p className="body-copy">{belief.description}</p></div>
      </article>)}
    </Section>
    <Section className="audience-section">
      <Eyebrow>THE RIGHT PARTNERSHIP</Eyebrow>
      <h2 className="heading-lg" data-reveal><Lines text={"Built for businesses\nready to move forward."} /></h2>
      <p className="body-copy measure-audience">Our work is suited to founders, executives and teams who value clear thinking and coordinated delivery.</p>
      {["Growth focused businesses", "Professional services firms", "Technology enabled companies", "High trust brands"].map((audience) => <p className="audience-row heading-md" key={audience} data-reveal>{audience}</p>)}
    </Section>
    <ApproachSection />
    <FinalCTASection />
  </>;
}
