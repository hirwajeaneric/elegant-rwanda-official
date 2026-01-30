"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Tour {
  id: string;
  title: string;
  category: string;
  status: string;
  price: number;
  bookings: number;
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
        <Badge variant="outline">{item.category}</Badge>
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
      key: "price",
      label: "Price",
      sortable: true,
      render: (item: Tour) => `$${item.price}`,
    },
    {
      key: "bookings",
      label: "Bookings",
      sortable: true,
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

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <p className="text-muted-foreground">Loading tours...</p>
      </div>
    );
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
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "active", label: "Active" },
              { value: "draft", label: "Draft" },
              { value: "scheduled", label: "Scheduled" },
            ],
          },
          {
            key: "category",
            label: "Category",
            options: [
              { value: "Wildlife", label: "Wildlife" },
              { value: "Cultural", label: "Cultural" },
              { value: "Adventure", label: "Adventure" },
              { value: "Unique", label: "Unique" },
              { value: "Nature", label: "Nature" },
            ],
          },
        ]}
      />
    </div>
  );
}
