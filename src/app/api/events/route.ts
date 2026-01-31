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

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) return rateLimitResult.response!;

    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const body = await request.json();
    const {
      title,
      slug,
      description,
      metaTitle,
      metaDescription,
      date,
      endDate,
      location,
      maxParticipants,
      currentParticipants,
      categoryId,
      highlights,
      activities,
      images,
      featured,
      registrationDeadline,
      status,
      time,
      price,
      active,
    } = body;

    if (!title || !slug || !description || !date || !location || maxParticipants == null || !registrationDeadline || price == null) {
      return NextResponse.json(
        { error: "Title, slug, description, date, location, maxParticipants, registrationDeadline, and price are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Event with this slug already exists" }, { status: 409 });
    }

    if (categoryId) {
      const cat = await prisma.category.findFirst({
        where: { id: categoryId, type: { has: "EVENT" } },
      });
      if (!cat) {
        return NextResponse.json(
          { error: "Invalid event category. Category must have type EVENT." },
          { status: 400 }
        );
      }
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        location,
        maxParticipants: Number(maxParticipants),
        currentParticipants: currentParticipants != null ? Number(currentParticipants) : 0,
        categoryId: categoryId || null,
        highlights: Array.isArray(highlights) ? highlights : [],
        activities: Array.isArray(activities) ? activities : [],
        images: Array.isArray(images) ? images : [],
        featured: featured ?? false,
        registrationDeadline: new Date(registrationDeadline),
        status: toEventStatus(status || "Open"),
        time: time || "08:00 AM",
        price: Number(price),
        active: active ?? true,
      },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/events - List events (admin)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = STATUS_MAP[status] ?? status;
    const categoryIdParam = searchParams.get("categoryId");
    if (categoryIdParam) where.categoryId = categoryIdParam;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: { category: { select: { id: true, name: true, slug: true } } },
      }),
      prisma.event.count({ where }),
    ]);

    const mapEventForResponse = (e: { category?: { id: string; name: string; slug: string } | null; status: string; date: Date; endDate: Date | null; registrationDeadline: Date }) => ({
      ...e,
      category: e.category?.name ?? null,
      categoryId: e.category?.id ?? null,
      status: e.status === "Filling_Fast" ? "Filling Fast" : e.status,
      date: e.date.toISOString().slice(0, 10),
      endDate: e.endDate ? e.endDate.toISOString().slice(0, 10) : null,
      registrationDeadline: e.registrationDeadline.toISOString().slice(0, 10),
    });

    return NextResponse.json({
      success: true,
      events: events.map(mapEventForResponse),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("List events error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
