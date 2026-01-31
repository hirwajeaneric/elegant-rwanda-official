"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { AirTravelRequestDetail } from "@/components/dashboard/bookings/AirTravelRequestDetail";

interface AirTravelRequest {
  id: string;
  tripType: string | null;
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
  departureTime: string | null;
  returnDate: string | null;
  returnTime: string | null;
  travelClass: string | null;
  name: string;
  email: string;
  phone: string;
  preferences: string | null;
  createdAt: string;
}

export default function AirTravelRequestDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [request, setRequest] = useState<AirTravelRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const res = await fetch(`/api/air-travel-requests/${id}`);
      const data = await res.json();
      if (data.success) setRequest(data.request);
      else setRequest(null);
    } catch {
      setRequest(null);
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

  if (!request) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Request not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/air-travel-bookings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Air Travel Requests
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
          <h1 className="text-3xl font-bold mt-4">Air Travel Request</h1>
          <p className="text-muted-foreground mt-1">
            {request.origin ?? "—"} → {request.destination ?? "—"} · {new Date(request.createdAt).toLocaleString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/air-travel-bookings">
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
              <p className="font-medium">{request.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{request.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone</Label>
              <p className="font-medium">{request.phone}</p>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <AirTravelRequestDetail request={request} />
        </div>
      </div>
    </div>
  );
}
