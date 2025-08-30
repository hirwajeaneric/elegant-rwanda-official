"use client";

import { ClipboardList, Calculator, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Submit Request",
      description: "Fill out our simple form with your travel details, pickup location, and destination.",
      details: ["Service type selection", "Pickup & drop-off locations", "Date and time preferences", "Number of passengers"]
    },
    {
      icon: Calculator,
      title: "Receive Quotation",
      description: "Get a detailed quote within 30 minutes, including all costs and service details.",
      details: ["Transparent pricing", "Service inclusions", "Vehicle specifications", "Driver information"]
    },
    {
      icon: CheckCircle,
      title: "Confirm & Ride",
      description: "Confirm your booking and enjoy a comfortable, safe journey with our professional drivers.",
      details: ["Instant confirmation", "Real-time tracking", "Professional service", "24/7 support"]
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-semibold mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details List */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Why Choose Our Cab Service?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Professional, licensed drivers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Well-maintained, clean vehicles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">GPS tracking for safety</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Fixed, transparent pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Flexible booking options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
