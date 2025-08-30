"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Star } from "lucide-react";
import { getFeaturedTours } from "@/data/tours";
import { getCategoryColor, formatPrice } from "@/lib/utils";

export function FeaturedTours() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredTours = getFeaturedTours();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTours.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTours.length) % featuredTours.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (featuredTours.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Featured{" "}
            <span className="text-yellow-500">Tours</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience our most popular and highly-rated tours that showcase the best of Rwanda&apos;s 
            natural beauty and cultural heritage.
          </p>
        </div>

        {/* Tours Carousel */}
        <div className="relative">
          {/* Main Tour Display */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-[600px] md:h-[700px]">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
                style={{
                  backgroundImage: `url(${featuredTours[currentIndex].images[0]})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Tour Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 text-white">
                <div className="max-w-4xl">
                  {/* Tour Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                    {featuredTours[currentIndex].title}
                  </h3>

                  {/* Tour Description */}
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl leading-relaxed">
                    {featuredTours[currentIndex].description}
                  </p>

                  {/* Tour Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span className="text-sm">{featuredTours[currentIndex].duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      <span className="text-sm">{featuredTours[currentIndex].location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span className="text-sm">Max {featuredTours[currentIndex].maxGroupSize}</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex space-x-3">
                      <button className="btn-outline rounded-full w-fit mx-auto px-6 py-3 hover:bg-white hover:text-primary hover:border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <Link href={`/tours/${featuredTours[currentIndex].slug}`}>
                          View Details
                        </Link>
                      </button>
                      <button className="btn-primary rounded-full px-6 py-3 hover:bg-white hover:text-primary hover:border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <Link href={`/tours/${featuredTours[currentIndex].slug}`}>
                          Book Now
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white hover:text-primary border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center rounded-full px-3 py-3"
            onClick={prevSlide}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white hover:text-primary border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center rounded-full px-3 py-3"
            onClick={nextSlide}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredTours.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Tours CTA */}
        <div className="text-center mt-16">
            <Link href="/tours" className="btn-outline rounded-full w-fit mx-auto px-6 py-3 hover:bg-white hover:text-primary hover:border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center">
              View All Tours
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
        </div>
      </div>
    </section>
  );
}
