"use client";

import { useMemo } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { getCategoriesForEntity } from "@/data/categories";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function FAQsPage() {
  const availableCategories = useMemo(() => getCategoriesForEntity(['faq']), []);
  const categoryFilterOptions = useMemo(() => 
    availableCategories.map(cat => ({ value: cat.name, label: cat.name })),
    [availableCategories]
  );

  const columns = [
    {
      key: "question",
      label: "Question",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: typeof faqs[0]) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: "active",
      label: "Active",
      sortable: true,
      render: (item: typeof faqs[0]) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof faqs[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/faqs/${item.id}`}>Edit</Link>
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
          <h1 className="text-3xl font-bold mt-4">FAQs</h1>
          <p className="text-muted-foreground mt-2">
            Manage frequently asked questions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Link>
        </Button>
      </div>

      <DataTable
        data={faqs}
        columns={columns}
        searchPlaceholder="Search FAQs..."
        filterOptions={[
          {
            key: "category",
            label: "Category",
            options: categoryFilterOptions,
          },
        ]}
      />
    </div>
  );
}
