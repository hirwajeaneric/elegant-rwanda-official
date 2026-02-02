import { PageWrapper } from "@/components/layout/PageWrapper";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { ContactCTA } from "@/components/faq/ContactCTA";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions - Elegant Travel & Tours Travel Services",
  description:
    "Find answers to common questions about our luxury tours, cab booking, car rental, and air travel assistance services in Rwanda.",
  path: "faq",
  keywords: "Rwanda travel FAQ, gorilla trekking questions, Rwanda tours FAQ, travel assistance Rwanda",
  openGraph: {
    title: "Frequently Asked Questions - Elegant Travel & Tours Travel Services",
    description:
      "Find answers to common questions about our luxury tours, cab booking, car rental, and air travel assistance services in Rwanda.",
    type: "website",
  },
});

const faqJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
];

export default function FAQPage() {
  return (
    <PageWrapper>
      <JsonLd data={faqJsonLd} />
      <FAQHero />
      <div className="container-elegant py-16">
        <FAQAccordion />
      </div>
      <ContactCTA />
    </PageWrapper>
  );
}
