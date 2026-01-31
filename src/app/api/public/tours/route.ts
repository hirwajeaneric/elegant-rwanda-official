import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/tours - Public list of active tours (no auth)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: Record<string, unknown> = {
      status: "active",
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const tours = await prisma.tour.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { category: { select: { id: true, name: true, slug: true, color: true } } },
    });

    return NextResponse.json({
      success: true,
      tours,
    });
  } catch (error) {
    console.error("List public tours error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
