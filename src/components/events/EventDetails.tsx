"use client";

import { CheckCircle, Calendar, MapPin, Users, Clock, AlertCircle } from "lucide-react";
import type { Event } from "@/data/events";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = new Date(event.date) > new Date();
  const registrationDeadline = new Date(event.registrationDeadline);
  const isRegistrationOpen = new Date() < registrationDeadline;

  return (
    <div className="space-y-12">
      {/* Event Overview */}
      <section>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
          Event Overview
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-xl leading-relaxed mb-6">
            {event.description}
          </p>
        </div>
      </section>

      {/* Event Information */}
      <section>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
          Event Information
        </h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Event Date</h3>
                  <p className="text-gray-600">{formatDate(event.date)}</p>
                  {event.endDate && (
                    <p className="text-gray-600">to {formatDate(event.endDate)}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Group Size</h3>
                  <p className="text-gray-600">
                    {event.currentParticipants} of {event.maxParticipants} participants
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Registration Deadline</h3>
                  <p className="text-gray-600">{formatDate(event.registrationDeadline)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Status</h3>
                  <p className="text-gray-600">{event.status}</p>
                </div>
              </div>

              {!isUpcoming && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <p className="text-yellow-800 font-medium">This event has already occurred</p>
                  </div>
                </div>
              )}

              {isUpcoming && !isRegistrationOpen && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-800 font-medium">Registration is closed</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
          Event Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-700">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
          What&apos;s Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-700">{activity}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
