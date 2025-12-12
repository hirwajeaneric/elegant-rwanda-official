"use client";

import { useState } from "react";
import { Clock, MapPin, CreditCard, Shield, CheckCircle } from "lucide-react";
import type { Vehicle } from "@/data/car-rental";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CarRentalBookingProps {
  vehicle: Vehicle;
}

export function CarRentalBooking({ vehicle }: CarRentalBookingProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        vehicle: vehicle.name,
        vehicleCategory: vehicle.category,
        ...formData,
        rentalDays: calculateDays(),
      };
      
      await submitFormToEmail({
        formType: "car-rental",
        data: bookingData,
        userEmail: formData.email,
        userName: formData.driverName || "Guest",
      });
      
      toast.success("Car rental request received. We'll respond with a quote soon.");
      setIsSubmitted(true);
      
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
    } catch (error) {
      console.error(error);
      toast.error("We could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    <section className="py-30 bg-gray-100" id="booking">
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
              <div className="space-y-2">
                <Label htmlFor="rentalType" className="text-sm font-medium">
                  Rental Type
                </Label>
                <Select 
                  value={formData.rentalType} 
                  onValueChange={(value) => handleInputChange("rentalType", value)}
                  required
                >
                  <SelectTrigger id="rentalType" className="w-full border-gray-300">
                    <SelectValue placeholder="Select rental type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-drive">Self Drive</SelectItem>
                    <SelectItem value="chauffeur">Chauffeur Driven</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    Pickup Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium">
                    Return Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation" className="text-sm font-medium">
                    Pickup Location
                  </Label>
                  <Select
                    value={formData.pickupLocation}
                    onValueChange={(value) => handleInputChange("pickupLocation", value)}
                    required
                  >
                    <SelectTrigger id="pickupLocation" className="w-full border-gray-300">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicle.pickupLocations.map((location, index) => (
                        <SelectItem key={index} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffLocation" className="text-sm font-medium">
                    Drop-off Location
                  </Label>
                  <Select
                    value={formData.dropoffLocation}
                    onValueChange={(value) => handleInputChange("dropoffLocation", value)}
                    required
                  >
                    <SelectTrigger id="dropoffLocation" className="w-full border-gray-300">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicle.pickupLocations.map((location, index) => (
                        <SelectItem key={index} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Driver Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverName" className="text-sm font-medium">
                    Driver Name
                  </Label>
                  <Input
                    id="driverName"
                    type="text"
                    value={formData.driverName}
                    onChange={(e) => handleInputChange("driverName", e.target.value)}
                    placeholder="Enter driver's full name"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverLicense" className="text-sm font-medium">
                    Driver License Number
                  </Label>
                  <Input
                    id="driverLicense"
                    type="text"
                    value={formData.driverLicense}
                    onChange={(e) => handleInputChange("driverLicense", e.target.value)}
                    placeholder="Enter driver's license number"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* License Expiry */}
              <div className="space-y-2">
                <Label htmlFor="driverLicenseExpiry" className="text-sm font-medium">
                  License Expiry Date
                </Label>
                <Input
                  id="driverLicenseExpiry"
                  type="date"
                  value={formData.driverLicenseExpiry}
                  onChange={(e) => handleInputChange("driverLicenseExpiry", e.target.value)}
                  className="w-full border-gray-300"
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="specialRequests" className="text-sm font-medium">
                  Special Requests
                </Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  rows={4}
                  className="w-full border-gray-300 resize-none"
                  placeholder="Any special requirements or requests..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-full hover:bg-primary/90 text-lg"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                    Submitting...
                  </>
                ) : (
                  "Request Quote"
                )}
              </Button>
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
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
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
