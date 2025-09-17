"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import type { Event } from "@/data/events";

interface EventGalleryProps {
  event: Event;
}

export function EventGallery({ event }: EventGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % event.images.length);
    }
  };

  const previousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? event.images.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      previousImage();
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="">
        <div className="text-start mb-8">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Event Gallery
          </h2>
          <p className="text-xl text-start text-gray-600 max-w-3xl">
            Explore images from this event to get a glimpse of what you can expect during your experience.
          </p>
        </div>

        {/* Main Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          {event.images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image}
                alt={`${event.title} - Image ${index + 1}`}
                width={400}
                height={256}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Navigation */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => openLightbox(0)}
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
          >
            View All Images
          </button>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-7xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Main Image */}
              <Image
                src={event.images[selectedImage]}
                alt={`${event.title} - Image ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} of {event.images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
