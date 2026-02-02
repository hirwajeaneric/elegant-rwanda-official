import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CarRentalGalleryHero } from "@/components/car-rental/CarRentalGalleryHero";
import { CarRentalDetails } from "@/components/car-rental/CarRentalDetails";
import { CarRentalBooking } from "@/components/car-rental/CarRentalBooking";
import { RelatedVehicles } from "@/components/car-rental/RelatedVehicles";
import type { Vehicle } from "@/data/car-rental";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface CarRentalPageProps {
  params: Promise<{ slug: string }>;
}

type ApiVehicle = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  specifications: Record<string, unknown>;
  available: boolean;
  pickupLocations: string[];
  includedServices: string[];
  additionalServices: string[];
  requirements: string[];
  insurance: Record<string, unknown>;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  dailyRate: number;
  status: string;
  location: string;
  mileage: number;
  lastService: string | null;
  nextService: string | null;
};

function mapApiVehicleToVehicle(apiVehicle: ApiVehicle): Vehicle {
  const spec = apiVehicle.specifications as Vehicle["specifications"];
  const ins = apiVehicle.insurance as Vehicle["insurance"];
  
  return {
    id: apiVehicle.id,
    slug: apiVehicle.slug,
    name: apiVehicle.name,
    category: apiVehicle.category as Vehicle["category"],
    description: apiVehicle.description,
    shortDescription: apiVehicle.shortDescription,
    images: apiVehicle.images,
    specifications: {
      passengers: spec.passengers ?? 4,
      doors: spec.doors ?? 4,
      transmission: (spec.transmission as Vehicle["specifications"]["transmission"]) ?? "Automatic",
      fuelType: (spec.fuelType as Vehicle["specifications"]["fuelType"]) ?? "Petrol",
      engineSize: spec.engineSize ?? "",
      power: spec.power ?? "",
      fuelEfficiency: spec.fuelEfficiency ?? "",
      luggageCapacity: spec.luggageCapacity ?? "",
      airConditioning: spec.airConditioning ?? true,
      bluetooth: spec.bluetooth ?? true,
      navigation: spec.navigation ?? false,
      cruiseControl: spec.cruiseControl ?? false,
      parkingSensors: spec.parkingSensors ?? false,
      backupCamera: spec.backupCamera ?? false,
      usbPorts: spec.usbPorts ?? 2,
      wifi: spec.wifi ?? false,
    },
    available: apiVehicle.available,
    pickupLocations: apiVehicle.pickupLocations,
    includedServices: apiVehicle.includedServices,
    additionalServices: apiVehicle.additionalServices,
    requirements: apiVehicle.requirements,
    insurance: {
      included: ins.included ?? true,
      coverage: ins.coverage ?? "",
      excess: ins.excess ?? "",
    },
    make: apiVehicle.make,
    model: apiVehicle.model,
    year: apiVehicle.year,
    plateNumber: apiVehicle.plateNumber,
    dailyRate: apiVehicle.dailyRate,
    status: apiVehicle.status as Vehicle["status"],
    location: apiVehicle.location,
    mileage: apiVehicle.mileage,
    lastService: apiVehicle.lastService ?? "",
    nextService: apiVehicle.nextService ?? undefined,
  };
}

async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const res = await fetch(`${baseUrl}/api/public/vehicles/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    if (data.success && data.vehicle) {
      return mapApiVehicleToVehicle(data.vehicle);
    }
    return null;
  } catch {
    return null;
  }
}

async function getRelatedVehicles(category: string, excludeSlug: string): Promise<Vehicle[]> {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const res = await fetch(`${baseUrl}/api/public/vehicles?category=${category}&limit=10`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    if (data.success && Array.isArray(data.vehicles)) {
      return data.vehicles
        .filter((v: ApiVehicle) => v.slug !== excludeSlug)
        .slice(0, 3)
        .map(mapApiVehicleToVehicle);
    }
    return [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CarRentalPageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return buildMetadata({
      title: "Vehicle Not Found | Elegant Travel & Tours",
      description: "The requested vehicle could not be found.",
      path: "car-rental",
      noIndex: true,
    });
  }

  const description =
    vehicle.shortDescription ||
    vehicle.description.replace(/<[^>]*>/g, "").substring(0, 160);
  return buildMetadata({
    title: `${vehicle.name} - Car Rental in Rwanda | Elegant Travel & Tours`,
    description,
    path: `car-rental/${vehicle.slug}`,
    keywords: `car rental Rwanda, ${vehicle.name}, ${vehicle.category} rental, luxury car hire Rwanda`,
    openGraph: {
      title: `${vehicle.name} - Car Rental in Rwanda`,
      description,
      type: "website",
      images:
        vehicle.images?.length > 0
          ? [{ url: vehicle.images[0], alt: vehicle.name }]
          : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} - Car Rental in Rwanda`,
      description,
    },
  });
}

export default async function CarRentalPage({ params }: CarRentalPageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  
  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = await getRelatedVehicles(vehicle.category, vehicle.slug);

  const description =
    vehicle.shortDescription ||
    vehicle.description.replace(/<[^>]*>/g, "").substring(0, 200);
  const carRentalJsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Car Rental", path: "/car-rental" },
      { name: vehicle.name, path: `/car-rental/${vehicle.slug}` },
    ]),
    buildProductJsonLd({
      name: vehicle.name,
      description,
      slug: vehicle.slug,
      pathSegment: "car-rental",
      image: vehicle.images?.[0],
      price: vehicle.dailyRate,
      priceCurrency: "USD",
      category: vehicle.category,
    }),
  ];

  return (
    <PageWrapper>
      <JsonLd data={carRentalJsonLd} />
      {/* Gallery Hero Section */}
      <CarRentalGalleryHero vehicle={vehicle} />
      
      {/* Main Content Section with Sticky Booking */}
      <section className="py-6 bg-white">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Vehicle Information (8 columns) */}
            <div className="lg:col-span-8 space-y-8">
              <CarRentalDetails vehicle={vehicle} />
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
