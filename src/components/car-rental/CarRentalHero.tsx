"use client";

import { Car, Shield, Clock, MapPin } from "lucide-react";

export function CarRentalHero() {
  return (
    <section className="relative py-24 bg-[url('/hotel-exterior-daytime.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
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
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
                <div className="text-sm text-white/80">Vehicles Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
                <div className="text-sm text-white/80">Insurance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">Flexible</div>
                <div className="text-sm text-white/80">Rental Periods</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Luxury & Economy Options</span>
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

          {/* Right Content - Quick Rental Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Quick Rental Request
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Rental Type
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select rental type"
                >
                  <option value="">Select Type</option>
                  <option value="self-drive">Self Drive</option>
                  <option value="chauffeur">Chauffeur Driven</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Vehicle Category
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select vehicle category"
                >
                  <option value="">Select Category</option>
                  <option value="economy">Economy</option>
                  <option value="compact">Compact</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <button className="w-full bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Get Quote
              </button>
            </div>
            <p className="text-xs text-white/60 mt-4 text-center">
              We&apos;ll provide a detailed quote within 1 hour
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
