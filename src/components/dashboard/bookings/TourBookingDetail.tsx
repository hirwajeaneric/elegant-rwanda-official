"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, User, Mail, Phone, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type TourBooking = {
  id: string;
  status: string;
  numberOfPeople: number;
  preferredStart: string | null;
  specialRequests: string | null;
  name: string;
  email: string;
  phone: string;
  country: string | null;
  createdAt?: string;
  tour?: { id: string; title: string; slug: string } | null;
};

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number | null | undefined;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const display = value != null && value !== "" ? String(value) : "—";
  if (display === "—") return null;
  return (
    <div className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
      {Icon && (
        <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      )}
      <dl className="min-w-0 flex-1">
        <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
        <dd className="text-sm font-medium mt-0.5 break-words">{display}</dd>
      </dl>
    </div>
  );
}

function DetailSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

function formatPreferredStart(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return value;
  }
}

export function TourBookingDetail({ booking }: { booking: TourBooking }) {
  return (
    <div className="space-y-6">
      {/* Tour & dates */}
      <DetailSection
        title="Tour & dates"
        description="Tour and preferred start"
        icon={MapPin}
      >
        <div className="space-y-0">
          <DetailRow label="Tour" value={booking.tour?.title} icon={MapPin} />
          <DetailRow label="Number of people" value={booking.numberOfPeople} icon={Users} />
          <DetailRow
            label="Preferred start"
            value={formatPreferredStart(booking.preferredStart)}
            icon={Calendar}
          />
          {booking.tour && (
            <div className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <dl className="min-w-0 flex-1">
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tour details</dt>
                <dd className="text-sm font-medium mt-0.5">
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <Link href={`/admin/tours/${booking.tour.id}`}>View tour</Link>
                  </Button>
                </dd>
              </dl>
            </div>
          )}
        </div>
      </DetailSection>

      {/* Contact */}
      <DetailSection
        title="Contact information"
        description="Primary contact for this booking"
        icon={Mail}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-0">
            <DetailRow label="Name" value={booking.name} icon={User} />
            <DetailRow label="Email" value={booking.email} icon={Mail} />
          </div>
          <div className="space-y-0">
            <DetailRow label="Phone" value={booking.phone} icon={Phone} />
            <DetailRow label="Country" value={booking.country} icon={Globe} />
          </div>
        </div>
      </DetailSection>

      {/* Special requests */}
      {booking.specialRequests && (
        <DetailSection
          title="Special requests"
          description="Additional requirements or notes"
          icon={FileText}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{booking.specialRequests}</p>
        </DetailSection>
      )}
    </div>
  );
}
