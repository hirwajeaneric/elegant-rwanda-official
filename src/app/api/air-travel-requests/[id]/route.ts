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
    const request = await prisma.airTravelRequest.findUnique({ where: { id } });
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("Get air travel request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
