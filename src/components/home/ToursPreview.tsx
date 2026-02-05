"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { getCategoryColor } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/html-sanitizer";

interface TourCategory {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  location: string;
  maxGroupSize: number;
  highlights: string[];
  images: string[];
  category: TourCategory | null;
  featured: boolean;
}

interface ToursPreviewProps {
  tours: Tour[];
  loading: boolean;
}

export function ToursPreview({ tours, loading }: ToursPreviewProps) {
  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-elegant">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          {/* Tours Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
              >
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <Skeleton className="h-5 w-24" />
                </div>
              </article>
            ))}
          </div>

          {/* View More Button Skeleton */}
          <div className="text-center">
            <Skeleton className="h-12 w-48 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (tours.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Explore Our <span className="text-yellow-500">Tours</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover unforgettable adventures across Rwanda&apos;s most beautiful landscapes and cultural heritage.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {tours.slice(0, 3).map((tour) => (
            <article
              key={tour.id}
              className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${tour.images[0] || "/placeholder-tour.jpg"}')`,
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                {tour.category && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className={
                        tour.category.color
                          ? tour.category.color
                          : `${getCategoryColor(tour.category.name)} text-black`
                      }
                    >
                      {tour.category.name}
                    </Badge>
                  </div>
                )}

                {/* Featured Badge */}
                {tour.featured && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-yellow-500 text-white">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  <Link href={`/tours/${tour.slug}`} className="hover:underline">
                    {tour.title}
                  </Link>
                </h3>

                {/* Description */}
                <div
                  className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 prose prose-sm prose-muted max-w-none *:my-0 [&>*:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(tour.description ?? "") }}
                />

                {/* Tour Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Max {tour.maxGroupSize} people</span>
                  </div>
                </div>

                {/* View Details Link */}
                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-all duration-200"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Tours Button */}
        <div className="text-center">
          <Link
            href="/tours"
            className="btn-outline rounded-full w-fit mx-auto px-6 py-3 hover:bg-primary hover:text-white hover:border hover:border-primary hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            View All Tours
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
