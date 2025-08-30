"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Users, Car } from "lucide-react";
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
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Vehicle Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {vehicle.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.available 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}>
                    {vehicle.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {vehicle.shortDescription}
                </p>

                {/* Quick Specs */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm text-gray-600">{vehicle.specifications.passengers}</div>
                    <div className="text-xs text-gray-500">Seats</div>
                  </div>
                  <div className="text-center">
                    <Car className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm text-gray-600">{vehicle.specifications.transmission}</div>
                    <div className="text-xs text-gray-500">Trans</div>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-sm text-gray-600">{vehicle.pickupLocations.length}</div>
                    <div className="text-xs text-gray-500">Locations</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(vehicle.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {vehicle.rating} ({vehicle.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-2xl font-bold text-primary">${vehicle.dailyRate}</div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/car-rental/${vehicle.slug}`}
                  className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-center block"
                >
                  View Details
                </Link>
              </div>
            </div>
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
