"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventRegistrationSchema, type EventRegistrationForm } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Clock, CheckCircle, Ticket } from "lucide-react";
import { toast } from "sonner";
import { getUpcomingEvents } from "@/data/events";

export function EventsRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const upcomingEvents = getUpcomingEvents();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventRegistrationForm>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      eventId: "",
      numberOfParticipants: 1,
      specialRequests: "",
    },
  });

  const watchedEventId = watch("eventId");
  const selectedEvent = upcomingEvents.find(event => event.id === watchedEventId);

  const onSubmit = async (_data: EventRegistrationForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Event registration submitted successfully! We'll confirm your booking within 24 hours.");
      setIsSubmitted(true);
      reset();
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (_error) {
      toast.error("Failed to submit registration. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-display font-semibold mb-2">Registration Submitted!</h3>
          <p className="text-muted-foreground">
            We&apos;ve received your event registration and will confirm your booking within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-display font-bold text-foreground">
          Register for Events
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Secure your spot for upcoming tours and cultural experiences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Selection */}
          <div className="space-y-3">
            <Label htmlFor="eventId" className="text-base font-medium">
              Select Event *
            </Label>
            <Select
              value={watchedEventId}
              onValueChange={(value) => setValue("eventId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an event to register for" />
              </SelectTrigger>
              <SelectContent>
                {upcomingEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{event.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} • {event.category}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventId && (
              <p className="text-sm text-destructive">{errors.eventId.message}</p>
            )}
          </div>

          {/* Selected Event Details */}
          {selectedEvent && (
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-foreground">{selectedEvent.title}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Max {selectedEvent.maxParticipants} participants</span>
                </div>

              </div>
              <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
            </div>
          )}

          {/* Number of Participants */}
          <div className="space-y-3">
            <Label htmlFor="numberOfParticipants" className="text-base font-medium">
              Number of Participants *
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("numberOfParticipants", { valueAsNumber: true })}
                id="numberOfParticipants"
                type="number"
                min="1"
                max={selectedEvent?.maxParticipants || 20}
                className="pl-10"
                aria-label="Enter number of participants"
              />
            </div>
            {errors.numberOfParticipants && (
              <p className="text-sm text-destructive">{errors.numberOfParticipants.message}</p>
            )}
            {selectedEvent && (
              <p className="text-xs text-muted-foreground">
                Maximum {selectedEvent.maxParticipants} participants per registration
              </p>
            )}
          </div>

          {/* Special Requests */}
          <div className="space-y-3">
            <Label htmlFor="specialRequests" className="text-base font-medium">
              Special Requests or Requirements
            </Label>
            <Textarea
              {...register("specialRequests")}
              id="specialRequests"
              placeholder="Any dietary restrictions, accessibility needs, or special requirements..."
              className="min-h-[100px] resize-none"
              aria-label="Enter special requests or requirements"
            />
            {errors.specialRequests && (
              <p className="text-sm text-destructive">{errors.specialRequests.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !watchedEventId}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Submitting Registration...
              </>
            ) : (
              <>
                <Ticket className="h-5 w-5 mr-2" />
                Register for Event
              </>
            )}
          </Button>

          {/* Registration Info */}
          <div className="text-center space-y-2">
            <Badge variant="secondary" className="text-sm">
              <Clock className="h-3 w-3 mr-1" />
              Confirmation within 24 hours
            </Badge>
            <p className="text-xs text-muted-foreground">
              Your registration will be confirmed via email with detailed event information
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
