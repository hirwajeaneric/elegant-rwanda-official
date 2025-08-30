"use client";

import { Shield, Clock, MapPin, Users, Car, Star } from "lucide-react";

export function CabBenefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Professional Drivers",
      description: "All our drivers are licensed, experienced professionals who speak multiple languages and know Rwanda inside out.",
      features: ["Licensed & certified", "Multi-lingual", "Local expertise", "Safety trained"]
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service ensures you can travel whenever you need, whether it's an early flight or late-night arrival.",
      features: ["Always available", "Quick response", "Flexible timing", "Emergency support"]
    },
    {
      icon: MapPin,
      title: "Custom Routes",
      description: "We don't just follow GPS - we create personalized routes based on your preferences and local knowledge.",
      features: ["Personalized routes", "Local shortcuts", "Scenic options", "Efficient paths"]
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Perfect for families, business groups, or friends traveling together with spacious vehicles and group discounts.",
      features: ["Group discounts", "Spacious vehicles", "Coordinated pickups", "Shared costs"]
    },
    {
      icon: Car,
      title: "Well-Maintained Fleet",
      description: "Our vehicles undergo regular maintenance and cleaning to ensure your comfort and safety on every journey.",
      features: ["Regular maintenance", "Clean interiors", "Modern vehicles", "Safety features"]
    },
    {
      icon: Star,
      title: "Premium Service",
      description: "From the moment you book to the end of your journey, we provide exceptional service that exceeds expectations.",
      features: ["Concierge service", "Refreshments", "Entertainment", "Luxury amenities"]
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Why Choose Our <span className="text-primary">Cab Service</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We go beyond just transportation - we provide an experience that makes your journey 
            memorable, comfortable, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-muted/30 rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-display font-bold mb-4">
            Ready to Experience Premium Cab Service?
          </h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose Elegant Rwanda for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Book Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
