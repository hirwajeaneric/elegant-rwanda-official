"use client";


import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { events } from "@/data/events";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: typeof events[0]) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: typeof events[0]) => (
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
      render: (item: typeof events[0]) =>
        new Date(item.date).toLocaleDateString(),
    },
    {
      key: "currentParticipants",
      label: "Participants",
      sortable: true,
      render: (item: typeof events[0]) =>
        `${item.currentParticipants}/${item.maxParticipants}`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof events[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/events/${item.id}`}>Edit</Link>
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
