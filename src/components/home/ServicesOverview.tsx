"use client";

import Link from "next/link";
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
    image: "/pexels-isaac-mitchell-278678383-16884778.jpg"
  },
  {
    icon: Car,
    title: "Cab Booking",
    description: "Premium cab services with professional drivers for seamless transfers across Rwanda.",
    features: ["Professional Drivers", "24/7 Availability", "Luxury Vehicles", "Fixed Rates"],
    href: "/cab-booking",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    image: "/pexels-kadiravsarr-20170205.jpg"
  },
  {
    icon: Car,
    title: "Car Rental",
    description: "Flexible car rental options from economy to luxury vehicles for your self-drive adventures.",
    features: ["Self-Drive Options", "Chauffeur Service", "4x4 Vehicles", "Insurance Included"],
    href: "/car-rental",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    image: "/pexels-mikebirdy-170811.jpg"
  },
  {
    icon: Plane,
    title: "Air Travel Assistance",
    description: "Comprehensive support for visa applications, airport pickups, and hotel bookings.",
    features: ["Visa Assistance", "Airport Pickup", "Hotel Booking", "Travel Support"],
    href: "/air-travel-assistance",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    image: "/pexels-matoga-27982027.jpg"
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    description: "Join exclusive group tours and cultural events for a shared adventure experience.",
    features: ["Group Tours", "Cultural Events", "Adventure Challenges", "Luxury Retreats"],
    href: "/upcoming-events",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    image: "/events.jpeg"
  },
  {
    icon: Star,
    title: "Custom Packages",
    description: "Tailored travel packages designed around your specific interests and requirements.",
    features: ["Personalized Itineraries", "Flexible Dates", "Special Requests", "VIP Service"],
    href: "/contact",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    image: "/photo-1516426122078-c23e76319801.jpg"
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
            <span className="text-yellow-500">Services</span>
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
              className="relative rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-6 group min-h-[500px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                  backgroundImage: `url('${service.image}')`
                }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
              </div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Service Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                {/* Service Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-white/90 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm text-white/80">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button
                      className="bg-white/10 hover:bg-white text-white hover:text-primary transition-all duration-300 w-full justify-between rounded-full px-6 py-3 backdrop-blur-sm flex flex-nowrap"
                    >
                      <Link href={service.href}>
                        <span className="whitespace-nowrap mr-2">Learn More</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 inline-block" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 rounded-2xl">
          <div className="text-white rounded-2xl p-8 shadow-lg border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/landscape-on-edge-of-lake-kivu-rwanda-east-africa.jpg')] rounded-2xl bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
            <div className="relative z-10 rounded-2xl">
              <h3 className="text-xl md:text-4xl font-display font-semibold mb-4 text-yellow-500">
                Need a Custom Package?
              </h3>
              <p className="text-white mb-6 max-w-2xl mx-auto">
                Can&apos;t find exactly what you&apos;re looking for? Let us create a personalized travel package
                tailored to your specific interests, schedule, and preferences.
              </p>
              <Link href="/contact" className="btn-primary w-fit mx-auto rounded-full px-6 py-3 hover:bg-white hover:text-primary hover:border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Users className="h-5 w-5 mr-2" />
                Request Custom Package
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
