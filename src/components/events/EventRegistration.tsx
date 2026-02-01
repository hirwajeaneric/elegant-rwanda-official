"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  Ticket,
  User,
  Loader2,
  Building2,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Event } from "@/data/events";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";

const DIETARY_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Other",
] as const;

interface EventRegistrationProps {
  event: Event;
  isUpcoming: boolean;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  town: string;
  organization: string;
  participants: number;
  dietaryRestrictions: string;
  additionalInfo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  town?: string;
  participants?: string;
  additionalInfo?: string;
}

export function EventRegistration({ event, isUpcoming }: EventRegistrationProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    town: "",
    organization: "",
    participants: 1,
    dietaryRestrictions: "None",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };


  const isRegistrationOpen = new Date() < new Date(event.registrationDeadline);
  const isEventNotClosed = event.status !== 'Closed';
  const isEventNotPast = !event.endDate || new Date() < new Date(event.endDate);
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  // Allow registration if event is upcoming, not closed, not past, and has spots available
  // Registration deadline is a soft deadline - we'll show a warning but still allow registration
  const canRegister = isUpcoming && isEventNotClosed && isEventNotPast && spotsLeft > 0;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.town.trim()) {
      newErrors.town = 'Town is required';
    }

    if (formData.participants < 1) {
      newErrors.participants = 'Number of participants must be at least 1';
    } else if (formData.participants > spotsLeft) {
      newErrors.participants = `Only ${spotsLeft} spots available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const handleRegistration = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsRegistering(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const locationParts = [formData.country, formData.city, formData.town].filter(Boolean);
    const locationLine = locationParts.length > 0 ? `Location: ${locationParts.join(", ")}` : "";
    const specialRequestsParts = [locationLine, formData.additionalInfo].filter(Boolean);
    const specialRequests = specialRequestsParts.join("\n\n") || undefined;

    // Payload matches create-booking EVENT_REGISTRATION: eventId, numberOfParticipants, name, email, phone, organization, specialRequests, dietaryRestrictions
    const payload = {
      eventId: event.id,
      numberOfParticipants: formData.participants,
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization.trim() || undefined,
      specialRequests,
      dietaryRestrictions:
        formData.dietaryRestrictions && formData.dietaryRestrictions !== "None"
          ? formData.dietaryRestrictions
          : undefined,
    };

    try {
      await submitFormToEmail({
        formType: "event-registration",
        data: payload,
        userEmail: formData.email,
        userName: fullName,
        eventId: event.id,
      });

      toast.success("Registration submitted successfully! We will contact you soon.");
      setIsFormOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        town: "",
        organization: "",
        participants: 1,
        dietaryRestrictions: "None",
        additionalInfo: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Registration Card */}
      <Card className="sticky top-8 border-2 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Event Registration</CardTitle>
              <CardDescription>Register to attend this event</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event Status */}
          <div className="flex flex-wrap gap-2">
            {!isUpcoming ? (
              <Badge variant="secondary" className="text-sm gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                Event Completed
              </Badge>
            ) : !canRegister ? (
              <Badge variant="destructive" className="text-sm gap-1 rounded-full">
                <AlertCircle className="h-3.5 w-3.5" />
                {event.status === "Closed"
                  ? "Registration Closed"
                  : !isEventNotPast
                    ? "Event Ended"
                    : spotsLeft <= 0
                      ? "Fully Booked"
                      : "Registration Closed"}
              </Badge>
            ) : !isRegistrationOpen ? (
              <Badge variant="default" className="text-sm gap-1 bg-orange-500 hover:bg-orange-600">
                <AlertCircle className="h-3.5 w-3.5" />
                Late Registration
              </Badge>
            ) : (
              <Badge variant="default" className="text-sm gap-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-3.5 w-3.5" />
                Registration Open
              </Badge>
            )}
          </div>

          {/* Event Quick Info */}
          <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">
                {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} available
              </span>
            </div>
          </div>

          {/* Registration Deadline Warning */}
          {canRegister && !isRegistrationOpen && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Late Registration</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Registration deadline has passed, but spots are still available. Contact us to confirm
                    availability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            {canRegister ? (
              <Button
                onClick={handleRegistration}
                disabled={isRegistering || spotsLeft <= 0}
                className="w-full rounded-full"
                size="lg"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : spotsLeft <= 0 ? (
                  "Fully Booked"
                ) : !isRegistrationOpen ? (
                  "Request Late Registration"
                ) : (
                  "Request Tickets"
                )}
              </Button>
            ) : !isUpcoming ? (
              <Button disabled variant="outline" className="w-full rounded-full" size="lg">
                Event Completed
              </Button>
            ) : (
              <Button disabled variant="outline" className="w-full rounded-full" size="lg">
                {event.status === "Closed"
                  ? "Registration Closed"
                  : !isEventNotPast
                    ? "Event Ended"
                    : "Registration Closed"}
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full rounded-full"
              size="lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Us
            </Button>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3 font-semibold text-lg text-foreground">Share this event</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Event link copied to clipboard!");
                }}
              >
                Copy link
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this event: ${event.title}`)}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, "_blank");
                }}
              >
                Share on X
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ticket className="h-6 w-6 text-primary" />
              Register for {event.title}
            </DialogTitle>
            <DialogDescription>
              Fill in your details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Event Summary */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="mb-3 text-base font-semibold text-foreground">Event details</h4>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="font-medium text-muted-foreground">Date</span>
                  <p className="text-foreground">
                    {formatDate(event.date)}
                    {event.endDate && ` – ${formatDate(event.endDate)}`}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Location</span>
                  <p className="text-foreground">{event.location}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Spots available</span>
                  <p className="text-foreground">{spotsLeft}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Category</span>
                  <p className="text-foreground">{event.category}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="flex text-base items-center gap-2 font-semibold text-foreground">
                <User className="h-5 w-5 text-primary" />
                Personal information
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-destructive" : ""}
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                    placeholder="+250 123 456 789"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization (optional)</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  placeholder="Company or organization"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h4 className="flex text-base items-center gap-2 font-semibold text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Current location
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className={errors.country ? "border-destructive" : ""}
                    placeholder="e.g. Rwanda"
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                    placeholder="e.g. Kigali"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="town">Town / District *</Label>
                  <Input
                    id="town"
                    value={formData.town}
                    onChange={(e) => handleInputChange("town", e.target.value)}
                    className={errors.town ? "border-destructive" : ""}
                    placeholder="Town or district"
                  />
                  {errors.town && (
                    <p className="text-sm text-destructive">{errors.town}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Participation & dietary */}
            <div className="space-y-4">
              <h4 className="flex text-base items-center gap-2 font-semibold text-foreground">
                <Users className="h-5 w-5 text-primary" />
                Participation
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="participants">Number of participants *</Label>
                  <Select
                    value={formData.participants.toString()}
                    onValueChange={(value) =>
                      handleInputChange("participants", parseInt(value, 10))
                    }
                  >
                    <SelectTrigger
                      className={errors.participants ? "border-destructive w-full" : "w-full"}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: Math.min(spotsLeft, 20) },
                        (_, i) => i + 1
                      ).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} participant{num > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.participants && (
                    <p className="text-sm text-destructive">{errors.participants}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Maximum {spotsLeft} spots available
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Dietary restrictions (optional)</Label>
                  <Select
                    value={formData.dietaryRestrictions}
                    onValueChange={(value) =>
                      handleInputChange("dietaryRestrictions", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIETARY_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">
                  Questions or special requirements (optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Accessibility needs, questions, or other notes..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            <Separator />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="flex-1"
                disabled={isRegistering}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isRegistering}>
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit registration"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
