"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import type { Vehicle } from "@/data/car-rental";

interface CarRentalGalleryHeroProps {
  vehicle: Vehicle;
}

export function CarRentalGalleryHero({ vehicle }: CarRentalGalleryHeroProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (lightboxIndex < vehicle.images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else {
      setLightboxIndex(0);
    }
  };

  const previousImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else {
      setLightboxIndex(vehicle.images.length - 1);
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

  const mainImage = vehicle.images[selectedImageIndex] || vehicle.images[0];
  const thumbnailImages = vehicle.images;

  return (
    <>
      <section className="relative bg-white py-8">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Image - Left Side (10 columns on desktop, full width on mobile) */}
            <div className="lg:col-span-10 order-1 lg:order-1">
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(selectedImageIndex)}
              >
                <Image
                  src={mainImage}
                  alt={`${vehicle.name} - Main view`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Thumbnails - Right Side on desktop, Horizontal grid on mobile */}
            <div className="lg:col-span-2 order-2 lg:order-2">
              {/* Desktop: Vertical column */}
              <div className="hidden lg:flex flex-col gap-3 justify-start h-full">
                {thumbnailImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "ring-4 ring-primary scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${vehicle.name} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: Horizontal 5-column grid */}
              <div className="lg:hidden grid grid-cols-5 gap-2">
                {thumbnailImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "ring-2 ring-primary scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${vehicle.name} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
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
            {vehicle.images.length > 1 && (
              <>
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
              </>
            )}

            {/* Main Image */}
            <Image
              src={vehicle.images[lightboxIndex]}
              alt={`${vehicle.name} - Image ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {vehicle.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {lightboxIndex + 1} of {vehicle.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
