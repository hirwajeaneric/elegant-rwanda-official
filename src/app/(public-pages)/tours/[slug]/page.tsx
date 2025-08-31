import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TourHero } from "@/components/tours/TourHero";
import { TourDetails } from "@/components/tours/TourDetails";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourGallery } from "@/components/tours/TourGallery";
import { TourBooking } from "@/components/tours/TourBooking";
import { RelatedTours } from "@/components/tours/RelatedTours";
import { getTourBySlug, getToursByCategory } from "@/data/tours";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  
  if (!tour) {
    return {
      title: "Tour Not Found | Elegant Rwanda",
    };
  }

  return {
    title: tour.metaTitle || tour.title,
    description: tour.metaDescription || tour.description,
    keywords: tour.highlights.join(", ") + ", " + tour.category + ", Rwanda tours",
    openGraph: {
      title: tour.metaTitle || tour.title,
      description: tour.metaDescription || tour.description,
      type: "website",
      url: `https://elegantrwanda.com/tours/${tour.slug}`,
      images: [
        {
          url: `/${tour.images[0]}`,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
    },
  };
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  
  if (!tour) {
    notFound();
  }

  const relatedTours = getToursByCategory(tour.category)
    .filter(t => t.id !== tour.id)
    .slice(0, 3);

  return (
    <PageWrapper>
      <TourHero tour={tour} />
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <TourDetails tour={tour} />
            {tour.itinerary.length > 0 && <TourItinerary tour={tour} />}
            {tour.images.length > 0 && <TourGallery tour={tour} />}
          </div>
          <div className="lg:col-span-1">
            <TourBooking tour={tour} />
          </div>
        </div>
      </div>
      <RelatedTours tours={relatedTours} />
    </PageWrapper>
  );
}
