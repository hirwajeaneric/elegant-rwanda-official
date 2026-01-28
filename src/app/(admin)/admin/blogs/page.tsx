"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  status: "PUBLISHED" | "DRAFT" | "SCHEDULED";
  views: number;
  publishDate: string | null;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      } else {
        toast.error("Failed to load blog posts", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load blog posts");
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

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
      render: (item: Blog) => (
        <Badge variant="outline">{item.category?.name || "Uncategorized"}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: Blog) => (
        <Badge variant={item.status === "PUBLISHED" ? "default" : "secondary"}>
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
      render: (item: Blog) =>
        item.publishDate ? new Date(item.publishDate).toLocaleDateString() : "Not published",
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Blog) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/blogs/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

  if (loading && blogs.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

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
        data={blogs}
        columns={columns}
        searchPlaceholder="Search blog posts..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "PUBLISHED", label: "Published" },
              { value: "DRAFT", label: "Draft" },
              { value: "SCHEDULED", label: "Scheduled" },
            ],
          },
        ]}
        dateFilterKey="publishDate"
      />
    </div>
  );
}
