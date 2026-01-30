import { PageWrapper } from "@/components/layout/PageWrapper";
import { CarRentalMainHero } from "@/components/car-rental/CarRentalMainHero";
import { RentalOptions } from "@/components/car-rental/RentalOptions";
import { FleetGallery } from "@/components/car-rental/FleetGallery";
import { CarBookingForm } from "@/components/car-rental/CarBookingForm";
import { TermsConditions } from "@/components/car-rental/TermsConditions";
import { CarRentalFAQ } from "@/components/car-rental/CarRentalFAQ";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options | Elegant Travel & Tours",
  description:
    "Rent luxury cars in Rwanda with Elegant Travel and Tours. Choose between self-drive and chauffeur-driven options. Premium vehicles for business and leisure travel.",
  path: "car-rental",
  keywords:
    "car rental Rwanda, luxury car hire Rwanda, self-drive Rwanda, chauffeur service Rwanda, vehicle rental Rwanda, car rental near me, car near me, car to book near me, car rental near me, car rental to book near me, car rental to book near me in Rwanda, tour guide near me, trip planner near me, events near me, car near me, car to book near me, car to book near me in Rwanda",
  openGraph: {
    title: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options",
    description: "Rent luxury cars in Rwanda with self-drive and chauffeur-driven options for business and leisure travel.",
    type: "website",
    images: [
      { url: "/car-rental.jpg", width: 1200, height: 630, alt: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options" },
      { url: "/car-rental.jpg", width: 960, height: 540, alt: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Car Rentals in Rwanda: Self-Drive or Chauffeur Options",
    description: "Rent luxury cars in Rwanda with self-drive and chauffeur-driven options for business and leisure travel.",
  },
});

const carRentalJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Car Rental", path: "/car-rental" }]),
  buildServiceJsonLd({
    name: "Luxury Car Rentals in Rwanda",
    description:
      "Rent luxury cars in Rwanda with self-drive and chauffeur-driven options. Premium vehicles for business and leisure travel.",
    path: "car-rental",
  }),
];

export default function CarRentalPage() {
  return (
    <PageWrapper>
      <JsonLd data={carRentalJsonLd} />
      <CarRentalMainHero />
      <FleetGallery />
      <RentalOptions />
      <CarBookingForm />
      <TermsConditions />
      <CarRentalFAQ />
    </PageWrapper>
  );
}
