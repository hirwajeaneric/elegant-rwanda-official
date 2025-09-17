import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CarRentalHero } from "@/components/car-rental/CarRentalHero";
import { CarRentalDetails } from "@/components/car-rental/CarRentalDetails";
import { CarRentalSpecs } from "@/components/car-rental/CarRentalSpecs";
import { CarRentalGallery } from "@/components/car-rental/CarRentalGallery";
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
    keywords: `car rental Rwanda, ${vehicle.name}, ${vehicle.category} rental, luxury car hire Rwanda`,
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
      <CarRentalHero vehicle={vehicle} />
      <CarRentalDetails vehicle={vehicle} />
      <CarRentalSpecs vehicle={vehicle} />
      <CarRentalGallery vehicle={vehicle} />
      <CarRentalBooking vehicle={vehicle} />
      <RelatedVehicles vehicles={relatedVehicles} />
    </PageWrapper>
  );
}
