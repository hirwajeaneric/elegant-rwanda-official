import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/images - Public endpoint for featured, active images (no auth)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "24") || 24, 48);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      active: true,
      featured: true,
    };

    const [images, total] = await Promise.all([
      prisma.image.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          url: true,
          title: true,
          alt: true,
          category: true,
        },
      }),
      prisma.image.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("List public images error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
