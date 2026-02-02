"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  review: string;
  service: string;
  image: string | null;
};

export function CabTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/public/testimonials?limit=100");
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials)) {
          // Filter for Cab Booking testimonials
          const cabTestimonials = data.testimonials.filter(
            (t: Testimonial) => t.service === "Cab Booking"
          );
          setTestimonials(cabTestimonials.slice(0, 4)); // Show up to 4 testimonials
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No testimonials available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 relative">
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
                  &ldquo;{testimonial.review}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    {testimonial.location && (
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
          <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-display font-bold mb-4">
              Ready to Experience the Best Cab Service in Rwanda?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Join our satisfied customers and discover why Elegant Travel & Tours is the preferred choice 
              for premium transportation services.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors">
              Book Your Ride Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
