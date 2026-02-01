import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_HISTORICAL = "";
const DEFAULT_QUICK_FACTS: { label: string; value: string }[] = [
  { label: "Founded", value: "2014" },
  { label: "Locations Covered", value: "Rwanda" },
  { label: "Customer Satisfaction", value: "98%" },
];
const DEFAULT_MISSION_VALUES: { title: string; description: string }[] = [
  { title: "Excellence in Service", description: "We maintain the highest standards in every aspect of our service delivery." },
  { title: "Personalized Experiences", description: "Every journey is tailored to meet the unique preferences of our clients." },
  { title: "Cultural Respect", description: "We honor and celebrate Rwanda's rich cultural heritage and traditions." },
];

/**
 * GET /api/public/about-content - Public endpoint for About page content
 */
export async function GET() {
  try {
    const row = await prisma.aboutPageContent.findUnique({
      where: { id: "default" },
    });

    const historicalBackground =
      (row?.historicalBackground as string | null) ?? DEFAULT_HISTORICAL;
    const quickFacts = Array.isArray(row?.quickFacts)
      ? (row.quickFacts as { label: string; value: string }[])
      : DEFAULT_QUICK_FACTS;
    const missionValues = Array.isArray(row?.missionValues)
      ? (row.missionValues as { title: string; description: string }[])
      : DEFAULT_MISSION_VALUES;

    return NextResponse.json({
      success: true,
      about: {
        historicalBackground,
        quickFacts,
        missionValues,
      },
    });
  } catch (error) {
    console.error("GET public about-content error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
