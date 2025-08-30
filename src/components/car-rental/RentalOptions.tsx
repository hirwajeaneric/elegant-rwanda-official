"use client";

import { useState } from "react";
import { Car, User, Shield, Clock, MapPin, CreditCard } from "lucide-react";

export function RentalOptions() {
  const [activeTab, setActiveTab] = useState("self-drive");

  const options = {
    "self-drive": {
      title: "Self-Drive Option",
      subtitle: "Freedom to explore at your own pace",
      description: "Perfect for independent travelers who want to discover Rwanda on their own schedule. Our self-drive service gives you complete control over your journey.",
      features: [
        "Full vehicle control and flexibility",
        "No driver costs or time constraints",
        "Privacy and independence",
        "Cost-effective for longer rentals",
        "GPS navigation included",
        "24/7 roadside assistance"
      ],
      requirements: [
        "Valid international driving license",
        "Minimum age: 21 years",
        "Credit card for security deposit",
        "Passport or ID document"
      ],
      bestFor: "Independent travelers, Business trips, Family vacations, Extended stays"
    },
    "chauffeur": {
      title: "Chauffeur-Driven Option",
      subtitle: "Luxury travel with professional drivers",
      description: "Sit back and relax while our professional chauffeurs take care of your transportation needs. Perfect for business travel, special occasions, or when you want to focus on the experience.",
      features: [
        "Professional, licensed chauffeurs",
        "Local knowledge and expertise",
        "Stress-free travel experience",
        "Luxury vehicle options",
        "Concierge services available",
        "Flexible scheduling"
      ],
      requirements: [
        "No driving license required",
        "Advance booking recommended",
        "Clear pickup/drop-off locations",
        "Contact information for coordination"
      ],
      bestFor: "Business executives, Special occasions, VIP services, Tour groups"
    }
  };

  const activeOption = options[activeTab as keyof typeof options];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Choose Your <span className="text-primary">Rental</span> Option
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer two flexible rental options to suit your travel style and preferences. 
            Whether you prefer to drive yourself or be chauffeured, we have the perfect solution.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-border/50">
            <button
              onClick={() => setActiveTab("self-drive")}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "self-drive"
                  ? "bg-primary text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Car className="inline-block h-5 w-5 mr-2" />
              Self-Drive
            </button>
            <button
              onClick={() => setActiveTab("chauffeur")}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "chauffeur"
                  ? "bg-primary text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="inline-block h-5 w-5 mr-2" />
              Chauffeur-Driven
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div>
              <h3 className="text-3xl font-display font-bold mb-4 text-primary">
                {activeOption.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {activeOption.subtitle}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {activeOption.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {activeOption.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  Best For
                </h4>
                <p className="text-muted-foreground">{activeOption.bestFor}</p>
              </div>
            </div>

            {/* Right Content */}
            <div>
              {/* Requirements */}
              <div className="bg-muted/30 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 text-primary mr-2" />
                  Requirements
                </h4>
                <ul className="space-y-3">
                  {activeOption.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Comparison */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h4 className="text-xl font-semibold mb-4 text-primary">
                  Why Choose This Option?
                </h4>
                <div className="space-y-3">
                  {activeTab === "self-drive" ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Complete time flexibility</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Car className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Full vehicle control</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Cost-effective for longer trips</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Professional driver service</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Stress-free travel</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Local expertise included</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-display font-bold mb-4">
              Ready to Choose Your Rental Option?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Get a detailed quote and start planning your perfect journey across Rwanda.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Get Your Quote Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
