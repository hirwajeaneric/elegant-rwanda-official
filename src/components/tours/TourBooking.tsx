"use client";

import { useState } from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";

import type { Tour } from "@/data/tours";

interface TourBookingProps {
  tour: Tour;
}

export function TourBooking({ tour }: TourBookingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
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
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
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
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
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
                rows={3}
                placeholder="Any special requirements or preferences..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
              />
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
                  <span>+250 788 123 456</span>
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
