"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { CabBookingDetail } from "@/components/dashboard/bookings/CabBookingDetail";

interface CabBooking {
  id: string;
  status: string;
  serviceType: string;
  vehicleType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  luggage: string | null;
  specialRequests: string | null;
  name: string;
  phone: string;
  email: string;
  preferredContact: string | null;
  createdAt: string;
}

export default function CabBookingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [booking, setBooking] = useState<CabBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const res = await fetch(`/api/cab-bookings/${id}`);
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
      const res = await fetch(`/api/cab-bookings/${id}`, {
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
            <p className="text-muted-foreground">Booking not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/cab-bookings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cab Bookings
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
          <div className="flex items-center gap-3 mt-4">
            <h1 className="text-3xl font-bold">Cab Booking</h1>
            <Badge
              variant={
                booking.status === "COMPLETED"
                  ? "default"
                  : booking.status === "IN_PROGRESS"
                    ? "secondary"
                    : "outline"
              }
            >
              {booking.status.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            {booking.pickupLocation} → {booking.dropoffLocation} · {new Date(booking.createdAt).toLocaleString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/cab-bookings">
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
              <p className="font-medium">{booking.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{booking.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone</Label>
              <p className="font-medium">{booking.phone}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Status</Label>
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

        <div className="col-span-2">
          <CabBookingDetail booking={booking} />
        </div>
      </div>
    </div>
  );
}
