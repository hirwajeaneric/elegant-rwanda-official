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
      category,
      featured,
      availableDates,
      price,
      status,
      capacity,
      guide,
      metaTitle,
      metaDescription,
    } = body;

    if (!title || !slug || !description || !duration || !location || price == null || capacity == null) {
      return NextResponse.json(
        { error: "Title, slug, description, duration, location, price, and capacity are required" },
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
        category: category || "Wildlife",
        featured: featured ?? false,
        availableDates: Array.isArray(availableDates) ? availableDates : [],
        price: Number(price),
        status: status || "draft",
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
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
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

    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.tour.count({ where }),
    ]);

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
