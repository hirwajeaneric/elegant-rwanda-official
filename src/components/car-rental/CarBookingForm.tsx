"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Car, Clock, CheckCircle, User } from "lucide-react";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CarBookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [rentalType, setRentalType] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [passengers, setPassengers] = useState("");
  const [luggage, setLuggage] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("phone");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData: Record<string, string> = {
      rentalType,
      vehicleCategory,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
      passengers,
      luggage,
      specialRequests,
      driverName,
      driverLicense,
      licenseCountry,
      licenseExpiry,
      name,
      phone,
      email,
      preferredContact,
    };

    try {
      await submitFormToEmail({
        formType: "car-rental",
        data: formData,
        userEmail: email,
        userName: name || driverName,
      });
      toast.success("Car rental request received. We’ll respond with a quote soon.");
      setIsSubmitted(true);
      e.currentTarget.reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      console.error(error);
      toast.error("We could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90"
            >
              Submit Another Request
            </Button>
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
              <div className="space-y-2">
                <Label htmlFor="rentalType" className="text-sm font-medium">
                  Rental Type *
                </Label>
                <Select value={rentalType} onValueChange={setRentalType} required>
                  <SelectTrigger id="rentalType" className="w-full border-gray-300">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-drive">Self Drive</SelectItem>
                    <SelectItem value="chauffeur">Chauffeur Driven</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="rentalType" value={rentalType} />
              </div>

              {/* Vehicle Category */}
              <div className="space-y-2">
                <Label htmlFor="vehicleCategory" className="text-sm font-medium">
                  Vehicle Category *
                </Label>
                <Select value={vehicleCategory} onValueChange={setVehicleCategory} required>
                  <SelectTrigger id="vehicleCategory" className="w-full border-gray-300">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="Unique">Unique</SelectItem>
                    <SelectItem value="minivan">Minivan</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="vehicleCategory" value={vehicleCategory} />
              </div>

              {/* Pickup Date */}
              <div className="space-y-2">
                <Label htmlFor="pickupDate" className="text-sm font-medium">
                  Pickup Date *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="date"
                    id="pickupDate"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <Label htmlFor="returnDate" className="text-sm font-medium">
                  Return Date *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="date"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Pickup Time */}
              <div className="space-y-2">
                <Label htmlFor="pickupTime" className="text-sm font-medium">
                  Pickup Time *
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="time"
                    id="pickupTime"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Return Time */}
              <div className="space-y-2">
                <Label htmlFor="returnTime" className="text-sm font-medium">
                  Return Time *
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="time"
                    id="returnTime"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    required
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickupLocation" className="text-sm font-medium">
                  Pickup Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    id="pickupLocation"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required
                    placeholder="Enter pickup address or landmark"
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Return Location */}
              <div className="space-y-2">
                <Label htmlFor="returnLocation" className="text-sm font-medium">
                  Return Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    id="returnLocation"
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    required
                    placeholder="Enter return address or landmark"
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Number of Passengers */}
              <div className="space-y-2">
                <Label htmlFor="passengers" className="text-sm font-medium">
                  Number of Passengers *
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Select value={passengers} onValueChange={setPassengers} required>
                    <SelectTrigger id="passengers" className="w-full pl-10 border-gray-300">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5">5 Passengers</SelectItem>
                      <SelectItem value="6">6+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="passengers" value={passengers} />
                </div>
              </div>

              {/* Luggage */}
              <div className="space-y-2">
                <Label htmlFor="luggage" className="text-sm font-medium">
                  Luggage (Optional)
                </Label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    id="luggage"
                    value={luggage}
                    onChange={(e) => setLuggage(e.target.value)}
                    placeholder="e.g., 2 large suitcases, 1 carry-on"
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-6 space-y-2">
              <Label htmlFor="specialRequests" className="text-sm font-medium">
                Special Requests (Optional)
              </Label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={4}
                placeholder="Any special requirements, accessibility needs, or additional services..."
                className="w-full border-gray-300 resize-none"
              />
            </div>

            {/* Driver Information (for chauffeur service) */}
            <div className="mb-6 p-6 bg-muted/30 rounded-lg border border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 text-primary mr-2" />
                Driver Information (if self-drive)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="driverName" className="text-sm font-medium">
                    Driver&apos;s Full Name *
                  </Label>
                  <Input
                    type="text"
                    id="driverName"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                    placeholder="Enter driver's full name"
                    className="w-full border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverLicense" className="text-sm font-medium">
                    Driver&apos;s License Number *
                  </Label>
                  <Input
                    type="text"
                    id="driverLicense"
                    value={driverLicense}
                    onChange={(e) => setDriverLicense(e.target.value)}
                    required
                    placeholder="Enter driver's license number"
                    className="w-full border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseCountry" className="text-sm font-medium">
                    License Country *
                  </Label>
                  <Input
                    type="text"
                    id="licenseCountry"
                    value={licenseCountry}
                    onChange={(e) => setLicenseCountry(e.target.value)}
                    required
                    placeholder="Country where license was issued"
                    className="w-full border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry" className="text-sm font-medium">
                    License Expiry Date *
                  </Label>
                  <Input
                    type="date"
                    id="licenseExpiry"
                    value={licenseExpiry}
                    onChange={(e) => setLicenseExpiry(e.target.value)}
                    required
                    className="w-full border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                  className="w-full border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredContact" className="text-sm font-medium">
                  Preferred Contact Method
                </Label>
                <Select value={preferredContact} onValueChange={setPreferredContact}>
                  <SelectTrigger id="preferredContact" className="w-full border-gray-300">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="preferredContact" value={preferredContact} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 shadow-lg hover:shadow-xl"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                    Submitting...
                  </>
                ) : (
                  "Submit Rental Request"
                )}
              </Button>
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
