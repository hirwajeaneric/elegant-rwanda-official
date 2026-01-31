"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarForm, type CarFormData } from "@/components/car-rental/CarForm";
import { EntityBookingsList } from "@/components/dashboard/EntityBookingsList";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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

function mapVehicleToFormData(v: ApiVehicle): Partial<CarFormData> {
  const spec = (v.specifications || {}) as unknown as CarFormData["specifications"];
  const ins = (v.insurance || {}) as unknown as CarFormData["insurance"];
  return {
    name: v.name,
    slug: v.slug,
    category: v.category as CarFormData["category"],
    description: v.description,
    shortDescription: v.shortDescription,
    images: v.images ?? [],
    specifications: {
      passengers: spec.passengers ?? 4,
      doors: spec.doors ?? 4,
      transmission: (spec.transmission as CarFormData["specifications"]["transmission"]) ?? "Automatic",
      fuelType: (spec.fuelType as CarFormData["specifications"]["fuelType"]) ?? "Petrol",
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
    available: v.available ?? true,
    pickupLocations: v.pickupLocations ?? [],
    includedServices: v.includedServices ?? [],
    additionalServices: v.additionalServices ?? [],
    requirements: v.requirements ?? [],
    insurance: {
      included: ins.included ?? true,
      coverage: ins.coverage ?? "",
      excess: ins.excess ?? "",
    },
    make: v.make,
    model: v.model,
    year: v.year,
    plateNumber: v.plateNumber,
    dailyRate: v.dailyRate,
    status: v.status as CarFormData["status"],
    location: v.location,
    mileage: v.mileage ?? 0,
    lastService: v.lastService ?? "",
    nextService: v.nextService ?? "",
  };
}

export default function EditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [vehicle, setVehicle] = useState<ApiVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        const data = await res.json();
        if (data.success && data.vehicle) {
          setVehicle(data.vehicle);
        } else {
          setVehicle(null);
        }
      } catch {
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicle();
  }, [id]);

  const handleSubmit = async (data: CarFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        slug: data.slug,
        category: data.category,
        description: data.description,
        shortDescription: data.shortDescription,
        images: data.images,
        specifications: data.specifications,
        available: data.available,
        pickupLocations: data.pickupLocations,
        includedServices: data.includedServices,
        additionalServices: data.additionalServices,
        requirements: data.requirements,
        insurance: data.insurance,
        make: data.make,
        model: data.model,
        year: data.year,
        plateNumber: data.plateNumber,
        dailyRate: data.dailyRate,
        status: data.status,
        location: data.location,
        mileage: data.mileage,
        lastService: data.lastService || null,
        nextService: data.nextService || null,
      }),
    });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error ?? "Failed to update vehicle");
        throw new Error(result.error);
      }
      toast.success("Vehicle updated successfully!");
      router.push("/admin/car-rental");
    } catch (error) {
      // Error already handled by toast
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <p className="text-muted-foreground">Loading vehicle...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Vehicle not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/car-rental">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Car Rental
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Edit Vehicle</h1>
          <p className="text-muted-foreground mt-1">{vehicle.name}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/car-rental">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <CarForm
        initialData={mapVehicleToFormData(vehicle)}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        isEditing
        submitLabel="Update Vehicle"
        onCancel={() => router.push("/admin/car-rental")}
      />

      <EntityBookingsList entityType="vehicle" entityId={vehicle.id} />
    </div>
  );
}
