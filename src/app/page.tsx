import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTABanner } from "@/components/home/CTABanner";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";

export const metadata: Metadata = {
  title: "Elegant Rwanda: Luxury Tours, Car Rentals & Travel Services in Rwanda",
  description: "Discover Rwanda's elegance with our luxury tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized luxury travel services.",
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
    "Luxury safari Rwanda"
  ],
  openGraph: {
    title: "Elegant Rwanda: Luxury Tours & Travel Services",
    description: "Discover Rwanda's elegance with our luxury tours, premium car rentals, and personalized travel services.",
    images: [
      {
        url: "/images/hero-rwanda-landscape.jpg",
        width: 1200,
        height: 630,
        alt: "Elegant Rwanda - Luxury Travel in Rwanda",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <ServicesOverview />
      <FeaturedTours />
      <TestimonialsSection />
      <WhyChooseUs />
      <CTABanner />
      <LatestBlogPosts />
    </PageWrapper>
  );
}
