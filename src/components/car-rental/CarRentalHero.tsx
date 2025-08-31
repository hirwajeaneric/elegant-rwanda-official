"use client";

import { Car, Shield, Clock, MapPin, Star } from "lucide-react";
import type { Vehicle } from "@/data/car-rental";

interface CarRentalHeroProps {
  vehicle: Vehicle;
}

export function CarRentalHero({ vehicle }: CarRentalHeroProps) {
  return (
    <section className="relative py-24 bg-[url('/hotel-exterior-daytime.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="mb-6">
              <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {vehicle.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                {vehicle.name}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {vehicle.description}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{vehicle.specifications.passengers}</div>
                <div className="text-sm text-white/80">Passengers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{vehicle.specifications.doors}</div>
                <div className="text-sm text-white/80">Doors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{vehicle.specifications.transmission}</div>
                <div className="text-sm text-white/80">Transmission</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{vehicle.specifications.fuelType}</div>
                <div className="text-sm text-white/80">Fuel Type</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(vehicle.rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
              </div>
              <span className="text-white/90">
                {vehicle.rating} ({vehicle.reviews} reviews)
              </span>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">{vehicle.specifications.engineSize} Engine</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Full Insurance Included</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Multiple Pickup Locations</span>
              </div>
            </div>
          </div>

          {/* Right Content - Availability Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Vehicle Availability
            </h3>
            
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-sm text-yellow-400 mb-2">Status</div>
                <div className={`text-lg font-semibold ${vehicle.available ? 'text-green-400' : 'text-red-400'}`}>
                  {vehicle.available ? 'Available Now' : 'Currently Unavailable'}
                </div>
              </div>
            </div>

            <button className="w-full bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200">
              {vehicle.available ? 'Request Quote' : 'Check Availability'}
            </button>
            
            <p className="text-xs text-white/60 mt-4 text-center">
              Contact us for personalized pricing and availability
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
