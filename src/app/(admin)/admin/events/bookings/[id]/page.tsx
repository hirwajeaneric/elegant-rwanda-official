"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  EventRegistrationDetail,
  type EventRegistration,
} from "@/components/dashboard/bookings/EventRegistrationDetail";

export default function EventRegistrationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [booking, setBooking] = useState<EventRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const res = await fetch(`/api/event-registrations/${id}`);
      const data = await res.json();
      if (data.success) setBooking(data.booking);
      else setBooking(null);
    } catch {
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/event-registrations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setBooking(data.booking);
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

  if (!booking) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Registration not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/events/bookings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Event Registrations
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const eventLabel = booking.event?.title ?? "Event registration";
  const submittedAt = booking.createdAt
    ? new Date(booking.createdAt).toLocaleString(undefined, {
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
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Event Registration
              </h1>
              <p className="mt-1 text-muted-foreground">{eventLabel}</p>
              {submittedAt && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Submitted {submittedAt}
                </p>
              )}
            </div>
            <Badge
              variant={
                booking.status === "COMPLETED"
                  ? "default"
                  : booking.status === "IN_PROGRESS"
                    ? "secondary"
                    : "outline"
              }
              className="shrink-0"
            >
              {booking.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
        <Button variant="outline" asChild className="shrink-0">
          <Link href="/admin/events/bookings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to list
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EventRegistrationDetail booking={booking} />
        </div>
        <Card className="h-fit border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Status</CardTitle>
            <CardDescription>Update registration status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Current status</Label>
              <Select
                value={booking.status}
                onValueChange={handleStatusChange}
                disabled={updating}
              >
                <SelectTrigger className="w-full">
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
      </div>
    </div>
  );
}
