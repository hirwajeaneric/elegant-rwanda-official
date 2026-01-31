"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Event {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  date: string;
  endDate?: string | null;
  maxParticipants: number;
  currentParticipants: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events?limit=500");
      const data = await res.json();
      if (data.success) {
        setEvents(data.events || []);
      } else {
        toast.error("Failed to load events");
      }
    } catch (error) {
      console.error("Error loading events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: Event) => <Badge variant="outline">{item.category}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: Event) => (
        <Badge
          variant={
            item.status === "Open"
              ? "default"
              : item.status === "Filling Fast"
                ? "secondary"
                : "destructive"
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: Event) => new Date(item.date).toLocaleDateString(),
    },
    {
      key: "participants",
      label: "Participants",
      sortable: true,
      render: (item: Event) =>
        `${item.currentParticipants}/${item.maxParticipants}`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Event) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/events/${item.id}`}>Edit</Link>
          </Button>
        </div>
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
          <h1 className="text-3xl font-bold mt-4">Events</h1>
          <p className="text-muted-foreground mt-2">
            Manage events and group tours
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Link>
        </Button>
      </div>

      <DataTable
        data={events}
        columns={columns}
        searchPlaceholder="Search events..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "Open", label: "Open" },
              { value: "Filling Fast", label: "Filling Fast" },
              { value: "Waitlist", label: "Waitlist" },
              { value: "Closed", label: "Closed" },
            ],
          },
          {
            key: "category",
            label: "Category",
            options: [
              { value: "Group Tour", label: "Group Tour" },
              { value: "Cultural Event", label: "Cultural Event" },
              { value: "Adventure", label: "Adventure" },
              { value: "Unique Experience", label: "Unique Experience" },
            ],
          },
        ]}
        dateFilterKey="date"
      />
    </div>
  );
}
