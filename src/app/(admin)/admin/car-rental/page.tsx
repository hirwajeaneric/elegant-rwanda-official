"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Vehicle = {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  dailyRate: number;
  location: string;
  [key: string]: unknown;
};

export default function CarRentalPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch("/api/vehicles?limit=500");
        const data = await res.json();
        if (data.success && Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
        }
      } catch {
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

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
      render: (item: Vehicle) => <Badge variant="outline">{item.category}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: Vehicle) => (
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
      render: (item: Vehicle) => `$${item.dailyRate}`,
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Vehicle) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/car-rental/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <DashboardBreadcrumbs />
            <h1 className="text-3xl font-bold mt-4">Car Rental</h1>
            <p className="text-muted-foreground mt-2">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

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
