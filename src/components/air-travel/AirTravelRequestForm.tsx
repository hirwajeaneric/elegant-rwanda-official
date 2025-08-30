"use client";

import { useState } from "react";
import { Plane, Calendar, Users, MapPin, FileText, Building2, Route, CheckCircle } from "lucide-react";

export function AirTravelRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: [] as string[],
    arrivalDate: "",
    departureDate: "",
    travelers: 1,
    nationality: "",
    visaType: "",
    pickupLocation: "",
    dropoffLocation: "",
    hotelPreferences: "",
    specialRequests: "",
    contactName: "",
    email: "",
    phone: "",
    urgency: "normal"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceTypeChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(service)
        ? prev.serviceType.filter(s => s !== service)
        : [...prev.serviceType, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Air travel request:", formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        serviceType: [],
        arrivalDate: "",
        departureDate: "",
        travelers: 1,
        nationality: "",
        visaType: "",
        pickupLocation: "",
        dropoffLocation: "",
        hotelPreferences: "",
        specialRequests: "",
        contactName: "",
        email: "",
        phone: "",
        urgency: "normal"
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-green-50">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-green-900 mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-xl text-green-700 mb-8">
              Thank you for your air travel assistance request. Our team will review your requirements 
              and get back to you within 2 hours with a detailed response and next steps.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div><strong>Services Requested:</strong> {formData.serviceType.join(", ") || "None specified"}</div>
                <div><strong>Travelers:</strong> {formData.travelers}</div>
                <div><strong>Arrival Date:</strong> {formData.arrivalDate}</div>
                <div><strong>Urgency:</strong> {formData.urgency}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-elegant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Request Air Travel Assistance
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Complete the form below to request our air travel assistance services. 
              We&apos;ll provide you with a comprehensive response within 2 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Services Required (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "visa", label: "Visa Assistance", icon: FileText },
                    { value: "pickup", label: "Airport Pickup", icon: Plane },
                    { value: "hotel", label: "Hotel Booking", icon: Building2 },
                    { value: "coordination", label: "Travel Coordination", icon: Route }
                  ].map((service) => (
                    <label key={service.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.serviceType.includes(service.value)}
                        onChange={() => handleServiceTypeChange(service.value)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Date
                  </label>
                  <input
                    id="arrivalDate"
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Select arrival date"
                  />
                </div>
                <div>
                  <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <input
                    id="departureDate"
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    aria-label="Select departure date"
                  />
                </div>
              </div>

              {/* Travelers & Nationality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <input
                    id="travelers"
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter number of travelers"
                  />
                </div>
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  <input
                    id="nationality"
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter nationality"
                  />
                </div>
              </div>

              {/* Visa Information */}
              {formData.serviceType.includes("visa") && (
                <div>
                  <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Type Required
                  </label>
                  <select
                    id="visaType"
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Select visa type"
                  >
                    <option value="">Select Visa Type</option>
                    <option value="tourist">Tourist Visa</option>
                    <option value="business">Business Visa</option>
                    <option value="transit">Transit Visa</option>
                    <option value="multiple-entry">Multiple Entry Visa</option>
                  </select>
                </div>
              )}

              {/* Pickup/Dropoff Locations */}
              {formData.serviceType.includes("pickup") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location
                    </label>
                    <input
                      id="pickupLocation"
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      placeholder="e.g., Kigali International Airport"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      aria-label="Enter pickup location"
                    />
                  </div>
                  <div>
                    <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Drop-off Location
                    </label>
                    <input
                      id="dropoffLocation"
                      type="text"
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleInputChange}
                      placeholder="e.g., Hotel name or address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      aria-label="Enter drop-off location"
                    />
                  </div>
                </div>
              )}

              {/* Hotel Preferences */}
              {formData.serviceType.includes("hotel") && (
                <div>
                  <label htmlFor="hotelPreferences" className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Preferences
                  </label>
                  <textarea
                    id="hotelPreferences"
                    name="hotelPreferences"
                    value={formData.hotelPreferences}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Luxury hotel, city center, budget-friendly, specific hotel names..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    aria-label="Enter hotel preferences"
                  />
                </div>
              )}

              {/* Urgency Level */}
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Select urgency level"
                >
                  <option value="normal">Normal (2-3 business days)</option>
                  <option value="urgent">Urgent (24-48 hours)</option>
                  <option value="emergency">Emergency (Same day)</option>
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Additional Information
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any special requirements, accessibility needs, or additional information..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Enter special requests or additional information"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter contact name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Enter phone number"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-lg"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-8">
            {/* What We Offer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                What We Offer
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Plane className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Comprehensive visa assistance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Flexible scheduling options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Group travel coordination</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-700">Nationwide coverage</span>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-display font-semibold text-blue-900 mb-4">
                Response Time
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Normal Requests</span>
                  <span className="font-semibold text-blue-900">2-3 business days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Urgent Requests</span>
                  <span className="font-semibold text-blue-900">24-48 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Emergency Requests</span>
                  <span className="font-semibold text-blue-900">Same day</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-display font-semibold text-green-900 mb-4">
                Why Choose Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Expert visa consultants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Competitive pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Proven track record</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
