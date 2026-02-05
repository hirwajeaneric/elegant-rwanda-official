import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { EventHero } from "@/components/events/EventHero";
import { EventDetails } from "@/components/events/EventDetails";
import { EventGallery } from "@/components/events/EventGallery";
import { EventRegistration } from "@/components/events/EventRegistration";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildEventJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServerBaseUrl } from "@/lib/utils";

async function getEventBySlug(slug: string) {
  try {
    const base = getServerBaseUrl();
    const res = await fetch(`${base}/api/public/events/${slug}`, { cache: "no-store" });
    const data = await res.json();
    return data.success ? data.event : null;
  } catch {
    return null;
  }
}

async function getRelatedEvents(category: string, excludeSlug: string, limit = 3) {
  try {
    const base = getServerBaseUrl();
    const res = await fetch(`${base}/api/public/events?limit=50`, { cache: "no-store" });
    const data = await res.json();
    if (!data.success || !Array.isArray(data.events)) return [];
    return data.events
      .filter((e: { category: string; slug: string }) => e.category === category && e.slug !== excludeSlug)
      .slice(0, limit);
  } catch {
    return [];
  }
}

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return buildMetadata({
      title: "Event Not Found | Elegant Travel & Tours",
      description: "The requested event could not be found.",
      path: "events",
      noIndex: true,
    });
  }

  const title = event.metaTitle || event.title;
  const description = event.metaDescription || event.description;
  return buildMetadata({
    title: title,
    description,
    path: `events/${event.slug}`,
    keywords: `Rwanda events, ${event.category}, ${event.title}, group travel Rwanda`,
    openGraph: {
      title,
      description,
      type: "website",
      images:
        event.images?.length > 0
          ? [{ url: `/${event.images[0]}`, width: 1200, height: 630, alt: event.title }]
          : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = await getRelatedEvents(event.category, event.slug, 3);

  const isUpcoming = new Date(event.date) > new Date();

  const eventDate =
    typeof event.date === "string" && event.date.length >= 10
      ? event.date
      : new Date(event.date).toISOString();
  const eventsJsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Events", path: "/events" },
      { name: event.title, path: `/events/${event.slug}` },
    ]),
    buildEventJsonLd({
      title: event.title,
      description: event.metaDescription || event.description,
      slug: event.slug,
      date: eventDate,
      location: (event as { location?: string }).location ?? "Rwanda",
      images: event.images,
    }),
  ];

  return (
    <PageWrapper>
      <JsonLd data={eventsJsonLd} />
      <EventHero event={event} />
      <div className="container-elegant pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
          </div>
          <div className="lg:col-span-1">
            <EventRegistration event={event} isUpcoming={isUpcoming} />
          </div>
        </div>
        {event.images.length > 0 && <EventGallery event={event} />}
      </div>
      <RelatedEvents events={relatedEvents} />
    </PageWrapper>
  );
}