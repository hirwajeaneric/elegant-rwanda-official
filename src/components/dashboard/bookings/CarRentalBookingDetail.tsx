"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  IdCard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type CarRentalBooking = {
  id: string;
  status: string;
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
  createdAt?: string;
  vehicle?: { id: string; name: string; slug: string } | null;
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

function formatRentalType(value: string | null | undefined): string {
  if (!value) return "—";
  if (value === "self-drive") return "Self Drive";
  if (value === "chauffeur") return "Chauffeur Driven";
  return value;
}

export function CarRentalBookingDetail({ booking }: { booking: CarRentalBooking }) {
  return (
    <div className="space-y-6">
      {/* Rental & vehicle */}
      <DetailSection
        title="Rental & vehicle"
        description="Dates, type, and locations"
        icon={Car}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-0">
            <DetailRow label="Vehicle" value={booking.vehicle?.name} icon={Car} />
            <DetailRow label="Rental type" value={formatRentalType(booking.rentalType)} icon={Car} />
            <DetailRow label="Start date" value={booking.startDate} icon={Calendar} />
            <DetailRow label="End date" value={booking.endDate} icon={Calendar} />
          </div>
          <div className="space-y-0">
            <DetailRow label="Pickup location" value={booking.pickupLocation} icon={MapPin} />
            <DetailRow label="Drop-off location" value={booking.dropoffLocation} icon={MapPin} />
            <DetailRow label="Passengers" value={booking.passengers} icon={Users} />
            {booking.vehicle && (
              <div className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <Car className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <dl className="min-w-0 flex-1">
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Vehicle details</dt>
                  <dd className="text-sm font-medium mt-0.5">
                    <Button variant="link" className="h-auto p-0 text-primary" asChild>
                      <Link href={`/admin/car-rental/${booking.vehicle.id}`}>View vehicle</Link>
                    </Button>
                  </dd>
                </dl>
              </div>
            )}
          </div>
        </div>
      </DetailSection>

      {/* Driver details */}
      {(booking.driverName || booking.driverLicense || booking.driverLicenseExpiry) && (
        <DetailSection
          title="Driver details"
          description="License and driver information"
          icon={IdCard}
        >
          <div className="space-y-0">
            <DetailRow label="Driver name" value={booking.driverName} icon={User} />
            <DetailRow label="License number" value={booking.driverLicense} icon={IdCard} />
            <DetailRow label="License expiry" value={booking.driverLicenseExpiry} icon={Calendar} />
          </div>
        </DetailSection>
      )}

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
