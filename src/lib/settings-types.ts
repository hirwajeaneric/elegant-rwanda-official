/**
 * Website settings types and defaults only.
 * Safe to import from client components (no prisma/cache).
 */

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
};

export type WebsiteSettingsData = {
  siteName: string | null;
  tagline: string | null;
  address: string | null;
  phonePrimary: string | null;
  phoneSecondary: string | null;
  emailPrimary: string | null;
  emailSecondary: string | null;
  businessHours: string | null;
  emergencyPhone: string | null;
  emergencyNote: string | null;
  socialLinks: SocialLink[];
};

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettingsData = {
  siteName: "Elegant Travel & Tours",
  tagline:
    "Experience Rwanda's elegance with our premium tours, Unique accommodations, and personalized travel experiences.",
  address: "KG 123 St, Kigali, Rwanda",
  phonePrimary: "+250 787 095 392",
  phoneSecondary: null,
  emailPrimary: "info@elegantrwanda.com",
  emailSecondary: "bookings@elegantrwanda.com",
  businessHours:
    "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed",
  emergencyPhone: "+250 787 095 392",
  emergencyNote:
    "For urgent matters outside business hours, please call our 24/7 emergency line.",
  socialLinks: [
    { platform: "facebook", label: "Facebook", url: "https://facebook.com/elegant_travel_tours" },
    { platform: "instagram", label: "Instagram", url: "https://instagram.com/elegant_travel_tours" },
  ],
};
