import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/team - Public endpoint to list active team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: Record<string, unknown> = {
      status: "ACTIVE", // Only return active team members
    };

    const teams = await prisma.team.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      teams,
    });
  } catch (error) {
    console.error("List public team error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
