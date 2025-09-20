"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowRight, CheckCircle, LucidePhone, LucideMail } from "lucide-react";
import { generalInquirySchema, type GeneralInquiryForm } from "@/lib/schemas";
import { LucideClock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function CTABanner() {
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
      console.log(data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Thank you for your inquiry! We'll get back to you within 24 hours.");
      setIsSubmitted(true);
      reset();
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again."+error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-[url('/green-hills-of-rwanda.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/70 to-black/60 z-10" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Explore{" "}
              <span className="text-accent">Rwanda</span>?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Don&apos;t wait to start planning your dream adventure. Our travel experts are ready to 
              create a personalized itinerary that matches your interests, schedule, and budget.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span className="text-white/90">Free consultation and planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span className="text-white/90">Personalized quotes within 24 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span className="text-white/90">No booking fees or hidden costs</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span className="text-white/90">Flexible payment options</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
              <div className="space-y-2 text-sm text-white/90">
                <p className="flex items-center space-x-2">
                  <LucidePhone className="h-4 w-4" /> 
                  <span>‭+250 787 095 392‬</span>
                </p>
                <p className="flex items-center space-x-2">
                  <LucideMail className="h-4 w-4" />
                  <span>info@elegantrwanda.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  <LucideClock className="h-4 w-4" />
                  <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-6 text-center">
                  Quick Inquiry
                </h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="form-label">Full Name *</label>
                    <Input
                      {...register("name")}
                      placeholder="Enter your full name"
                      className="form-input border-gray-500"
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
                      className="form-input border-gray-500"
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="form-label">Service Interested In *</label>
                    <select
                      {...register("service")}
                      className="form-input border-gray-500"
                    >
                      <option value="">Select a service</option>
                      <option value="Tours">Unique Tours</option>
                      <option value="Air Ticket Booking">Air Ticket Booking</option>
                      <option value="Cab Booking">Cab Booking</option>
                      <option value="Car Rental">Car Rental</option>
                      <option value="Air Travel Assistance">Air Travel Assistance</option>
                      <option value="Events">Upcoming Events</option>
                      <option value="General">General Inquiry</option>
                    </select>
                    {errors.service && (
                      <p className="form-error">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label">Message *</label>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell us about your travel plans..."
                      rows={4}
                      className="form-input resize-none border-gray-500"
                    />
                    {errors.message && (
                      <p className="form-error">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-3 rounded-full px-6 py-3 hover:bg-white hover:text-primary hover:border hover:border-primary hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Inquiry
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for your inquiry. Our travel experts will get back to you within 24 hours with a personalized quote.
                </p>
                <button
                  
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline rounded-full border-2 border-primary px-6 py-3 hover:bg-white hover:text-primary hover:border hover:border-primary hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
