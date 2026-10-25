import Image from "next/image";
import { Eyebrow, Lines, Section } from "./ui";

export default function FAQSection({ questions }: { questions: readonly { question: string; answer: string }[] }) {
  return <Section className="faq-section">
    <Eyebrow>A LITTLE MORE CLARITY</Eyebrow>
    <h2 className="heading-lg" data-reveal><Lines text={"Good questions.\nClear answers."} /></h2>
    {questions.map(({ question, answer }) => <details className="faq-row" key={question} name="common-questions">
      <summary><span>{question}</span><Image src="/brand/9-6-imgExpand.svg" width={24} height={24} alt="" className="faq-icon" /></summary>
      <div className="faq-answer"><p>{answer}</p></div>
    </details>)}
  </Section>;
}
