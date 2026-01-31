import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/tours/[slug] - Get tour by slug (public, no auth)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const tour = await prisma.tour.findUnique({
      where: { slug },
      include: { category: { select: { id: true, name: true, slug: true, color: true } } },
    });

    if (!tour || tour.status !== "active") {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, tour });
  } catch (error) {
    console.error("Get public tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
