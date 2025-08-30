"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
            <span className="gradient-text">Tours</span>
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
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="max-w-4xl">
                  {/* Category Badge */}
                  <Badge 
                    className={`mb-4 ${getCategoryColor(featuredTours[currentIndex].category)}`}
                  >
                    {featuredTours[currentIndex].category}
                  </Badge>

                  {/* Tour Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                    {featuredTours[currentIndex].title}
                  </h3>

                  {/* Tour Description */}
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl leading-relaxed">
                    {featuredTours[currentIndex].description}
                  </p>

                  {/* Tour Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span className="text-sm">{featuredTours[currentIndex].duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      <span className="text-sm">Rwanda</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span className="text-sm">Max {featuredTours[currentIndex].maxGroupSize}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-accent" />
                      <span className="text-sm">{featuredTours[currentIndex].difficulty}</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-2xl font-bold text-accent">
                      {formatPrice(featuredTours[currentIndex].price)}
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-foreground">
                        View Details
                      </Button>
                      <Button className="btn-primary">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/30 hover:scale-110 transition-all duration-200 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/30 hover:scale-110 transition-all duration-200 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

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
          <Button size="lg" variant="outline" className="btn-outline" asChild>
            <Link href="/tours">
              View All Tours
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
