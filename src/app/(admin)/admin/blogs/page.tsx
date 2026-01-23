"use client";


import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BlogsPage() {
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
      render: (item: typeof blogPosts[0]) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: typeof blogPosts[0]) => (
        <Badge variant={item.status === "published" ? "default" : "secondary"}>
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
      key: "publishDate",
      label: "Published",
      sortable: true,
      render: (item: typeof blogPosts[0]) =>
        new Date(item.publishDate).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: typeof blogPosts[0]) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/blogs/${item.id}`}>Edit</Link>
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
          <h1 className="text-3xl font-bold mt-4">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage blog posts and articles
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog Post
          </Link>
        </Button>
      </div>

      <DataTable
        data={blogPosts}
        columns={columns}
        searchPlaceholder="Search blog posts..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "published", label: "Published" },
              { value: "draft", label: "Draft" },
              { value: "scheduled", label: "Scheduled" },
            ],
          },
          {
            key: "category",
            label: "Category",
            options: [
              { value: "Tours", label: "Tours" },
              { value: "Tips", label: "Tips" },
              { value: "Culture", label: "Culture" },
              { value: "Wildlife", label: "Wildlife" },
              { value: "Unique", label: "Unique" },
              { value: "News", label: "News" },
            ],
          },
        ]}
        dateFilterKey="publishDate"
      />
    </div>
  );
}
