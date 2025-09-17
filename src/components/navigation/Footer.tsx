"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { newsletterSchema, type NewsletterForm } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/elegantrwanda", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/elegantrwanda", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/elegantrwanda", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/elegantrwanda", label: "LinkedIn" },
];

const services = [
  { name: "Luxury Tours", href: "/tours" },
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Thank you for subscribing to our newsletter!");
      reset();
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-secondary/80 text-white">
      {/* Main Footer Content */}
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl font-display font-bold text-yellow-500">Elegant Travel & Tours</span>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              Experience Rwanda&apos;s elegance with our premium tours, luxury accommodations, and personalized travel experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm text-white/90">
                  KG 123 St, Kigali, Rwanda
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm text-white/90">
                  +250 788 123 456
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm text-white/90">
                  info@elegantrwanda.com
                </span>
              </div>
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
            <div className="pt-4">
              <p className="text-sm text-white/80 mb-3">Follow us on social media</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-elegant py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/80 text-sm">
                © 2025 Elegant Rwanda. All Rights Reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <Link href="/sitemap.xml" className="hover:text-accent transition-colors">
                Sitemap
              </Link>
              <span>•</span>
              <span>Designed with ♥ in Rwanda</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
