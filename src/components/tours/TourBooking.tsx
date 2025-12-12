"use client";

import { useState } from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";

import type { Tour } from "@/data/tours";

interface TourBookingProps {
  tour: Tour;
}

export function TourBooking({ tour }: TourBookingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      tour: tour.title,
      travelers: formData.get("travelers"),
      preferredStartDate: formData.get("startDate"),
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
      });
      toast.success("Booking request sent. We’ll send a quote shortly.");
      setIsSubmitted(true);
      e.currentTarget.reset();
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
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-foreground mb-2">
                Number of Travelers
              </label>
              <select
                id="travelers"
                name="travelers"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                aria-label="Select number of travelers"
              >
                {Array.from({ length: tour.maxGroupSize }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-foreground mb-2">
                Preferred Start Date
              </label>
              <select
                id="startDate"
                name="startDate"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                aria-label="Select preferred start date"
              >
                <option value="">Select a date</option>
                {tour.availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                rows={3}
                placeholder="Any special requirements or preferences..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder="+250..."
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-semibold py-3 rounded-full hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto" />
                  Processing...
                </>
              ) : (
                "Request Booking"
              )}
            </button>

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
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Booking Request Sent!
            </h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in this tour. Our travel experts will get back to you within 24 hours with a detailed quote and booking confirmation.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send Another Request
            </button>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-muted/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">What Happens Next?</h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>We&apos;ll review your request and send a personalized quote within 24 hours</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>Once confirmed, we&apos;ll handle all logistics and provide detailed travel documents</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span>Our team will be available 24/7 throughout your journey for support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
