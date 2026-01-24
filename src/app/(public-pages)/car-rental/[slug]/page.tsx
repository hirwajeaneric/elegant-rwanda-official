import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CarRentalGalleryHero } from "@/components/car-rental/CarRentalGalleryHero";
import { CarRentalDetails } from "@/components/car-rental/CarRentalDetails";
import { CarRentalSpecs } from "@/components/car-rental/CarRentalSpecs";
import { CarRentalBooking } from "@/components/car-rental/CarRentalBooking";
import { RelatedVehicles } from "@/components/car-rental/RelatedVehicles";
import { getVehicleBySlug, getVehiclesByCategory } from "@/data/car-rental";

interface CarRentalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CarRentalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  
  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Elegant Travel and Tours",
    };
  }

  return {
    title: `${vehicle.name} - Car Rental in Rwanda | Elegant Travel and Tours`,
    description: vehicle.description,
    keywords: `car rental Rwanda, ${vehicle.name}, ${vehicle.category} rental, Unique car hire Rwanda`,
    openGraph: {
      title: `${vehicle.name} - Car Rental in Rwanda`,
      description: vehicle.description,
      type: "website",
      url: `https://elegantrwanda.com/car-rental/${vehicle.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} - Car Rental in Rwanda`,
      description: vehicle.description,
    },
  };
}

export default async function CarRentalPage({ params }: CarRentalPageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  
  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = getVehiclesByCategory(vehicle.category).filter(v => v.slug !== vehicle.slug).slice(0, 3);

  return (
    <PageWrapper>
      {/* Gallery Hero Section */}
      <CarRentalGalleryHero vehicle={vehicle} />
      
      {/* Main Content Section with Sticky Booking */}
      <section className="py-12 bg-white">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Vehicle Information (8 columns) */}
            <div className="lg:col-span-8 space-y-8">
              <CarRentalDetails vehicle={vehicle} />
              <CarRentalSpecs vehicle={vehicle} />
            </div>

            {/* Right Column - Sticky Booking Form (4 columns) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <CarRentalBooking vehicle={vehicle} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Vehicles */}
      <RelatedVehicles vehicles={relatedVehicles} />
    </PageWrapper>
  );
}
