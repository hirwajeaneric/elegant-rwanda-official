

import { Plane, Shield, Clock, MapPin } from "lucide-react";

export function AirTravelHero() {
  return (
    <section className="relative py-24 bg-[url('/airport-terminal.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Your Gateway to <span className="text-yellow-500">Effortless Travel</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              From visa applications to airport pickups, we handle all your air travel needs in Rwanda. 
              Experience seamless travel coordination with our expert assistance services.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">Fast</div>
                <div className="text-sm text-white/80">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">Global</div>
                <div className="text-sm text-white/80">Coverage</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Plane className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Visa Application Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Airport Pickup & Drop-off</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Hotel Booking Assistance</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Travel Coordination</span>
              </div>
            </div>
          </div>

          {/* Right Content - Quick Request Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Quick Travel Request
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
                  <option value="visa">Visa Assistance</option>
                  <option value="pickup">Airport Pickup</option>
                  <option value="hotel">Hotel Booking</option>
                  <option value="coordination">Travel Coordination</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Arrival Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select arrival date"
                />
              </div>
              <button className="w-full bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Get Assistance
              </button>
            </div>
            <p className="text-xs text-white/60 mt-4 text-center">
              We&apos;ll respond within 2 hours with detailed assistance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
