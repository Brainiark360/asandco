import Link from "next/link";
import { featuredServices, services } from "../lib/site-data";
import { Arrow } from "./Brand";
import { Eyebrow, Lines, Section } from "./ui";

export default function ServicesSection() {
  return <Section className="services-overview section--40">
    <Eyebrow>WHAT WE DO</Eyebrow>
    <h2 className="heading-lg" data-reveal><Lines text={"More ways to\nmove forward."} /></h2>
    <p className="body-copy">Brand, marketing, production and digital services. One connected approach to your next stage.</p>
    <div className="three-column">
      {featuredServices.map((service) => <Link href={"/services#" + service.id} key={service.id} className="service-card" data-reveal aria-label={"Explore " + service.title.replace("\n", " ")}>
        <Eyebrow>{service.eyebrow}</Eyebrow>
        <h3 className="heading-md"><Lines text={service.title} /></h3>
        <p>{service.description}</p>
        <span className="card-link"><span>Explore service</span><Arrow /></span>
      </Link>)}
    </div>
    <nav className="service-directory" aria-label="All services">
      <p className="eyebrow">EXPLORE ALL OUR SERVICES</p>
      <ul>
        {services.map((service) => <li key={service.id}>
          <Link href={"/services#" + service.id} className="service-directory__link">
            <span className="eyebrow" aria-hidden="true">{service.eyebrow.slice(0, 2)}</span>
            <span>{service.shortcut}</span>
            <Arrow />
          </Link>
        </li>)}
      </ul>
    </nav>
  </Section>;
}
