"use client";

import Image from "next/image";
import { Users, Car, Shield, Wifi, Snowflake, Zap } from "lucide-react";

export function FleetOverview() {
  const vehicles = [
    {
      name: "Luxury Sedan",
      image: "hotel-exterior-daytime.jpg",
      capacity: "4 passengers",
      features: ["Leather seats", "Climate control", "WiFi", "Charging ports"],
      bestFor: "Business travel, Airport transfers",
      icon: Car
    },
    {
      name: "Premium SUV",
      image: "hotel-exterior.jpg",
      capacity: "6 passengers",
      features: ["Spacious interior", "All-wheel drive", "Premium audio", "Luggage space"],
      bestFor: "Family trips, Group travel",
      icon: Users
    },
    {
      name: "Executive Minivan",
      image: "kigali-serena-hotel.jpg",
      capacity: "8 passengers",
      features: ["Comfortable seating", "Entertainment system", "Climate control", "Large luggage area"],
      bestFor: "Corporate groups, Events",
      icon: Shield
    },
    {
      name: "Luxury Vehicle",
      image: "Bisate-Lodge-Image-from-Arcadiasafaris-1024x499.jpg",
      capacity: "4 passengers",
      features: ["Premium amenities", "Professional driver", "Concierge service", "Refreshments"],
      bestFor: "Special occasions, VIP service",
      icon: Zap
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-primary">Fleet</span> Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our diverse fleet of well-maintained vehicles, each designed to provide 
            comfort, safety, and luxury for your journey across Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* Vehicle Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`/${vehicle.image}`}
                  alt={vehicle.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{vehicle.name}</h3>
                  <p className="text-sm text-white/90">{vehicle.capacity}</p>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-6">
                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Features</h4>
                  <div className="space-y-2">
                    {vehicle.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Best For</h4>
                  <p className="text-sm text-muted-foreground">{vehicle.bestFor}</p>
                </div>

                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <vehicle.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <div className="text-muted-foreground">Vehicles Available</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Safety Record</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wifi className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">GPS Tracking</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Snowflake className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Climate Controlled</div>
          </div>
        </div>
      </div>
    </section>
  );
}
