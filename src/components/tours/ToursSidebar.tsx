"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { subscribeToNewsletter } from "@/lib/client-submit";
import { useWebsiteSettings } from "@/contexts/WebsiteSettingsContext";
import { toast } from "sonner";

interface Tour {
  id: string;
  slug: string;
  title: string;
  location: string;
  images: string[];
}

export function ToursSidebar() {
  const settings = useWebsiteSettings();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      const res = await fetch("/api/public/tours?featured=true&limit=3");
      const data = await res.json();
      if (data.success) {
        setFeaturedTours(data.tours);
      }
    } catch (error) {
      console.error("Error fetching featured tours:", error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter({
        email,
        source: "tours-sidebar",
      });
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to subscribe. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-8">
      {/* Quick Contact */}
      <div className="bg-linear-to-br from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-display font-semibold mb-4">Need Help?</h3>
        <p className="text-white/90 text-sm mb-4">
          Our travel experts are here to help you plan the perfect Rwanda adventure.
        </p>
        <div className="space-y-3">
          {settings.phonePrimary && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{settings.phonePrimary}</span>
            </div>
          )}
          {(settings.emailPrimary || settings.emailSecondary) && (
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>{settings.emailPrimary || settings.emailSecondary}</span>
            </div>
          )}
        </div>
        <button onClick={() => router.push("/contact")} className="w-full mt-4 bg-white text-primary font-medium py-3 hover:bg-white/90 transition-colors duration-200 rounded-full cursor-pointer">
          Contact Us
        </button>
      </div>

      {/* Featured Tours */}
      <div className="bg-muted/80 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Featured Tours</h3>
        <div className="space-y-4">
          {featuredTours.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No featured tours available.</p>
            </div>
          ) : (
            featuredTours.slice(0, 3).map((tour) => (
              <article key={tour.id} className="group">
                <Link href={`/tours/${tour.slug}`} className="block">
                  <div className="flex items-start space-x-3">
                    <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundImage: `url('${tour.images[0]}')`
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

                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-linear-to-br from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-display font-semibold mb-3">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get the latest tour updates and exclusive offers delivered to your inbox.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-primary font-medium py-1 hover:bg-white/90 transition-colors duration-200 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
