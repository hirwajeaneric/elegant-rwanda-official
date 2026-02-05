import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTABanner } from "@/components/home/CTABanner";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";
import { buildMetadata, buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Elegant Travel & Tours: Luxury Tours, Car Rentals & Travel Services in Rwanda",
  description:
    "Explore Rwanda's elegance with our luxury tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized travel services.",
  path: "",
  keywords: [
    "Rwanda tours",
    "Gorilla trekking",
    "Luxury travel Rwanda",
    "Car rental Rwanda",
    "Cab booking Rwanda",
    "Air travel assistance Rwanda",
    "Volcanoes National Park",
    "Lake Kivu",
    "Kigali tours",
    "Cultural tours Rwanda",
    "Wildlife tours Africa",
    "Luxury safari Rwanda",
  ],
  openGraph: {
    title: "Elegant Travel & Tours: Luxury Tours & Travel Services",
    description:
      "Explore Rwanda's elegance with our luxury tours, premium car rentals, and personalized travel services.",
    images: [{ url: "/hero-image.jpg", alt: "Elegant Travel & Tours - Luxury and Affordable Travel in Rwanda" }],
  },
});

export default function HomePage() {
  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];
  return (
    <PageWrapper>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <ServicesOverview />
      <FeaturedTours />
      <TestimonialsSection />
      <CTABanner />
      <LatestBlogPosts />
    </PageWrapper>
  );
}
