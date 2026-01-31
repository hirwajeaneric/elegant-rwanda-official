"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface SubscriberItem {
  id: string;
  email: string;
  firstName: string | null;
  source: string | null;
  active: boolean;
  subscribedAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/subscribers?limit=500");
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers || []);
      } else {
        toast.error("Failed to load subscribers");
      }
    } catch (error) {
      console.error("Error loading subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: SubscriberItem) => item.email,
    },
    {
      key: "firstName",
      label: "First name",
      sortable: true,
      render: (item: SubscriberItem) => item.firstName ?? "—",
    },
    {
      key: "source",
      label: "Source",
      sortable: false,
      render: (item: SubscriberItem) => item.source ?? "—",
    },
    {
      key: "active",
      label: "Active",
      sortable: true,
      render: (item: SubscriberItem) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "subscribedAt",
      label: "Subscribed",
      sortable: true,
      render: (item: SubscriberItem) => {
        const d = new Date(item.subscribedAt);
        try {
          return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
        } catch {
          return d.toISOString().slice(0, 16).replace("T", " ");
        }
      },
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={5} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Newsletter Subscribers</h1>
          <p className="text-muted-foreground mt-2">
            All newsletter and events newsletter subscribers
          </p>
        </div>
      </div>

      <DataTable
        data={subscribers}
        columns={columns}
        searchPlaceholder="Search subscribers..."
      />
    </div>
  );
}
