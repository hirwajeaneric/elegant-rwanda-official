import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/events/[slug] - Get event by slug (no auth)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const event = await prisma.event.findUnique({
      where: { slug, active: true },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const mapEvent = (e: typeof event) => ({
      ...e,
      category: e.category?.name ?? null,
      status: e.status === "Filling_Fast" ? "Filling Fast" : e.status,
      date: e.date.toISOString().slice(0, 10),
      endDate: e.endDate ? e.endDate.toISOString().slice(0, 10) : null,
      registrationDeadline: e.registrationDeadline.toISOString().slice(0, 10),
    });

    return NextResponse.json({ success: true, event: mapEvent(event) });
  } catch (error) {
    console.error("Get public event error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
