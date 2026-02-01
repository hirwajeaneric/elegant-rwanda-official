"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Plane } from "lucide-react";
import Link from "next/link";
import {
  AirTravelRequestDetail,
  type AirTravelRequest,
} from "@/components/dashboard/bookings/AirTravelRequestDetail";

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

  const routeLabel =
    [request.origin, request.destination].filter(Boolean).join(" → ") || "Air travel request";
  const submittedAt = request.createdAt
    ? new Date(request.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <DashboardBreadcrumbs />
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Air Travel Request
              </h1>
              <p className="mt-1 text-muted-foreground">
                {routeLabel}
                {request.travelClass && (
                  <span className="ml-2 inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                    {request.travelClass}
                  </span>
                )}
              </p>
              {submittedAt && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Submitted {submittedAt}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" asChild className="shrink-0">
          <Link href="/admin/air-travel-bookings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to list
          </Link>
        </Button>
      </div>

      <AirTravelRequestDetail request={request} />
    </div>
  );
}
