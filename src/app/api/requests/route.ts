import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

// GET /api/requests - List bookings/requests (admin)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const tourId = searchParams.get("tourId");
    const eventId = searchParams.get("eventId");
    const vehicleId = searchParams.get("vehicleId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (tourId) where.tourId = tourId;
    if (eventId) where.eventId = eventId;
    if (vehicleId) where.vehicleId = vehicleId;

    const [requests, total] = await Promise.all([
      prisma.request.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          tour: { select: { id: true, title: true, slug: true } },
          event: { select: { id: true, title: true, slug: true } },
          vehicle: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.request.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("List requests error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
