"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface GalleryHeroProps {
  totalPhotos?: number | null;
  totalCategories?: number | null;
  statsLoading?: boolean;
}

export function GalleryHero({ totalPhotos, totalCategories, statsLoading }: GalleryHeroProps) {
  const photosLabel = totalPhotos != null ? String(totalPhotos) : "—";
  const categoriesLabel = totalCategories != null ? String(totalCategories) : "—";

  return (
    <section className="relative py-24 bg-[url('/pexels-gjpzoom-33707404.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Explore{" "}
          <span className="text-yellow-500">Our Services</span> Through Photos
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
          Explore our fleet of vehicles, places we have been, experience with our previous clients and the services we offer.
        </p>

        {/* Gallery Stats – from API where available, skeleton when loading */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            {statsLoading ? (
              <Skeleton className="h-9 w-12 mx-auto mb-2 bg-white/20" />
            ) : (
              <div className="text-3xl font-bold text-yellow-500 mb-2">{photosLabel}</div>
            )}
            <div className="text-white/90 text-sm">Photos</div>
          </div>
          <div className="text-center">
            {statsLoading ? (
              <Skeleton className="h-9 w-12 mx-auto mb-2 bg-white/20" />
            ) : (
              <div className="text-3xl font-bold text-yellow-500 mb-2">{categoriesLabel}</div>
            )}
            <div className="text-white/90 text-sm">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
            <div className="text-white/90 text-sm">Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-white/90 text-sm">Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}
