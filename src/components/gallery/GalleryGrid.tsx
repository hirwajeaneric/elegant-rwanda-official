"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Loader2 } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: string;
  url: string;
  title: string | null;
  alt: string | null;
  category: string | null;
}

const PAGE_SIZE = 24;

export function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const loadImages = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/public/images?page=${pageNum}&limit=${PAGE_SIZE}`
      );
      const data = await res.json();
      if (data.success) {
        setImages(data.images || []);
        const pag = data.pagination;
        if (pag) {
          setTotalPages(pag.pages ?? 1);
          setTotal(pag.total ?? 0);
        }
      }
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages(page);
  }, [page, loadImages]);

  const openLightbox = (image: GalleryImage) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);


  const nextImage = () => {
    if (!selectedImage) return;
    const idx = images.findIndex((img) => img.id === selectedImage.id);
    if (idx >= 0 && idx < images.length - 1) {
      setSelectedImage(images[idx + 1]);
    }
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const idx = images.findIndex((img) => img.id === selectedImage.id);
    if (idx > 0) {
      setSelectedImage(images[idx - 1]);
    }
  };

  const currentIndex = selectedImage
    ? images.findIndex((img) => img.id === selectedImage.id)
    : -1;

  if (loading && images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Featured label */}
      <p className="text-center text-muted-foreground mb-8">
        Showing featured images ({total} total)
      </p>

      {/* Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
              <Image
                src={image.url}
                alt={image.alt || image.title || "Gallery image"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                unoptimized={image.url.startsWith("http")}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    {image.title || "Untitled"}
                  </h3>
                  {image.category && (
                    <p className="text-sm text-white/90">{image.category}</p>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                  aria-label="Like image"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <ShareButton
                  url={typeof window !== "undefined" ? window.location.href : "https://elegantrwanda.com/gallery"}
                  title={image.title || "Rwanda Gallery Image"}
                  description={`Featured image from Rwanda${image.category ? ` - ${image.category}` : ""}`}
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Lightbox – click outside image (backdrop) to close */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative max-w-7xl w-full max-h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              className="relative max-w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || selectedImage.title || "Gallery image"}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                unoptimized={selectedImage.url.startsWith("http")}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
              <h3 className="text-xl font-semibold text-white mb-1">
                {selectedImage.title || "Untitled"}
              </h3>
              {selectedImage.category && (
                <p className="text-white/90 text-sm">{selectedImage.category}</p>
              )}
            </div>

            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <ShareButton
                url={typeof window !== "undefined" ? window.location.href : "https://elegantrwanda.com/gallery"}
                title={selectedImage.title || "Rwanda Gallery Image"}
                description={selectedImage.category ? `Featured - ${selectedImage.category}` : "Featured image from Rwanda"}
                variant="ghost"
                size="sm"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              />
            </div>

            <div className="absolute bottom-4 left-4 z-20 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              {currentIndex >= 0 ? currentIndex + 1 : 1} of {images.length}
            </div>
          </div>
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-xl font-display font-semibold mb-2">
            No featured photos yet
          </h3>
          <p className="text-muted-foreground">
            Check back later for our curated gallery.
          </p>
        </div>
      )}
    </div>
  );
}
