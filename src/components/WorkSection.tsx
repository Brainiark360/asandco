import { BrandSculpture } from "./Brand";
import { Eyebrow, Lines, Section } from "./ui";

export default function WorkSection() {
  return <Section tone="white" className="work-section section--40">
    <Eyebrow>SELECTED WORK</Eyebrow>
    <h2 className="heading-lg" data-reveal><Lines text={"Good thinking.\nBuilt into action."} /></h2>
    <div className="project-grid" data-nosnippet="">
      {[{ client: "A", subtitle: "Brand positioning + digital presence" }, { client: "B", subtitle: "Growth strategy + digital systems" }].map(({ client, subtitle }) => <article key={client} className={"project-card project-card--" + client.toLowerCase()} data-reveal>
        <div className="project-visual">
          <BrandSculpture context="project" />
          <div className="placeholder-note"><Eyebrow>CLIENT {client}</Eyebrow><p className="small-copy">Visual placeholder</p></div>
        </div>
        <h3 className="heading-sm">Client {client}</h3>
        <p>{subtitle}</p>
        <p className="eyebrow eyebrow--muted">CASE STUDY PLACEHOLDER</p>
      </article>)}
    </div>
    <p className="small-copy"><span data-nosnippet="">Case study titles and visuals are placeholders for the design review.</span></p>
  </Section>;
}
