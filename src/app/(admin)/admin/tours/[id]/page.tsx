"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TourForm, TourFormData, TourDay } from "@/components/tours/TourForm";
import { toast } from "sonner";
import { useCategories } from "@/lib/hooks/use-categories";

interface ApiTour {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  location: string;
  difficulty: string;
  maxGroupSize: number;
  highlights: string[];
  itinerary: unknown; // Json from Prisma
  inclusions: string[];
  exclusions: string[];
  images: string[];
  category: string;
  featured: boolean;
  availableDates: string[];
  price: number;
  status: string;
  capacity: number;
  guide?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export default function TourEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { categories: categoryList } = useCategories({ type: ['TOUR'], active: true });
  const availableCategories = useMemo(() => 
    categoryList.map(cat => ({ id: cat.id, name: cat.name })), 
    [categoryList]
  );
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tour, setTour] = useState<ApiTour | null>(null);

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      const res = await fetch(`/api/tours/${id}`);
      const data = await res.json();
      if (data.success) {
        setTour(data.tour);
      } else {
        toast.error("Tour not found");
        router.push("/admin/tours");
      }
    } catch (error) {
      console.error("Error fetching tour:", error);
      toast.error("Failed to load tour");
      router.push("/admin/tours");
    } finally {
      setLoading(false);
    }
  };

  const mapApiTourToFormData = (apiTour: ApiTour): TourFormData => {
    return {
      title: apiTour.title,
      slug: apiTour.slug,
      description: apiTour.description,
      duration: apiTour.duration,
      location: apiTour.location,
      difficulty: apiTour.difficulty as TourFormData["difficulty"],
      maxGroupSize: apiTour.maxGroupSize,
      highlights: apiTour.highlights,
      itinerary: (Array.isArray(apiTour.itinerary) ? apiTour.itinerary : []) as TourDay[],
      inclusions: apiTour.inclusions,
      exclusions: apiTour.exclusions,
      images: apiTour.images,
      category: apiTour.category as TourFormData["category"],
      featured: apiTour.featured,
      availableDates: apiTour.availableDates,
      price: apiTour.price,
      status: apiTour.status as TourFormData["status"],
      capacity: apiTour.capacity,
      guide: apiTour.guide || undefined,
      metaTitle: apiTour.metaTitle || undefined,
      metaDescription: apiTour.metaDescription || undefined,
    };
  };

  const handleSubmit = async (data: TourFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/tours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update tour");
      }

      toast.success("Tour updated successfully!");
      router.push("/admin/tours");
    } catch (error) {
      console.error("Error updating tour:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <p className="text-muted-foreground">Loading tour...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <p className="text-muted-foreground">Tour not found</p>
        <Button asChild>
          <Link href="/admin/tours">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tours
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Edit Tour</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/tours">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <TourForm
        initialData={mapApiTourToFormData(tour)}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        isEditing={true}
        availableCategories={availableCategories}
        onCancel={() => router.push("/admin/tours")}
      />
    </div>
  );
}
