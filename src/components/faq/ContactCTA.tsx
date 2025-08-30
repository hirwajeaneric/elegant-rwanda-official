"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-16">
      <div className="container-elegant text-center">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
          Still Have Questions?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Can&apos;t find the answer you&apos;re looking for? Our travel experts are here to help 
          with any questions about our services or planning your Rwanda adventure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Phone className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
            <p className="text-white/90 text-sm mb-3">
              Speak directly with our travel experts
            </p>
            <a 
              href="tel:+250788123456" 
              className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors"
            >
              +250 788 123 456
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Mail className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
            <p className="text-white/90 text-sm mb-3">
              Send us a detailed message
            </p>
            <a 
              href="mailto:info@elegantrwanda.com" 
              className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors"
            >
              info@elegantrwanda.com
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <MessageCircle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-white/90 text-sm mb-3">
              Chat with us in real-time
            </p>
            <button className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors">
              Start Chat
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-white/90">
            Our team typically responds within 2-4 hours during business hours 
            (Monday - Friday, 8:00 AM - 6:00 PM EAT).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200"
            >
              Contact Page
            </Link>
            <Link
              href="/tours"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-colors duration-200"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
