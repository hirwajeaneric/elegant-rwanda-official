import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

/**
 * GET /api/admin/about-content - Admin: get About page content for editing
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, { requireCSRF: false });
    if (!authResult.success) return authResult.response;

    const row = await prisma.aboutPageContent.findUnique({
      where: { id: "default" },
    });

    const historicalBackground = (row?.historicalBackground as string) ?? "";
    const quickFacts = Array.isArray(row?.quickFacts)
      ? (row.quickFacts as { label: string; value: string }[])
      : [];
    const missionValues = Array.isArray(row?.missionValues)
      ? (row.missionValues as { title: string; description: string }[])
      : [];

    return NextResponse.json({
      success: true,
      about: {
        historicalBackground,
        quickFacts,
        missionValues,
      },
    });
  } catch (error) {
    console.error("GET admin about-content error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/about-content - Admin: update About page content
 */
export async function PATCH(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) return authResult.response;

    const body = await request.json();
    const {
      historicalBackground,
      quickFacts,
      missionValues,
    } = body as {
      historicalBackground?: string;
      quickFacts?: { label: string; value: string }[];
      missionValues?: { title: string; description: string }[];
    };

    const updateData: {
      historicalBackground?: string;
      quickFacts?: object;
      missionValues?: object;
    } = {};
    if (typeof historicalBackground === "string") {
      updateData.historicalBackground = historicalBackground;
    }
    if (Array.isArray(quickFacts)) {
      updateData.quickFacts = quickFacts as object;
    }
    if (Array.isArray(missionValues)) {
      updateData.missionValues = missionValues as object;
    }

    const row = await prisma.aboutPageContent.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        historicalBackground: updateData.historicalBackground ?? "",
        quickFacts: (updateData.quickFacts as object) ?? [],
        missionValues: (updateData.missionValues as object) ?? [],
      },
      update: updateData,
    });

    const about = {
      historicalBackground: (row.historicalBackground as string) ?? "",
      quickFacts: Array.isArray(row.quickFacts) ? row.quickFacts : [],
      missionValues: Array.isArray(row.missionValues) ? row.missionValues : [],
    };

    return NextResponse.json({ success: true, about });
  } catch (error) {
    console.error("PATCH admin about-content error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
