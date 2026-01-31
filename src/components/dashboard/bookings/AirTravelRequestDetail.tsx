"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type AirTravelRequest = {
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
};

export function AirTravelRequestDetail({ request }: { request: AirTravelRequest }) {
  const trip = [
    { label: "Trip type", value: request.tripType ?? "—" },
    { label: "Origin", value: request.origin ?? "—" },
    { label: "Destination", value: request.destination ?? "—" },
    { label: "Departure date", value: request.departureDate ?? "—" },
    { label: "Departure time", value: request.departureTime ?? "—" },
    { label: "Return date", value: request.returnDate ?? "—" },
    { label: "Return time", value: request.returnTime ?? "—" },
    { label: "Travel class", value: request.travelClass ?? "—" },
  ];
  const contact = [
    { label: "Name", value: request.name },
    { label: "Email", value: request.email },
    { label: "Phone", value: request.phone },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Air travel request details</CardTitle>
        <CardDescription>Structured request data</CardDescription>
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
        {request.preferences && (
          <section>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Preferences</h4>
            <p className="text-sm whitespace-pre-wrap">{request.preferences}</p>
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
