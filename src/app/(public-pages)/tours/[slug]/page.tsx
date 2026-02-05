import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TourHero } from "@/components/tours/TourHero";
import { TourDetails } from "@/components/tours/TourDetails";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourGallery } from "@/components/tours/TourGallery";
import { TourBooking } from "@/components/tours/TourBooking";
import { RelatedTours } from "@/components/tours/RelatedTours";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildTourJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServerBaseUrl } from "@/lib/utils";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

async function getTourBySlug(slug: string) {
  try {
    const base = getServerBaseUrl();
    const res = await fetch(`${base}/api/public/tours/${slug}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.tour : null;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

async function getRelatedTours(categoryId: string, excludeId: string) {
  if (!categoryId) return [];
  try {
    const base = getServerBaseUrl();
    const res = await fetch(`${base}/api/public/tours?categoryId=${categoryId}&limit=10`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success) {
      return data.tours.filter((t: { id: string }) => t.id !== excludeId).slice(0, 3);
    }
    return [];
  } catch (error) {
    console.error("Error fetching related tours:", error);
    return [];
  }
}

function mapApiTourToTour(apiTour: any) {
  return {
    id: apiTour.id,
    slug: apiTour.slug,
    title: apiTour.title,
    description: apiTour.description,
    duration: apiTour.duration,
    location: apiTour.location,
    difficulty: apiTour.difficulty,
    maxGroupSize: apiTour.maxGroupSize,
    highlights: apiTour.highlights,
    itinerary: Array.isArray(apiTour.itinerary) ? apiTour.itinerary : [],
    inclusions: apiTour.inclusions,
    exclusions: apiTour.exclusions,
    images: apiTour.images,
    category: apiTour.category?.name ?? "",
    categoryId: apiTour.categoryId ?? apiTour.category?.id,
    featured: apiTour.featured,
    availableDates: apiTour.availableDates,
    price: apiTour.price,
    status: apiTour.status,
    bookings: apiTour.bookings,
    capacity: apiTour.capacity,
    guide: apiTour.guide,
    rating: apiTour.rating,
    reviews: apiTour.reviews,
    metaTitle: apiTour.metaTitle,
    metaDescription: apiTour.metaDescription,
  };
}

export async function generateMetadata({ params }: TourPageProps) {
  const { slug } = await params;
  const apiTour = await getTourBySlug(slug);

  if (!apiTour) {
    return buildMetadata({
      title: "Tour Not Found | Elegant Travel & Tours",
      description: "The requested tour could not be found.",
      path: "tours",
      noIndex: true,
    });
  }

  const tour = mapApiTourToTour(apiTour);
  const description =
    tour.metaDescription || tour.description.replace(/<[^>]*>/g, "").substring(0, 160);
  return buildMetadata({
    title: `${tour.metaTitle || tour.title} - Rwanda Tours | Elegant Travel & Tours`,
    description,
    path: `tours/${tour.slug}`,
    keywords: tour.highlights.join(", ") + ", " + (tour.category || "Rwanda tours") + ", Rwanda tours",
    openGraph: {
      title: tour.metaTitle || tour.title,
      description,
      type: "website",
      images:
        tour.images?.length > 0
          ? [{ url: `/${tour.images[0]}`, width: 1200, height: 630, alt: tour.title }]
          : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: tour.metaTitle || tour.title,
      description,
    },
  });
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params;
  const apiTour = await getTourBySlug(slug);

  if (!apiTour) {
    notFound();
  }

  const tour = mapApiTourToTour(apiTour);
  const relatedTours = await getRelatedTours(tour.categoryId ?? "", tour.id);

  const tourDescription =
    tour.metaDescription || tour.description.replace(/<[^>]*>/g, "").substring(0, 200);
  const toursJsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tours", path: "/tours" },
      { name: tour.title, path: `/tours/${tour.slug}` },
    ]),
    buildTourJsonLd({
      title: tour.title,
      description: tourDescription,
      slug: tour.slug,
      images: tour.images,
      price: tour.price,
      duration: tour.duration,
      location: tour.location,
      category: tour.category || undefined,
    }),
  ];

  return (
    <PageWrapper>
      <JsonLd data={toursJsonLd} />
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
      {relatedTours.length > 0 && (
        <RelatedTours tours={relatedTours} />
      )}
    </PageWrapper>
  );
}
