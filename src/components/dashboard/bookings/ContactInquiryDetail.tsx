"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ContactInquiry = {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  serviceType: string | null;
};

export function ContactInquiryDetail({ booking }: { booking: ContactInquiry }) {
  const rows = [
    { label: "Name", value: booking.name },
    { label: "Email", value: booking.email },
    { label: "Phone", value: booking.phone ?? "—" },
    { label: "Subject", value: booking.subject },
    { label: "Service interest", value: booking.serviceType ?? "—" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact / inquiry details</CardTitle>
        <CardDescription>Structured form data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <dl className="space-y-2">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1">
              <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
              <dd className="text-sm font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
        <section>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Message</h4>
          <p className="text-sm whitespace-pre-wrap">{booking.message}</p>
        </section>
      </CardContent>
    </Card>
  );
}
