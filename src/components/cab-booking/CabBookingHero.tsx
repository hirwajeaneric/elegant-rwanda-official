"use client";

import { Phone, Mail, Clock } from "lucide-react";

export function CabBookingHero() {
  return (
    <section className="relative py-24 bg-[url('/pexels-kadiravsarr-20170205.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Seamless{" "}
              <span className="text-yellow-500">Tours</span>{" "}
              Across Rwanda
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-tight">
              Experience Unique and reliability with our premium cab services. From airport transfers 
              to city tours, we ensure your journey is comfortable, safe, and punctual.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-sm text-white/80">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">500+</div>
                <div className="text-sm text-white/80">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">100%</div>
                <div className="text-sm text-white/80">On Time</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">‭+250 787 095 392‬</span>
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
        </div>
      </div>
    </section>
  );
}
