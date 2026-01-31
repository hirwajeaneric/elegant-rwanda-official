"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

interface CabBookingItem {
  id: string;
  status: string;
  serviceType: string;
  vehicleType: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function CabBookingsPage() {
  const [bookings, setBookings] = useState<CabBookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/cab-bookings?limit=500");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error("Failed to load cab bookings");
      }
    } catch (error) {
      console.error("Error loading cab bookings:", error);
      toast.error("Failed to load cab bookings");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: CabBookingItem) => (
        <Badge
          variant={
            item.status === "COMPLETED"
              ? "default"
              : item.status === "IN_PROGRESS"
                ? "secondary"
                : "outline"
          }
        >
          {item.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "serviceType",
      label: "Service",
      sortable: true,
      render: (item: CabBookingItem) => item.serviceType,
    },
    {
      key: "vehicleType",
      label: "Vehicle",
      sortable: true,
      render: (item: CabBookingItem) => item.vehicleType,
    },
    {
      key: "pickupLocation",
      label: "Pickup",
      sortable: false,
      render: (item: CabBookingItem) => item.pickupLocation,
    },
    {
      key: "pickupDate",
      label: "Date",
      sortable: true,
      render: (item: CabBookingItem) => `${item.pickupDate} ${item.pickupTime}`,
    },
    {
      key: "name",
      label: "Contact",
      sortable: true,
      render: (item: CabBookingItem) => item.name,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: CabBookingItem) => item.email,
    },
    {
      key: "createdAt",
      label: "Submitted",
      sortable: true,
      render: (item: CabBookingItem) => {
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
      render: (item: CabBookingItem) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/cab-bookings/${item.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={9} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Cab Bookings</h1>
          <p className="text-muted-foreground mt-2">
            All cab booking requests
          </p>
        </div>
      </div>

      <DataTable
        data={bookings}
        columns={columns}
        searchPlaceholder="Search cab bookings..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "PENDING", label: "Pending" },
              { value: "IN_PROGRESS", label: "In Progress" },
              { value: "COMPLETED", label: "Completed" },
              { value: "ARCHIVED", label: "Archived" },
            ],
          },
        ]}
      />
    </div>
  );
}
