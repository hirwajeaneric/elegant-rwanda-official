import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Rwanda Photo Gallery: Stunning Tours & Travel Moments | Elegant Rwanda",
  description: "Explore our stunning photo gallery showcasing Rwanda's beauty, wildlife, culture, and luxury travel experiences. Discover the magic of Rwanda through our curated collection of travel photography.",
  keywords: "Rwanda photo gallery, gorilla photos, Rwanda wildlife, cultural photos Rwanda, travel photography Rwanda",
  openGraph: {
    title: "Rwanda Photo Gallery: Stunning Tours & Travel Moments | Elegant Rwanda",
    description: "Explore our stunning photo gallery showcasing Rwanda's beauty, wildlife, culture, and luxury travel experiences.",
    type: "website",
    url: "https://elegantrwanda.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <PageWrapper>
      <GalleryHero />
      <div className="container-elegant py-16">
        <GalleryGrid />
      </div>
    </PageWrapper>
  );
}
