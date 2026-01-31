"use client";

import { useState } from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { Tour } from "@/data/tours";

interface TourBookingProps {
  tour: Tour;
}

export function TourBooking({ tour }: TourBookingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [travelers, setTravelers] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      tour: tour.title,
      travelers: travelers || formData.get("travelers"),
      preferredStartDate: startDate || formData.get("startDate"),
      specialRequests: formData.get("specialRequests"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      await submitFormToEmail({
        formType: "tour-booking",
        data: payload,
        userEmail: String(payload.email || ""),
        userName: String(payload.name || ""),
        tourId: (tour as { id?: string }).id || undefined,
      });
      toast.success("Booking request sent. We’ll send a quote shortly.");
      setIsSubmitted(true);
      e.currentTarget.reset();
      setTravelers("");
      setStartDate("");
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      toast.error("We could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-28">
      <div className="bg-card border border-border rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-display font-semibold mb-4">Book This Tour</h3>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tour Info */}
            <div className="text-sm text-muted-foreground">
              {tour.duration}
            </div>

            {/* Form Fields */}
            <div className="space-y-2 w-full">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Select value={travelers} onValueChange={setTravelers} required>
                <SelectTrigger id="travelers" aria-label="Select number of travelers" className="w-full">
                  <SelectValue placeholder="Select number of travelers" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {Array.from({ length: tour.maxGroupSize }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} {num === 1 ? 'person' : 'people'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="travelers" value={travelers} />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="startDate">Preferred Start Date</Label>
              <Select value={startDate} onValueChange={setStartDate} required>
                <SelectTrigger id="startDate" aria-label="Select preferred start date" className="w-full">
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {tour.availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="startDate" value={startDate} />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                rows={3}
                placeholder="Any special requirements or preferences..."
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Full name"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+250..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-12 py-6 text-lg font-semibold hover:bg-primary/90 shadow-lg hover:shadow-xl w-full rounded-full"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                  Processing...
                </>
              ) : (
                "Request Booking"
              )}
            </Button>

            {/* Contact Info */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Need immediate assistance?</p>
              <div className="flex items-center flex-wrap justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>‭+250 787 095 392‬</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>tours@elegantrwanda.com</span>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Booking Request Sent!
            </h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in this tour. Our travel experts will get back to you within 24 hours with a detailed quote and booking confirmation.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="default"
            >
              Send Another Request
            </Button>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-muted/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">What Happens Next?</h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
            <span>We&apos;ll review your request and send a personalized quote within 24 hours</span>
          </div>
          <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
            <span>Once confirmed, we&apos;ll handle all logistics and provide detailed travel documents</span>
          </div>
          <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
            <span>Our team will be available 24/7 throughout your journey for support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
