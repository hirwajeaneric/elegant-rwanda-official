import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        skip,
        take: limit,
        orderBy: { subscribedAt: "desc" },
      }),
      prisma.newsletterSubscriber.count(),
    ]);

    return NextResponse.json({
      success: true,
      subscribers: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("List subscribers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
