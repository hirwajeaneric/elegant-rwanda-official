"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { airTravelSchema, type AirTravelForm } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { submitFormToEmail } from "@/lib/client-submit";

export function AirTravelRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AirTravelForm>({
    resolver: zodResolver(airTravelSchema),
    defaultValues: {
      tripType: "Round-trip",
      services: [],
      origin: "",
      destination: "",
      departureDate: new Date(),
      departureTime: "",
      returnDate: undefined,
      returnTime: "",
      travelClass: "Economy",
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      travelerDetails: {
        primaryTravelerName: "",
        nationality: "",
        passportNumber: "",
        passportExpiry: "",
      },
      luggage: {
        checkedBags: 1,
        cabinBags: 1,
        specialItems: "",
      },
      seatPreference: "",
      loyaltyProgram: "",
      budgetRange: "",
      preferences: "",
      contactInfo: {
        name: "",
        email: "",
        phone: "",
        country: "",
      },
    },
  });

  const watchedServices = watch("services");
  const tripType = watch("tripType");

  const handleServiceChange = (service: "Visa Assistance" | "Airport Pickup" | "Hotel Booking" | "Transportation" | "Other" | "Ticket Booking") => {
    const currentServices = watchedServices;
    if (currentServices.includes(service)) {
      setValue("services", currentServices.filter(s => s !== service));
    } else {
      setValue("services", [...currentServices, service]);
    }
  };

  const onSubmit = async (values: AirTravelForm) => {
    try {
      const payload = {
        ...values,
        departureDate: values.departureDate?.toISOString(),
        returnDate: values.returnDate ? values.returnDate.toISOString() : null,
      };

      await submitFormToEmail({
        formType: "air-travel",
        data: payload,
        userEmail: values.contactInfo.email,
        userName: values.contactInfo.name,
      });

      toast.success("Thank you! We’ve received your air travel request and will reply shortly.");
      setIsSubmitted(true);
      reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      toast.error("We could not send your request. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-display font-semibold mb-2">Request Submitted!</h3>
          <p className="text-muted-foreground">
            We&apos;ve received your air travel assistance request and will respond within 2 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto py-8 bg-[url('/airplane-rwandair.jpg')] bg-cover bg-center bg-no-repeat rounded-0">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-white">
          Request Air Travel Assistance
        </h2>
        <p className="text-lg text-white">
          Let us know how we can help with your travel arrangements
        </p>
      </div>
      <div className="p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-screen-lg mx-auto rounded-2xl p-8 border border-border bg-white backdrop-blur-sm">
          {/* Trip Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Trip Type *</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["One-way", "Round-trip", "Multi-city"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue("tripType", type)}
                    className={`rounded-full border px-3 py-2 text-sm transition ${tripType === type ? "bg-primary text-white border-primary" : "bg-white text-slate-700 border-slate-200 hover:border-primary/50"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.tripType && <p className="text-sm text-destructive">{errors.tripType.message}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Origin (City / Airport) *</Label>
              <Input
                {...register("origin")}
                placeholder="Kigali International Airport (KGL)"
                className="border-gray-300"
              />
              {errors.origin && <p className="text-sm text-destructive">{errors.origin.message}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Destination (City / Airport) *</Label>
              <Input
                {...register("destination")}
                placeholder="Your arrival city or airport"
                className="border-gray-300"
              />
              {errors.destination && <p className="text-sm text-destructive">{errors.destination.message}</p>}
            </div>
          </div>

          {/* Travel Timing */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Departure Date *</Label>
              <Input
                type="date"
                {...register("departureDate", { valueAsDate: true })}
                className="border-gray-300"
              />
              {errors.departureDate && <p className="text-sm text-destructive">{errors.departureDate.message}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Departure Time *</Label>
              <Input
                type="time"
                {...register("departureTime")}
                className="border-gray-300"
              />
              {errors.departureTime && <p className="text-sm text-destructive">{errors.departureTime.message}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Return Date {tripType !== "One-way" ? "*" : "(optional)"}</Label>
              <Input
                type="date"
                {...register("returnDate", { valueAsDate: true })}
                disabled={tripType === "One-way"}
                className="border-gray-300"
              />
              {errors.returnDate && <p className="text-sm text-destructive">{errors.returnDate.message}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Return Time {tripType !== "One-way" ? "*" : "(optional)"}</Label>
              <Input
                type="time"
                {...register("returnTime")}
                disabled={tripType === "One-way"}
                className="border-gray-300"
              />
              {errors.returnTime && <p className="text-sm text-destructive">{errors.returnTime.message}</p>}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Services Needed *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {([
                "Ticket Booking",
                "Visa Assistance",
                "Airport Pickup",
                "Hotel Booking",
                "Transportation",
                "Other"
              ] as const).map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    className="rounded-full border-gray-300"
                    checked={watchedServices.includes(service)}
                    onCheckedChange={() => handleServiceChange(service)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
            {errors.services && (
              <p className="text-sm text-destructive">{errors.services.message}</p>
            )}
          </div>

          {/* Cabin & Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Cabin Class *</Label>
              <select
                {...register("travelClass")}
                className="border border-gray-300 rounded-md h-11 px-3 text-sm"
              >
                {["Economy", "Premium Economy", "Business", "First"].map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              {errors.travelClass && <p className="text-sm text-destructive">{errors.travelClass.message}</p>}
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Adults *</Label>
              <Input
                type="number"
                min="1"
                {...register("passengers.adults", { valueAsNumber: true })}
                className="border-gray-300"
              />
              {errors.passengers?.adults && <p className="text-sm text-destructive">{errors.passengers.adults.message}</p>}
            </div>
            <div className="space-y-3 grid grid-cols-2 gap-3">
              <div>
                <Label className="text-base font-medium">Children</Label>
                <Input
                  type="number"
                  min="0"
                  {...register("passengers.children", { valueAsNumber: true })}
                  className="border-gray-300"
                />
                {errors.passengers?.children && <p className="text-sm text-destructive">{errors.passengers.children.message}</p>}
              </div>
              <div>
                <Label className="text-base font-medium">Infants</Label>
                <Input
                  type="number"
                  min="0"
                  {...register("passengers.infants", { valueAsNumber: true })}
                  className="border-gray-300"
                />
                {errors.passengers?.infants && <p className="text-sm text-destructive">{errors.passengers.infants.message}</p>}
              </div>
            </div>
          </div>

          {/* Traveler Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-3 md:col-span-2">
              <Label className="text-base font-medium">Primary Traveler Name *</Label>
              <Input
                {...register("travelerDetails.primaryTravelerName")}
                placeholder="As it appears on passport"
                className="border-gray-300"
              />
              {errors.travelerDetails?.primaryTravelerName && (
                <p className="text-sm text-destructive">{errors.travelerDetails.primaryTravelerName.message}</p>
              )}
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Nationality *</Label>
              <Input
                {...register("travelerDetails.nationality")}
                placeholder="Nationality"
                className="border-gray-300"
              />
              {errors.travelerDetails?.nationality && (
                <p className="text-sm text-destructive">{errors.travelerDetails.nationality.message}</p>
              )}
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Loyalty Program / Number</Label>
              <Input
                {...register("loyaltyProgram")}
                placeholder="Airline program & number (optional)"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Passport Number</Label>
              <Input
                {...register("travelerDetails.passportNumber")}
                placeholder="Passport number"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Passport Expiry</Label>
              <Input
                type="date"
                {...register("travelerDetails.passportExpiry")}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Seat Preference</Label>
              <Input
                {...register("seatPreference")}
                placeholder="Aisle, window, extra legroom, etc."
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Luggage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Checked Bags</Label>
              <Input
                type="number"
                min="0"
                {...register("luggage.checkedBags", { valueAsNumber: true })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Cabin Bags</Label>
              <Input
                type="number"
                min="0"
                {...register("luggage.cabinBags", { valueAsNumber: true })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Special / Oversized Items</Label>
              <Input
                {...register("luggage.specialItems")}
                placeholder="Sports gear, musical instruments, etc."
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Budget & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Budget Range</Label>
              <Input
                {...register("budgetRange")}
                placeholder="e.g., $800 - $1200 per traveler"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-medium">Special Requests</Label>
              <Textarea
                {...register("preferences")}
                placeholder="Accessibility needs, dietary requests, connection preferences, etc."
                className="min-h-[100px] resize-none border-gray-300"
              />
              {errors.preferences && (
                <p className="text-sm text-destructive">{errors.preferences.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-3">
              <Label htmlFor="contactInfo.name" className="text-base font-medium">
                Full Name *
              </Label>
              <Input
                {...register("contactInfo.name")}
                id="contactInfo.name"
                placeholder="Enter your full name"
                aria-label="Enter your full name"
                className="border-gray-300"
              />
              {errors.contactInfo?.name && (
                <p className="text-sm text-destructive">{errors.contactInfo.name.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="contactInfo.email" className="text-base font-medium">
                Email Address *
              </Label>
              <Input
                {...register("contactInfo.email")}
                id="contactInfo.email"
                type="email"
                placeholder="Enter your email address"
                aria-label="Enter your email address"
                className="border-gray-300"
              />
              {errors.contactInfo?.email && (
                <p className="text-sm text-destructive">{errors.contactInfo.email.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="contactInfo.phone" className="text-base font-medium">
                Phone Number *
              </Label>
              <Input
                {...register("contactInfo.phone")}
                id="contactInfo.phone"
                type="tel"
                placeholder="Enter your phone number"
                aria-label="Enter your phone number"
                className="border-gray-300"
              />
              {errors.contactInfo?.phone && (
                <p className="text-sm text-destructive">{errors.contactInfo.phone.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="contactInfo.country" className="text-base font-medium">
                Country *
              </Label>
              <Input
                {...register("contactInfo.country")}
                id="contactInfo.country"
                placeholder="Enter your country"
                aria-label="Enter your country"
                className="border-gray-300"
              />
              {errors.contactInfo?.country && (
                <p className="text-sm text-destructive">{errors.contactInfo.country.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3 rounded-full border border-gray-300"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300 mr-2" />
                Submitting Request...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>

          {/* Response Time Info */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              We&apos;ll get back to you within 2 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
