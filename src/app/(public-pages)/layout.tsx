import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elegant Rwanda: Luxury Tours, Car Rentals & Travel Services in Rwanda",
    template: "%s | Elegant Rwanda"
  },
  description: "Discover Rwanda's elegance with our luxury tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized luxury travel services.",
  keywords: [
    "Rwanda tours",
    "Gorilla trekking",
    "Luxury travel Rwanda",
    "Car rental Rwanda",
    "Cab booking Rwanda",
    "Air travel assistance Rwanda",
    "Volcanoes National Park",
    "Lake Kivu",
    "Kigali tours",
    "Cultural tours Rwanda",
    "Wildlife tours Africa",
    "Luxury safari Rwanda"
  ],
  authors: [{ name: "Elegant Rwanda" }],
  creator: "Elegant Rwanda",
  publisher: "Elegant Rwanda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://elegantrwanda.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elegantrwanda.com",
    title: "Elegant Rwanda: Luxury Tours & Travel Services",
    description: "Discover Rwanda's elegance with our luxury tours, premium car rentals, and personalized travel services.",
    siteName: "Elegant Rwanda",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elegant Rwanda - Luxury Travel in Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elegant Rwanda: Luxury Tours & Travel Services",
    description: "Discover Rwanda's elegance with our luxury tours, premium car rentals, and personalized travel services.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
