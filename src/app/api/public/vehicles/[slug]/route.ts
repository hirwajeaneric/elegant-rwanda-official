import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/vehicles/[slug] - Get vehicle by slug (public, no auth)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { slug },
    });

    if (!vehicle || !vehicle.available || vehicle.status !== "available") {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vehicle });
  } catch (error) {
    console.error("Get public vehicle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
