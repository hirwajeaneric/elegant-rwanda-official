import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "About Elegant Rwanda: Premier Luxury Travel Experts in Rwanda",
  description: "Learn about Elegant Rwanda's mission to provide exceptional luxury travel experiences in Rwanda. Discover our story, values, and dedicated team of travel professionals.",
  keywords: [
    "About Elegant Rwanda",
    "Rwanda travel company",
    "Luxury travel experts",
    "Tourism Rwanda",
    "Travel professionals Rwanda"
  ],
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container-elegant py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About{" "}
            <span className="gradient-text">Elegant Rwanda</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crafting Timeless Journeys in the Heart of Africa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl font-display font-semibold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded with a passion for showcasing Rwanda&apos;s natural beauty and rich cultural heritage, 
              Elegant Rwanda has been at the forefront of luxury tourism in East Africa for over a decade.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              What started as a small family business has grown into Rwanda&apos;s premier luxury travel 
              company, serving discerning travelers from around the world who seek authentic, 
              personalized experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that luxury travel should not only provide comfort and exclusivity but also 
              create meaningful connections with local communities and contribute to sustainable tourism development.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-display font-semibold mb-4">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Founded</span>
                <span className="font-semibold">2014</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Team Members</span>
                <span className="font-semibold">25+</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Countries Served</span>
                <span className="font-semibold">30+</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Customer Satisfaction</span>
                <span className="font-semibold">98%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-semibold mb-6">Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Excellence in Service</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in every aspect of our service delivery.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Personalized Experiences</h3>
              <p className="text-muted-foreground">
                Every journey is tailored to meet the unique preferences of our clients.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Cultural Respect</h3>
              <p className="text-muted-foreground">
                We honor and celebrate Rwanda&apos;s rich cultural heritage and traditions.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-display font-semibold mb-6">Our Team</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Meet the passionate professionals who make every journey extraordinary. Our team combines 
            local expertise with international standards to deliver exceptional travel experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team member cards would go here */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                JP
              </div>
              <h3 className="text-xl font-semibold mb-2">Jean-Pierre Uwimana</h3>
              <p className="text-primary font-medium mb-2">Founder & CEO</p>
              <p className="text-muted-foreground text-sm">
                A passionate tourism professional with over 15 years of experience in luxury travel across East Africa.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                G
              </div>
              <h3 className="text-xl font-semibold mb-2">Grace Mukamurenzi</h3>
              <p className="text-primary font-medium mb-2">Head of Operations</p>
              <p className="text-muted-foreground text-sm">
                Ensures every detail of our tours and services meets the highest standards.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                E
              </div>
              <h3 className="text-xl font-semibold mb-2">Emmanuel Niyonsenga</h3>
              <p className="text-primary font-medium mb-2">Lead Tour Guide</p>
              <p className="text-muted-foreground text-sm">
                Specializes in wildlife tours and cultural experiences with deep knowledge of Rwanda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
