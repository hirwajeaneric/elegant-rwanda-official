"use client";

import { MapPin, Phone, Mail, Star } from "lucide-react";
import { getFeaturedTours } from "@/data/tours";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export function ToursSidebar() {
  const featuredTours = getFeaturedTours();
  const router = useRouter();
  return (
    <div className="space-y-8">
      {/* Quick Contact */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-display font-semibold mb-4">Need Help?</h3>
        <p className="text-white/90 text-sm mb-4">
          Our travel experts are here to help you plan the perfect Rwanda adventure.
        </p>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4" />
            <span>+250 788 123 456</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4" />
            <span>tours@elegantrwanda.com</span>
          </div>
        </div>
        <button onClick={() => router.push("/contact")} className="w-full mt-4 bg-white text-primary font-medium py-3 hover:bg-white/90 transition-colors duration-200 rounded-full cursor-pointer">
          Contact Us
        </button>
      </div>

      {/* Featured Tours */}
      <div className="bg-muted/80 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Featured Tours</h3>
        <div className="space-y-4">
          {featuredTours.slice(0, 3).map((tour) => (
            <article key={tour.id} className="group">
              <Link href={`/tours/${tour.slug}`} className="block">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('/${tour.images[0]}')`
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {tour.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="text-xs text-primary font-medium mt-1">
                      {tour.price}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Tour Categories */}
      <div className="bg-muted/80 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Tour Categories</h3>
        <div className="space-y-3">
          {[
            { name: "Wildlife Tours", count: 8, color: "bg-green-500" },
            { name: "Cultural Tours", count: 6, color: "bg-blue-500" },
            { name: "Adventure Tours", count: 4, color: "bg-purple-500" },
            { name: "Luxury Tours", count: 5, color: "bg-yellow-500" },
            { name: "Nature Tours", count: 3, color: "bg-emerald-500" },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/tours?category=${category.name.toLowerCase().replace(" ", "-")}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="text-muted-foreground hover:text-foreground transition-colors">
                  {category.name}
                </span>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-muted/80 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Why Choose Us</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>15+ years of experience in Rwanda tourism</span>
          </div>
          <div className="flex items-start space-x-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Expert local guides and drivers</span>
          </div>
          <div className="flex items-start space-x-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Luxury accommodations and vehicles</span>
          </div>
          <div className="flex items-start space-x-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Personalized itineraries and service</span>
          </div>
          <div className="flex items-start space-x-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>24/7 support throughout your journey</span>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-display font-semibold mb-3">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get the latest tour updates and exclusive offers delivered to your inbox.
        </p>
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
          />
          <button className="w-full bg-white text-primary font-medium py-1 hover:bg-white/90 transition-colors duration-200 rounded-full cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
