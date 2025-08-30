"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart } from "lucide-react";
import Image from "next/image";

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; category: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const galleryData = {
    "Wildlife": [
      { src: "volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg", title: "Mountain Gorilla", category: "Wildlife" },
      { src: "giraffe-at-akagera-national-park_Photo-from-Getty-Images.jpg", title: "Giraffe at Akagera", category: "Wildlife" },
      { src: "COPYRIGHT_HoneyTrek_20230901-6_Kwita.jpg", title: "Wildlife Encounter", category: "Wildlife" },
      { src: "Sun-bird-rwanda-750x450.jpg", title: "Sun Bird", category: "Wildlife" },
    ],
    "Landscapes": [
      { src: "green-hills-of-rwanda.jpg", title: "Green Hills of Rwanda", category: "Landscapes" },
      { src: "Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg", title: "Virunga Mountains", category: "Landscapes" },
      { src: "landscape-on-edge-of-lake-kivu-rwanda-east-africa.jpg", title: "Lake Kivu", category: "Landscapes" },
      { src: "Visit-Rwanda-Crater-Lake-Volcanoes-e1533416621808-1920x1267.jpg", title: "Crater Lake", category: "Landscapes" },
    ],
    "Culture": [
      { src: "Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg", title: "Traditional Ceremony", category: "Culture" },
      { src: "Nyanza-Traditional-Intore-Dancers-1650x1100.jpg", title: "Traditional Dancers", category: "Culture" },
      { src: "IbyIwacu-Cultural-Village.jpg", title: "Cultural Village", category: "Culture" },
      { src: "butare-museum-750x450.jpg", title: "Butare Museum", category: "Culture" },
    ],
    "Accommodation": [
      { src: "Bisate-Lodge-Image-from-Arcadiasafaris-1024x499.jpg", title: "Bisate Lodge", category: "Accommodation" },
      { src: "kigali-serena-hotel.jpg", title: "Kigali Serena Hotel", category: "Accommodation" },
      { src: "hotel-exterior.jpg", title: "Luxury Hotel", category: "Accommodation" },
      { src: "hotel-exterior-daytime.jpg", title: "Hotel Exterior", category: "Accommodation" },
    ],
    "Food & Cuisine": [
      { src: "Foods-to-Try-in-Rwanda.jpg", title: "Traditional Foods", category: "Food & Cuisine" },
      { src: "Local-cuisine.jpg", title: "Local Cuisine", category: "Food & Cuisine" },
      { src: "rwandan-coffee_Image-from-getty-images.avif", title: "Rwandan Coffee", category: "Food & Cuisine" },
    ],
    "City & Architecture": [
      { src: "kigali.jpeg", title: "Kigali City", category: "City & Architecture" },
      { src: "Kigali-Convention-Center-Credits-to-Arcadiasafaris.jpg", title: "Convention Center", category: "City & Architecture" },
      { src: "Kandt-House-Museum-of-Natural-History-Photo-from-Arcadiasafaris1024x683.jpg", title: "Kandt House Museum", category: "City & Architecture" },
    ]
  };

  const categories = Object.keys(galleryData);
  const allImages = Object.values(galleryData).flat();

  const filteredImages = activeCategory === "all" 
    ? allImages 
    : galleryData[activeCategory as keyof typeof galleryData] || [];

  const openLightbox = (image: { src: string; title: string; category: string }) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Photos ({allImages.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category} ({galleryData[category as keyof typeof galleryData].length})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={`/${image.src}`}
                alt={image.title}
                fill
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm text-white/90">{image.category}</p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors" aria-label="Like image">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors" aria-label="Share image">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Image */}
            <div className="relative">
              <Image
                src={`/${selectedImage.src}`}
                alt={selectedImage.title}
                fill
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />  
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-white/90 text-sm">{selectedImage.category}</p>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors" aria-label="Download image">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors" aria-label="Share image">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              {filteredImages.findIndex(img => img.src === selectedImage.src) + 1} of {filteredImages.length}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-xl font-display font-semibold mb-2">No photos found</h3>
          <p className="text-muted-foreground mb-6">
            Try selecting a different category or browse all photos.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Photos
          </button>
        </div>
      )}
    </div>
  );
}
