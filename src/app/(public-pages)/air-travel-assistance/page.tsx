import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { AirTravelHero } from "@/components/air-travel/AirTravelHero";
import { AirTravelServices } from "@/components/air-travel/AirTravelServices";
import { AirTravelRequestForm } from "@/components/air-travel/AirTravelRequestForm";
import { AirTravelProcess } from "@/components/air-travel/AirTravelProcess";
import { AirTravelPartnerships } from "@/components/air-travel/AirTravelPartnerships";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Seamless Air Travel Assistance: Visas, Pickups & Hotel Bookings in Rwanda | Elegant Travel and Tours",
  description: "Get comprehensive air travel assistance in Rwanda including visa support, airport pickups, hotel bookings, and travel coordination services.",
  keywords: "air travel assistance Rwanda, visa assistance Rwanda, airport pickup Rwanda, hotel booking Rwanda, travel coordination Rwanda",
  openGraph: {
    title: "Seamless Air Travel Assistance: Visas, Pickups & Hotel Bookings in Rwanda",
    description: "Get comprehensive air travel assistance in Rwanda including visa support, airport pickups, hotel bookings, and travel coordination services.",
    type: "website",
    url: "https://elegantrwanda.com/air-travel-assistance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seamless Air Travel Assistance: Visas, Pickups & Hotel Bookings in Rwanda",
    description: "Get comprehensive air travel assistance in Rwanda including visa support, airport pickups, hotel bookings, and travel coordination services.",
  },
};

export default function AirTravelAssistancePage() {
  return (
    <PageWrapper>
      <AirTravelHero />
      <AirTravelServices />
      <AirTravelRequestForm />
      <AirTravelProcess />
      <AirTravelPartnerships />
    </PageWrapper>
  );
}
