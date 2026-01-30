"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { CarForm, type CarFormData } from "@/components/car-rental/CarForm";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function NewVehiclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CarFormData) => {
    setIsSubmitting(true);
    try {
    const res = await fetch("/api/vehicles", {
      method: "POST",
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
        lastService: data.lastService || undefined,
        nextService: data.nextService || undefined,
      }),
    });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error ?? "Failed to create vehicle");
        throw new Error(result.error);
      }
      toast.success("Vehicle created successfully!");
      router.push("/admin/car-rental");
    } catch (error) {
      // Error already handled by toast
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Create New Vehicle</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/car-rental">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <CarForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Create Vehicle"
        onCancel={() => router.push("/admin/car-rental")}
      />
    </div>
  );
}
