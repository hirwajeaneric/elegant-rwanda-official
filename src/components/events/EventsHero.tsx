

import { Calendar, Users, MapPin, Clock } from "lucide-react";

export function EventsHero() {
  return (
    <section className="relative py-24 bg-[url('/group-gorilla-trekking.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Join <span className="text-yellow-500">Extraordinary</span> Events
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover upcoming tourism events, group travels, and special experiences in Rwanda. 
              Connect with like-minded adventurers and create unforgettable memories together.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">12+</div>
                <div className="text-sm text-white/80">Events This Year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
                <div className="text-sm text-white/80">Happy Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">4.9</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Curated Event Calendar</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Group Travel Experiences</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Exclusive Locations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Flexible Scheduling</span>
              </div>
            </div>
          </div>

          {/* Right Content - Quick Event Search */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Find Your Perfect Event
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Event Type
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select event type"
                >
                  <option value="">All Event Types</option>
                  <option value="gorilla-trekking">Gorilla Trekking</option>
                  <option value="cultural-tours">Cultural Tours</option>
                  <option value="adventure">Adventure Activities</option>
                  <option value="wildlife-safari">Wildlife Safari</option>
                  <option value="photography">Photography Tours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Preferred Dates
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Select preferred dates"
                >
                  <option value="">Any Time</option>
                  <option value="next-month">Next Month</option>
                  <option value="next-quarter">Next Quarter</option>
                  <option value="next-6-months">Next 6 Months</option>
                  <option value="next-year">Next Year</option>
                </select>
              </div>
              <button className="w-full bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Browse Events
              </button>
            </div>
            <p className="text-xs text-white/60 mt-4 text-center">
              Get notified about new events and special offers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
