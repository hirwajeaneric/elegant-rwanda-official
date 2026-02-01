"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface ContactInquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  serviceType: string | null;
  createdAt: string;
}

export default function ContactInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/contact-inquiries?limit=500");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      } else {
        toast.error("Failed to load contact inquiries");
      }
    } catch (error) {
      console.error("Error loading contact inquiries:", error);
      toast.error("Failed to load contact inquiries");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item: ContactInquiryItem) => item.name,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: ContactInquiryItem) => item.email,
    },
    {
      key: "subject",
      label: "Subject",
      sortable: false,
      render: (item: ContactInquiryItem) => item.subject,
    },
    {
      key: "serviceType",
      label: "Service",
      sortable: false,
      render: (item: ContactInquiryItem) => item.serviceType ?? "—",
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (item: ContactInquiryItem) => {
        const d = new Date(item.createdAt);
        try {
          return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
        } catch {
          return d.toISOString().slice(0, 16).replace("T", " ");
        }
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: ContactInquiryItem) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/contact/${item.id}`}>View</Link>
        </Button>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={7} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Contact Inquiries</h1>
          <p className="text-muted-foreground mt-2">
            All contact form submissions
          </p>
        </div>
      </div>

      <DataTable
        data={inquiries}
        columns={columns}
        searchPlaceholder="Search contact inquiries..."
      />
    </div>
  );
}
