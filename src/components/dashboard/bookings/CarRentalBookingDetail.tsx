"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CarRentalBooking = {
  startDate: string;
  endDate: string;
  rentalType: string | null;
  name: string;
  email: string;
  phone: string;
  specialRequests: string | null;
  driverName: string | null;
  driverLicense: string | null;
  driverLicenseExpiry: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  passengers: number | null;
  vehicle?: { id: string; name: string; slug: string } | null;
};

export function CarRentalBookingDetail({ booking }: { booking: CarRentalBooking }) {
  const rental = [
    { label: "Vehicle", value: booking.vehicle?.name ?? "—" },
    { label: "Start date", value: booking.startDate },
    { label: "End date", value: booking.endDate },
    { label: "Rental type", value: booking.rentalType ?? "—" },
    { label: "Pickup location", value: booking.pickupLocation ?? "—" },
    { label: "Drop-off location", value: booking.dropoffLocation ?? "—" },
    { label: "Passengers", value: booking.passengers ?? "—" },
  ];
  const contact = [
    { label: "Name", value: booking.name },
    { label: "Email", value: booking.email },
    { label: "Phone", value: booking.phone },
  ];
  const driver = [
    { label: "Driver name", value: booking.driverName ?? "—" },
    { label: "Driver license", value: booking.driverLicense ?? "—" },
    { label: "License expiry", value: booking.driverLicenseExpiry ?? "—" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Car rental booking details</CardTitle>
        <CardDescription>Structured booking data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Rental</h4>
          <dl className="space-y-2">
            {rental.map((row) => (
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
        {(booking.driverName || booking.driverLicense) && (
          <section>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Driver</h4>
            <dl className="space-y-2">
              {driver.map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
                  <dd className="text-sm font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {booking.specialRequests && (
          <section>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Special requests</h4>
            <p className="text-sm whitespace-pre-wrap">{booking.specialRequests}</p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
