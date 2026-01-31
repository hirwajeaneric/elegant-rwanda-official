"use client";

import { RequestDetailsDisplay } from "@/components/dashboard/RequestDetailsDisplay";
import { CabBookingDetail } from "@/components/dashboard/bookings/CabBookingDetail";
import { CarRentalBookingDetail } from "@/components/dashboard/bookings/CarRentalBookingDetail";
import { ContactInquiryDetail } from "@/components/dashboard/bookings/ContactInquiryDetail";

type Request = {
  id: string;
  type: string;
  status: string;
  data: Record<string, unknown> | null;
  userEmail: string | null;
  userName: string | null;
  cabBooking?: Record<string, unknown> | null;
  tourBooking?: Record<string, unknown> | null;
  carRentalBooking?: Record<string, unknown> | null;
  eventRegistration?: Record<string, unknown> | null;
  contactInquiry?: Record<string, unknown> | null;
  airTravelRequest?: Record<string, unknown> | null;
};

export function BookingDetailByType({ request }: { request: Request }) {
  // Prefer typed booking record when present; fall back to legacy JSON display
  if (request.cabBooking) {
    return <CabBookingDetail booking={request.cabBooking as Parameters<typeof CabBookingDetail>[0]["booking"]} />;
  }
  if (request.carRentalBooking) {
    return <CarRentalBookingDetail booking={request.carRentalBooking as Parameters<typeof CarRentalBookingDetail>[0]["booking"]} />;
  }
  if (request.contactInquiry) {
    return <ContactInquiryDetail booking={request.contactInquiry as Parameters<typeof ContactInquiryDetail>[0]["booking"]} />;
  }
  // Tour, Event, Air Travel: use structured display from request.data (legacy or from form)
  if (request.tourBooking || request.eventRegistration || request.airTravelRequest) {
    return (
      <RequestDetailsDisplay
        type={request.type}
        data={request.data ?? {}}
      />
    );
  }
  return (
    <RequestDetailsDisplay
      type={request.type}
      data={request.data ?? {}}
    />
  );
}
