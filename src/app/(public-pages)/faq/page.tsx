import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { ContactCTA } from "@/components/faq/ContactCTA";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Elegant Rwanda Travel Services",
  description: "Find answers to common questions about our luxury tours, cab booking, car rental, and air travel assistance services in Rwanda.",
  keywords: "Rwanda travel FAQ, gorilla trekking questions, Rwanda tours FAQ, travel assistance Rwanda",
  openGraph: {
    title: "Frequently Asked Questions - Elegant Rwanda Travel Services",
    description: "Find answers to common questions about our luxury tours, cab booking, car rental, and air travel assistance services in Rwanda.",
    type: "website",
    url: "https://elegantrwanda.com/faq",
  },
};

export default function FAQPage() {
  return (
    <PageWrapper>
      <FAQHero />
      <div className="container-elegant py-16">
        <FAQAccordion />
      </div>
      <ContactCTA />
    </PageWrapper>
  );
}
