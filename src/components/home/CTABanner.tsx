"use client";

import { CheckCircle, LucideMail, LucidePhone } from "lucide-react";
import { LucideClock } from "lucide-react";
import ContactForm from "../forms/ContactForm";

export function CTABanner() {
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
                  <span>+250 787 095 392</span>
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
          <div className="flex justify-start items-start p-4 md:p-8 gap-4 flex-col bg-white rounded-lg">
            <h3 className="text-2xl font-display font-semibold mb-6">Quick Inquiry</h3>
          <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
