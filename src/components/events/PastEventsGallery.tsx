

import { Calendar, Users, MapPin, Star } from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Gorilla Trekking 2024",
    date: "2024-12-15",
    location: "Volcanoes National Park",
    participants: 12,
    rating: 4.9,
    image: "/past-gorilla-trek.jpg",
    highlights: ["Mountain Gorillas", "Professional Photos", "Unique Lodge"]
  },
  {
    id: 2,
    title: "Cultural Heritage Tour",
    date: "2024-11-20",
    location: "Kigali & Surroundings",
    participants: 8,
    rating: 4.8,
    image: "/past-cultural-tour.jpg",
    highlights: ["Historical Sites", "Traditional Dance", "Local Crafts"]
  },
  {
    id: 3,
    title: "Lake Kivu Adventure",
    date: "2024-10-28",
    location: "Lake Kivu",
    participants: 15,
    rating: 4.7,
    image: "/past-lake-kivu.jpg",
    highlights: ["Water Sports", "Hiking", "Sunset Cruise"]
  },
  {
    id: 4,
    title: "Photography Safari",
    date: "2024-09-15",
    location: "Akagera National Park",
    participants: 6,
    rating: 4.9,
    image: "/past-photography-safari.jpg",
    highlights: ["Wildlife Photos", "Expert Guidance", "Equipment"]
  },
  {
    id: 5,
    title: "Coffee & Tea Experience",
    date: "2024-08-22",
    location: "Tea & Coffee Estates",
    participants: 10,
    rating: 4.6,
    image: "/past-coffee-tea.jpg",
    highlights: ["Plantation Tours", "Processing Demo", "Tastings"]
  },
  {
    id: 6,
    title: "Bird Watching Expedition",
    date: "2024-07-30",
    location: "Nyungwe Forest",
    participants: 8,
    rating: 4.8,
    image: "/past-bird-watching.jpg",
    highlights: ["Bird Species", "Forest Trails", "Expert Guide"]
  }
];

export function PastEventsGallery() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Past Events Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a look at some of our successful past events. These memories showcase 
            the incredible experiences our participants have enjoyed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{event.rating}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                
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
                    <span>{event.participants} participants</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.highlights.map((highlight, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Photos Button */}
                <button className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  View Event Photos
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Past Events CTA */}
        <div className="text-center mt-12">
          <button className="bg-white text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
            View All Past Events
          </button>
        </div>
      </div>
    </section>
  );
}
