import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import FAQSection from "../../components/FAQSection";
import { Eyebrow, Lines, Section } from "../../components/ui";
import { contactQuestions } from "../../lib/site-data";

export const metadata: Metadata = { title: "Start a conversation", description: "Tell us where the business is now, where you want to go and what stands in the way. Let’s make your next move count." };

export default function ContactPage() {
  return <>
    <Section className="contact-section">
      <div className="contact-layout">
        <div className="contact-invitation">
          <Eyebrow>START A CONVERSATION</Eyebrow>
          <h1 className="heading-xl heading-enter"><Lines text={"Let’s make\nyour next\nmove count."} /></h1>
          <p className="body-copy">Tell us where the business is now, where you want to go and what stands in the way.</p>
          <div className="divider" />
          <Eyebrow>WHAT HAPPENS NEXT</Eyebrow>
          <p>01&nbsp; / &nbsp;We review your enquiry.</p>
          <p>02&nbsp; / &nbsp;We discuss the business and your goals.</p>
          <p>03&nbsp; / &nbsp;We agree a useful next step.</p>
        </div>
        <ContactForm />
      </div>
    </Section>
    <FAQSection questions={contactQuestions} />
  </>;
}
