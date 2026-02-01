"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

interface TourBookingItem {
  id: string;
  status: string;
  numberOfPeople: number;
  preferredStart: string | null;
  specialRequests: string | null;
  name: string;
  email: string;
  phone: string;
  country: string | null;
  createdAt: string;
  tour?: { id: string; title: string; slug: string } | null;
}

export default function TourBookingsPage() {
  const [bookings, setBookings] = useState<TourBookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/tour-bookings?limit=500");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error("Failed to load tour bookings");
      }
    } catch (error) {
      console.error("Error loading tour bookings:", error);
      toast.error("Failed to load tour bookings");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "tour",
      label: "Tour",
      sortable: false,
      render: (item: TourBookingItem) => item.tour?.title ?? "—",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: TourBookingItem) => (
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
      key: "numberOfPeople",
      label: "Guests",
      sortable: true,
      render: (item: TourBookingItem) => item.numberOfPeople,
    },
    {
      key: "name",
      label: "Contact",
      sortable: true,
      render: (item: TourBookingItem) => item.name,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: TourBookingItem) => item.email,
    },
    {
      key: "preferredStart",
      label: "Preferred start",
      sortable: false,
      render: (item: TourBookingItem) => {
        const v = item.preferredStart;
        if (!v) return "—";
        try {
          const d = new Date(v);
          return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString(undefined, { dateStyle: "medium" });
        } catch {
          return v;
        }
      },
    },
    {
      key: "createdAt",
      label: "Submitted",
      sortable: true,
      render: (item: TourBookingItem) => {
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
      render: (item: TourBookingItem) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/tours/bookings/${item.id}`}>View</Link>
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
          <h1 className="text-3xl font-bold mt-4">Tour Bookings</h1>
          <p className="text-muted-foreground mt-2">
            All tour booking requests
          </p>
        </div>
      </div>

      <DataTable
        data={bookings}
        columns={columns}
        searchPlaceholder="Search tour bookings..."
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
