"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { categories } from "@/data/categories";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "slug",
      label: "Slug",
      sortable: true,
    },
    {
      key: "type",
      label: "Types",
      sortable: false,
      render: (item: typeof categories[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.type.map((type) => (
            <Badge key={type} variant="outline" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "order",
      label: "Order",
      sortable: true,
    },
    {
      key: "active",
      label: "Active",
      sortable: true,
      render: (item: typeof categories[0]) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof categories[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/categories/${item.id}`}>Edit</Link>
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
          <h1 className="text-3xl font-bold mt-4">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage categories used across FAQs, Blogs, Events, Tours, and Images
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchPlaceholder="Search categories..."
        filterOptions={[
          {
            key: "type",
            label: "Type",
            options: [
              { value: "faq", label: "FAQ" },
              { value: "blog", label: "Blog" },
              { value: "event", label: "Event" },
              { value: "tour", label: "Tour" },
              { value: "image", label: "Image" },
              { value: "general", label: "General" },
            ],
          },
          {
            key: "active",
            label: "Status",
            options: [
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ],
          },
        ]}
      />
    </div>
  );
}
