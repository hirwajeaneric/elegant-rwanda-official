"use client";

import { useState, useEffect, useMemo } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";

interface Tour {
  id: string;
  title: string;
  categoryId?: string | null;
  category?: { id: string; name: string; slug: string } | null;
  status: string;
  price?: number | null;
  duration?: string | null;
  location?: string | null;
  featured?: boolean;
  bookings?: number | null;
  capacity?: number | null;
  createdAt?: string | null;
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours?limit=500");
      const data = await res.json();
      if (data.success) {
        setTours(data.tours);
      } else {
        toast.error("Failed to load tours");
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

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
      render: (item: Tour) => (
        <Badge variant="outline">{item.category?.name ?? "—"}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: Tour) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      sortable: true,
      render: (item: Tour) => item.duration ?? "—",
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      render: (item: Tour) => item.location ?? "—",
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (item: Tour) =>
        item.price != null ? `$${Number(item.price).toLocaleString()}` : "—",
    },
    {
      key: "featured",
      label: "Featured",
      sortable: true,
      render: (item: Tour) => (
        <Badge variant={item.featured ? "default" : "outline"}>
          {item.featured ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "bookings",
      label: "Bookings",
      sortable: true,
      render: (item: Tour) => {
        const count = item.bookings;
        if (count == null) return "—";
        const cap = item.capacity ?? null;
        if (cap != null) return `${count} / ${cap}`;
        return String(count);
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Tour) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/tours/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

  const categoryFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: { value: string; label: string }[] = [];
    tours.forEach((t) => {
      if (t.category && !seen.has(t.category.id)) {
        seen.add(t.category.id);
        options.push({ value: t.category.id, label: t.category.name });
      }
    });
    return options;
  }, [tours]);

  const filterOptions = useMemo(
    () => [
      {
        key: "status",
        label: "Status",
        options: [
          { value: "active", label: "Active" },
          { value: "draft", label: "Draft" },
        ],
      },
      {
        key: "categoryId",
        label: "Category",
        options: categoryFilterOptions,
      },
    ],
    [categoryFilterOptions]
  );

  if (loading) {
    return <DataTableLoader columnCount={9} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Tours</h1>
          <p className="text-muted-foreground mt-2">
            Manage tour packages and itineraries
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tours/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Tour
          </Link>
        </Button>
      </div>

      <DataTable
        data={tours}
        columns={columns}
        searchPlaceholder="Search tours..."
        filterOptions={filterOptions}
      />
    </div>
  );
}
