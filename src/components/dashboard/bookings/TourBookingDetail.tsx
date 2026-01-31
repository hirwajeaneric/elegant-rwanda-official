"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type TourBooking = {
  id: string;
  status: string;
  numberOfPeople: number;
  preferredStart: string | null;
  preferredEnd: string | null;
  specialRequests: string | null;
  name: string;
  email: string;
  phone: string;
  country: string | null;
  tour?: { id: string; title: string; slug: string } | null;
};

export function TourBookingDetail({ booking }: { booking: TourBooking }) {
  const trip = [
    { label: "Tour", value: booking.tour?.title ?? "—" },
    { label: "Number of people", value: String(booking.numberOfPeople) },
    { label: "Preferred start", value: booking.preferredStart ?? "—" },
    { label: "Preferred end", value: booking.preferredEnd ?? "—" },
  ];
  const contact = [
    { label: "Name", value: booking.name },
    { label: "Email", value: booking.email },
    { label: "Phone", value: booking.phone },
    { label: "Country", value: booking.country ?? "—" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour booking details</CardTitle>
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
