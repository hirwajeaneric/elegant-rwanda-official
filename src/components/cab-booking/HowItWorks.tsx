"use client";

import { ClipboardList, Calculator, CheckCircle, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Submit Request",
      description: "Fill out our simple form with your travel details, pickup location, and destination.",
      details: ["Service type selection", "Pickup & drop-off locations", "Date and time preferences", "Number of passengers"],
    },
    {
      icon: Calculator,
      title: "Receive Quotation",
      description: "Get a detailed quote within 30 minutes, including all costs and service details.",
      details: ["Transparent pricing", "Service inclusions", "Vehicle specifications", "Driver information"],
    },
    {
      icon: CheckCircle,
      title: "Confirm & Ride",
      description: "Confirm your booking and enjoy a comfortable, safe journey with our professional drivers.",
      details: ["Instant confirmation", "Real-time tracking", "Professional service", "24/7 support"],
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process ensures you get the best cab service in Rwanda with just three simple steps.
          </p>
        </div>

        {/* Desktop Timeline Layout */}
        <div className="hidden md:block relative">
          {/* Horizontal Connector Line */}
          {/* <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/20" /> */}

          <div className="grid grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="relative w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-muted/30 rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 mt-8">
                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-semibold mb-4 text-center group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline Layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Vertical Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-primary/20" />
                )}

                <div className="flex gap-6">
                  {/* Step Number */}
                  <div className="shrink-0">
                    <div className="relative w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-muted/30 rounded-2xl p-6 shadow-lg border border-border/50 hover:border-primary/30 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
