"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

interface EventRegistrationItem {
  id: string;
  status: string;
  numberOfParticipants: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  event?: { id: string; title: string; slug: string } | null;
}

export default function EventRegistrationsPage() {
  const [bookings, setBookings] = useState<EventRegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/event-registrations?limit=500");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error("Failed to load event registrations");
      }
    } catch (error) {
      console.error("Error loading event registrations:", error);
      toast.error("Failed to load event registrations");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "event",
      label: "Event",
      sortable: false,
      render: (item: EventRegistrationItem) => item.event?.title ?? "—",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: EventRegistrationItem) => (
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
      key: "numberOfParticipants",
      label: "Participants",
      sortable: true,
      render: (item: EventRegistrationItem) => item.numberOfParticipants,
    },
    {
      key: "name",
      label: "Contact",
      sortable: true,
      render: (item: EventRegistrationItem) => item.name,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: EventRegistrationItem) => item.email,
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (item: EventRegistrationItem) => {
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
      render: (item: EventRegistrationItem) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/events/bookings/${item.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={7} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Event Registrations</h1>
          <p className="text-muted-foreground mt-2">
            All event registration requests
          </p>
        </div>
      </div>

      <DataTable
        data={bookings}
        columns={columns}
        searchPlaceholder="Search event registrations..."
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
