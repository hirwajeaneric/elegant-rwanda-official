"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, ArrowRight, Search } from "lucide-react";
import { getAllTours, getToursByCategory } from "@/data/tours";
import { getCategoryColor } from "@/lib/utils";

export function ToursGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");

  const allTours = getAllTours();
  
  // Filter tours based on selected criteria
  let filteredTours = allTours;
  
  if (selectedCategory !== "all") {
    filteredTours = filteredTours.filter(tour => tour.category === selectedCategory);
  }
  
  if (selectedDuration !== "all") {
    filteredTours = filteredTours.filter(tour => {
      const days = parseInt(tour.duration.split(" ")[0]);
      if (selectedDuration === "1-3") return days <= 3;
      if (selectedDuration === "4-7") return days >= 4 && days <= 7;
      if (selectedDuration === "8+") return days >= 8;
      return true;
    });
  }
  
  if (searchQuery) {
    filteredTours = filteredTours.filter(tour =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const categories = [
    { id: "all", name: "All Categories", count: allTours.length },
    { id: "Wildlife", name: "Wildlife", count: getToursByCategory("Wildlife").length },
    { id: "Cultural", name: "Cultural", count: getToursByCategory("Cultural").length },
    { id: "Adventure", name: "Adventure", count: getToursByCategory("Adventure").length },
    { id: "Unique", name: "Unique", count: getToursByCategory("Unique").length },
    { id: "Nature", name: "Nature", count: getToursByCategory("Nature").length },
  ];
 
  const durations = [
    { id: "all", name: "All Durations" },
    { id: "1-3", name: "1-3 Days" },
    { id: "4-7", name: "4-7 Days" },
    { id: "8+", name: "8+ Days" },
  ];

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tours by name, description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Filter Buttons */}
        <div className="space-y-4">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty and Duration */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Duration</h3>
              <div className="flex flex-wrap gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => setSelectedDuration(duration.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedDuration === duration.id
                        ? "bg-primary text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {duration.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredTours.length} of {allTours.length} tours
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTours.map((tour) => (
          <article
            key={tour.id}
            className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
          >
            {/* Featured Image */}
            <div className="relative h-48 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: `url('/${tour.images[0]}')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="secondary" 
                  className={`${getCategoryColor(tour.category)} text-white`}
                >
                  {tour.category}
                </Badge>
              </div>

              {/* Featured Badge */}
              {tour.featured && (
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-yellow-500 text-white">
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                <Link href={`/tours/${tour.slug}`} className="hover:underline">
                  {tour.title}
                </Link>
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                {tour.description}
              </p>

              {/* Tour Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.maxGroupSize} people</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Highlights:</h4>
                <div className="flex flex-wrap gap-1">
                  {tour.highlights.slice(0, 3).map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                    >
                      {highlight}
                    </span>
                  ))}
                  {tour.highlights.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                      +{tour.highlights.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-all duration-200"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredTours.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-display font-semibold mb-2">No tours found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search criteria or browse all our available tours.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDuration("all");
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
