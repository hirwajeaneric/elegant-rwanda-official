"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Car, Clock, CheckCircle } from "lucide-react";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CabRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [serviceType, setServiceType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [passengers, setPassengers] = useState("");
  const [luggage, setLuggage] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("phone");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      await submitFormToEmail({
        formType: "cab-booking",
        data: payload,
        userEmail: String(formData.get("email") || ""),
        userName: String(formData.get("name") || ""),
      });
      toast.success("Cab request received. We’ll confirm with a quotation soon.");
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
              Request Submitted Successfully!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your cab booking request. We&apos;ll get back to you within 30 minutes 
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
              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-sm font-medium">
                  Service Type *
                </Label>
                <Select value={serviceType} onValueChange={setServiceType} required>
                  <SelectTrigger id="serviceType" className="w-full border-gray-300">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airport-transfer">Airport Transfer</SelectItem>
                    <SelectItem value="city-tour">City Tour</SelectItem>
                    <SelectItem value="intercity">Intercity Travel</SelectItem>
                    <SelectItem value="event-transport">Event Transport</SelectItem>
                    <SelectItem value="business-travel">Business Travel</SelectItem>
                    <SelectItem value="sightseeing">Sightseeing Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="text-sm font-medium">
                  Vehicle Type *
                </Label>
                <Select value={vehicleType} onValueChange={setVehicleType} required>
                  <SelectTrigger id="vehicleType" className="w-full border-gray-300">
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan (4 passengers)</SelectItem>
                    <SelectItem value="suv">SUV (6 passengers)</SelectItem>
                    <SelectItem value="minivan">Minivan (8 passengers)</SelectItem>
                    <SelectItem value="Unique">Unique Vehicle</SelectItem>
                  </SelectContent>
                </Select>
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

              {/* Drop-off Location */}
              <div className="space-y-2">
                <Label htmlFor="dropoffLocation" className="text-sm font-medium">
                  Drop-off Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    id="dropoffLocation"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    required
                    placeholder="Enter destination address or landmark"
                    className="w-full pl-10 border-gray-300"
                  />
                </div>
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-12 py-6 text-lg font-semibold hover:bg-primary/90 shadow-lg hover:shadow-xl w-full rounded-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request for Quotation"
                )}
              </Button>
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
