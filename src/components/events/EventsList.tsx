"use client";

import { useState } from "react";
import { Calendar, Users, MapPin, Clock, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    category: "Wildlife",
    date: "2025-03-15",
    duration: "3 days",
    location: "Volcanoes National Park",
    participants: "8-12 people",
    price: "$1,200",
    description: "Experience the magic of mountain gorillas in their natural habitat. This exclusive group trek includes expert guides, comfortable accommodation, and unforgettable wildlife encounters.",
    highlights: ["Mountain Gorilla Trekking", "Professional Photography", "Luxury Lodge Stay", "Cultural Village Visit"],
    image: "/gorilla-trekking-event.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Cultural Heritage Tour",
    category: "Cultural",
    date: "2025-03-22",
    duration: "2 days",
    location: "Kigali & Surroundings",
    participants: "6-10 people",
    price: "$450",
    description: "Immerse yourself in Rwanda's rich cultural heritage. Visit historical sites, traditional villages, and learn about local customs and traditions.",
    highlights: ["Genocide Memorial", "Traditional Dance", "Local Crafts", "Traditional Cuisine"],
    image: "/cultural-tour-event.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Lake Kivu Adventure",
    category: "Adventure",
    date: "2025-04-05",
    duration: "2 days",
    location: "Lake Kivu",
    participants: "10-15 people",
    price: "$380",
    description: "Explore the stunning Lake Kivu with water activities, hiking, and relaxation. Perfect for adventure seekers and nature lovers.",
    highlights: ["Water Sports", "Hiking Trails", "Beach Activities", "Sunset Cruises"],
    image: "/lake-kivu-event.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Photography Safari",
    category: "Photography",
    date: "2025-04-12",
    duration: "4 days",
    location: "Akagera National Park",
    participants: "4-8 people",
    price: "$850",
    description: "Capture stunning wildlife and landscape photography with professional guidance. Learn advanced techniques in one of Africa's most beautiful parks.",
    highlights: ["Wildlife Photography", "Landscape Shots", "Expert Guidance", "Equipment Rental"],
    image: "/photography-safari-event.jpg",
    featured: true
  },
  {
    id: 5,
    title: "Coffee & Tea Experience",
    category: "Cultural",
    date: "2025-04-19",
    duration: "1 day",
    location: "Tea & Coffee Estates",
    participants: "8-12 people",
    price: "$120",
    description: "Discover Rwanda's world-renowned tea and coffee production. Tour plantations, learn processing methods, and enjoy tastings.",
    highlights: ["Plantation Tours", "Processing Demo", "Tasting Sessions", "Local Markets"],
    image: "/coffee-tea-event.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Bird Watching Expedition",
    category: "Wildlife",
    date: "2025-04-26",
    duration: "3 days",
    location: "Nyungwe Forest",
    participants: "6-10 people",
    price: "$680",
    description: "Explore Rwanda's diverse bird species in the pristine Nyungwe Forest. Perfect for bird enthusiasts and nature photographers.",
    highlights: ["Bird Species", "Forest Trails", "Expert Ornithologist", "Lodge Accommodation"],
    image: "/bird-watching-event.jpg",
    featured: false
  }
];

const categories = ["All", "Wildlife", "Cultural", "Adventure", "Photography"];

export function EventsList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredEvents = upcomingEvents.filter(event => {
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

  return (
    <section className="py-20 bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our carefully curated events and connect with fellow travelers. 
            Each event is designed to provide unique experiences and lasting memories.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "All" ? `All (${upcomingEvents.length})` : `${category} (${upcomingEvents.filter(e => e.category === category).length})`}
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
              min={new Date().toISOString().split('T')[0]}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
          {filteredEvents.map((event) => (
            <div key={event.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${
              event.featured ? 'border-yellow-400' : 'border-transparent'
            }`}>
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
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
                    getDaysUntil(event.date) <= 7 ? 'bg-red-500 text-white' : 
                    getDaysUntil(event.date) <= 30 ? 'bg-orange-500 text-white' : 
                    'bg-green-500 text-white'
                  }`}>
                    {getDaysUntil(event.date) <= 0 ? 'Registration Closed' : 
                     getDaysUntil(event.date) === 1 ? 'Tomorrow' : 
                     `${getDaysUntil(event.date)} days left`}
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
                    <Clock className="h-4 w-4" />
                    <span>{event.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{event.participants}</span>
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
                  <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2">
                    <span>Register Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for new events.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
