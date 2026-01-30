"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
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
      <section className="py-20 bg-primary/10">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-primary mb-4">
              Booking Request Submitted!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your interest in renting the {vehicle.name}. We&apos;ll review your request and get back to you within 1 hour with a detailed quote and confirmation.
            </p>
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Request Summary</h3>
              <div className="text-left space-y-2 text-sm text-muted-foreground">
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6" id="booking">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">
          Book this <span className="text-primary">{vehicle.name}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Request a quote for this {vehicle.name}. We&apos;ll respond within 1 hour.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
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
            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90"
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
    </div>
  );
}
