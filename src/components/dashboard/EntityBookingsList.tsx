"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface BookingItem {
  id: string;
  status: string;
  name?: string;
  email?: string;
  createdAt: string;
}

interface EntityBookingsListProps {
  entityType: "tour" | "event" | "vehicle";
  entityId: string;
}

const API_ENDPOINTS = {
  tour: "/api/tour-bookings",
  event: "/api/event-registrations",
  vehicle: "/api/car-rental-bookings",
} as const;

const PARAM_KEYS = {
  tour: "tourId",
  event: "eventId",
  vehicle: "vehicleId",
} as const;

const BASE_LINKS = {
  tour: "/admin/tours/bookings",
  event: "/admin/events/bookings",
  vehicle: "/admin/car-rental/bookings",
} as const;

export function EntityBookingsList({ entityType, entityId }: EntityBookingsListProps) {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const paramKey = PARAM_KEYS[entityType];
  const endpoint = API_ENDPOINTS[entityType];
  const baseLink = BASE_LINKS[entityType];

  useEffect(() => {
    if (!entityId) {
      setLoading(false);
      return;
    }
    fetch(`${endpoint}?${paramKey}=${entityId}&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [entityId, endpoint, paramKey]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>Requests for this item</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>No booking requests for this item yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings ({bookings.length})</CardTitle>
        <CardDescription>Booking requests linked to this item</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{b.name || b.email || "—"}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(b.createdAt).toLocaleString()}
                </p>
              </div>
              <Badge variant={b.status === "COMPLETED" ? "default" : "secondary"}>
                {b.status.replace("_", " ")}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link href={`${baseLink}/${b.id}`}>View</Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
