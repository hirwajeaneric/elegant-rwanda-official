"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Car } from "lucide-react";
import type { Vehicle } from "@/data/car-rental";

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
}

export function RelatedVehicles({ vehicles }: RelatedVehiclesProps) {
  if (vehicles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Related Vehicles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore other vehicles in our fleet that might suit your travel needs and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
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

        {/* View All Vehicles CTA */}
        <div className="text-center mt-12">
          <Link
            href="/car-rental"
            className="inline-flex items-center space-x-2 bg-white text-primary border-2 border-primary font-semibold py-4 px-8 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
          >
            <span>View All Vehicles</span>
            <Car className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
