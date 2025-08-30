import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CabBookingHero } from "@/components/cab-booking/CabBookingHero";
import { HowItWorks } from "@/components/cab-booking/HowItWorks";
import { CabRequestForm } from "@/components/cab-booking/CabRequestForm";
import { FleetOverview } from "@/components/cab-booking/FleetOverview";
import { CabBenefits } from "@/components/cab-booking/CabBenefits";
import { CabTestimonials } from "@/components/cab-booking/CabTestimonials";

export const metadata: Metadata = {
  title: "Premium Cab Booking in Rwanda: Reliable & Comfortable Rides | Elegant Rwanda",
  description: "Book premium cab services in Rwanda with Elegant Rwanda. Professional drivers, 24/7 availability, and custom routes for seamless transfers across the country.",
  keywords: "cab booking Rwanda, taxi service Rwanda, airport transfer Rwanda, luxury cab Rwanda, reliable taxi Rwanda",
  openGraph: {
    title: "Premium Cab Booking in Rwanda: Reliable & Comfortable Rides",
    description: "Book premium cab services in Rwanda with professional drivers and 24/7 availability.",
    type: "website",
    url: "https://elegantrwanda.com/cab-booking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Cab Booking in Rwanda: Reliable & Comfortable Rides",
    description: "Book premium cab services in Rwanda with professional drivers and 24/7 availability.",
  },
};

export default function CabBookingPage() {
  return (
    <PageWrapper>
      <CabBookingHero />
      <HowItWorks />
      <CabRequestForm />
      <FleetOverview />
      <CabBenefits />
      <CabTestimonials />
    </PageWrapper>
  );
}
