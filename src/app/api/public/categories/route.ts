import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/categories - Public endpoint to list active categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {
      active: true, // Only return active categories
    };

    if (type) {
      // Filter by category type
      where.type = {
        has: type.toUpperCase(),
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { createdAt: "desc" }, // Sort by creation date instead of order
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        type: true,
        color: true,
        icon: true,
        // order field excluded from public API response
      },
    });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("List public categories error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
