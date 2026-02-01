"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, User, Mail, Phone, Building2, FileText, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  createdAt?: string;
  event?: { id: string; title: string; slug: string } | null;
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

export function EventRegistrationDetail({ booking }: { booking: EventRegistration }) {
  return (
    <div className="space-y-6">
      {/* Event & participation */}
      <DetailSection
        title="Event & participation"
        description="Event and participant count"
        icon={Calendar}
      >
        <div className="space-y-0">
          <DetailRow label="Event" value={booking.event?.title} icon={Calendar} />
          <DetailRow label="Number of participants" value={booking.numberOfParticipants} icon={Users} />
          {booking.event && (
            <div className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <dl className="min-w-0 flex-1">
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Event details</dt>
                <dd className="text-sm font-medium mt-0.5">
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <Link href={`/admin/events/${booking.event.id}`}>View event</Link>
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
        description="Primary contact for this registration"
        icon={Mail}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-0">
            <DetailRow label="Name" value={booking.name} icon={User} />
            <DetailRow label="Email" value={booking.email} icon={Mail} />
          </div>
          <div className="space-y-0">
            <DetailRow label="Phone" value={booking.phone} icon={Phone} />
            <DetailRow label="Organization" value={booking.organization} icon={Building2} />
          </div>
        </div>
      </DetailSection>

      {/* Notes: special requests & dietary */}
      {(booking.specialRequests || booking.dietaryRestrictions) && (
        <DetailSection
          title="Notes"
          description="Special requests and dietary requirements"
          icon={FileText}
        >
          <div className="space-y-0">
            {booking.specialRequests && (
              <div className="flex items-start gap-3 py-2 border-b border-border/50">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <dl className="min-w-0 flex-1">
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Special requests</dt>
                  <dd className="text-sm font-medium mt-0.5 whitespace-pre-wrap break-words">{booking.specialRequests}</dd>
                </dl>
              </div>
            )}
            {booking.dietaryRestrictions && (
              <div className="flex items-start gap-3 py-2 last:border-0">
                <UtensilsCrossed className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <dl className="min-w-0 flex-1">
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dietary restrictions</dt>
                  <dd className="text-sm font-medium mt-0.5">{booking.dietaryRestrictions}</dd>
                </dl>
              </div>
            )}
          </div>
        </DetailSection>
      )}
    </div>
  );
}
