"use client";


import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { vehicles } from "@/data/car-rental";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CarRentalPage() {
  const columns = [
    {
      key: "name",
      label: "Vehicle",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: typeof vehicles[0]) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: typeof vehicles[0]) => (
        <Badge
          variant={
            item.status === "available"
              ? "default"
              : item.status === "rented"
              ? "secondary"
              : "destructive"
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: "dailyRate",
      label: "Daily Rate",
      sortable: true,
      render: (item: typeof vehicles[0]) => `$${item.dailyRate}`,
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof vehicles[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/car-rental/${item.id}`}>Edit</Link>
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
          <h1 className="text-3xl font-bold mt-4">Car Rental</h1>
          <p className="text-muted-foreground mt-2">
            Manage vehicle fleet and rental options
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/car-rental/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      <DataTable
        data={vehicles}
        columns={columns}
        searchPlaceholder="Search vehicles..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "available", label: "Available" },
              { value: "rented", label: "Rented" },
              { value: "maintenance", label: "Maintenance" },
            ],
          },
          {
            key: "category",
            label: "Category",
            options: [
              { value: "Economy", label: "Economy" },
              { value: "Compact", label: "Compact" },
              { value: "SUV", label: "SUV" },
              { value: "Unique", label: "Unique" },
              { value: "Minivan", label: "Minivan" },
              { value: "Adventure", label: "Adventure" },
              { value: "Executive", label: "Executive" },
            ],
          },
        ]}
      />
    </div>
  );
}
