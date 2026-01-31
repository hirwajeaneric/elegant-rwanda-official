import { NextResponse } from "next/server";
import { sendFormEmails } from "@/lib/email";
import { createBooking } from "@/lib/bookings/create-booking";
import { RequestType } from "@/generated/prisma/enums";

const formTypeToEnum: Record<string, RequestType> = {
  "air-travel": "AIR_TRAVEL",
  "cab-booking": "CAB_BOOKING",
  "car-rental": "CAR_RENTAL",
  "tour-booking": "TOUR_BOOKING",
  contact: "CONTACT",
  inquiry: "INQUIRY",
  "event-registration": "EVENT_REGISTRATION",
  "events-newsletter": "EVENTS_NEWSLETTER",
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const formType = body.formType as string | undefined;
  const data = body.data;
  const userEmail = body.userEmail;
  const userName = body.userName;
  const tourId = body.tourId;
  const eventId = body.eventId;
  const vehicleId = body.vehicleId;

  if (!formType || !data || typeof data !== "object") {
    return NextResponse.json(
      { error: "Invalid payload. Provide formType and data." },
      { status: 400 },
    );
  }

  const type = formTypeToEnum[formType as keyof typeof formTypeToEnum];
  if (!type) {
    return NextResponse.json(
      { error: "Unknown form type." },
      { status: 400 },
    );
  }

  // Save to database: typed booking record only (per service)
  try {
    await createBooking({
      type,
      userEmail: (userEmail as string) || null,
      userName: (userName as string) || null,
      tourId: (tourId as string) || null,
      eventId: (eventId as string) || null,
      vehicleId: (vehicleId as string) || null,
      data: data as Record<string, unknown>,
    });
  } catch (dbError) {
    console.error("Failed to save request to database", dbError);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 },
    );
  }

  // Send emails in background; do not fail the request if email fails
  try {
    await sendFormEmails({
      formType,
      data: data as Record<string, unknown>,
      userEmail: (userEmail as string) ?? undefined,
      userName: (userName as string) ?? undefined,
    });
  } catch (emailError) {
    console.error("Email sending failed (request was saved)", emailError);
    // Still return success — request is stored
  }

  return NextResponse.json({ ok: true });
}
