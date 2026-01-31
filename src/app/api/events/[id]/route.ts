import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

const STATUS_MAP: Record<string, "Open" | "Filling_Fast" | "Waitlist" | "Closed"> = {
  Open: "Open",
  "Filling Fast": "Filling_Fast",
  Waitlist: "Waitlist",
  Closed: "Closed",
};

function toEventStatus(s: string) {
  return STATUS_MAP[s] ?? "Open";
}

function mapEvent(e: { categoryId?: string | null; category?: { id: string; name: string; slug: string } | null; status: string; date: Date; endDate: Date | null; registrationDeadline: Date }) {
  return {
    ...e,
    category: e.category?.name ?? null,
    categoryId: e.category?.id ?? e.categoryId ?? null,
    status: e.status === "Filling_Fast" ? "Filling Fast" : e.status,
    date: e.date.toISOString().slice(0, 10),
    endDate: e.endDate ? e.endDate.toISOString().slice(0, 10) : null,
    registrationDeadline: e.registrationDeadline.toISOString().slice(0, 10),
  };
}

// GET /api/events/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, event: mapEvent(event) });
  } catch (error) {
    console.error("Get event error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/events/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) return rateLimitResult.response!;

    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const existing = await prisma.event.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await request.json();
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.event.findUnique({ where: { slug: body.slug } });
      if (slugExists) {
        return NextResponse.json({ error: "Event with this slug already exists" }, { status: 409 });
      }
    }

    if (body.categoryId !== undefined && body.categoryId !== null) {
      const cat = await prisma.category.findFirst({
        where: { id: body.categoryId, type: { has: "EVENT" } },
      });
      if (!cat) {
        return NextResponse.json(
          { error: "Invalid event category. Category must have type EVENT." },
          { status: 400 }
        );
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        slug: body.slug ?? existing.slug,
        description: body.description ?? existing.description,
        metaTitle: body.metaTitle !== undefined ? body.metaTitle : existing.metaTitle,
        metaDescription: body.metaDescription !== undefined ? body.metaDescription : existing.metaDescription,
        date: body.date ? new Date(body.date) : existing.date,
        endDate: body.endDate !== undefined ? (body.endDate ? new Date(body.endDate) : null) : existing.endDate,
        location: body.location ?? existing.location,
        maxParticipants: body.maxParticipants !== undefined ? Number(body.maxParticipants) : existing.maxParticipants,
        currentParticipants: body.currentParticipants !== undefined ? Number(body.currentParticipants) : existing.currentParticipants,
        categoryId: body.categoryId !== undefined ? body.categoryId : existing.categoryId,
        highlights: body.highlights !== undefined ? body.highlights : existing.highlights,
        activities: body.activities !== undefined ? body.activities : existing.activities,
        images: body.images !== undefined ? body.images : existing.images,
        featured: body.featured !== undefined ? body.featured : existing.featured,
        registrationDeadline: body.registrationDeadline ? new Date(body.registrationDeadline) : existing.registrationDeadline,
        status: body.status ? toEventStatus(body.status) : existing.status,
        time: body.time ?? existing.time,
        price: body.price !== undefined ? Number(body.price) : existing.price,
        active: body.active !== undefined ? body.active : existing.active,
      },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json({ success: true, event: mapEvent(event) });
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) return rateLimitResult.response!;

    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
