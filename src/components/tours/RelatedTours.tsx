"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { getCategoryColor } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/html-sanitizer";

interface TourCategory {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

interface RelatedTour {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  location: string;
  maxGroupSize: number;
  images: string[];
  category: TourCategory | null;
  featured: boolean;
}

interface RelatedToursProps {
  tours: RelatedTour[];
}

export function RelatedTours({ tours }: RelatedToursProps) {
  if (tours.length === 0) return null;

  return (
    <section className="bg-muted/30 py-16">
      <div className="container-elegant">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-semibold mb-4">
            You Might Also Like
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover more amazing tours and experiences in Rwanda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <article
              key={tour.id}
              className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${tour.images[0]})`
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Category Badge - uses category color from API when available */}
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
                  <div className="absolute top-4 right-4">
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
                  className="text-muted-foreground leading-relaxed prose prose-sm max-w-none line-clamp-2 mb-4"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(tour.description) }}
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

                {/* CTA */}
                <div className="flex justify-center">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-all duration-200"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Tours CTA */}
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-200"
          >
            View All Tours
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
