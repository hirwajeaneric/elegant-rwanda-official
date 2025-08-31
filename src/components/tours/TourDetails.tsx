"use client";

import { Badge } from "@/components/ui/badge";
import { Check, X, MapPin, Calendar, Users, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Tour } from "@/data/tours";

interface TourDetailsProps {
  tour: Tour;
}

export function TourDetails({ tour }: TourDetailsProps) {
  return (
    <section>
      <h2 className="text-3xl font-display font-semibold mb-8">Tour Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">About This Tour</h3>
            <p className="text-muted-foreground leading-relaxed">
              {tour.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Tour Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{tour.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Max Group Size:</span>
                <span className="font-medium">{tour.maxGroupSize} people</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Difficulty:</span>
                <Badge variant="outline" className="ml-2">
                  {tour.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Available Dates</h3>
            <div className="flex flex-wrap gap-2">
              {tour.availableDates.map((date) => (
                <Badge key={date} variant="secondary" className="bg-primary/10 text-primary">
                  {new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">What&apos;s Included</h3>
            <div className="space-y-2">
              {tour.inclusions.map((inclusion) => (
                <div key={inclusion} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">{inclusion}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">What&apos;s Not Included</h3>
            <div className="space-y-2">
              {tour.exclusions.map((exclusion) => (
                <div key={exclusion} className="flex items-center space-x-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span className="text-muted-foreground">{exclusion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
