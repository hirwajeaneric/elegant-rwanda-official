"use client";

import { MapPin, Camera, Users, Calendar } from "lucide-react";

export function ToursHero() {
  return (
    <section className="relative py-24 bg-[url('/volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/60 to-black/60" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Discover{" "}
              <span className="text-yellow-500">Rwanda</span> Through Our Tours
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              From thrilling gorilla encounters to serene cultural experiences, our Unique tours
              offer unforgettable adventures across Rwanda&apos;s most beautiful landscapes.
            </p>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Premium Destinations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Camera className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Unforgettable Experiences</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Expert Local Guides</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-yellow-500" />
                <span className="text-white/90">Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
