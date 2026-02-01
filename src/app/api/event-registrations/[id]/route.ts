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
    const newStatus = allowed.includes(body.status) ? body.status : undefined;
    if (!newStatus) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const existing = await prisma.eventRegistration.findUnique({
      where: { id },
      select: { status: true, eventId: true, numberOfParticipants: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const wasCompleted = existing.status === "COMPLETED";
    const isNowCompleted = newStatus === "COMPLETED";
    const delta =
      isNowCompleted && !wasCompleted
        ? existing.numberOfParticipants
        : !isNowCompleted && wasCompleted
          ? -existing.numberOfParticipants
          : 0;

    const booking = await prisma.$transaction(async (tx) => {
      const updated = await tx.eventRegistration.update({
        where: { id },
        data: { status: newStatus },
        include: { event: { select: { id: true, title: true, slug: true } } },
      });

      if (existing.eventId && delta !== 0) {
        await tx.event.update({
          where: { id: existing.eventId },
          data: {
            currentParticipants: { increment: delta },
          },
        });
      }

      return updated;
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Update event registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
