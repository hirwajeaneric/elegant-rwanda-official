import { PageWrapper } from "@/components/layout/PageWrapper";
import { CabBookingHero } from "@/components/cab-booking/CabBookingHero";
import { HowItWorks } from "@/components/cab-booking/HowItWorks";
import { CabRequestForm } from "@/components/cab-booking/CabRequestForm";
import { FleetOverview } from "@/components/cab-booking/FleetOverview";
import { CabBenefits } from "@/components/cab-booking/CabBenefits";
import { CabTestimonials } from "@/components/cab-booking/CabTestimonials";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Premium Cab Booking in Rwanda: Reliable & Comfortable Rides | Elegant Travel and Tours",
  description:
    "Book premium cab services in Rwanda with Elegant Travel and Tours. Professional drivers, 24/7 availability, and custom routes for seamless transfers across the country.",
  path: "cab-booking",
  keywords:
    "cab booking Rwanda, taxi service Rwanda, airport transfer Rwanda, luxury cab Rwanda, reliable taxi Rwanda",
  openGraph: {
    title: "Premium Cab Booking in Rwanda: Reliable & Comfortable Rides",
    description: "Book premium cab services in Rwanda with professional drivers and 24/7 availability.",
    type: "website",
    images: [
      { url: "/cab-booking.jpg", width: 1200, height: 630, alt: "Premium Cab Booking in Rwanda" },
      { url: "/cab-booking-900.jpg", width: 960, height: 540, alt: "Premium Cab Booking in Rwanda" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Cab Booking in Rwanda: Reliable & Comfortable Rides",
    description: "Book premium cab services in Rwanda with professional drivers and 24/7 availability.",
  },
});

const cabBookingJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cab Booking", path: "/cab-booking" }]),
  buildServiceJsonLd({
    name: "Premium Cab Booking in Rwanda",
    description:
      "Book premium cab services in Rwanda with professional drivers, 24/7 availability, and custom routes for seamless transfers.",
    path: "cab-booking",
    image: "/cab-booking.jpg",
  }),
];

export default function CabBookingPage() {
  return (
    <PageWrapper>
      <JsonLd data={cabBookingJsonLd} />
      <CabBookingHero />
      <HowItWorks />
      <CabRequestForm />
      <FleetOverview />
      <CabBenefits />
      <CabTestimonials />
    </PageWrapper>
  );
}
