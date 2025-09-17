"use client";

import { useState } from "react";
import { Calendar, Users, MapPin, Clock, ArrowRight } from "lucide-react";
import { getUpcomingEvents, getPastEvents } from "@/data/events";
import Link from "next/link";

const upcomingEvents = getUpcomingEvents();
const pastEvents = getPastEvents();

const categories = ["All", "Group Tour", "Cultural Event", "Adventure", "Luxury Experience"];

export function EventsList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    const dateMatch = !selectedDate || event.date >= selectedDate;
    return categoryMatch && dateMatch;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    const dateMatch = !selectedDate || event.date >= selectedDate;
    return categoryMatch && dateMatch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Events & Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our carefully curated events and connect with fellow travelers.
            Each event is designed to provide unique experiences and lasting memories.
          </p>
        </div>

        {/* Event Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 inline-flex">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "upcoming"
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "past"
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category === "All" ? 
                `All (${activeTab === "upcoming" ? upcomingEvents.length : pastEvents.length})` : 
                `${category} (${(activeTab === "upcoming" ? upcomingEvents : pastEvents).filter(e => e.category === category).length})`
              }
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={activeTab === "upcoming" ? new Date().toISOString().split('T')[0] : undefined}
              max={activeTab === "past" ? new Date().toISOString().split('T')[0] : undefined}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Filter events by date"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="text-sm text-primary hover:text-primary/80"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === "upcoming" ? filteredUpcomingEvents : filteredPastEvents).map((event) => {
            const eventIsUpcoming = isUpcoming(event.date);
            const daysUntil = getDaysUntil(event.date);
            
            return (
              <div key={event.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${event.featured ? 'border-yellow-400' : 'border-transparent'
                }`}>
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  {event.images.length > 0 ? (
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                      style={{ 
                        backgroundImage: `url('${event.images[0]}')`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {event.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                        Featured Event
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      !eventIsUpcoming ? 'bg-gray-500 text-white' :
                      daysUntil <= 7 ? 'bg-red-500 text-white' :
                      daysUntil <= 30 ? 'bg-orange-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {!eventIsUpcoming ? 'Past Event' :
                       daysUntil <= 0 ? 'Registration Closed' :
                       daysUntil === 1 ? 'Tomorrow' :
                       `${daysUntil} days left`}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Meta */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{event.status}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                      {event.highlights.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{event.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex justify-center">
                    <Link
                      href={`/events/${event.slug}`}
                      className="bg-white text-primary border-2 border-primary font-semibold py-2 px-8 rounded-full w-full hover:bg-primary hover:text-white transition-colors duration-200 flex items-center space-x-2">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Events Message */}
        {(activeTab === "upcoming" ? filteredUpcomingEvents.length === 0 : filteredPastEvents.length === 0) && (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {activeTab} events found
            </h3>
            <p className="text-gray-500">
              {activeTab === "upcoming" 
                ? "Try adjusting your filters or check back later for new events."
                : "No past events match your current filters."
              }
            </p>
          </div>
        )}

        {/* Load More Button */}
        {(activeTab === "upcoming" ? filteredUpcomingEvents.length > 0 : filteredPastEvents.length > 0) && (
          <div className="text-center mt-12">
            <button className="bg-white text-primary border-2 border-primary font-semibold py-3 px-8 rounded-full hover:bg-primary hover:text-white transition-colors duration-200">
              Load More {activeTab === "upcoming" ? "Upcoming" : "Past"} Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
