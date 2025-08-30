"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

export function CabTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg",
      rating: 5,
      text: "The cab service was exceptional! My driver was professional, the vehicle was spotless, and they were right on time for my early morning airport transfer. Highly recommend!",
      service: "Airport Transfer"
    },
    {
      name: "Michael Chen",
      role: "Tourist",
      image: "Nyanza-Traditional-Intore-Dancers-1650x1100.jpg",
      rating: 5,
      text: "We used their cab service for a city tour and it was perfect. The driver knew all the best spots and was very knowledgeable about Rwanda's history and culture.",
      service: "City Tour"
    },
    {
      name: "Emma Rodriguez",
      role: "Event Organizer",
      image: "IbyIwacu-Cultural-Village.jpg",
      rating: 5,
      text: "For our corporate event, we needed reliable transportation for 20+ people. Elegant Rwanda delivered perfectly with their fleet of vehicles and professional service.",
      service: "Group Transport"
    },
    {
      name: "David Thompson",
      role: "Local Resident",
      image: "butare-museum-750x450.jpg",
      rating: 5,
      text: "I've been using their cab service for months now. Always reliable, clean vehicles, and friendly drivers. They've become my go-to for all transportation needs.",
      service: "Regular Service"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied customers who have 
            experienced our premium cab services across Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 relative">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Service Badge */}
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {testimonial.service}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={`/${testimonial.image}`}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Successful Trips</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-display font-bold mb-4">
              Ready to Experience the Best Cab Service in Rwanda?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Join our satisfied customers and discover why Elegant Rwanda is the preferred choice 
              for premium transportation services.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Book Your Ride Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
