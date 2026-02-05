import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTABanner } from "@/components/home/CTABanner";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";
import { ToursPreview } from "@/components/home/ToursPreview";
import { VehiclesPreview } from "@/components/home/VehiclesPreview";
import { EventsPreview } from "@/components/home/EventsPreview";
import { buildMetadata, buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Elegant Travel & Tours: Luxury Tours, Car Rentals & Travel Services in Rwanda",
  description:
    "Explore Rwanda's elegance with our luxury tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized travel services.",
  path: "",
  keywords: [
    "Rwanda tours",
    "Gorilla trekking",
    "Luxury travel Rwanda",
    "Car rental Rwanda",
    "Cab booking Rwanda",
    "Air travel assistance Rwanda",
    "Volcanoes National Park",
    "Lake Kivu",
    "Kigali tours",
    "Cultural tours Rwanda",
    "Wildlife tours Africa",
    "Luxury safari Rwanda",
  ],
  openGraph: {
    title: "Elegant Travel & Tours: Luxury Tours & Travel Services",
    description:
      "Explore Rwanda's elegance with our luxury tours, premium car rentals, and personalized travel services.",
    images: [{ url: "/hero-image.jpg", alt: "Elegant Travel & Tours - Luxury and Affordable Travel in Rwanda" }],
  },
});

// Server-side data fetching functions
async function getTours() {
  try {
    const tours = await prisma.tour.findMany({
      where: { status: "active" },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
      },
    });
    return tours;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        available: true,
        status: "available",
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      where: { active: true },
      take: 10,
      orderBy: { date: "asc" },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // Map events to match the API response format and component interface
    return events.map((e) => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      description: e.description,
      date: e.date.toISOString().slice(0, 10),
      endDate: e.endDate ? e.endDate.toISOString().slice(0, 10) : null,
      location: e.location,
      maxParticipants: e.maxParticipants,
      currentParticipants: e.currentParticipants,
      category: e.category?.name ?? "",
      status: e.status === "Filling_Fast" ? "Filling Fast" : e.status,
      images: e.images,
      featured: e.featured,
      registrationDeadline: e.registrationDeadline.toISOString().slice(0, 10),
      time: e.time ?? "",
      price: e.price,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function getBlogPosts() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      take: 3,
      orderBy: { publishDate: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishDate: true,
        readTime: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: true,
        featuredImage: true,
      },
    });

    // Map blog posts to match component interface (convert Date to string)
    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      publishDate: blog.publishDate ? blog.publishDate.toISOString() : null,
      readTime: blog.readTime,
      category: blog.category,
      tags: blog.tags,
      featuredImage: blog.featuredImage,
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function HomePage() {
  // Fetch all data in parallel for better performance
  const [tours, vehicles, events, blogPosts] = await Promise.all([
    getTours(),
    getVehicles(),
    getEvents(),
    getBlogPosts(),
  ]);

  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];

  return (
    <PageWrapper>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <ServicesOverview />
      <ToursPreview tours={tours} loading={false} />
      <VehiclesPreview vehicles={vehicles} loading={false} />
      <EventsPreview events={events} loading={false} />
      <FeaturedTours />
      <TestimonialsSection />
      <LatestBlogPosts posts={blogPosts} loading={false} />
      <CTABanner />
    </PageWrapper>
  );
}
