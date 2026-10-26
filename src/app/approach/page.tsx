import FinalCTASection from "../../components/FinalCTASection";
import FAQSection from "../../components/FAQSection";
import { Eyebrow, Lines, PageIntro, Section } from "../../components/ui";
import { approachQuestions, phases } from "../../lib/site-data";
import StructuredData from "../../components/StructuredData";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/approach");

export default function ApproachPage() {
  return <>
    <StructuredData path="/approach" />
    <PageIntro eyebrow="OUR APPROACH" title={"A plan is only as good\nas what happens next."} description="Strategy sets the direction. Systems make it possible. Execution turns it into progress." cobalt />
    {phases.map((phase, i) => <Section key={phase.number} tone={i === 1 ? "tint" : "chalk"} className="phase-detail" id={phase.title.toLowerCase()}>
      <Eyebrow>{phase.number} / {phase.title.toUpperCase()}</Eyebrow>
      <h2 className="heading-lg" data-reveal><Lines text={phase.headline} /></h2>
      <p className="body-copy measure-intro">{phase.detail}</p>
      <div className="divider" />
      <p className="eyebrow phase-detail__label">WHAT THIS PHASE PRODUCES</p>
      {phase.deliverables.map((deliverable) => <p className="heading-sm" key={deliverable} data-reveal>{deliverable}</p>)}
    </Section>)}
    <Section tone="navy" className="connected-partnership section--24">
      <Eyebrow>ONE CONNECTED PARTNERSHIP</Eyebrow>
      <h2 className="heading-lg" data-reveal><Lines text={"A clear direction,\nshared all the way through."} /></h2>
      <p className="body-copy measure-audience">Each phase informs the next. We keep the work connected to the business objective and the decisions in front of you.</p>
    </Section>
    <FAQSection questions={approachQuestions} />
    <FinalCTASection />
  </>;
}
