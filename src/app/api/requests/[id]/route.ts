import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// GET /api/requests/[id] - Get single booking/request (admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const req = await prisma.request.findUnique({
      where: { id },
      include: {
        tour: true,
        event: true,
        vehicle: true,
      },
    });

    if (!req) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, request: req });
  } catch (error) {
    console.error("Get request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/requests/[id] - Update status (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) return rateLimitResult.response!;

    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const existing = await prisma.request.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "ARCHIVED"];
    const status = body.status && allowedStatuses.includes(body.status) ? body.status : existing.status;

    const req = await prisma.request.update({
      where: { id },
      data: { status },
      include: {
        tour: true,
        event: true,
        vehicle: true,
      },
    });

    return NextResponse.json({ success: true, request: req });
  } catch (error) {
    console.error("Update request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
