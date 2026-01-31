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
    const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Get contact inquiry error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
