"use client";

import { useState } from "react";
import { Calendar, Users, MapPin, CheckCircle, AlertCircle, Ticket, User, MapPin as LocationIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Event } from "@/data/events";
import { submitFormToEmail } from "@/lib/client-submit";
import { toast } from "sonner";

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
  participants: number;
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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    town: '',
    participants: 1,
    additionalInfo: ''
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

    try {
      const registrationData = {
        ...formData,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventEndDate: event.endDate,
        eventLocation: event.location,
        registrationDate: new Date().toISOString()
      };

      await submitFormToEmail({
        formType: "event-registration",
        data: registrationData,
        userEmail: formData.email,
        userName: `${formData.firstName} ${formData.lastName}`.trim(),
        eventId: event.id,
      });
      
      toast.success('Registration submitted successfully! We will contact you soon.');
      setIsFormOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        town: '',
        participants: 1,
        additionalInfo: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Registration Card */}
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span>Event Registration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Event Status */}
          <div className="text-start">
            {!isUpcoming ? (
              <Badge variant="secondary" className="text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                Event Completed
              </Badge>
            ) : !canRegister ? (
              <Badge variant="destructive" className="text-sm rounded-full">
                <AlertCircle className="h-4 w-4 mr-1" />
                {event.status === 'Closed' ? 'Registration Closed' : 
                 !isEventNotPast ? 'Event Ended' : 
                 spotsLeft <= 0 ? 'Fully Booked' :
                 'Registration Closed'}
              </Badge>
            ) : !isRegistrationOpen ? (
              <Badge variant="default" className="text-sm bg-orange-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                Late Registration
              </Badge>
            ) : (
              <Badge variant="default" className="text-sm bg-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                Registration Open
              </Badge>
            )}
          </div>

          {/* Event Quick Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{event.location}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                {event.currentParticipants}/{event.maxParticipants} participants
              </span>
            </div>
          </div>

          {/* Registration Deadline Warning */}
          {canRegister && !isRegistrationOpen && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Late Registration</p>
                  <p className="text-xs text-orange-700">
                    Registration deadline has passed, but spots are still available. 
                    Contact us to confirm availability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spots Available */}
          {canRegister && (
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Spots Available</span>
                <span className="text-sm font-bold text-primary">{spotsLeft}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {spotsLeft <= 5 ? "Hurry! Only a few spots left" : "Registration is filling up fast"}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {canRegister ? (
              <Button
                onClick={handleRegistration}
                disabled={isRegistering || spotsLeft <= 0}
                className="w-full rounded-full"
                size="lg"
              >
                {isRegistering ? (
                  "Processing..."
                ) : spotsLeft <= 0 ? (
                  "Fully Booked"
                ) : !isRegistrationOpen ? (
                  "Request Late Registration"
                ) : (
                  "Request Tickets"
                )}
              </Button>
            ) : !isUpcoming ? (
              <Button
                disabled
                variant="outline"
                className="w-full rounded-full"
                size="lg"
              >
                Event Completed
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className="w-full rounded-full"
                size="lg"
              >
                {event.status === 'Closed' ? 'Registration Closed' : 
                 !isEventNotPast ? 'Event Ended' : 
                 'Registration Closed'}
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full rounded-full"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
          </div>

          {/* Event Highlights */}
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-3">What&apos;s Included</h4>
            <div className="space-y-2">
              {event.highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{highlight}</span>
                </div>
              ))}
              {event.highlights.length > 4 && (
                <p className="text-xs text-gray-500">
                  +{event.highlights.length - 4} more highlights
                </p>
              )}
            </div>
          </div>

          <div className="pt-6">
            <h4 className="font-semibold text-lg text-gray-900 mb-3">Share This Event</h4>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Event link copied to clipboard!");
                }}
              >
                Copy Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this amazing event: ${event.title}`)}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
              >
                Share on Twitter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Ticket className="h-6 w-6 text-primary" />
              <span>Register for {event.title}</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Event Information Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Event Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date:</span> {formatDate(event.date)}
                  {event.endDate && (
                    <span> - {formatDate(event.endDate)}</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {event.location}
                </div>
                <div>
                  <span className="font-medium">Available Spots:</span> {spotsLeft}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {event.category}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <LocationIcon className="h-5 w-5" />
                <span>Current Location</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={errors.country ? 'border-red-500' : ''}
                    placeholder="Enter your country"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="town">Town/District *</Label>
                  <Input
                    id="town"
                    value={formData.town}
                    onChange={(e) => handleInputChange('town', e.target.value)}
                    className={errors.town ? 'border-red-500' : ''}
                    placeholder="Enter your town/district"
                  />
                  {errors.town && (
                    <p className="text-red-500 text-sm mt-1">{errors.town}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Event Participation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participation Details</span>
              </h4>
              
              <div>
                <Label htmlFor="participants">Number of Participants *</Label>
                <Select
                  value={formData.participants.toString()}
                  onValueChange={(value) => handleInputChange('participants', parseInt(value))}
                >
                  <SelectTrigger className={errors.participants ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select number of participants" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(spotsLeft, 10) }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} participant{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.participants && (
                  <p className="text-red-500 text-sm mt-1">{errors.participants}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Maximum {spotsLeft} spots available
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Additional Information</h4>
              
              <div>
                <Label htmlFor="additionalInfo">Questions or Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any questions, special requirements, or additional information you'd like to share..."
                  rows={4}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="flex-1"
                disabled={isRegistering}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
