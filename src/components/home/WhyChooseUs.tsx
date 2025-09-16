"use client";

import { 
  CheckCircle, 
  Users, 
  Award, 
  Shield, 
  Heart, 
  Globe,
  Star,
  Clock
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const reasons = [
  {
    value: "personalized",
    title: "Personalized Quotations",
    description: "Every tour and service is customized to your specific preferences, budget, and travel style. We don&apos;t offer one-size-fits-all packages - we create experiences that are uniquely yours.",
    icon: CheckCircle,
    color: "text-emerald-600"
  },
  {
    value: "expert",
    title: "Expert Local Guides",
    description: "Our guides are not just knowledgeable about Rwanda&apos;s history and culture - they&apos;re passionate locals who love sharing their country with visitors. Many have over 10 years of experience.",
    icon: Users,
    color: "text-blue-600"
  },
  {
    value: "sustainable",
    title: "Sustainable Luxury Travel",
    description: "We believe luxury and sustainability go hand in hand. We partner with eco-friendly lodges, support local communities, and minimize our environmental impact while maximizing your comfort.",
    icon: Heart,
    color: "text-green-600"
  },
  {
    value: "quality",
    title: "Uncompromising Quality",
    description: "From the vehicles we use to the accommodations we select, we maintain the highest standards. We personally inspect every property and service to ensure it meets our luxury criteria.",
    icon: Award,
    color: "text-amber-600"
  },
  {
    value: "safety",
    title: "Safety & Security",
    description: "Your safety is our top priority. All our vehicles are regularly maintained, drivers are thoroughly vetted, and we have 24/7 emergency support throughout your journey.",
    icon: Shield,
    color: "text-red-600"
  },
  {
    value: "global",
    title: "Global Standards, Local Heart",
    description: "We combine international luxury travel standards with authentic Rwandan hospitality. You get world-class service while experiencing the genuine warmth and culture of Rwanda.",
    icon: Globe,
    color: "text-purple-600"
  }
];

const stats = [
  {
    number: "500+",
    label: "Satisfied Travelers",
    icon: Users,
    color: "text-primary"
  },
  {
    number: "50+",
    label: "Luxury Tours",
    icon: Star,
    color: "text-accent"
  },
  {
    number: "10+",
    label: "Years Experience",
    icon: Clock,
    color: "text-secondary"
  },
  {
    number: "100%",
    label: "Safety Record",
    icon: Shield,
    color: "text-green-600"
  }
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Why Choose{" "}
            <span className="text-yellow-500">Elegant Rwanda</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&apos;re not just another travel company. We&apos;re your partners in creating extraordinary 
            memories in one of Africa&apos;s most beautiful countries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {reasons.map((reason) => (
                <AccordionItem
                  key={reason.value}
                  value={reason.value}
                  className="border border-border rounded-lg px-4 hover:shadow-md transition-shadow duration-200"
                >
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-200`}>
                        <reason.icon className={`h-5 w-5 ${reason.color}`} />
                      </div>
                      <span className="font-semibold text-lg">{reason.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-14">
                    {reason.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                Our Commitment to Excellence
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We&apos;re committed to providing not just a service, but an experience that exceeds 
                your expectations. Every detail matters, from the moment you contact us until 
                you return home with unforgettable memories.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Flexible Cancellation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Local Expertise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
