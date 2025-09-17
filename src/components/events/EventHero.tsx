"use client";

import { Calendar, MapPin, Users, Clock, Star } from "lucide-react";
import type { Event } from "@/data/events";
import Image from "next/image";

interface EventHeroProps {
  event: Event;
}

export function EventHero({ event }: EventHeroProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isUpcoming = new Date(event.date) > new Date();
  const daysUntil = getDaysUntil(event.date);

  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        {event.images.length > 0 ? (
          <Image
            src={`/${event.images[0]}`}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-elegant py-20">
        <div className="max-w-4xl">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary text-white">
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {event.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            {event.description}
          </p>

          {/* Event Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center space-x-3 text-white">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-white/70">Date</p>
                <p className="font-semibold">{formatDate(event.date)}</p>
                {event.endDate && (
                  <p className="text-sm text-white/70">
                    to {formatDate(event.endDate)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-white/70">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-white/70">Participants</p>
                <p className="font-semibold">
                  {event.currentParticipants}/{event.maxParticipants}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-white/70">Status</p>
                <p className="font-semibold">{event.status}</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex flex-wrap gap-4">
            {isUpcoming && (
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">
                  {daysUntil <= 0 ? 'Registration Closed' :
                   daysUntil === 1 ? 'Tomorrow' :
                   `${daysUntil} days left`}
                </span>
              </div>
            )}
            
            {event.featured && (
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Featured Event</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
