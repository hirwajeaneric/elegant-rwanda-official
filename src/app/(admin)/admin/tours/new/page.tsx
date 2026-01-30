"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TourForm, TourFormData } from "@/components/tours/TourForm";
import { toast } from "sonner";
import { useCategories } from "@/lib/hooks/use-categories";

export default function NewTourPage() {
  const router = useRouter();
  const { categories: categoryList } = useCategories({ type: ['TOUR'], active: true });
  const availableCategories = useMemo(() => 
    categoryList.map(cat => ({ id: cat.id, name: cat.name })), 
    [categoryList]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: TourFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to create tour");
      }

      toast.success("Tour created successfully!");
      router.push("/admin/tours");
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Create New Tour</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/tours">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <TourForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        availableCategories={availableCategories}
        onCancel={() => router.push("/admin/tours")}
      />
    </div>
  );
}
