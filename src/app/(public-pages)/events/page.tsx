import { PageWrapper } from "@/components/layout/PageWrapper";
import { EventsHero } from "@/components/events/EventsHero";
import { EventsList } from "@/components/events/EventsList";
import { EventsNewsletter } from "@/components/events/EventsNewsletter";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel & Tours",
  description:
    "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
  path: "events",
  keywords:
    "Rwanda events, tourism events Rwanda, group travel Rwanda, gorilla trekking events, cultural events Rwanda, car rental near me, car near me, car to book near me, car rental near me, car rental to book near me, car rental to book near me in Rwanda, tour guide near me, trip planner near me, events near me, car near me, car to book near me, car to book near me in Rwanda",
  openGraph: {
    title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel & Tours",
    description:
      "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
    type: "website",
    images: [
      { url: "/events.jpg", width: 1200, height: 630, alt: "Upcoming Rwanda Tourism Events & Group Travels" },
      { url: "/events.jpg", width: 960, height: 540, alt: "Upcoming Rwanda Tourism Events & Group Travels" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel & Tours",
    description:
      "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
  },
});

const eventsJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }]),
];

export default function UpcomingEventsPage() {
  return (
    <PageWrapper>
      <JsonLd data={eventsJsonLd} />
      <EventsHero />
      <EventsList />
      <EventsNewsletter />
    </PageWrapper>
  );
}
