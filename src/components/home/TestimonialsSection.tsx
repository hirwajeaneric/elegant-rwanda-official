"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TestimonialItem {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  review: string;
  service: string;
  image: string | null;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/public/testimonials");
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="section-padding bg-linear-to-br from-secondary/10 to-primary/10">
        <div className="container-elegant">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          {/* Testimonial Card Skeleton */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-20 relative">
              <div className="text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-6 rounded-sm" />
                  ))}
                </div>
                <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-2" />
                <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-2" />
                <Skeleton className="h-5 w-3/4 max-w-2xl mx-auto mb-8" />
                <div className="flex items-center justify-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full shrink-0" />
                  <div className="text-left space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-3 h-3 rounded-full" />
              ))}
            </div>
          </div>

          {/* Trust Indicators Skeleton */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-9 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding bg-linear-to-br from-secondary/10 to-primary/10">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What Our{" "}
            <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about
            their experiences with Elegant Travel & Tours.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Quote className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-20 relative">
            <div className="text-center">
              {/* Rating Stars */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < current.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed italic">
                &quot;{current.review}&quot;
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                  {current.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">{current.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {current.location ?? "—"}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {current.service} Service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white hover:text-primary border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center rounded-full px-3 py-3"
            onClick={prevTestimonial}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white hover:text-primary border hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center rounded-full px-3 py-3"
            onClick={nextTestimonial}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={testimonials[index].id}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-white hover:bg-primary/50"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
