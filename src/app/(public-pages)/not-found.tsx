"use client";

import Link from "next/link";
import { Home, ArrowLeft, MapPin, Mail } from "lucide-react";

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
      </div>
    </div>
  );
}
