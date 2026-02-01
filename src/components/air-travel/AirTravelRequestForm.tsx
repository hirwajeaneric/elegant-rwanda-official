"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { airTravelSchema, type AirTravelForm } from "@/lib/schemas";
import { COUNTRY_NAMES } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Plane, Users, User, Luggage, DollarSign, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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

  useEffect(() => {
    if (tripType === "One-way") {
      setValue("returnDate", undefined);
      setValue("returnTime", "");
    }
  }, [tripType, setValue]);

  const handleServiceChange = (service: "Visa Assistance" | "Airport Pickup" | "Hotel Booking" | "Transportation" | "Other" | "Ticket Booking") => {
    const currentServices = watchedServices;
    if (currentServices.includes(service)) {
      setValue("services", currentServices.filter(s => s !== service));
    } else {
      setValue("services", [...currentServices, service]);
    }
  };

  const onSubmit = async (values: AirTravelForm) => {
    const returnDate =
      values.tripType !== "One-way" && values.returnDate instanceof Date && !Number.isNaN(values.returnDate.getTime())
        ? values.returnDate.toISOString()
        : null;
    try {
      const payload = {
        ...values,
        departureDate: values.departureDate?.toISOString(),
        returnDate,
        returnTime: values.tripType !== "One-way" ? values.returnTime : null,
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
      <div className="mx-auto py-8 bg-[url('/airplane-rwandair.jpg')] bg-cover bg-center bg-no-repeat rounded-0">
        <Card className="text-center py-12 ">
          <CardContent>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-display font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground">
              We&apos;ve received your air travel assistance request and will respond within 2 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 bg-[url('/airplane-rwandair.jpg')] bg-cover bg-center bg-no-repeat rounded-0">
      <div className="text-center max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-display font-bold text-white">
          Request Air Travel Assistance
        </h2>
        <p className="text-lg text-white">
          Let us know how we can help with your travel arrangements
        </p>
      </div>
      <div className="p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6">
          {/* Section 1: Trip Information */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Plane className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Trip Information</CardTitle>
                  <CardDescription>Tell us about your travel plans</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trip Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Trip Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {(["One-way", "Round-trip", "Multi-city"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue("tripType", type)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${tripType === type ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-primary/5"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.tripType && <p className="text-sm text-destructive">{errors.tripType.message}</p>}
              </div>

              <Separator />

              {/* Origin & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <Separator />

              {/* Travel Timing */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Travel Dates & Times *</Label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Departure Date</Label>
                    <Input
                      type="date"
                      {...register("departureDate", { valueAsDate: true })}
                      className="border-gray-300"
                    />
                    {errors.departureDate && <p className="text-sm text-destructive">{errors.departureDate.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Departure Time</Label>
                    <Input
                      type="time"
                      {...register("departureTime")}
                      className="border-gray-300"
                    />
                    {errors.departureTime && <p className="text-sm text-destructive">{errors.departureTime.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Return Date {tripType !== "One-way" ? "*" : "(optional)"}
                    </Label>
                    <Input
                      type="date"
                      {...register("returnDate", { valueAsDate: true })}
                      disabled={tripType === "One-way"}
                      className="border-gray-300 disabled:opacity-50"
                    />
                    {errors.returnDate && <p className="text-sm text-destructive">{errors.returnDate.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Return Time {tripType !== "One-way" ? "*" : "(optional)"}
                    </Label>
                    <Input
                      type="time"
                      {...register("returnTime")}
                      disabled={tripType === "One-way"}
                      className="border-gray-300 disabled:opacity-50"
                    />
                    {errors.returnTime && <p className="text-sm text-destructive">{errors.returnTime.message}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Services Needed */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Services Needed</CardTitle>
                  <CardDescription>Select all services you require</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {([
                  "Ticket Booking",
                  "Visa Assistance",
                  "Airport Pickup",
                  "Hotel Booking",
                  "Transportation",
                  "Other"
                ] as const).map((service) => (
                  <div key={service} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-primary/5 transition-colors">
                    <Checkbox
                      id={service}
                      className="rounded border-gray-300"
                      checked={watchedServices.includes(service)}
                      onCheckedChange={() => handleServiceChange(service)}
                    />
                    <Label htmlFor={service} className="text-sm font-normal cursor-pointer flex-1">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.services && (
                <p className="text-sm text-destructive mt-3">{errors.services.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Section 3: Travel Preferences */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Travel Preferences</CardTitle>
                  <CardDescription>Cabin class and passenger details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Cabin Class *</Label>
                  <RadioGroup
                    value={watch("travelClass")}
                    onValueChange={(value) => setValue("travelClass", value as AirTravelForm["travelClass"], { shouldValidate: true })}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {(["Economy", "Premium Economy", "Business", "First"] as const).map((cls) => (
                      <div key={cls} className="flex items-center space-x-2">
                        <RadioGroupItem value={cls} id={`travelClass-${cls.replace(/\s+/g, "-").toLowerCase()}`} />
                        <Label
                          htmlFor={`travelClass-${cls.replace(/\s+/g, "-").toLowerCase()}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {cls}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.travelClass && <p className="text-sm text-destructive">{errors.travelClass.message}</p>}
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-medium">Number of Passengers *</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Adults</Label>
                      <Input
                        type="number"
                        min="1"
                        {...register("passengers.adults", { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                      {errors.passengers?.adults && <p className="text-sm text-destructive">{errors.passengers.adults.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Children</Label>
                      <Input
                        type="number"
                        min="0"
                        {...register("passengers.children", { valueAsNumber: true })}
                        className="border-gray-300"
                      />
                      {errors.passengers?.children && <p className="text-sm text-destructive">{errors.passengers.children.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Infants</Label>
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
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Traveler Information */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Traveler Information</CardTitle>
                  <CardDescription>Primary traveler and passport details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Select
                    value={watch("travelerDetails.nationality")}
                    onValueChange={(value) => setValue("travelerDetails.nationality", value, { shouldValidate: true })}
                  >
                    <SelectTrigger className="border-gray-300 w-full">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_NAMES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

              <Separator />

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
                  <Label className="text-base font-medium">Passport Expiry Date</Label>
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
            </CardContent>
          </Card>

          {/* Section 5: Luggage */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Luggage className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Luggage Information</CardTitle>
                  <CardDescription>Baggage and special items</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Checked Bags</Label>
                  <Input
                    type="number"
                    min="0"
                    {...register("luggage.checkedBags", { valueAsNumber: true })}
                    className="border-gray-300"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-base font-medium">Cabin Bags</Label>
                  <Input
                    type="number"
                    min="0"
                    {...register("luggage.cabinBags", { valueAsNumber: true })}
                    className="border-gray-300"
                    placeholder="0"
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
            </CardContent>
          </Card>

          {/* Section 6: Budget & Special Requests */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Budget & Special Requests</CardTitle>
                  <CardDescription>Help us provide the best quote</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Section 7: Contact Information */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>How we can reach you</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="contactInfo.name" className="text-base font-medium">
                    Full Name *
                  </Label>
                  <Input
                    {...register("contactInfo.name")}
                    id="contactInfo.name"
                    placeholder="Enter your full name"
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
                  <Select
                    value={watch("contactInfo.country")}
                    onValueChange={(value) => setValue("contactInfo.country", value, { shouldValidate: true })}
                  >
                    <SelectTrigger id="contactInfo.country" className="border-gray-300 w-full">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_NAMES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.contactInfo?.country && (
                    <p className="text-sm text-destructive">{errors.contactInfo.country.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <Card className="border-2  max-w-5xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 rounded-full shadow-lg"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Plane className="h-5 w-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 inline mr-1 text-primary" />
                    We&apos;ll get back to you within 2 hours with a tailored quotation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
