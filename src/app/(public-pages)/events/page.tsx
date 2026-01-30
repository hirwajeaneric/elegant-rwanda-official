import { PageWrapper } from "@/components/layout/PageWrapper";
import { EventsHero } from "@/components/events/EventsHero";
import { EventsList } from "@/components/events/EventsList";
import { EventsNewsletter } from "@/components/events/EventsNewsletter";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel and Tours",
  description:
    "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
  path: "events",
  keywords:
    "Rwanda events, tourism events Rwanda, group travel Rwanda, gorilla trekking events, cultural events Rwanda",
  openGraph: {
    title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel and Tours",
    description:
      "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel and Tours",
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
