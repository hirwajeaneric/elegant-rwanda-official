"use client";

import { Car, Shield, Clock, MapPin } from "lucide-react";

export function CarRentalMainHero() {
  return (
    <section className="relative py-24 bg-[url('/car-rental.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/60 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Drive Rwanda in <span className="text-yellow-500">Style</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Experience the freedom of exploring Rwanda at your own pace with our premium car rental service.
              Choose between self-drive or chauffeur-driven options for the ultimate travel experience.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">50+</div>
                <div className="text-sm text-white/80">Vehicles Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">100%</div>
                <div className="text-sm text-white/80">Insurance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">Flexible</div>
                <div className="text-sm text-white/80">Rental Periods</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Unique & Economy Options</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Full Insurance Coverage</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Flexible Pickup/Drop-off</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
