import { prisma } from "@/lib/prisma";

export interface QuickFact {
  label: string;
  value: string;
}

export interface MissionValue {
  title: string;
  description: string;
}

export interface AboutPageContent {
  historicalBackground: string;
  quickFacts: QuickFact[];
  missionValues: MissionValue[];
}

const DEFAULT_QUICK_FACTS: QuickFact[] = [
  { label: "Founded", value: "2014" },
  { label: "Locations Covered", value: "Rwanda" },
  { label: "Customer Satisfaction", value: "98%" },
];

const DEFAULT_MISSION_VALUES: MissionValue[] = [
  { title: "Excellence in Service", description: "We maintain the highest standards in every aspect of our service delivery." },
  { title: "Personalized Experiences", description: "Every journey is tailored to meet the unique preferences of our clients." },
  { title: "Cultural Respect", description: "We honor and celebrate Rwanda's rich cultural heritage and traditions." },
];

/**
 * Get About page content from DB with defaults when no row exists.
 */
export async function getAboutContent(): Promise<AboutPageContent> {
  try {
    const row = await prisma.aboutPageContent.findUnique({
      where: { id: "default" },
    });

    return {
      historicalBackground: (row?.historicalBackground as string) ?? "",
      quickFacts: Array.isArray(row?.quickFacts)
        ? (row.quickFacts as unknown as QuickFact[])
        : DEFAULT_QUICK_FACTS,
      missionValues: Array.isArray(row?.missionValues)
        ? (row.missionValues as unknown as MissionValue[])
        : DEFAULT_MISSION_VALUES,
    };
  } catch {
    return {
      historicalBackground: "",
      quickFacts: DEFAULT_QUICK_FACTS,
      missionValues: DEFAULT_MISSION_VALUES,
    };
  }
}
