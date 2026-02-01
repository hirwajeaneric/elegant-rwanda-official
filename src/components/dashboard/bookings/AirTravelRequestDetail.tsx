"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  MapPin,
  Users,
  User,
  Luggage,
  Heart,
  Mail,
  Phone,
  Globe,
  Calendar,
  Clock,
  CreditCard,
  FileText,
} from "lucide-react";

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
  services: string[] | null;
  passengersAdults: number | null;
  passengersChildren: number | null;
  passengersInfants: number | null;
  primaryTravelerName: string | null;
  nationality: string | null;
  passportNumber: string | null;
  passportExpiry: string | null;
  luggageCheckedBags: number | null;
  luggageCabinBags: number | null;
  luggageSpecialItems: string | null;
  seatPreference: string | null;
  loyaltyProgram: string | null;
  budgetRange: string | null;
  preferences: string | null;
  name: string;
  email: string;
  phone: string;
  country: string | null;
  createdAt?: string;
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

export function AirTravelRequestDetail({ request }: { request: AirTravelRequest }) {
  const services = Array.isArray(request.services) ? request.services : [];

  return (
    <div className="space-y-6">
      {/* Trip & Route */}
      <DetailSection
        title="Trip & Route"
        description="Departure and return details"
        icon={Plane}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-0">
            <DetailRow label="Trip type" value={request.tripType} icon={Plane} />
            <DetailRow label="Origin" value={request.origin} icon={MapPin} />
            <DetailRow label="Destination" value={request.destination} icon={MapPin} />
          </div>
          <div className="space-y-0">
            <DetailRow label="Departure date" value={request.departureDate ? formatDate(request.departureDate) : null} icon={Calendar} />
            <DetailRow label="Departure time" value={request.departureTime} icon={Clock} />
            {request.tripType !== "One-way" && (
              <>
                <DetailRow label="Return date" value={request.returnDate ? formatDate(request.returnDate) : null} icon={Calendar} />
                <DetailRow label="Return time" value={request.returnTime} icon={Clock} />
              </>
            )}
            <DetailRow label="Cabin class" value={request.travelClass} />
          </div>
        </div>
      </DetailSection>

      {/* Services */}
      {services.length > 0 && (
        <DetailSection
          title="Requested services"
          description="Additional services selected"
          icon={FileText}
        >
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <Badge key={s} variant="secondary" className="text-sm">
                {s}
              </Badge>
            ))}
          </div>
        </DetailSection>
      )}

      {/* Passengers */}
      {(request.passengersAdults != null || request.passengersChildren != null || request.passengersInfants != null) && (
        <DetailSection
          title="Passengers"
          description="Passenger counts"
          icon={Users}
        >
          <div className="flex flex-wrap gap-6">
            {request.passengersAdults != null && request.passengersAdults > 0 && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Adults</span>
                <p className="text-lg font-semibold">{request.passengersAdults}</p>
              </div>
            )}
            {request.passengersChildren != null && request.passengersChildren > 0 && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Children</span>
                <p className="text-lg font-semibold">{request.passengersChildren}</p>
              </div>
            )}
            {request.passengersInfants != null && request.passengersInfants > 0 && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Infants</span>
                <p className="text-lg font-semibold">{request.passengersInfants}</p>
              </div>
            )}
          </div>
        </DetailSection>
      )}

      {/* Traveler details */}
      {(request.primaryTravelerName || request.nationality || request.passportNumber || request.passportExpiry) && (
        <DetailSection
          title="Traveler information"
          description="Primary traveler and passport"
          icon={User}
        >
          <div className="space-y-0">
            <DetailRow label="Primary traveler" value={request.primaryTravelerName} icon={User} />
            <DetailRow label="Nationality" value={request.nationality} icon={Globe} />
            <DetailRow label="Passport number" value={request.passportNumber} />
            <DetailRow label="Passport expiry" value={request.passportExpiry} />
          </div>
        </DetailSection>
      )}

      {/* Luggage */}
      {(request.luggageCheckedBags != null || request.luggageCabinBags != null || request.luggageSpecialItems) && (
        <DetailSection
          title="Luggage"
          description="Baggage and special items"
          icon={Luggage}
        >
          <div className="space-y-0">
            <DetailRow label="Checked bags" value={request.luggageCheckedBags} />
            <DetailRow label="Cabin bags" value={request.luggageCabinBags} />
            <DetailRow label="Special items" value={request.luggageSpecialItems} />
          </div>
        </DetailSection>
      )}

      {/* Preferences (seat, loyalty, budget, free text) */}
      {(request.seatPreference || request.loyaltyProgram || request.budgetRange || request.preferences) && (
        <DetailSection
          title="Preferences"
          description="Seat, loyalty, budget and notes"
          icon={Heart}
        >
          <div className="space-y-0">
            <DetailRow label="Seat preference" value={request.seatPreference} />
            <DetailRow label="Loyalty program" value={request.loyaltyProgram} />
            <DetailRow label="Budget range" value={request.budgetRange} icon={CreditCard} />
            {request.preferences && (
              <div className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <dl className="min-w-0 flex-1">
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Additional notes</dt>
                  <dd className="text-sm font-medium mt-0.5 whitespace-pre-wrap break-words">{request.preferences}</dd>
                </dl>
              </div>
            )}
          </div>
        </DetailSection>
      )}

      {/* Contact */}
      <DetailSection
        title="Contact information"
        description="Primary contact for this request"
        icon={Mail}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-0">
            <DetailRow label="Name" value={request.name} icon={User} />
            <DetailRow label="Email" value={request.email} icon={Mail} />
          </div>
          <div className="space-y-0">
            <DetailRow label="Phone" value={request.phone} icon={Phone} />
            <DetailRow label="Country" value={request.country} icon={Globe} />
          </div>
        </div>
      </DetailSection>
    </div>
  );
}

function formatDate(value: string): string {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return value;
  }
}
