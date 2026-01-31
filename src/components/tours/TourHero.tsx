"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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
  const [sharing, setSharing] = useState(false);
  const descriptionText = stripHtml(tour.description);
  const backgroundImage = tour.images && tour.images.length > 0 ? `url('${tour.images[0]}')` : undefined;

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = descriptionText.length > 200 ? `${descriptionText.slice(0, 197)}...` : descriptionText;
    const shareData: ShareData = {
      title: tour.title,
      text: text || `${tour.title} – ${tour.duration} in ${tour.location}`,
      url,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        toast.success("Thanks for sharing!");
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        await navigator.clipboard?.writeText(url).catch(() => {});
        toast.success("Link copied to clipboard");
      }
    } finally {
      setSharing(false);
    }
  };

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
        <div className="absolute inset-0 bg-linear-to-br from-primary to-secondary" />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 to-black/70" />
      
      {/* Action Buttons */}
      <div className="flex items-center justify-between z-10 container-elegant mt-10 mx-auto w-full p-4">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors text-sm font-medium"
          aria-label="Back to all tours"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tours
        </Link>
        <button
          type="button"
          onClick={handleShare}
          disabled={sharing}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors disabled:opacity-70"
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
              {tour.title} in {tour.location}
            </h1>

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
