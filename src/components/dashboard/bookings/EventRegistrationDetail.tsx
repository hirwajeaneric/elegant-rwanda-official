"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type EventRegistration = {
  id: string;
  status: string;
  numberOfParticipants: number;
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  specialRequests: string | null;
  dietaryRestrictions: string | null;
  event?: { id: string; title: string; slug: string } | null;
};

export function EventRegistrationDetail({ booking }: { booking: EventRegistration }) {
  const eventInfo = [
    { label: "Event", value: booking.event?.title ?? "—" },
    { label: "Number of participants", value: String(booking.numberOfParticipants) },
  ];
  const contact = [
    { label: "Name", value: booking.name },
    { label: "Email", value: booking.email },
    { label: "Phone", value: booking.phone },
    { label: "Organization", value: booking.organization ?? "—" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event registration details</CardTitle>
        <CardDescription>Structured registration data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Event</h4>
          <dl className="space-y-2">
            {eventInfo.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
                <dd className="text-sm font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
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
        {(booking.specialRequests || booking.dietaryRestrictions) && (
          <section>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Notes</h4>
            {booking.specialRequests && (
              <div className="mb-2">
                <span className="text-xs font-medium text-muted-foreground">Special requests: </span>
                <p className="text-sm whitespace-pre-wrap">{booking.specialRequests}</p>
              </div>
            )}
            {booking.dietaryRestrictions && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">Dietary: </span>
                <p className="text-sm">{booking.dietaryRestrictions}</p>
              </div>
            )}
          </section>
        )}
      </CardContent>
    </Card>
  );
}
