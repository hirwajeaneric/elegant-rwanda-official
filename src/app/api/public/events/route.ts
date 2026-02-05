import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/events - List active events (no auth)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await prisma.event.findMany({
      where: {
        active: true,
        // Only include events where the date is today or in the future
        date: {
          gte: today,
        },
      },
      take: limit,
      orderBy: { date: "asc" },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    const mapEvent = (e: {
      category?: { id: string; name: string; slug: string } | null;
      status: string;
      date: Date;
      endDate: Date | null;
      registrationDeadline: Date;
    }) => ({
      ...e,
      category: e.category?.name ?? null,
      status: e.status === "Filling_Fast" ? "Filling Fast" : e.status,
      date: e.date.toISOString().slice(0, 10),
      endDate: e.endDate ? e.endDate.toISOString().slice(0, 10) : null,
      registrationDeadline: e.registrationDeadline.toISOString().slice(0, 10),
    });

    return NextResponse.json({ success: true, events: events.map(mapEvent) });
  } catch (error) {
    console.error("List public events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
