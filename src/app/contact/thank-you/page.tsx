import type { Metadata } from "next";
import { BrandSculpture } from "../../../components/Brand";
import { ButtonLink, Eyebrow, Lines, Section } from "../../../components/ui";

export const metadata: Metadata = { title: "Enquiry received", robots: { index: false, follow: false } };

export default function ThankYouPage() {
  return <Section className="success-section">
    <BrandSculpture context="success" />
    <Eyebrow>ENQUIRY RECEIVED</Eyebrow>
    <h1 className="heading-xl heading-enter"><Lines text={"Thanks for\nstarting the conversation."} /></h1>
    <p className="body-copy measure-intro">We’ll review what you’ve shared and get back to you to discuss the next step.</p>
    <ButtonLink href="/">Back to home</ButtonLink>
  </Section>;
}
