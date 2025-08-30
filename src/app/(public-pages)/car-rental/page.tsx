import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CarRentalMainHero } from "@/components/car-rental/CarRentalMainHero";
import { RentalOptions } from "@/components/car-rental/RentalOptions";
import { FleetGallery } from "@/components/car-rental/FleetGallery";
import { CarBookingForm } from "@/components/car-rental/CarBookingForm";
import { TermsConditions } from "@/components/car-rental/TermsConditions";
import { CarRentalFAQ } from "@/components/car-rental/CarRentalFAQ";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options | Elegant Rwanda",
  description: "Rent luxury cars in Rwanda with Elegant Rwanda. Choose between self-drive and chauffeur-driven options. Premium vehicles for business and leisure travel.",
  keywords: "car rental Rwanda, luxury car hire Rwanda, self-drive Rwanda, chauffeur service Rwanda, vehicle rental Rwanda",
  openGraph: {
    title: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options",
    description: "Rent luxury cars in Rwanda with self-drive and chauffeur-driven options for business and leisure travel.",
    type: "website",
    url: "https://elegantrwanda.com/car-rental",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options",
    description: "Rent luxury cars in Rwanda with self-drive and chauffeur-driven options for business and leisure travel.",
  },
};

export default function CarRentalPage() {
  return (
    <PageWrapper>
      <CarRentalMainHero />
      <RentalOptions />
      <FleetGallery />
      <CarBookingForm />
      <TermsConditions />
      <CarRentalFAQ />
    </PageWrapper>
  );
}
