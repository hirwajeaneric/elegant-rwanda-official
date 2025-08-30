"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generalInquirySchema, type GeneralInquiryForm } from "@/lib/schemas";
import { toast } from "sonner";

interface GeneralInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GeneralInquiryModal({ open, onOpenChange }: GeneralInquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralInquiryForm>({
    resolver: zodResolver(generalInquirySchema),
  });

  const onSubmit = async (data: GeneralInquiryForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Thank you for your inquiry! We'll get back to you within 24 hours.");
      setIsSubmitted(true);
      reset();
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
      }, 3000);
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Request a Quote
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="form-label">Full Name *</label>
                <Input
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="form-input"
                />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email Address *</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  className="form-input"
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="form-label">Phone Number</label>
                <Input
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="form-input"
                />
                {errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="form-label">Service Interested In *</label>
                <Select onValueChange={() => {
                  // Handle select change
                }}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tours">Luxury Tours</SelectItem>
                    <SelectItem value="Cab Booking">Cab Booking</SelectItem>
                    <SelectItem value="Car Rental">Car Rental</SelectItem>
                    <SelectItem value="Air Travel Assistance">Air Travel Assistance</SelectItem>
                    <SelectItem value="Events">Upcoming Events</SelectItem>
                    <SelectItem value="General">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="form-error">{errors.service.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="form-label">Message *</label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell us about your travel plans and requirements..."
                  rows={4}
                  className="form-input resize-none"
                />
                {errors.message && (
                  <p className="form-error">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Inquiry
                  </>
                )}
              </Button>

              {/* Privacy Note */}
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Inquiry Sent Successfully!
              </h3>
              <p className="text-muted-foreground">
                Thank you for your inquiry. Our travel experts will get back to you within 24 hours with a personalized quote.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
