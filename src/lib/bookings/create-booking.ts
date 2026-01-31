/**
 * Create typed booking record only (no Request). Each service has its own table.
 * Used by send-email API; admin pages use these tables directly.
 */

import { prisma } from "@/lib/prisma";
import type { RequestType } from "@/generated/prisma/enums";

type CreateBookingInput = {
  type: RequestType;
  userEmail: string | null;
  userName: string | null;
  tourId: string | null;
  eventId: string | null;
  vehicleId: string | null;
  data: Record<string, unknown>;
};

function str(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

function strOrNull(v: unknown): string | null {
  if (v == null || v === "") return null;
  return String(v);
}

export async function createBooking(input: CreateBookingInput): Promise<{ id: string }> {
  const { type, tourId, eventId, vehicleId, data } = input;

  switch (type) {
    case "CAB_BOOKING": {
      const booking = await prisma.cabBooking.create({
        data: {
          status: "PENDING",
          serviceType: str(data.serviceType),
          vehicleType: str(data.vehicleType),
          pickupLocation: str(data.pickupLocation),
          dropoffLocation: str(data.dropoffLocation),
          pickupDate: str(data.pickupDate),
          pickupTime: str(data.pickupTime),
          passengers: str(data.passengers),
          luggage: strOrNull(data.luggage) ?? undefined,
          specialRequests: strOrNull(data.specialRequests) ?? undefined,
          name: str(data.name),
          phone: str(data.phone),
          email: str(data.email),
          preferredContact: strOrNull(data.preferredContact) ?? undefined,
        },
      });
      return { id: booking.id };
    }
    case "CAR_RENTAL": {
      const rental = data as Record<string, unknown>;
      const booking = await prisma.carRentalBooking.create({
        data: {
          status: "PENDING",
          vehicleId: strOrNull(rental.vehicleId) ?? undefined,
          startDate: str(rental.startDate ?? (rental.rentalPeriod as Record<string, unknown>)?.startDate),
          endDate: str(rental.endDate ?? (rental.rentalPeriod as Record<string, unknown>)?.endDate),
          rentalType: strOrNull(rental.rentalType) ?? undefined,
          name: str(rental.name ?? rental.driverName ?? (rental.contactInfo as Record<string, unknown>)?.name),
          email: str(rental.email ?? (rental.contactInfo as Record<string, unknown>)?.email),
          phone: str(rental.phone ?? (rental.contactInfo as Record<string, unknown>)?.phone),
          specialRequests: strOrNull(rental.specialRequests) ?? undefined,
          driverName: strOrNull(rental.driverName ?? (rental.driverDetails as Record<string, unknown>)?.name) ?? undefined,
          driverLicense: strOrNull(rental.driverLicense ?? (rental.driverDetails as Record<string, unknown>)?.licenseNumber) ?? undefined,
          driverLicenseExpiry: strOrNull(rental.driverLicenseExpiry) ?? undefined,
          pickupLocation: strOrNull(rental.pickupLocation) ?? undefined,
          dropoffLocation: strOrNull(rental.dropoffLocation) ?? undefined,
          passengers: typeof rental.passengers === "number" ? rental.passengers : undefined,
        },
      });
      return { id: booking.id };
    }
    case "TOUR_BOOKING": {
      const tourData = data as Record<string, unknown>;
      const preferredDates = tourData.preferredDates as Record<string, unknown> | undefined;
      const contactInfo = tourData.contactInfo as Record<string, unknown> | undefined;
      const booking = await prisma.tourBooking.create({
        data: {
          status: "PENDING",
          tourId: strOrNull(tourData.tourId) ?? undefined,
          numberOfPeople: Number(tourData.numberOfPeople) || 1,
          preferredStart: strOrNull(preferredDates?.startDate ?? tourData.preferredStart) ?? undefined,
          preferredEnd: strOrNull(preferredDates?.endDate ?? tourData.preferredEnd) ?? undefined,
          specialRequests: strOrNull(tourData.specialRequests) ?? undefined,
          name: str(contactInfo?.name ?? tourData.name),
          email: str(contactInfo?.email ?? tourData.email),
          phone: str(contactInfo?.phone ?? tourData.phone),
          country: strOrNull(contactInfo?.country ?? tourData.country) ?? undefined,
        },
      });
      return { id: booking.id };
    }
    case "EVENT_REGISTRATION": {
      const eventData = data as Record<string, unknown>;
      const eventContact = eventData.contactInfo as Record<string, unknown> | undefined;
      const booking = await prisma.eventRegistration.create({
        data: {
          status: "PENDING",
          eventId: strOrNull(eventData.eventId) ?? undefined,
          numberOfParticipants: Number(eventData.numberOfParticipants) || 1,
          name: str(eventContact?.name ?? eventData.name),
          email: str(eventContact?.email ?? eventData.email),
          phone: str(eventContact?.phone ?? eventData.phone),
          organization: strOrNull(eventContact?.organization ?? eventData.organization) ?? undefined,
          specialRequests: strOrNull(eventData.specialRequests) ?? undefined,
          dietaryRestrictions: strOrNull(eventData.dietaryRestrictions) ?? undefined,
        },
      });
      return { id: booking.id };
    }
    case "CONTACT":
    case "INQUIRY": {
      const inquiry = await prisma.contactInquiry.create({
        data: {
          name: str(data.name),
          email: str(data.email),
          phone: strOrNull(data.phone) ?? undefined,
          subject: str(data.subject ?? "Inquiry"),
          message: str(data.message),
          serviceType: strOrNull(data.serviceType ?? data.service) ?? undefined,
        },
      });
      return { id: inquiry.id };
    }
    case "AIR_TRAVEL": {
      const airData = data as Record<string, unknown>;
      const airContact = airData.contactInfo as Record<string, unknown> | undefined;
      const booking = await prisma.airTravelRequest.create({
        data: {
          tripType: strOrNull(airData.tripType) ?? undefined,
          origin: strOrNull(airData.origin) ?? undefined,
          destination: strOrNull(airData.destination) ?? undefined,
          departureDate: strOrNull(airData.departureDate) ?? undefined,
          departureTime: strOrNull(airData.departureTime) ?? undefined,
          returnDate: strOrNull(airData.returnDate) ?? undefined,
          returnTime: strOrNull(airData.returnTime) ?? undefined,
          travelClass: strOrNull(airData.travelClass) ?? undefined,
          name: str(airContact?.name ?? airData.name),
          email: str(airContact?.email ?? airData.email),
          phone: str(airContact?.phone ?? airData.phone),
          preferences: strOrNull(airData.preferences) ?? undefined,
        },
      });
      return { id: booking.id };
    }
    case "EVENTS_NEWSLETTER": {
      const email = str(data.email);
      if (email) {
        const sub = await prisma.newsletterSubscriber.upsert({
          where: { email },
          create: {
            email,
            firstName: strOrNull(data.firstName) ?? undefined,
            source: "events-newsletter",
            preferences: data.preferences as object ?? undefined,
          },
          update: {},
        });
        return { id: sub.id };
      }
      return { id: "" };
    }
    default:
      return { id: "" };
  }
}
