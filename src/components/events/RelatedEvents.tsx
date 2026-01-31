"use client";

import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import type { Event } from "@/data/events";
import Image from "next/image";
import Link from "next/link";

interface RelatedEventsProps {
  events: Event[];
}

export function RelatedEvents({ events }: RelatedEventsProps) {
  if (events.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Related Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover more events that might interest you and create unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const isUpcoming = new Date(event.date) > new Date();
            const daysUntil = getDaysUntil(event.date);
            
            return (
              <Link 
                key={event.id} 
                href={`/events/${event.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer block"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  {event.images.length > 0 ? (
                    <Image
                      src={event.images[0]}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/40" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      !isUpcoming ? 'bg-gray-500 text-white' :
                      daysUntil <= 7 ? 'bg-red-500 text-white' :
                      daysUntil <= 30 ? 'bg-orange-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {!isUpcoming ? 'Past Event' :
                       daysUntil <= 0 ? 'Registration Closed' :
                       daysUntil === 1 ? 'Tomorrow' :
                       `${daysUntil} days left`}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Meta */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.slice(0, 2).map((highlight, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                      {event.highlights.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{event.highlights.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{event.status}</span>
                    <div className="flex items-center space-x-1 text-primary group-hover:translate-x-1 transition-transform">
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Link 
            href="/events"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
