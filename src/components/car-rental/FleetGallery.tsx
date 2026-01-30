"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Car, Users, Zap, Shield, MapPin } from "lucide-react";

type Vehicle = {
  id: string;
  slug: string;
  name: string;
  category: string;
  make: string;
  images: string[];
  pickupLocations: string[];
  available: boolean;
};

export function FleetGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch("/api/public/vehicles?limit=100");
        const data = await res.json();
        if (data.success && Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const categories = ["All", "Economy", "Compact", "SUV", "Unique", "Minivan", "Adventure", "Executive"];

  const filteredVehicles = activeCategory === "all"
    ? vehicles
    : vehicles.filter(vehicle => vehicle.category === activeCategory);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-elegant">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our <span className="text-primary">Fleet</span> Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading vehicles...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-primary">Fleet</span> Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our diverse fleet of well-maintained vehicles, from economy options to Unique models.
            Each vehicle is carefully selected to ensure your comfort and safety.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category
                ? "bg-primary text-white shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {category === "All" ? `All (${vehicles.length})` : `${category} (${vehicles.filter(v => v.category === category).length})`}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <Link
              key={index}
              href={`/car-rental/${vehicle.slug}`}
              className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer block"
            >
              {/* Vehicle Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={vehicle.images[0] || "/placeholder-car.jpg"}
                  alt={vehicle.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.category}
                  </span>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${vehicle.available
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                    }`}>
                    {vehicle.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Vehicle Info Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{vehicle.name}</h3>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-6">
                {/* Make */}
                <div className="mb-3">
                  <p className="text-base font-semibold text-gray-900">{vehicle.make}</p>
                </div>

                {/* Pickup Locations */}
                {vehicle.pickupLocations && vehicle.pickupLocations.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Pickup Locations
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.pickupLocations.slice(0, 2).map((location, locIndex) => (
                        <span
                          key={locIndex}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                        >
                          {location}
                        </span>
                      ))}
                      {vehicle.pickupLocations.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{vehicle.pickupLocations.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Fleet Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Vehicles Available</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Insured</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
