"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Car, Clock, CheckCircle, User } from "lucide-react";

export function CarBookingForm() {
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
              Booking Request Submitted!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your car rental request. We&apos;ll get back to you within 1 hour 
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
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Book Your <span className="text-primary">Car Rental</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we&apos;ll provide you with a detailed quotation within 1 hour.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Rental Type */}
              <div>
                <label htmlFor="rentalType" className="block text-sm font-medium mb-2">
                  Rental Type *
                </label>
                <select
                  id="rentalType"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select rental type"
                >
                  <option value="">Select Type</option>
                  <option value="self-drive">Self Drive</option>
                  <option value="chauffeur">Chauffeur Driven</option>
                </select>
              </div>

              {/* Vehicle Category */}
              <div>
                <label htmlFor="vehicleCategory" className="block text-sm font-medium mb-2">
                  Vehicle Category *
                </label>
                <select
                  id="vehicleCategory"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select vehicle category"
                >
                  <option value="">Select Category</option>
                  <option value="economy">Economy</option>
                  <option value="compact">Compact</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="minivan">Minivan</option>
                  <option value="adventure">Adventure</option>
                </select>
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

              {/* Return Date */}
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium mb-2">
                  Return Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    id="returnDate"
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

              {/* Return Time */}
              <div>
                <label htmlFor="returnTime" className="block text-sm font-medium mb-2">
                  Return Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="time"
                    id="returnTime"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
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

              {/* Return Location */}
              <div>
                <label htmlFor="returnLocation" className="block text-sm font-medium mb-2">
                  Return Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="returnLocation"
                    required
                    placeholder="Enter return address or landmark"
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

            {/* Driver Information (for chauffeur service) */}
            <div className="mb-6 p-6 bg-muted/30 rounded-lg border border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 text-primary mr-2" />
                Driver Information (if self-drive)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="driverName" className="block text-sm font-medium mb-2">
                    Driver&apos;s Full Name *
                  </label>
                  <input
                    type="text"
                    id="driverName"
                    required
                    placeholder="Enter driver's full name"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="driverLicense" className="block text-sm font-medium mb-2">
                    Driver&apos;s License Number *
                  </label>
                  <input
                    type="text"
                    id="driverLicense"
                    required
                    placeholder="Enter driver's license number"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="licenseCountry" className="block text-sm font-medium mb-2">
                    License Country *
                  </label>
                  <input
                    type="text"
                    id="licenseCountry"
                    required
                    placeholder="Country where license was issued"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="licenseExpiry" className="block text-sm font-medium mb-2">
                    License Expiry Date *
                  </label>
                  <input
                    type="date"
                    id="licenseExpiry"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
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
                className="bg-primary text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Rental Request
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                We&apos;ll respond within 1 hour with a detailed quote and booking options.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
