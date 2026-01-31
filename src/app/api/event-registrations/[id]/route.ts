import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(_request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const booking = await prisma.eventRegistration.findUnique({
      where: { id },
      include: { event: { select: { id: true, title: true, slug: true } } },
    });
    if (!booking) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Get event registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const { id } = await params;
    const body = await request.json();
    const allowed = ["PENDING", "IN_PROGRESS", "COMPLETED", "ARCHIVED"];
    const status = allowed.includes(body.status) ? body.status : undefined;
    if (!status) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.eventRegistration.update({
      where: { id },
      data: { status },
      include: { event: { select: { id: true, title: true, slug: true } } },
    });
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Update event registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
