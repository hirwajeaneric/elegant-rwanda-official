"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

const TYPE_LABELS: Record<string, string> = {
  TOUR_BOOKING: "Tour",
  CAR_RENTAL: "Car Rental",
  EVENT_REGISTRATION: "Event",
  AIR_TRAVEL: "Air Travel",
  CAB_BOOKING: "Cab",
  CONTACT: "Contact",
  INQUIRY: "Inquiry",
  EVENTS_NEWSLETTER: "Events Newsletter",
};

interface RequestItem {
  id: string;
  type: string;
  status: string;
  userEmail: string | null;
  userName: string | null;
  createdAt: string;
  tour?: { id: string; title: string; slug: string } | null;
  event?: { id: string; title: string; slug: string } | null;
  vehicle?: { id: string; name: string; slug: string } | null;
}

function getEntityLabel(r: RequestItem): string {
  if (r.tour) return r.tour.title;
  if (r.event) return r.event.title;
  if (r.vehicle) return r.vehicle.name;
  return "—";
}

export default function BookingsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests?limit=500");
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests || []);
      } else {
        toast.error("Failed to load bookings");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (item: RequestItem) => (
        <Badge variant="outline">{TYPE_LABELS[item.type] ?? item.type}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: RequestItem) => (
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
      key: "entity",
      label: "Related to",
      sortable: false,
      render: (item: RequestItem) => getEntityLabel(item),
    },
    {
      key: "user",
      label: "Contact",
      sortable: true,
      render: (item: RequestItem) =>
        item.userName || item.userEmail || "—",
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (item: RequestItem) => {
        const d = new Date(item.createdAt);
        // Avoid dateStyle/timeStyle (not supported in all runtimes)
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
      render: (item: RequestItem) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/bookings/${item.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={6} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Bookings</h1>
          <p className="text-muted-foreground mt-2">
            All booking requests for tours, car rentals, events, and inquiries
          </p>
        </div>
      </div>

      <DataTable
        data={requests}
        columns={columns}
        searchPlaceholder="Search bookings..."
        filterOptions={[
          {
            key: "type",
            label: "Type",
            options: [
              { value: "TOUR_BOOKING", label: "Tour" },
              { value: "CAR_RENTAL", label: "Car Rental" },
              { value: "EVENT_REGISTRATION", label: "Event" },
              { value: "AIR_TRAVEL", label: "Air Travel" },
              { value: "CAB_BOOKING", label: "Cab" },
              { value: "CONTACT", label: "Contact" },
              { value: "INQUIRY", label: "Inquiry" },
            ],
          },
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
