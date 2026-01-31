import { NextResponse } from "next/server";
import { sendFormEmails } from "@/lib/email";
import { prisma } from "@/lib/prisma";
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
  try {
    const body = await request.json();
    const { formType, data, userEmail, userName, tourId, eventId, vehicleId } = body ?? {};

    if (!formType || !data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid payload. Provide formType and data." },
        { status: 400 },
      );
    }

    // Save to database
    try {
      const type = formTypeToEnum[formType];
      if (type) {
        await prisma.request.create({
          data: {
            type,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: data as any, // Json type
            userEmail,
            userName,
            tourId: tourId || null,
            eventId: eventId || null,
            vehicleId: vehicleId || null,
            status: "PENDING",
          },
        });
      } else {
        console.warn(`Unknown form type for DB storage: ${formType}`);
      }
    } catch (dbError) {
      // Log but don't fail the request yet, try sending email still?
      // Or fail? The user asked for "backup", so maybe if DB fails we should still try email.
      // But if DB is the *backup*, maybe we want to ensure it works?
      // "This will help to ensure that there is a way to get a backup of request in case emails are not working."
      // So DB is critical. But if DB fails, maybe email still works.
      console.error("Failed to save request to database", dbError);
    }

    await sendFormEmails({
      formType,
      data,
      userEmail,
      userName,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email sending failed", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
