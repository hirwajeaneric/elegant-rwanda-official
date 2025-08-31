"use client";

import { Calendar, Utensils, Bed } from "lucide-react";
import type { Tour } from "@/data/tours";

interface TourItineraryProps {
  tour: Tour;
}

export function TourItinerary({ tour }: TourItineraryProps) {
  return (
    <section className="mb-16 pt-28" id="itinerary">
      <h2 className="text-3xl font-display font-semibold mb-8">Detailed Itinerary</h2>
      
      <div className="space-y-6">
        {tour.itinerary.map((day) => (
          <div key={day.day} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start space-x-4">
              {/* Day Number */}
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                {day.day}
              </div>
              
              {/* Day Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{day.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {day.description}
                </p>
                
                {/* Activities */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Activities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {day.activities.map((activity) => (
                      <div key={activity} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Accommodation & Meals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.accommodation && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <Bed className="h-4 w-4 mr-2 text-primary" />
                        Accommodation
                      </h4>
                      <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-primary" />
                      Meals
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {day.meals.map((meal) => (
                        <span
                          key={meal}
                          className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
