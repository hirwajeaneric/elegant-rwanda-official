import { PageWrapper } from "@/components/layout/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAboutContent } from "@/lib/about-content";
import { AboutTeamSection } from "@/components/about/AboutTeamSection";

export const dynamic = "force-dynamic";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

export const metadata = buildMetadata({
  title: "About Elegant Travel & Tours: Premier Luxury and Affordable Travel Experts in Rwanda",
  description:
    "Learn about Elegant Travel & Tours's mission to provide exceptional luxury and affordable travel experiences in Rwanda. Discover our story, values, and dedicated team of travel professionals.",
  path: "about",
  keywords: [
    "About Elegant Travel & Tours",
    "Rwanda travel company",
    "Luxury and affordable travel experts",
    "Tourism Rwanda",
    "Travel professionals Rwanda",
    "Affordable travel in Rwanda",
    "Luxury travel in Rwanda",
    "Travel in Rwanda",
    "Travel to Rwanda",
    "Travel to Africa",
    "Travel to East Africa",
    "Car booking near me",
    "Car near me",
    "Car to book near me",
    "Car rental near me",
    "Car rental to book near me",
    "Car rental to book near me in Rwanda",
    "Tour guide near me",
    "Trip planner near me",
    "Events near me",
  ],
});

const aboutJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
];

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/public/team`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.success ? data.teams : [];
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export default async function AboutPage() {
  const [aboutContent, team] = await Promise.all([
    getAboutContent(),
    getTeamMembers(),
  ]);

  const hasHistorical =
    aboutContent.historicalBackground &&
    aboutContent.historicalBackground.trim().length > 0;
  const defaultHistorical = `Founded with a passion for showcasing Rwanda's natural beauty and rich cultural heritage, Elegant Travel & Tours has been at the forefront of unique tourism in East Africa for over a decade.

What started as a small family business has grown into Rwanda's premier unique travel company, serving discerning travelers from around the world who seek authentic, personalized experiences.

We believe that unique travel should not only provide comfort and exclusivity but also create meaningful connections with local communities and contribute to sustainable tourism development.`;

  const historicalText = hasHistorical
    ? aboutContent.historicalBackground
    : defaultHistorical;
  const paragraphs = historicalText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageWrapper>
      <JsonLd data={aboutJsonLd} />
      <div className="container-elegant py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About{" "}
            <span className="text-primary">Elegant Travel & Tours</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crafting Timeless Journeys in the Heart of Africa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl font-display font-semibold mb-6">Our Story</h2>
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-display font-semibold mb-4">Quick Facts</h3>
            <div className="space-y-4">
              {aboutContent.quickFacts.map((fact, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-muted-foreground">{fact.label}</span>
                  <span className="font-semibold text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-semibold mb-6">Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.missionValues.map((item, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <AboutTeamSection team={team} />
      </div>
    </PageWrapper>
  );
}
