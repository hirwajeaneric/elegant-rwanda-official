import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const tourId = searchParams.get("tourId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (tourId) where.tourId = tourId;

    const [items, total] = await Promise.all([
      prisma.tourBooking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { tour: { select: { id: true, title: true, slug: true } } },
      }),
      prisma.tourBooking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      bookings: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("List tour bookings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
