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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

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
      services: [],
      arrivalDetails: {
        date: new Date(),
        time: "",
        flightNumber: "",
        airline: "",
      },
      departureDetails: {
        date: new Date(),
        time: "",
        flightNumber: "",
        airline: "",
      },
      numberOfTravelers: 1,
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

  const handleServiceChange = (service: "Visa Assistance" | "Airport Pickup" | "Hotel Booking" | "Transportation" | "Other") => {
    const currentServices = watchedServices;
    if (currentServices.includes(service)) {
      setValue("services", currentServices.filter(s => s !== service));
    } else {
      setValue("services", [...currentServices, service]);
    }
  };

  const onSubmit = async (_data: AirTravelForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Thank you for your air travel assistance request! We&apos;ll get back to you within 2 hours.");
      setIsSubmitted(true);
      reset();
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (_error) {
      toast.error("Failed to send request. Please try again.");
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
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-display font-bold text-foreground">
          Request Air Travel Assistance
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Let us know how we can help with your travel arrangements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Services Required *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {([
                "Visa Assistance",
                "Airport Pickup",
                "Hotel Booking",
                "Transportation",
                "Other"
              ] as const).map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
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

          {/* Number of Travelers */}
          <div className="space-y-3">
            <Label htmlFor="numberOfTravelers" className="text-base font-medium">
              Number of Travelers *
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("numberOfTravelers", { valueAsNumber: true })}
                id="numberOfTravelers"
                type="number"
                min="1"
                max="10"
                className="pl-10"
                aria-label="Enter number of travelers"
              />
            </div>
            {errors.numberOfTravelers && (
              <p className="text-sm text-destructive">{errors.numberOfTravelers.message}</p>
            )}
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <Label htmlFor="preferences" className="text-base font-medium">
              Special Requests or Preferences
            </Label>
            <Textarea
              {...register("preferences")}
              id="preferences"
              placeholder="Any specific requirements, dietary restrictions, accessibility needs, or preferences..."
              className="min-h-[100px] resize-none"
              aria-label="Enter special requests or preferences"
            />
            {errors.preferences && (
              <p className="text-sm text-destructive">{errors.preferences.message}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <Label htmlFor="contactInfo.name" className="text-base font-medium">
              Full Name *
            </Label>
            <Input
              {...register("contactInfo.name")}
              id="contactInfo.name"
              placeholder="Enter your full name"
              aria-label="Enter your full name"
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
            />
            {errors.contactInfo?.country && (
              <p className="text-sm text-destructive">{errors.contactInfo.country.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Submitting Request...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>

          {/* Response Time Info */}
          <div className="text-center">
            <Badge variant="secondary" className="text-sm">
              <Clock className="h-3 w-3 mr-1" />
              Response within 2 hours
            </Badge>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
