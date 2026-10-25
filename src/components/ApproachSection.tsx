import { phases } from "../lib/site-data";
import { ButtonLink, Eyebrow, Lines, Section } from "./ui";

export default function ApproachSection() {
  return <Section tone="navy" className="section--40">
    <Eyebrow>OUR APPROACH</Eyebrow>
    <h2 className="heading-lg" data-reveal><Lines text={"Clear direction.\nConnected action."} /></h2>
    <div className="three-column">
      {phases.map((phase) => <article className="process-card" key={phase.number} data-reveal>
        <Eyebrow>{phase.number}</Eyebrow>
        <h3 className="heading-md">{phase.title}</h3>
        <p>{phase.description}</p>
        <div className="divider" />
        <p className="eyebrow process-card__outcome">{phase.outcome}</p>
      </article>)}
    </div>
    <ButtonLink href="/approach" inverse>See our approach</ButtonLink>
  </Section>;
}
