"use client";

import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, ArrowRight } from "lucide-react";

interface Vehicle {
  id: string;
  slug: string;
  name: string;
  make: string;
  model: string;
  category: string;
  available: boolean;
  images: string[];
  shortDescription?: string;
  pickupLocations?: string[];
}

interface VehiclesPreviewProps {
  vehicles: Vehicle[];
  loading: boolean;
}

export function VehiclesPreview({ vehicles, loading }: VehiclesPreviewProps) {
  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-elegant">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-72 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          {/* Vehicles Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden"
              >
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-40 mb-4" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* View More Button Skeleton */}
          <div className="text-center">
            <Skeleton className="h-12 w-56 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (vehicles.length === 0) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-yellow-500">Fleet</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose from our diverse fleet of well-maintained vehicles, each designed to provide comfort, safety, and luxury for your journey.
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {vehicles.slice(0, 3).map((vehicle) => (
            <Link
              key={vehicle.id}
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${vehicle.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                  >
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

                {/* Description */}
                {vehicle.shortDescription && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{vehicle.shortDescription}</p>
                )}

                {/* Pickup Locations */}
                {vehicle.pickupLocations && vehicle.pickupLocations.length > 0 && (
                  <div className="mb-4">
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

                {/* View Details Link */}
                <div className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-all duration-200">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Vehicles Button */}
        <div className="text-center">
          <Link
            href="/car-rental"
            className="btn-outline rounded-full w-fit mx-auto px-6 py-3 hover:bg-primary hover:text-white hover:border hover:border-primary hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            View All Vehicles
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
