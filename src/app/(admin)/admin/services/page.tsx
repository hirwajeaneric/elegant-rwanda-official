"use client";


import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { services } from "@/data/services";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ServicesPage() {
  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: typeof services[0]) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "views",
      label: "Views",
      sortable: true,
    },
    {
      key: "clicks",
      label: "Clicks",
      sortable: true,
    },
    {
      key: "order",
      label: "Order",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof services[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/services/${item.id}`}>Edit</Link>
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
          <h1 className="text-3xl font-bold mt-4">Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage services displayed on the home page
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      <DataTable
        data={services}
        columns={columns}
        searchPlaceholder="Search services..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "draft", label: "Draft" },
            ],
          },
        ]}
      />
    </div>
  );
}
