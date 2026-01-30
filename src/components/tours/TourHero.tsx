"use client";

import { MapPin, Share2 } from "lucide-react";

interface TourHeroProps {
  tour: {
    title: string;
    description: string;
    duration: string;
    location: string;
    maxGroupSize: number;
    images: string[];
  };
}

// Strip HTML tags for hero display
function stripHtml(html: string): string {
  if (typeof window === "undefined") {
    // Server-side: simple regex strip
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  }
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export function TourHero({ tour }: TourHeroProps) {
  const descriptionText = stripHtml(tour.description);
  const backgroundImage = tour.images && tour.images.length > 0 ? `url('/${tour.images[0]}')` : undefined;

  return (
    <section className="relative h-full min-h-[600px] overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage
          }}
        />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-black/70" />
      
      {/* Action Buttons */}
      <div className="flex space-x-2 z-10 container-elegant mx-auto w-full justify-end p-4">
        <button 
          className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          aria-label="Share this tour"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-10 md:pb-16">
        <div className="container-elegant">
          <div className="max-w-4xl">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              {tour.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {descriptionText}
            </p>

            {/* Tour Info Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-start">
                <div className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">{tour.duration}</div>
                <div className="text-white/90 text-sm">Duration</div>
              </div>
              <div className="text-start">
                <div className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">{tour.location}</div>
                <div className="text-white/90 text-sm">Location</div>
              </div>
              <div className="text-start">
                <div className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">Max {tour.maxGroupSize}</div>
                <div className="text-white/90 text-sm">Group Size</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center" onClick={() => window.location.href = '#itinerary'}>
                <MapPin className="h-5 w-5 mr-2" />
                View Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
