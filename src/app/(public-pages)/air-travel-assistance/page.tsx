import { PageWrapper } from "@/components/layout/PageWrapper";
import { AirTravelHero } from "@/components/air-travel/AirTravelHero";
import { AirTravelServices } from "@/components/air-travel/AirTravelServices";
import { AirTravelRequestForm } from "@/components/air-travel/AirTravelRequestForm";
import { AirTravelProcess } from "@/components/air-travel/AirTravelProcess";
import { AirTravelPartnerships } from "@/components/air-travel/AirTravelPartnerships";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Seamless Air Travel Assistance: Visas, Pickups & Hotel Bookings in Rwanda | Elegant Travel and Tours",
  description:
    "Get comprehensive air travel assistance in Rwanda including visa support, airport pickups, hotel bookings, and travel coordination services.",
  path: "air-travel-assistance",
  keywords:
    "air travel assistance Rwanda, visa assistance Rwanda, airport pickup Rwanda, hotel booking Rwanda, travel coordination Rwanda",
  openGraph: {
    title: "Seamless Air Travel Assistance: Visas, Pickups & Hotel Bookings in Rwanda",
    description:
      "Get comprehensive air travel assistance in Rwanda including visa support, airport pickups, hotel bookings, and travel coordination services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seamless Air Travel Assistance: Visas, Pickups & Hotel Bookings in Rwanda",
    description:
      "Get comprehensive air travel assistance in Rwanda including visa support, airport pickups, hotel bookings, and travel coordination services.",
  },
});

const airTravelJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Air Travel Assistance", path: "/air-travel-assistance" }]),
  buildServiceJsonLd({
    name: "Air Travel Assistance in Rwanda",
    description:
      "Visa support, airport pickups, hotel bookings, and travel coordination services in Rwanda.",
    path: "air-travel-assistance",
  }),
];

export default function AirTravelAssistancePage() {
  return (
    <PageWrapper>
      <JsonLd data={airTravelJsonLd} />
      <AirTravelHero />
      <AirTravelServices />
      <AirTravelRequestForm />
      <AirTravelProcess />
      <AirTravelPartnerships />
    </PageWrapper>
  );
}
