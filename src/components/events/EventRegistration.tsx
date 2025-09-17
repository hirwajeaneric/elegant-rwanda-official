"use client";

import { useState } from "react";
import { Calendar, Users, MapPin, CheckCircle, AlertCircle, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/data/events";

interface EventRegistrationProps {
  event: Event;
  isUpcoming: boolean;
}

export function EventRegistration({ event, isUpcoming }: EventRegistrationProps) {
  const [isRegistering, setIsRegistering] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };


  const isRegistrationOpen = new Date() < new Date(event.registrationDeadline);
  const spotsLeft = event.maxParticipants - event.currentParticipants;

  const handleRegistration = () => {
    setIsRegistering(true);
    // Here you would typically open a registration modal or redirect to a form
    // For now, we'll just simulate the action
    setTimeout(() => {
      setIsRegistering(false);
      alert("Registration form would open here");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Registration Card */}
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span>Event Registration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Event Status */}
          <div className="text-start">
            {!isUpcoming ? (
              <Badge variant="secondary" className="text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                Event Completed
              </Badge>
            ) : !isRegistrationOpen ? (
              <Badge variant="destructive" className="text-sm rounded-full">
                <AlertCircle className="h-4 w-4 mr-1" />
                Registration Closed
              </Badge>
            ) : (
              <Badge variant="default" className="text-sm bg-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                Registration Open
              </Badge>
            )}
          </div>

          {/* Event Quick Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{event.location}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                {event.currentParticipants}/{event.maxParticipants} participants
              </span>
            </div>
          </div>

          {/* Spots Available */}
          {isUpcoming && isRegistrationOpen && (
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Spots Available</span>
                <span className="text-sm font-bold text-primary">{spotsLeft}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {spotsLeft <= 5 ? "Hurry! Only a few spots left" : "Registration is filling up fast"}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isUpcoming && isRegistrationOpen ? (
              <Button
                onClick={handleRegistration}
                disabled={isRegistering || spotsLeft <= 0}
                className="w-full rounded-full"
                size="lg"
              >
                {isRegistering ? (
                  "Processing..."
                ) : spotsLeft <= 0 ? (
                  "Fully Booked"
                ) : (
                  "Request Tickets"
                )}
              </Button>
            ) : !isUpcoming ? (
              <Button
                disabled
                variant="outline"
                className="w-full rounded-full"
                size="lg"
              >
                Event Completed
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className="w-full rounded-full"
                size="lg"
              >
                Registration Closed
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full rounded-full"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
          </div>

          {/* Event Highlights */}
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-3">What&apos;s Included</h4>
            <div className="space-y-2">
              {event.highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{highlight}</span>
                </div>
              ))}
              {event.highlights.length > 4 && (
                <p className="text-xs text-gray-500">
                  +{event.highlights.length - 4} more highlights
                </p>
              )}
            </div>
          </div>

          <div className="pt-6">
            <h4 className="font-semibold text-lg text-gray-900 mb-3">Share This Event</h4>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Event link copied to clipboard!");
                }}
              >
                Copy Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this amazing event: ${event.title}`)}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
              >
                Share on Twitter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
