import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export type DateRange = "daily" | "weekly" | "monthly" | "yearly";

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function getRangeBounds(range: DateRange): { start: Date; end: Date } {
  const end = new Date();
  let start: Date;
  switch (range) {
    case "daily": {
      start = new Date(end);
      start.setDate(start.getDate() - 1);
      start = startOfDay(start);
      break;
    }
    case "weekly": {
      start = new Date(end);
      start.setDate(start.getDate() - 7);
      start = startOfDay(start);
      break;
    }
    case "monthly": {
      start = new Date(end);
      start.setMonth(start.getMonth() - 1);
      start = startOfDay(start);
      break;
    }
    case "yearly": {
      start = new Date(end);
      start.setFullYear(start.getFullYear() - 1);
      start = startOfDay(start);
      break;
    }
    default: {
      start = new Date(end);
      start.setMonth(start.getMonth() - 1);
      start = startOfDay(start);
    }
  }
  return { start, end };
}

/**
 * GET /api/admin/dashboard-stats?range=daily|weekly|monthly|yearly
 * Returns content counts, period counts (bookings/inquiries in range), time series, and recent items.
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, { requireCSRF: false });
    if (!authResult.success) return authResult.response;

    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") as DateRange) || "monthly";
    const { start, end } = getRangeBounds(range);

    const [
      toursCount,
      toursTotal,
      vehiclesCount,
      vehiclesTotal,
      eventsCount,
      eventsTotal,
      blogsCount,
      blogsTotal,
      testimonialsCount,
      testimonialsTotal,
      teamCount,
      teamTotal,
      faqsCount,
      faqsTotal,
      imagesCount,
      imagesTotal,
      tourBookingsInRange,
      carRentalBookingsInRange,
      cabBookingsInRange,
      eventRegsInRange,
      airTravelInRange,
      contactInquiriesInRange,
      subscribersInRange,
      tourBookingsRecent,
      carRentalBookingsRecent,
      cabBookingsRecent,
      eventRegsRecent,
      contactInquiriesRecent,
      tourBookingsByPeriod,
      contactInquiriesByPeriod,
    ] = await Promise.all([
      prisma.tour.count({ where: { status: "active" } }),
      prisma.tour.count(),
      prisma.vehicle.count({ where: { status: "available" } }),
      prisma.vehicle.count(),
      prisma.event.count({ where: { active: true } }),
      prisma.event.count(),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
      prisma.blog.count(),
      prisma.testimonial.count({ where: { active: true } }),
      prisma.testimonial.count(),
      prisma.team.count({ where: { status: "ACTIVE" } }),
      prisma.team.count(),
      prisma.fAQ.count({ where: { active: true } }),
      prisma.fAQ.count(),
      prisma.image.count({ where: { active: true } }),
      prisma.image.count(),
      prisma.tourBooking.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      prisma.carRentalBooking.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      prisma.cabBooking.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      prisma.eventRegistration.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      prisma.airTravelRequest.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      prisma.contactInquiry.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      prisma.newsletterSubscriber.count({
        where: { subscribedAt: { gte: start, lte: end } },
      }),
      prisma.tourBooking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          numberOfPeople: true,
        },
      }),
      prisma.carRentalBooking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          startDate: true,
          endDate: true,
        },
      }),
      prisma.cabBooking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          pickupLocation: true,
        },
      }),
      prisma.eventRegistration.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          numberOfParticipants: true,
        },
      }),
      prisma.contactInquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          subject: true,
          createdAt: true,
        },
      }),
      getBookingsByPeriod(start, end, range),
      getInquiriesByPeriod(start, end, range),
    ]);

    const bookingsInRange =
      tourBookingsInRange +
      carRentalBookingsInRange +
      cabBookingsInRange +
      eventRegsInRange;

    return NextResponse.json({
      success: true,
      range,
      start: start.toISOString(),
      end: end.toISOString(),
      content: {
        tours: { active: toursCount, total: toursTotal },
        vehicles: { active: vehiclesCount, total: vehiclesTotal },
        events: { active: eventsCount, total: eventsTotal },
        blogs: { active: blogsCount, total: blogsTotal },
        testimonials: { active: testimonialsCount, total: testimonialsTotal },
        team: { active: teamCount, total: teamTotal },
        faqs: { active: faqsCount, total: faqsTotal },
        images: { active: imagesCount, total: imagesTotal },
      },
      period: {
        tourBookings: tourBookingsInRange,
        carRentalBookings: carRentalBookingsInRange,
        cabBookings: cabBookingsInRange,
        eventRegistrations: eventRegsInRange,
        airTravelRequests: airTravelInRange,
        contactInquiries: contactInquiriesInRange,
        subscribers: subscribersInRange,
        totalBookings: bookingsInRange,
      },
      chart: {
        bookingsByPeriod: tourBookingsByPeriod,
        inquiriesByPeriod: contactInquiriesByPeriod,
      },
      recent: {
        tourBookings: tourBookingsRecent,
        carRentalBookings: carRentalBookingsRecent,
        cabBookings: cabBookingsRecent,
        eventRegistrations: eventRegsRecent,
        contactInquiries: contactInquiriesRecent,
      },
    });
  } catch (error) {
    console.error("GET dashboard-stats error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getBookingsByPeriod(
  start: Date,
  end: Date,
  range: DateRange
): Promise<{ label: string; count: number }[]> {
  const [tourBookings, carRentals, cabBookings, eventRegs] = await Promise.all([
    prisma.tourBooking.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: { createdAt: true },
    }),
    prisma.carRentalBooking.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: { createdAt: true },
    }),
    prisma.cabBooking.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: { createdAt: true },
    }),
    prisma.eventRegistration.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: { createdAt: true },
    }),
  ]);

  const byDay = new Map<string, number>();
  const add = (d: Date) => {
    const key = d.toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  };
  tourBookings.forEach((b) => add(b.createdAt));
  carRentals.forEach((b) => add(b.createdAt));
  cabBookings.forEach((b) => add(b.createdAt));
  eventRegs.forEach((b) => add(b.createdAt));

  if (range === "yearly") {
    const byMonth = new Map<string, number>();
    let curr = new Date(start);
    while (curr <= end) {
      const key = curr.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      const dayKey = curr.toISOString().slice(0, 10);
      byMonth.set(key, (byMonth.get(key) ?? 0) + (byDay.get(dayKey) ?? 0));
      curr.setMonth(curr.getMonth() + 1);
    }
    return Array.from(byMonth.entries()).map(([label, count]) => ({ label, count }));
  }

  const result: { label: string; count: number }[] = [];
  const curr = new Date(start);
  const maxPoints = range === "daily" ? 1 : range === "weekly" ? 7 : 31;
  let points = 0;
  while (curr <= end && points < maxPoints) {
    const key = curr.toISOString().slice(0, 10);
    result.push({
      label: curr.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      count: byDay.get(key) ?? 0,
    });
    if (range === "daily") break;
    curr.setDate(curr.getDate() + 1);
    points++;
  }
  return result.length ? result : [{ label: start.toISOString().slice(0, 10), count: 0 }];
}

async function getInquiriesByPeriod(
  start: Date,
  end: Date,
  range: DateRange
): Promise<{ label: string; count: number }[]> {
  const inquiries = await prisma.contactInquiry.findMany({
    where: { createdAt: { gte: start, lte: end } },
    select: { createdAt: true },
  });

  const byDay = new Map<string, number>();
  inquiries.forEach((i) => {
    const key = i.createdAt.toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  });

  if (range === "yearly") {
    const byMonth = new Map<string, number>();
    let curr = new Date(start);
    while (curr <= end) {
      const key = curr.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      const dayKey = curr.toISOString().slice(0, 10);
      byMonth.set(key, (byMonth.get(key) ?? 0) + (byDay.get(dayKey) ?? 0));
      curr.setMonth(curr.getMonth() + 1);
    }
    return Array.from(byMonth.entries()).map(([label, count]) => ({ label, count }));
  }

  const result: { label: string; count: number }[] = [];
  const curr = new Date(start);
  const maxPoints = range === "daily" ? 1 : range === "weekly" ? 7 : 31;
  let points = 0;
  while (curr <= end && points < maxPoints) {
    const key = curr.toISOString().slice(0, 10);
    result.push({
      label: curr.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      count: byDay.get(key) ?? 0,
    });
    if (range === "daily") break;
    curr.setDate(curr.getDate() + 1);
    points++;
  }
  return result.length ? result : [{ label: start.toISOString().slice(0, 10), count: 0 }];
}
