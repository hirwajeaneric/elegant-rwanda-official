"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft, MapPin, Phone, Mail } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent leading-none">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off on its own adventure.
            Let us help you find your way back to exploring Rwanda&apos;s beauty.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tours, services, or destinations..."
              className="w-full px-6 py-4 pl-12 bg-background border border-input rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search for content on the website"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/"
              className="bg-card border border-border rounded-xl p-4 hover:bg-accent transition-all duration-200 group"
            >
              <Home className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-foreground font-medium">Home</span>
            </Link>

            <Link
              href="/tours"
              className="bg-card border border-border rounded-xl p-4 hover:bg-accent transition-all duration-200 group"
            >
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-foreground font-medium">Tours</span>
            </Link>

            <Link
              href="/contact"
              className="bg-card border border-border rounded-xl p-4 hover:bg-accent transition-all duration-200 group"
            >
              <Mail className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-foreground font-medium">Contact</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-semibold rounded-xl hover:bg-primary/80 transition-colors duration-200 group"
          >
            <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition-all duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Go Back
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Need Help Finding Something?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our travel experts are here to help you discover the perfect Rwanda experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-foreground font-medium">Call Us</div>
                <div className="text-muted-foreground text-sm">+250 787 095 392</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-foreground font-medium">Email Us</div>
                <div className="text-muted-foreground text-sm">info@elegantrwanda.com</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/80 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-muted-foreground text-sm">
          <p>
            © 2025 Elegant Travel & Tours. All Rights Reserved. | Designed with ♥ in Rwanda
          </p>
        </div>
      </div>
    </div>
  );
}
