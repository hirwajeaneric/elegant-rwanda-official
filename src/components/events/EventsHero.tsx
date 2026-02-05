

import { Calendar, Users, MapPin, Clock } from "lucide-react";

export function EventsHero() {
  return (
    <section className="relative py-24 bg-[url('/events.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/70 to-black/60" />
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

            {/* Features */}
            < div className="space-y-3">
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
        </div>
      </div>
    </section >
  );
}
