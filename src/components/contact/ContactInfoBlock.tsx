"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useWebsiteSettings } from "@/contexts/WebsiteSettingsContext";

export function ContactInfoBlock() {
  const settings = useWebsiteSettings();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-6">Contact Information</h2>
        <div className="space-y-6">
          {settings.address && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-2xl">Office Address</h3>
                <p className="text-muted-foreground whitespace-pre-line">{settings.address}</p>
              </div>
            </div>
          )}

          {(settings.phonePrimary || settings.phoneSecondary) && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-2xl">Phone</h3>
                <p className="text-muted-foreground">
                  {[settings.phonePrimary, settings.phoneSecondary].filter(Boolean).join("\n")}
                </p>
              </div>
            </div>
          )}

          {(settings.emailPrimary || settings.emailSecondary) && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-2xl">Email</h3>
                <p className="text-muted-foreground">
                  {[settings.emailPrimary, settings.emailSecondary].filter(Boolean).join("\n")}
                </p>
              </div>
            </div>
          )}

          {settings.businessHours && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-2xl">Business Hours</h3>
                <p className="text-muted-foreground whitespace-pre-line">{settings.businessHours}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {(settings.emergencyPhone || settings.emergencyNote) && (
        <div className="bg-linear-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold mb-3">Emergency Support</h3>
          {settings.emergencyNote && (
            <p className="text-muted-foreground text-sm mb-3">{settings.emergencyNote}</p>
          )}
          {settings.emergencyPhone && (
            <p className="text-primary font-semibold">{settings.emergencyPhone}</p>
          )}
        </div>
      )}
    </div>
  );
}
