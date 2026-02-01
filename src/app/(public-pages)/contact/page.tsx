import { PageWrapper } from "@/components/layout/PageWrapper";
import ContactForm from "@/components/forms/ContactForm";
import { ContactInfoBlock } from "@/components/contact/ContactInfoBlock";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Contact Elegant Travel & Tours: Inquire About Tours & Services",
  description:
    "Get in touch with Elegant Travel & Tours for personalized travel quotes, tour bookings, and expert travel advice. We're here to help plan your perfect Rwanda adventure.",
  path: "contact",
  keywords: [
    "Contact Elegant Travel & Tours",
    "Rwanda travel inquiry",
    "Tour booking Rwanda",
    "Travel consultation Rwanda",
    "Customer support Rwanda",
    "Car rental near me",
    "Car near me",
    "Car to book near me",
    "Car rental near me",
    "Car rental to book near me",
    "Car rental to book near me in Rwanda",
    "Tour guide near me",
    "Trip planner near me",
    "Events near me",
    "Car near me",
    "Car to book near me",
    "Car to book near me in Rwanda",
  ],
  openGraph: {
    title: "Contact Elegant Travel & Tours: Inquire About Tours & Services",
    description:
      "Get in touch with Elegant Travel & Tours for personalized travel quotes, tour bookings, and expert travel advice. We're here to help plan your perfect Rwanda adventure.",
    type: "website",
    images: [
      { url: "/hero-image.jpg", width: 1200, height: 630, alt: "Contact Elegant Travel & Tours: Inquire About Tours & Services" },
      { url: "/hero-image.jpg", width: 960, height: 540, alt: "Contact Elegant Travel & Tours: Inquire About Tours & Services" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Elegant Travel & Tours: Inquire About Tours & Services",
    description:
      "Get in touch with Elegant Travel & Tours for personalized travel quotes, tour bookings, and expert travel advice. We're here to help plan your perfect Rwanda adventure.",
  },
});

const contactJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <JsonLd data={contactJsonLd} />
      <div className="container-elegant py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Get in{" "}
            <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start planning your Rwanda adventure? We&apos;re here to help create the perfect
            travel experience for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <ContactInfoBlock />
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-display font-semibold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-display font-semibold mb-6 text-center">Find Us</h2>
          <div className="bg-muted rounded-2xl p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Interactive map will be embedded here showing our office location in Kigali.
            </p>
            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border flex items-center justify-center">
              <span className="text-muted-foreground">Google Maps Integration</span>
            </div>
          </div>
        </div> */}
      </div>
    </PageWrapper>
  );
}
