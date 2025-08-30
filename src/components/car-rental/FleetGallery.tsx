"use client";

import { Car, Users, Zap, Shield, Star } from "lucide-react";

export function FleetGallery() {
  const vehicles = [
    {
      name: "Toyota Corolla",
      category: "Economy",
      image: "hotel-exterior-daytime.jpg",
      features: ["4 passengers", "Automatic", "AC", "Bluetooth"],
      price: "From $35/day",
      rating: 4.5,
      reviews: 128,
      available: true
    },
    {
      name: "Honda CR-V",
      category: "SUV",
      image: "hotel-exterior.jpg",
      features: ["6 passengers", "4WD", "Spacious", "Safety features"],
      price: "From $65/day",
      rating: 4.8,
      reviews: 95,
      available: true
    },
    {
      name: "Mercedes C-Class",
      category: "Luxury",
      image: "kigali-serena-hotel.jpg",
      features: ["4 passengers", "Premium", "Navigation", "Leather seats"],
      price: "From $120/day",
      rating: 4.9,
      reviews: 67,
      available: true
    },
    {
      name: "Toyota Hiace",
      category: "Minivan",
      image: "Bisate-Lodge-Image-from-Arcadiasafaris-1024x499.jpg",
      features: ["8 passengers", "Large luggage", "Comfortable", "Business ready"],
      price: "From $80/day",
      rating: 4.6,
      reviews: 89,
      available: true
    },
    {
      name: "Land Rover Defender",
      category: "Adventure",
      image: "green-hills-of-rwanda.jpg",
      features: ["4 passengers", "Off-road", "Rugged", "Adventure ready"],
      price: "From $150/day",
      rating: 4.7,
      reviews: 45,
      available: false
    },
    {
      name: "BMW 5 Series",
      category: "Executive",
      image: "Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg",
      features: ["4 passengers", "Executive", "Premium audio", "Driver assistance"],
      price: "From $140/day",
      rating: 4.9,
      reviews: 78,
      available: true
    }
  ];

  const categories = ["All", "Economy", "SUV", "Luxury", "Minivan", "Adventure", "Executive"];

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-primary">Fleet</span> Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our diverse fleet of well-maintained vehicles, from economy options to luxury models. 
            Each vehicle is carefully selected to ensure your comfort and safety.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* Vehicle Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`/${vehicle.image}`}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.category}
                  </span>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vehicle.available 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}>
                    {vehicle.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Vehicle Info Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{vehicle.name}</h3>
                  <p className="text-sm text-white/90">{vehicle.price}</p>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(vehicle.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {vehicle.rating} ({vehicle.reviews} reviews)
                  </span>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {vehicle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-primary text-primary py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Vehicles Available</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Insured</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
