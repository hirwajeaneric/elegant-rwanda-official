"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Plane, 
  Calendar, 
  ArrowRight,
  Mountain,
  Users,
  Star
} from "lucide-react";

const services = [
  {
    icon: Mountain,
    title: "Luxury Tours",
    description: "Custom itineraries for unforgettable adventures across Rwanda&apos;s most stunning landscapes.",
    features: ["Gorilla Trekking", "Cultural Experiences", "Luxury Lodges", "Expert Guides"],
    href: "/tours",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Car,
    title: "Cab Booking",
    description: "Premium cab services with professional drivers for seamless transfers across Rwanda.",
    features: ["Professional Drivers", "24/7 Availability", "Luxury Vehicles", "Fixed Rates"],
    href: "/cab-booking",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Car,
    title: "Car Rental",
    description: "Flexible car rental options from economy to luxury vehicles for your self-drive adventures.",
    features: ["Self-Drive Options", "Chauffeur Service", "4x4 Vehicles", "Insurance Included"],
    href: "/car-rental",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: Plane,
    title: "Air Travel Assistance",
    description: "Comprehensive support for visa applications, airport pickups, and hotel bookings.",
    features: ["Visa Assistance", "Airport Pickup", "Hotel Booking", "Travel Support"],
    href: "/air-travel-assistance",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    description: "Join exclusive group tours and cultural events for a shared adventure experience.",
    features: ["Group Tours", "Cultural Events", "Adventure Challenges", "Luxury Retreats"],
    href: "/upcoming-events",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600"
  },
  {
    icon: Star,
    title: "Custom Packages",
    description: "Tailored travel packages designed around your specific interests and requirements.",
    features: ["Personalized Itineraries", "Flexible Dates", "Special Requests", "VIP Service"],
    href: "/contact",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  }
];

export function ServicesOverview() {
  return (
    <section className="section-padding bg-gradient-to-br from-muted/30 to-muted/50">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Our{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the full range of luxury travel services we offer to make your Rwanda experience 
            truly exceptional and unforgettable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden p-6 group ${service.bgColor} hover:shadow-xl transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Service Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>

              {/* Service Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    variant="ghost"
                    className={`group-hover:bg-gradient-to-r ${service.color} group-hover:text-white transition-all duration-300 w-full justify-between`}
                    asChild
                  >
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can&apos;t find exactly what you&apos;re looking for? Let us create a personalized travel package 
              tailored to your specific interests, schedule, and preferences.
            </p>
            <Button size="lg" className="btn-primary" asChild>
              <Link href="/contact">
                <Users className="h-5 w-5 mr-2" />
                Request Custom Package
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
