"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Car, Clock, CheckCircle } from "lucide-react";

export function CabRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your API
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-primary/5">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 text-green-700">
              Request Submitted Successfully!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your cab booking request. We&apos;ll get back to you within 30 minutes 
              with a detailed quotation and booking confirmation.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Request Your <span className="text-primary">Cab Service</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we&apos;ll provide you with a detailed quotation within 30 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-muted/30 rounded-2xl p-8 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                  Service Type *
                </label>
                <select
                  id="serviceType"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select service type"
                >
                  <option value="">Select Service</option>
                  <option value="airport-transfer">Airport Transfer</option>
                  <option value="city-tour">City Tour</option>
                  <option value="intercity">Intercity Travel</option>
                  <option value="event-transport">Event Transport</option>
                  <option value="business-travel">Business Travel</option>
                  <option value="sightseeing">Sightseeing Tour</option>
                </select>
              </div>

              {/* Vehicle Type */}
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium mb-2">
                  Vehicle Type *
                </label>
                <select
                  id="vehicleType"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select vehicle type"
                >
                  <option value="">Select Vehicle</option>
                  <option value="sedan">Sedan (4 passengers)</option>
                  <option value="suv">SUV (6 passengers)</option>
                  <option value="minivan">Minivan (8 passengers)</option>
                  <option value="luxury">Luxury Vehicle</option>
                </select>
              </div>

              {/* Pickup Location */}
              <div>
                <label htmlFor="pickupLocation" className="block text-sm font-medium mb-2">
                  Pickup Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="pickupLocation"
                    required
                    placeholder="Enter pickup address or landmark"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Drop-off Location */}
              <div>
                <label htmlFor="dropoffLocation" className="block text-sm font-medium mb-2">
                  Drop-off Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="dropoffLocation"
                    required
                    placeholder="Enter destination address or landmark"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Pickup Date */}
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium mb-2">
                  Pickup Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    id="pickupDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Pickup Time */}
              <div>
                <label htmlFor="pickupTime" className="block text-sm font-medium mb-2">
                  Pickup Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="time"
                    id="pickupTime"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Number of Passengers */}
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium mb-2">
                  Number of Passengers *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select
                    id="passengers"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Select number of passengers"
                  >
                    <option value="">Select</option>
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                    <option value="6">6+ Passengers</option>
                  </select>
                </div>
              </div>

              {/* Luggage */}
              <div>
                <label htmlFor="luggage" className="block text-sm font-medium mb-2">
                  Luggage (Optional)
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="luggage"
                    placeholder="e.g., 2 large suitcases, 1 carry-on"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <label htmlFor="specialRequests" className="block text-sm font-medium mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                rows={4}
                placeholder="Any special requirements, accessibility needs, or additional services..."
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="preferredContact" className="block text-sm font-medium mb-2">
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select preferred contact method"
                >
                  <option value="phone">Phone Call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Request for Quotation
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                We&apos;ll respond within 30 minutes with a detailed quote and booking options.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
