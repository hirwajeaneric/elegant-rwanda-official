"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { newsletterSchema, type NewsletterForm } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/client-submit";
import { useWebsiteSettings } from "@/contexts/WebsiteSettingsContext";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  pinterest: Mail,
  tiktok: Mail,
  other: Mail,
};

const services = [
  { name: "Unique Tours", href: "/tours" },
  { name: "Cab Booking", href: "/cab-booking" },
  { name: "Car Rental", href: "/car-rental" },
  { name: "Air Travel Assistance", href: "/air-travel-assistance" },
  { name: "Upcoming Events", href: "/events" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const settings = useWebsiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (values: NewsletterForm) => {
    setIsSubmitting(true);
    try {
      await subscribeToNewsletter({
        email: values.email,
        firstName: values.firstName,
        source: "footer",
        interests: values.interests,
      });
      toast.success("Thank you for subscribing to our newsletter!");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to subscribe. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl font-display font-bold text-yellow-500">
                  {settings.siteName || "Elegant Travel & Tours"}
                </span>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              {settings.tagline ||
                "Experience Rwanda's elegance with our premium tours, Unique accommodations, and personalized travel experiences."}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              {settings.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white/90">{settings.address}</span>
                </div>
              )}
              {settings.phonePrimary && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white/90">{settings.phonePrimary}</span>
                </div>
              )}
              {settings.emailPrimary && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white/90">{settings.emailPrimary}</span>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-display">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-white/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-display">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-display">Stay Connected</h4>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-white/80">
                Subscribe to our newsletter for exclusive offers and travel updates.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent/20 rounded-full"
                  />
                  {errors.email && (
                    <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground rounded-full px-6 py-2 hover:bg-white hover:text-primary hover:border hover:border-primary hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </form>
            </div>

            {/* Social Links */}
            {settings.socialLinks?.length > 0 && (
              <div className="pt-4">
                <p className="text-sm text-white/80 mb-3">Follow us on social media</p>
                <div className="flex space-x-3">
                  {settings.socialLinks.map((social, i) => {
                    const Icon = SOCIAL_ICONS[social.platform] ?? Mail;
                    return (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        aria-label={social.label || social.platform}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-elegant py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/80 text-sm">
                © {new Date().getFullYear()} Elegant Travel & Tours. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
