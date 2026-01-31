"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type CabBooking = {
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
};

export function CabBookingDetail({ booking }: { booking: CabBooking }) {
  const trip = [
    { label: "Service type", value: booking.serviceType },
    { label: "Vehicle type", value: booking.vehicleType },
    { label: "Pickup location", value: booking.pickupLocation },
    { label: "Drop-off location", value: booking.dropoffLocation },
    { label: "Pickup date", value: booking.pickupDate },
    { label: "Pickup time", value: booking.pickupTime },
    { label: "Passengers", value: booking.passengers },
    { label: "Luggage", value: booking.luggage ?? "—" },
  ];
  const contact = [
    { label: "Name", value: booking.name },
    { label: "Phone", value: booking.phone },
    { label: "Email", value: booking.email },
    { label: "Preferred contact", value: booking.preferredContact ?? "—" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cab booking details</CardTitle>
        <CardDescription>Structured booking data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Trip</h4>
          <dl className="space-y-2">
            {trip.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
                <dd className="text-sm font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        {booking.specialRequests && (
          <section>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Special requests</h4>
            <p className="text-sm whitespace-pre-wrap">{booking.specialRequests}</p>
          </section>
        )}
        <section>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Contact</h4>
          <dl className="space-y-2">
            {contact.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
                <dd className="text-sm font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </CardContent>
    </Card>
  );
}
