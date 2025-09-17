import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { EventsHero } from "@/components/events/EventsHero";
import { EventsList } from "@/components/events/EventsList";
import { EventsNewsletter } from "@/components/events/EventsNewsletter";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel and Tours",
  description: "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
  keywords: "Rwanda events, tourism events Rwanda, group travel Rwanda, gorilla trekking events, cultural events Rwanda",
  openGraph: {
    title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel and Tours",
    description: "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
    type: "website",
    url: "https://elegantrwanda.com/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Rwanda Tourism Events & Group Travels | Elegant Travel and Tours",
    description: "Discover upcoming tourism events, group travels, and special experiences in Rwanda. Join like-minded adventurers for unforgettable journeys.",
  },
};

export default function UpcomingEventsPage() {
  return (
    <PageWrapper>
      <EventsHero />
      <EventsList />
      <EventsNewsletter />
    </PageWrapper>
  );
}
