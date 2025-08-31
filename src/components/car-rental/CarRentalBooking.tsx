"use client";

import { useState } from "react";
import { Clock, MapPin, CreditCard, Shield, CheckCircle } from "lucide-react";
import type { Vehicle } from "@/data/car-rental";

interface CarRentalBookingProps {
  vehicle: Vehicle;
}

export function CarRentalBooking({ vehicle }: CarRentalBookingProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rentalType: "self-drive",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    passengers: 1,
    driverName: "",
    driverLicense: "",
    driverLicenseExpiry: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Booking request:", { vehicle: vehicle.name, ...formData });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        rentalType: "self-drive",
        startDate: "",
        endDate: "",
        pickupLocation: "",
        dropoffLocation: "",
        passengers: 1,
        driverName: "",
        driverLicense: "",
        driverLicenseExpiry: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    }, 3000);
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };



  if (isSubmitted) {
    return (
      <section className="py-20 bg-green-50">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-green-900 mb-4">
              Booking Request Submitted!
            </h2>
            <p className="text-xl text-green-700 mb-8">
              Thank you for your interest in renting the {vehicle.name}. We&apos;ll review your request and get back to you within 1 hour with a detailed quote and confirmation.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div><strong>Vehicle:</strong> {vehicle.name}</div>
                <div><strong>Rental Type:</strong> {formData.rentalType === "self-drive" ? "Self Drive" : "Chauffeur Driven"}</div>
                <div><strong>Duration:</strong> {calculateDays()} days</div>
                <div><strong>Quote Request:</strong> We&apos;ll provide a detailed quote within 2 hours</div>
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
          {/* Left Column - Booking Form */}
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Book Your Car Rental
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Complete the form below to request a quote for the {vehicle.name}. We&apos;ll provide you with a detailed quotation within 1 hour.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rental Type */}
              <div>
                <label htmlFor="rentalType" className="block text-sm font-medium text-gray-700 mb-2">
                  Rental Type
                </label>
                <select
                  id="rentalType"
                  name="rentalType"
                  value={formData.rentalType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Select rental type"
                >
                  <option value="self-drive">Self Drive</option>
                  <option value="chauffeur">Chauffeur Driven</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Select pickup date"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Select return date"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <select
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Select pickup location"
                  >
                    <option value="">Select Location</option>
                    {vehicle.pickupLocations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    Drop-off Location
                  </label>
                  <select
                    id="dropoffLocation"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Select drop-off location"
                  >
                    <option value="">Select Location</option>
                    {vehicle.pickupLocations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Driver Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-2">
                    Driver Name
                  </label>
                  <input
                    id="driverName"
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter driver name"
                  />
                </div>
                <div>
                  <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700 mb-2">
                    Driver License Number
                  </label>
                  <input
                    id="driverLicense"
                    type="text"
                    name="driverLicense"
                    value={formData.driverLicense}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter driver license number"
                  />
                </div>
              </div>

              {/* License Expiry */}
              <div>
                <label htmlFor="driverLicenseExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                  License Expiry Date
                </label>
                <input
                  id="driverLicenseExpiry"
                  type="date"
                  name="driverLicenseExpiry"
                  value={formData.driverLicenseExpiry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Select driver license expiry date"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special requirements or requests..."
                  aria-label="Enter any special requests or requirements"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-lg"
              >
                Request Quote
              </button>
            </form>
          </div>

          {/* Right Column - Summary & Features */}
          <div className="space-y-8">
            {/* Rental Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                Rental Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-semibold text-gray-900">{vehicle.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-gray-900">{vehicle.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Rate</span>
                  <span className="font-semibold text-yellow-600">Contact for Quote</span>
                </div>
                {formData.startDate && formData.endDate && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">{calculateDays()} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Estimated Total</span>
                      <span className="font-semibold text-yellow-600">Quote Required</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* What&apos;s Included */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-display font-semibold text-green-900 mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {vehicle.includedServices.slice(0, 6).map((service, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose This Vehicle */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-display font-semibold text-blue-900 mb-4">
                Why Choose This Vehicle
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Full Insurance Coverage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">24/7 Roadside Assistance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Flexible Pickup/Drop-off</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">No Hidden Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
