"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface TestimonialRow {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  review: string;
  service: string;
  image: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/testimonials?limit=500");
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      } else {
        toast.error("Failed to load testimonials", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load testimonials");
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "service",
      label: "Service",
      sortable: true,
      render: (item: TestimonialRow) => (
        <Badge variant="outline">{item.service}</Badge>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (item: TestimonialRow) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{item.rating}</span>
        </div>
      ),
    },
    {
      key: "active",
      label: "Status",
      sortable: true,
      render: (item: TestimonialRow) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: TestimonialRow) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/testimonials/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

  // Flatten active to string for DataTable filter (it compares by string)
  const testimonialsForTable = testimonials.map((t) => ({
    ...t,
    activeLabel: t.active ? "Active" : "Inactive",
  }));

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Testimonials</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <DataTable
        data={testimonialsForTable}
        columns={columns}
        searchPlaceholder="Search testimonials..."
        filterOptions={[
          {
            key: "activeLabel",
            label: "Status",
            options: [
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ],
          },
          {
            key: "service",
            label: "Service",
            options: [
              { value: "Tour", label: "Tour" },
              { value: "Cab Booking", label: "Cab Booking" },
              { value: "Car Rental", label: "Car Rental" },
              { value: "Air Travel Assistance", label: "Air Travel Assistance" },
              { value: "Event", label: "Event" },
            ],
          },
        ]}
      />
    </div>
  );
}
