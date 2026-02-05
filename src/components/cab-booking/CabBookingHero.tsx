"use client";

import { Phone, Mail, Clock } from "lucide-react";
import { useWebsiteSettings } from "@/contexts/WebsiteSettingsContext";

export function CabBookingHero() {
  const settings = useWebsiteSettings();
  return (
    <section className="relative py-24 bg-[url('/cab-booking.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/60 to-black/50" />
      <div className="container-elegant relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Seamless{" "}
              <span className="text-yellow-500">Tours</span>{" "}
              Across Rwanda
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-tight">
              Experience Unique and reliability with our premium cab services. From airport transfers
              to city tours, we ensure your journey is comfortable, safe, and punctual.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {settings.phonePrimary && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-500" />
                  <span className="text-white/90">{settings.phonePrimary}</span>
                </div>
              )}
              {(settings.emailPrimary || settings.emailSecondary) && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-500" />
                  <span className="text-white/90">{settings.emailPrimary || settings.emailSecondary}</span>
                </div>
              )}
              {settings.businessHours && (
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-white/90">{settings.businessHours.split("\n")[0] ?? "Available 24/7"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
