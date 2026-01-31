"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface AirTravelRequestItem {
  id: string;
  tripType: string | null;
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function AirTravelBookingsPage() {
  const [requests, setRequests] = useState<AirTravelRequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/air-travel-requests?limit=500");
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests || []);
      } else {
        toast.error("Failed to load air travel requests");
      }
    } catch (error) {
      console.error("Error loading air travel requests:", error);
      toast.error("Failed to load air travel requests");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "tripType",
      label: "Trip type",
      sortable: false,
      render: (item: AirTravelRequestItem) => item.tripType ?? "—",
    },
    {
      key: "origin",
      label: "Origin",
      sortable: false,
      render: (item: AirTravelRequestItem) => item.origin ?? "—",
    },
    {
      key: "destination",
      label: "Destination",
      sortable: false,
      render: (item: AirTravelRequestItem) => item.destination ?? "—",
    },
    {
      key: "departureDate",
      label: "Departure",
      sortable: false,
      render: (item: AirTravelRequestItem) => item.departureDate ?? "—",
    },
    {
      key: "name",
      label: "Contact",
      sortable: true,
      render: (item: AirTravelRequestItem) => item.name,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: AirTravelRequestItem) => item.email,
    },
    {
      key: "createdAt",
      label: "Submitted",
      sortable: true,
      render: (item: AirTravelRequestItem) => {
        const d = new Date(item.createdAt);
        try {
          return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
        } catch {
          return d.toISOString().slice(0, 16).replace("T", " ");
        }
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: AirTravelRequestItem) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/air-travel-bookings/${item.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={8} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Air Travel Requests</h1>
          <p className="text-muted-foreground mt-2">
            All air travel assistance requests
          </p>
        </div>
      </div>

      <DataTable
        data={requests}
        columns={columns}
        searchPlaceholder="Search air travel requests..."
      />
    </div>
  );
}
