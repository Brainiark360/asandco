import { ButtonLink, Eyebrow, Lines, Section } from "./ui";

export default function FinalCTASection() {
  return <Section className="final-cta">
    <Eyebrow>YOUR NEXT CHAPTER</Eyebrow>
    <h2 className="heading-xl" data-reveal><Lines text={"Your next move\nstarts here."} /></h2>
    <p className="body-copy measure-cta">Tell us where you want the business to go. We’ll help you see what needs to happen next.</p>
    <ButtonLink />
  </Section>;
}
