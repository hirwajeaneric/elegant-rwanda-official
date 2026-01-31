"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const TYPE_LABELS: Record<string, string> = {
  TOUR_BOOKING: "Tour Booking",
  CAR_RENTAL: "Car Rental",
  EVENT_REGISTRATION: "Event Registration",
  AIR_TRAVEL: "Air Travel",
  CAB_BOOKING: "Cab Booking",
  CONTACT: "Contact",
  INQUIRY: "Inquiry",
  EVENTS_NEWSLETTER: "Events Newsletter",
};

interface RequestDetail {
  id: string;
  type: string;
  status: string;
  data: Record<string, unknown>;
  userEmail: string | null;
  userName: string | null;
  createdAt: string;
  updatedAt: string;
  tour?: { id: string; title: string; slug: string } | null;
  event?: { id: string; title: string; slug: string } | null;
  vehicle?: { id: string; name: string; slug: string } | null;
}

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [request, setRequest] = useState<RequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const res = await fetch(`/api/requests/${id}`);
      const data = await res.json();
      if (data.success) setRequest(data.request);
      else setRequest(null);
    } catch {
      setRequest(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setRequest(data.request);
      toast.success("Status updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setUpdating(false);
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
            <p className="text-muted-foreground">Booking not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/bookings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const entityLink =
    request.tour
      ? `/admin/tours/${request.tour.id}`
      : request.event
        ? `/admin/events/${request.event.id}`
        : request.vehicle
          ? `/admin/car-rental/${request.vehicle.id}`
          : null;

  const entityLabel = request.tour
    ? request.tour.title
    : request.event
      ? request.event.title
      : request.vehicle
        ? request.vehicle.name
        : "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-3 mt-4">
            <h1 className="text-3xl font-bold">
              {TYPE_LABELS[request.type] ?? request.type}
            </h1>
            <Badge
              variant={
                request.status === "COMPLETED"
                  ? "default"
                  : request.status === "IN_PROGRESS"
                    ? "secondary"
                    : "outline"
              }
            >
              {request.status.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            {new Date(request.createdAt).toLocaleString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/bookings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact &amp; Related</CardTitle>
            <CardDescription>Requester and linked entity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="font-medium">{request.userName ?? "—"}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{request.userEmail ?? "—"}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Related to</Label>
              <p className="font-medium">{entityLabel}</p>
              {entityLink && (
                <Button variant="link" className="px-0" asChild>
                  <Link href={entityLink}>View in admin</Link>
                </Button>
              )}
            </div>
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <Select
                value={request.status}
                onValueChange={handleStatusChange}
                disabled={updating}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request details</CardTitle>
            <CardDescription>Submitted form data</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
              {JSON.stringify(request.data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
