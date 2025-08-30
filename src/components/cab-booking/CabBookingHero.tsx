"use client";

import { Phone, Mail, Clock } from "lucide-react";

export function CabBookingHero() {
  return (
    <section className="relative py-24 bg-[url('/hotel-exterior.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Seamless{" "}
              <span className="text-yellow-500">Transfers</span>{" "}
              Across Rwanda
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Experience luxury and reliability with our premium cab services. From airport transfers 
              to city tours, we ensure your journey is comfortable, safe, and punctual.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-sm text-white/80">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
                <div className="text-sm text-white/80">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
                <div className="text-sm text-white/80">On Time</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">cabs@elegantrwanda.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Content - Quick Booking Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Quick Booking Request
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Service Type
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select service type"
                >
                  <option value="">Select Service</option>
                  <option value="airport-transfer">Airport Transfer</option>
                  <option value="city-tour">City Tour</option>
                  <option value="intercity">Intercity Travel</option>
                  <option value="event-transport">Event Transport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Number of Passengers
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select number of passengers"
                >
                  <option value="">Select</option>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4+ Passengers</option>
                </select>
              </div>
              <button className="w-full bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Request Quote
              </button>
            </div>
            <p className="text-xs text-white/60 mt-4 text-center">
              We&apos;ll get back to you within 30 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
