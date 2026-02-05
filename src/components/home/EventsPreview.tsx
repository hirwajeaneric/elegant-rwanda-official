"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, MapPin, Clock, ArrowRight } from "lucide-react";

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  endDate?: string | null;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  category: string;
  status: string;
  images: string[];
  featured: boolean;
  registrationDeadline: string;
  time: string;
  price: number;
}

interface EventsPreviewProps {
  events: Event[];
  loading: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getDaysUntil = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateString);
  eventDate.setHours(0, 0, 0, 0);
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const isUpcoming = (dateString: string) => {
  return new Date(dateString) > new Date();
};

export function EventsPreview({ events, loading }: EventsPreviewProps) {
  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-elegant">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          {/* Events Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border-2 border-transparent overflow-hidden"
              >
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* View More Button Skeleton */}
          <div className="text-center">
            <Skeleton className="h-12 w-52 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  // Filter to show only upcoming events
  const upcomingEvents = events.filter((e) => isUpcoming(e.date)).slice(0, 3);

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Upcoming <span className="text-yellow-500">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join exclusive group tours and cultural events for a shared adventure experience across Rwanda.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {upcomingEvents.map((event) => {
            const eventIsUpcoming = isUpcoming(event.date);
            const daysUntil = getDaysUntil(event.date);

            return (
              <div
                key={event.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${event.featured ? "border-yellow-400" : "border-transparent"
                  }`}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  {event.images.length > 0 ? (
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url('${event.images[0]}')`,
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/40" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                  {event.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                        Featured Event
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${!eventIsUpcoming
                          ? "bg-gray-500 text-white"
                          : daysUntil <= 7
                            ? "bg-red-500 text-white"
                            : daysUntil <= 30
                              ? "bg-orange-500 text-white"
                              : "bg-green-500 text-white"
                        }`}
                    >
                      {!eventIsUpcoming
                        ? "Past Event"
                        : daysUntil <= 0
                          ? "Registration Closed"
                          : daysUntil === 1
                            ? "Tomorrow"
                            : `${daysUntil} days left`}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

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
                      <span>
                        {Math.max(0, event.maxParticipants - event.currentParticipants)} spots
                        available
                      </span>
                    </div>
                    {event.time && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>

                  {/* View Details Link */}
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-all duration-200"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Link
            href="/events"
            className="btn-outline rounded-full w-fit mx-auto px-6 py-3 hover:bg-primary hover:text-white hover:border hover:border-primary hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            View All Events
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
