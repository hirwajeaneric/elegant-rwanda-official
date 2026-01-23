"use client";


import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { team } from "@/data/team";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function TeamPage() {
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: typeof team[0]) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof team[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/team/${item.id}`}>Edit</Link>
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
          <h1 className="text-3xl font-bold mt-4">Team Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage team members and staff
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Link>
        </Button>
      </div>

      <DataTable
        data={team}
        columns={columns}
        searchPlaceholder="Search team members..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
          {
            key: "department",
            label: "Department",
            options: [
              { value: "Management", label: "Management" },
              { value: "Operations", label: "Operations" },
              { value: "Customer Service", label: "Customer Service" },
            ],
          },
        ]}
      />
    </div>
  );
}
