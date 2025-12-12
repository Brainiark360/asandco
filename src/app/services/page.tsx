// src/app/services/page.tsx

import ServicesClosing from "@/src/components/services/ServicesClosing";
import ServiceDetail from "@/src/components/services/ServicesDetail";
import ServicesFramework from "@/src/components/services/ServicesFramework";
import ServicesHero from "@/src/components/services/ServicesHero";


export const metadata = {
  title: 'Services | Alexander Stephen & Co.',
  description: 'Strategy-led services for structured business growth: Image Marketing, Growth Marketing, and Technology Systems.',
};

export default function ServicesPage() {
  const services = [
    {
      id: '01',
      title: 'Image Marketing & Personal Branding',
      description: 'We help businesses and leaders shape how they are perceived by the market — building trust, credibility, and authority through intentional positioning and digital presence.',
      outcome: 'A clear, credible presence that builds confidence before the first conversation.',
      inclusions: [
        'Brand and positioning strategy',
        'Personal branding for founders and executives',
        'Digital presence strategy',
        'Content direction aligned with authority and trust',
      ],
    },
    {
      id: '02',
      title: 'Growth Marketing',
      description: 'We design and execute structured growth systems that drive demand, leads, and revenue through strategy, experimentation, and disciplined execution.',
      outcome: 'Structured, measurable growth that supports business objectives.',
      inclusions: [
        'Growth strategy and funnel design',
        'Customer acquisition and conversion systems',
        'Performance marketing and optimisation',
        'Measurement, reporting, and learning',
      ],
    },
    {
      id: '03',
      title: 'Technology & Digital Systems',
      description: 'We build the digital infrastructure that supports growth — from conversion-focused websites to web applications and data systems that enable scale.',
      outcome: 'Technology that enables scale and supports better decision-making.',
      inclusions: [
        'Conversion-focused websites',
        'Web applications and digital platforms',
        'Data management and reporting systems',
        'CRM and workflow solutions',
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServicesFramework />
      {services.map((service, index) => (
        <ServiceDetail
          key={service.id}
          service={service}
          isLast={index === services.length - 1}
        />
      ))}
      <ServicesClosing />
    </main>
  );
}