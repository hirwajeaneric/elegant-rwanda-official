"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { GeneralInquiryModal } from "../modals/GeneralInquiryModal";
import Link from "next/link";

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="hero-section relative">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/70 to-black/60 z-10" />
        
        {/* Placeholder for video - replace with actual video */}
        <div className="w-full h-full inset-0 bg-gradient-to-r from-black/50 via-black/70 to-black/60">
          {/* This would be replaced with an actual video or high-quality image */}
          <div className="absolute inset-0 bg-[url('/green-hills-of-rwanda.jpg')] bg-cover bg-center bg-no-repeat" />
        </div>
        
        {/* Video Controls Overlay */}
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          >
            {isVideoPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Explore Rwanda&apos;s{" "}
            <span className="text-yellow-500">Elegance</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 font-light leading-relaxed max-w-4xl mx-auto">
            Tailored Tours & Premium Travel Experience
          </p>
          
          <p className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-tight">
            From the misty mountains of Volcanoes National Park to the serene shores of Lake Kivu, 
            experience Rwanda&apos;s natural beauty and rich culture through our luxury travel services.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button  
              className="btn-primary hover:bg-white hover:text-primary rounded-full text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
              onClick={() => setShowModal(true)}
            >
              Request a Quote
            </button>
            
            <Link 
              className="btn-outline text-lg px-8 py-4 border-2 rounded-full border-white text-white hover:bg-white hover:text-foreground hover:scale-105 transition-all duration-200"
              href="/tours"
            >
              Explore Tours
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/70">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-sm">Satisfied Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-sm">Luxury Tours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">5★</div>
              <div className="text-sm">Service Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* General Inquiry Modal */}
      <GeneralInquiryModal 
        open={showModal} 
        onOpenChange={setShowModal} 
      />
    </section>
  );
}
