import type { Metadata } from "next";
import ApproachSection from "../../components/ApproachSection";
import FinalCTASection from "../../components/FinalCTASection";
import { ButtonLink, Eyebrow, Lines, PageIntro, Section, TextLink } from "../../components/ui";
import { services } from "../../lib/site-data";

export const metadata: Metadata = { title: "Services", description: "Social media management, branding, consultancy, digital marketing, web and app development, photography, film, advertising, events and printing." };

export default function ServicesPage() {
  return <>
    <PageIntro eyebrow="OUR SERVICES" title={"A clearer path\nfrom ambition\nto growth."} description="From strategy and branding to social media, digital experiences and production. Choose a service to see how we can help.">
      <nav id="services-index" className="service-shortcuts" aria-label="Explore our services">
        {services.map((service) => <a key={service.id} href={"#" + service.id}>{service.shortcut}</a>)}
      </nav>
    </PageIntro>
    {services.map((service, i) => <Section key={service.id} id={service.id} tone={i % 2 === 1 ? "tint" : "white"} className="service-detail">
      <Eyebrow>{service.eyebrow}</Eyebrow>
      <div className="service-detail__columns">
        <div className="service-intent" data-reveal><h2 className="heading-lg"><Lines text={service.title} /></h2><p className="body-copy">{service.intent}</p></div>
        <div className="service-inclusions" data-reveal>
          <p className="eyebrow eyebrow--muted">TYPICAL INCLUSIONS</p>
          <ul>{service.inclusions.map((inclusion) => <li key={inclusion}>{inclusion}</li>)}</ul>
        </div>
      </div>
      <div className="service-outcome" data-reveal><Eyebrow>THE INTENDED OUTCOME</Eyebrow><p className="heading-sm">{service.outcome}</p></div>
      <div className="service-detail__actions">
        <ButtonLink>Discuss your project</ButtonLink>
        <TextLink href="#services-index">Back to all services</TextLink>
      </div>
    </Section>)}
    <ApproachSection />
    <FinalCTASection />
  </>;
}
