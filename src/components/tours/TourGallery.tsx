"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Tour } from "@/data/tours";
import Image from "next/image";

interface TourGalleryProps {
  tour: Tour;
}

export function TourGallery({ tour }: TourGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      if (selectedImage < tour.images.length - 1) {
        setSelectedImage(selectedImage + 1);
      } else {
        setSelectedImage(0);
      }
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      if (selectedImage === 0) {
        setSelectedImage(tour.images.length - 1);
      } else {
        setSelectedImage(selectedImage - 1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-display font-semibold mb-8">Tour Gallery</h2>
      
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tour.images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-4/3 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
              style={{
                backgroundImage: `url('${image}')`
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                Click to view
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            {tour.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
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
              </>
            )}

            {/* Main Image */}
            <Image
              src={`${tour.images[selectedImage]}`}
              alt={`${tour.title} - Image ${selectedImage + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {tour.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} of {tour.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
