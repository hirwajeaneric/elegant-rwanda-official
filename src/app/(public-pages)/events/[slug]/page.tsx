import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { EventHero } from "@/components/events/EventHero";
import { EventDetails } from "@/components/events/EventDetails";
import { EventGallery } from "@/components/events/EventGallery";
import { EventRegistration } from "@/components/events/EventRegistration";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { getEventBySlug, getEventsByCategory } from "@/data/events";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  
  if (!event) {
    return {
      title: "Event Not Found | Elegant Rwanda",
    };
  }

  return {
    title: event.metaTitle || `${event.title} - Rwanda Events | Elegant Rwanda`,
    description: event.metaDescription || event.description,
    keywords: `Rwanda events, ${event.category}, ${event.title}, group travel Rwanda`,
    openGraph: {
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.description,
      type: "website",
      url: `https://elegantrwanda.com/events/${event.slug}`,
      images: event.images.length > 0 ? [
        {
          url: `/${event.images[0]}`,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.description,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  
  if (!event) {
    notFound();
  }

  const relatedEvents = getEventsByCategory(event.category)
    .filter(e => e.slug !== event.slug)
    .slice(0, 3);

  const isUpcoming = new Date(event.date) > new Date();

  return (
    <PageWrapper>
      <EventHero event={event} />
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
            {event.images.length > 0 && <EventGallery event={event} />}
          </div>
          <div className="lg:col-span-1">
            <EventRegistration event={event} isUpcoming={isUpcoming} />
          </div>
        </div>
      </div>
      <RelatedEvents events={relatedEvents} />
    </PageWrapper>
  );
}