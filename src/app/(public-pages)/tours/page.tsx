import { PageWrapper } from "@/components/layout/PageWrapper";
import { ToursHero } from "@/components/tours/ToursHero";
import { ToursGrid } from "@/components/tours/ToursGrid";
import { ToursSidebar } from "@/components/tours/ToursSidebar";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Luxury Rwanda Tours: Gorilla Treks, Safaris & Cultural Experiences | Elegant Travel and Tours",
  description:
    "Discover our exclusive luxury tours in Rwanda including gorilla trekking, wildlife safaris, cultural experiences, and luxury retreats. Expert guides and personalized itineraries.",
  path: "tours",
  keywords:
    "Rwanda tours, gorilla trekking, luxury safaris, cultural tours, wildlife tours, Rwanda travel packages",
  openGraph: {
    title: "Luxury Rwanda Tours: Gorilla Treks, Safaris & Cultural Experiences | Elegant Travel and Tours",
    description:
      "Discover our exclusive luxury tours in Rwanda including gorilla trekking, wildlife safaris, cultural experiences, and luxury retreats.",
    type: "website",
  },
});

const toursJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }]),
  buildServiceJsonLd({
    name: "Luxury Rwanda Tours",
    description:
      "Gorilla trekking, wildlife safaris, cultural experiences, and luxury retreats in Rwanda. Expert guides and personalized itineraries.",
    path: "tours",
  }),
];

export default function ToursPage() {
  return (
    <PageWrapper>
      <JsonLd data={toursJsonLd} />
      <ToursHero />
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <ToursGrid />
          </div>
          <div className="lg:col-span-1">
            <ToursSidebar />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
