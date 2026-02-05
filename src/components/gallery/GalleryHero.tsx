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
    <section className="relative py-24 bg-[url('/leopard-on-car.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Explore{" "}
          <span className="text-yellow-500">Our Services</span> Through Photos
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Explore our fleet of vehicles, places we have been, experience with our previous clients and the services we offer.
        </p>
      </div>
    </section>
  );
}
