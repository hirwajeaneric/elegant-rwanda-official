import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./../globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
    default: "Elegant Travel and Tours: Unique Tours, Car Rentals & Travel Services in Rwanda",
    template: "%s | Elegant Travel and Tours"
  },
  description: "Explore Rwanda's elegance with our Unique tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized Unique travel services.",
  keywords: [
    "Rwanda tours",
    "Gorilla trekking",
    "Unique travel Rwanda",
    "Car rental Rwanda",
    "Cab booking Rwanda",
    "Air travel assistance Rwanda",
    "Volcanoes National Park",
    "Lake Kivu",
    "Kigali tours",
    "Cultural tours Rwanda",
    "Wildlife tours Africa",
    "Unique safari Rwanda"
  ],
  authors: [{ name: "Elegant Travel and Tours" }],
  creator: "Elegant Travel and Tours",
  publisher: "Elegant Travel and Tours",
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
    title: "Elegant Travel and Tours: Unique Tours & Travel Services",
    description: "Explore Rwanda's elegance with our Unique tours, premium car rentals, and personalized travel services.",
    siteName: "Elegant Travel and Tours",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elegant Travel and Tours - Unique Travel in Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elegant Travel and Tours: Unique Tours & Travel Services",
    description: "Explore Rwanda's elegance with our Unique tours, premium car rentals, and personalized travel services.",
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
