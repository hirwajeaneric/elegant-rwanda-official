"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Share2, Bookmark, Heart } from "lucide-react";
import { formatPrice, getCategoryColor, getDifficultyColor } from "@/lib/utils";
import type { Tour } from "@/data/tours";

interface TourHeroProps {
  tour: Tour;
}

export function TourHero({ tour }: TourHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/${tour.images[0]}')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      
      {/* Action Buttons */}
      <div className="absolute top-6 right-6 flex space-x-2 z-10">
        <button 
          className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          aria-label="Share this tour"
        >
          <Share2 className="h-5 w-5" />
        </button>
        <button 
          className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          aria-label="Bookmark this tour"
        >
          <Bookmark className="h-5 w-5" />
        </button>
        <button 
          className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="container-elegant">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge 
                variant="secondary" 
                className={`${getCategoryColor(tour.category)} text-white`}
              >
                {tour.category}
              </Badge>
              <Badge 
                variant="secondary" 
                className={`${getDifficultyColor(tour.difficulty)} text-white`}
              >
                {tour.difficulty}
              </Badge>
              {tour.featured && (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  Featured Tour
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              {tour.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {tour.description}
            </p>

            {/* Tour Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{tour.duration}</div>
                <div className="text-white/90 text-sm">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{tour.location}</div>
                <div className="text-white/90 text-sm">Location</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">Max {tour.maxGroupSize}</div>
                <div className="text-white/90 text-sm">Group Size</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{formatPrice(tour.price)}</div>
                <div className="text-white/90 text-sm">Starting Price</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Tour Highlights:</h3>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center">
                <Calendar className="h-5 w-5 mr-2" />
                Book This Tour
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center">
                <MapPin className="h-5 w-5 mr-2" />
                View Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
