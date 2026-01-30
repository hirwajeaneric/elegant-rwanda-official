import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// GET /api/tours/[id] - Get tour by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const tour = await prisma.tour.findUnique({
      where: { id },
    });

    if (!tour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, tour });
  } catch (error) {
    console.error("Get tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/tours/[id] - Update tour
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;
    const body = await request.json();

    const existingTour = await prisma.tour.findUnique({
      where: { id },
    });

    if (!existingTour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    if (body.slug && body.slug !== existingTour.slug) {
      const slugExists = await prisma.tour.findUnique({
        where: { slug: body.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "Tour with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const tour = await prisma.tour.update({
      where: { id },
      data: {
        title: body.title ?? existingTour.title,
        slug: body.slug ?? existingTour.slug,
        description: body.description ?? existingTour.description,
        duration: body.duration ?? existingTour.duration,
        location: body.location ?? existingTour.location,
        difficulty: body.difficulty ?? existingTour.difficulty,
        maxGroupSize: body.maxGroupSize !== undefined ? Number(body.maxGroupSize) : existingTour.maxGroupSize,
        highlights: body.highlights !== undefined ? body.highlights : existingTour.highlights,
        itinerary: body.itinerary !== undefined ? body.itinerary : existingTour.itinerary,
        inclusions: body.inclusions !== undefined ? body.inclusions : existingTour.inclusions,
        exclusions: body.exclusions !== undefined ? body.exclusions : existingTour.exclusions,
        images: body.images !== undefined ? body.images : existingTour.images,
        category: body.category ?? existingTour.category,
        featured: body.featured !== undefined ? body.featured : existingTour.featured,
        availableDates: body.availableDates !== undefined ? body.availableDates : existingTour.availableDates,
        price: body.price !== undefined ? Number(body.price) : existingTour.price,
        status: body.status ?? existingTour.status,
        capacity: body.capacity !== undefined ? Number(body.capacity) : existingTour.capacity,
        guide: body.guide !== undefined ? body.guide : existingTour.guide,
        metaTitle: body.metaTitle !== undefined ? body.metaTitle : existingTour.metaTitle,
        metaDescription: body.metaDescription !== undefined ? body.metaDescription : existingTour.metaDescription,
      },
    });

    return NextResponse.json({ success: true, tour });
  } catch (error) {
    console.error("Update tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/tours/[id] - Delete tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const existingTour = await prisma.tour.findUnique({
      where: { id },
    });

    if (!existingTour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    console.error("Delete tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
