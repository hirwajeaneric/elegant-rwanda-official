"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  FileText,
  User,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

export type CabBooking = {
  id: string;
  status: string;
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
  createdAt?: string;
};

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | null | undefined;
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

function formatServiceType(value: string): string {
  const labels: Record<string, string> = {
    "airport-transfer": "Airport Transfer",
    "city-tour": "City Tour",
    "intercity": "Intercity Travel",
    "event-transport": "Event Transport",
    "business-travel": "Business Travel",
    "sightseeing": "Sightseeing Tour",
  };
  return labels[value] ?? value;
}

function formatVehicleType(value: string): string {
  const labels: Record<string, string> = {
    sedan: "Sedan (4 passengers)",
    suv: "SUV (6 passengers)",
    minivan: "Minivan (8 passengers)",
    Unique: "Unique Vehicle",
  };
  return labels[value] ?? value;
}

function formatPreferredContact(value: string | null | undefined): string {
  if (!value) return "—";
  const labels: Record<string, string> = {
    phone: "Phone Call",
    whatsapp: "WhatsApp",
    email: "Email",
    sms: "SMS",
  };
  return labels[value] ?? value;
}

export function CabBookingDetail({ booking }: { booking: CabBooking }) {
  return (
    <div className="space-y-6">
      {/* Trip & Route */}
      <DetailSection
        title="Trip & Route"
        description="Service, vehicle, and locations"
        icon={Car}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-0">
            <DetailRow label="Service type" value={formatServiceType(booking.serviceType)} icon={Car} />
            <DetailRow label="Vehicle type" value={formatVehicleType(booking.vehicleType)} icon={Car} />
            <DetailRow label="Pickup location" value={booking.pickupLocation} icon={MapPin} />
            <DetailRow label="Drop-off location" value={booking.dropoffLocation} icon={MapPin} />
          </div>
          <div className="space-y-0">
            <DetailRow label="Pickup date" value={booking.pickupDate} icon={Calendar} />
            <DetailRow label="Pickup time" value={booking.pickupTime} icon={Clock} />
            <DetailRow label="Passengers" value={booking.passengers} icon={Users} />
            <DetailRow label="Luggage" value={booking.luggage} icon={Luggage} />
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
            <DetailRow label="Preferred contact" value={formatPreferredContact(booking.preferredContact)} icon={MessageCircle} />
          </div>
        </div>
      </DetailSection>
    </div>
  );
}
