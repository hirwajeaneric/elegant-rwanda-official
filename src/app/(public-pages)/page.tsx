import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTABanner } from "@/components/home/CTABanner";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Elegant Travel and Tours: Unique Tours, Car Rentals & Travel Services in Rwanda",
  description: "Explore Rwanda's elegance with our Unique tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized Unique travel services.",
  keywords: [
    "Rwanda tours",
    "Gorilla trekking",
    "Unique travel Rwanda",
    "Car rental Rwanda",
    "Cab booking Rwanda",
    "Air travel assistance Rwanda",
    "Volcanoes National Park",
    "Lake Kivu",
    "Kigali tours",
    "Cultural tours Rwanda",
    "Wildlife tours Africa",
    "Unique safari Rwanda"
  ],
  openGraph: {
    title: "Elegant Travel and Tours: Unique Tours & Travel Services",
    description: "Explore Rwanda's elegance with our Unique tours, premium car rentals, and personalized travel services.",
    images: [
      {
        url: "/images/hero-rwanda-landscape.jpg",
        width: 1200,
        height: 630,
        alt: "Elegant Travel and Tours - Unique Travel in Rwanda",
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
