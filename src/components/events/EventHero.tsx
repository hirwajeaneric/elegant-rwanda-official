"use client";

import { Calendar, MapPin, Users, Clock, Star, ArrowLeft } from "lucide-react";
import type { Event } from "@/data/events";
import Image from "next/image";
import Link from "next/link";

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
    <section className="relative min-h-[70vh] flex items-center w-full">
      {/* Background Image */}
      <div className="absolute inset-0 w-full">
        {event.images.length > 0 ? (
          <Image
            src={event.images[0]}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/60 to-primary/60" />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-elegant py-20 w-full flex justify-start items-start">
        <div className="max-w-4xl w-full">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/events"
              className="inline-flex items-center space-x-2 text-white hover:text-yellow-500 transition-colors duration-200 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Events</span>
            </Link>
          </div>

          {/* Category Badge */}
          {event.category && < div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary text-white">
              {event.category}
            </span>
          </div>}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {event.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            {event.description}
          </p>

          {/* Event Meta */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col justify-start items-start space-y-2 text-white">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-white" />
                <p className="text-sm text-white/70">Date</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold text-yellow-500">{formatDate(event.date)}</p>
                {event.endDate && (
                  <p className="text-sm text-white/70">
                    to {formatDate(event.endDate)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start space-y-2 text-white">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-white" />
                  <p className="text-sm text-white/70">Location</p>
                </div>
              </div>
              <p className="font-semibold text-yellow-500">{event.location}</p>
            </div>

            <div className="flex flex-col justify-start items-start space-y-2 text-white">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-white" />
                <p className="text-sm text-white/70">Spots available</p>
              </div>
              <p className="font-semibold text-yellow-500">
                {Math.max(0, event.maxParticipants - event.currentParticipants)} spots left
              </p>
            </div>

            <div className="flex flex-col justify-start items-start space-y-2 text-white">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-white" />
                <p className="text-sm text-white/70">Status</p>
              </div>
              <p className="font-semibold text-yellow-500">{event.status}</p>
            </div>
          </div> */}

          {/* Status Badge */}
          {/* <div className="flex flex-wrap gap-4">
            {isUpcoming && (
              <div className="flex flex-col justify-start items-start space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">
                  {daysUntil <= 0 ? 'Registration Closed' :
                    daysUntil === 1 ? 'Tomorrow' :
                      `${daysUntil} days left`}
                </span>
              </div>
            )}

            {event.featured && (
              <div className="flex flex-col justify-start items-start space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Featured Event</span>
              </div>
            )}
          </div> */}
        </div>

      </div>
    </section >
  );
}
