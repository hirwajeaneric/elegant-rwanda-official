"use client";


import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function TestimonialsPage() {
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
      render: (item: typeof testimonials[0]) => (
        <Badge variant="outline">{item.service}</Badge>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (item: typeof testimonials[0]) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{item.rating}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: typeof testimonials[0]) => (
        <Badge variant={item.status === "approved" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: typeof testimonials[0]) =>
        new Date(item.date).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof testimonials[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/testimonials/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

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
        data={testimonials}
        columns={columns}
        searchPlaceholder="Search testimonials..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending" },
              { value: "rejected", label: "Rejected" },
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
        dateFilterKey="date"
      />
    </div>
  );
}
