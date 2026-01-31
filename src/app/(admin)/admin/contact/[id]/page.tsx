"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { ContactInquiryDetail } from "@/components/dashboard/bookings/ContactInquiryDetail";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  serviceType: string | null;
  createdAt: string;
}

export default function ContactInquiryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [inquiry, setInquiry] = useState<ContactInquiry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiry();
  }, [id]);

  const fetchInquiry = async () => {
    try {
      const res = await fetch(`/api/contact-inquiries/${id}`);
      const data = await res.json();
      if (data.success) setInquiry(data.inquiry);
      else setInquiry(null);
    } catch {
      setInquiry(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Inquiry not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/contact">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Contact Inquiries
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Contact Inquiry</h1>
          <p className="text-muted-foreground mt-1">
            {inquiry.subject} · {new Date(inquiry.createdAt).toLocaleString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/contact">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="font-medium">{inquiry.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{inquiry.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone</Label>
              <p className="font-medium">{inquiry.phone ?? "—"}</p>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <ContactInquiryDetail booking={inquiry} />
        </div>
      </div>
    </div>
  );
}
