import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// PATCH /api/faqs/[id]/reorder - Move FAQ up or down in display order
export async function PATCH(
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
    const direction = body.direction as "up" | "down";

    if (direction !== "up" && direction !== "down") {
      return NextResponse.json(
        { error: "direction must be 'up' or 'down'" },
        { status: 400 }
      );
    }

    const current = await prisma.fAQ.findUnique({ where: { id } });
    if (!current) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    const swapWith = await prisma.fAQ.findFirst({
      where: {
        order: direction === "up" ? current.order - 1 : current.order + 1,
      },
    });

    if (!swapWith) {
      return NextResponse.json(
        { success: true, message: "Already at boundary", faq: current }
      );
    }

    await prisma.$transaction([
      prisma.fAQ.update({
        where: { id },
        data: { order: swapWith.order, updatedBy: authResult.auth.userId },
      }),
      prisma.fAQ.update({
        where: { id: swapWith.id },
        data: { order: current.order, updatedBy: authResult.auth.userId },
      }),
    ]);

    const faq = await prisma.fAQ.findUnique({
      where: { id },
      include: { category: true },
    });
    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error("Reorder FAQ error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
