import { PageWrapper } from "@/components/layout/PageWrapper";
import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Rwanda Photo Gallery: Stunning Tours & Travel Moments | Elegant Travel and Tours",
  description:
    "Explore our stunning photo gallery showcasing Rwanda's beauty, wildlife, culture, and luxury travel experiences. Discover the magic of Rwanda through our curated collection of travel photography.",
  path: "gallery",
  keywords:
    "Rwanda photo gallery, gorilla photos, Rwanda wildlife, cultural photos Rwanda, travel photography Rwanda",
  openGraph: {
    title: "Rwanda Photo Gallery: Stunning Tours & Travel Moments | Elegant Travel and Tours",
    description:
      "Explore our stunning photo gallery showcasing Rwanda's beauty, wildlife, culture, and luxury travel experiences.",
    type: "website",
  },
});

const galleryJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]),
];

export default function GalleryPage() {
  return (
    <PageWrapper>
      <JsonLd data={galleryJsonLd} />
      <GalleryPageClient />
    </PageWrapper>
  );
}
