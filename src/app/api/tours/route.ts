import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// POST /api/tours - Create new tour
export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      duration,
      location,
      difficulty,
      maxGroupSize,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      images,
      categoryId,
      featured,
      availableDates,
      price,
      status,
      capacity,
      guide,
      metaTitle,
      metaDescription,
    } = body;

    if (!title || !slug || !description || !duration || !location || capacity == null) {
      return NextResponse.json(
        { error: "Title, slug, description, duration, location, and capacity are required" },
        { status: 400 }
      );
    }

    const existingTour = await prisma.tour.findUnique({
      where: { slug },
    });

    if (existingTour) {
      return NextResponse.json(
        { error: "Tour with this slug already exists" },
        { status: 409 }
      );
    }

    const allowedStatuses = ["active", "draft"];
    const tourStatus = status && allowedStatuses.includes(status) ? status : "draft";

    if (categoryId) {
      const cat = await prisma.category.findFirst({
        where: { id: categoryId, type: { has: "TOUR" } },
      });
      if (!cat) {
        return NextResponse.json(
          { error: "Invalid tour category. Category must have type TOUR." },
          { status: 400 }
        );
      }
    }

    const tour = await prisma.tour.create({
      data: {
        title,
        slug,
        description,
        duration,
        location,
        difficulty: difficulty || "Moderate",
        maxGroupSize: maxGroupSize != null ? Number(maxGroupSize) : 8,
        highlights: Array.isArray(highlights) ? highlights : [],
        itinerary: itinerary ?? [],
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        exclusions: Array.isArray(exclusions) ? exclusions : [],
        images: Array.isArray(images) ? images : [],
        categoryId: categoryId || null,
        featured: featured ?? false,
        availableDates: Array.isArray(availableDates) ? availableDates : [],
        price: price != null && price !== "" ? Number(price) : null,
        status: tourStatus,
        capacity: Number(capacity),
        guide: guide || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      },
    });

    return NextResponse.json({ success: true, tour }, { status: 201 });
  } catch (error) {
    console.error("Create tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/tours - List tours (admin)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (featured !== null) {
      where.featured = featured === "true";
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const [toursRaw, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          _count: { select: { requests: true } },
        },
      }),
      prisma.tour.count({ where }),
    ]);

    // Use actual booking count from Request table (tour bookings), not the denormalized Tour.bookings field
    const tours = toursRaw.map(({ _count, ...t }) => ({
      ...t,
      bookings: _count.requests,
    }));

    return NextResponse.json({
      success: true,
      tours,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("List tours error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
