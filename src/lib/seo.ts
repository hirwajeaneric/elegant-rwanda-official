import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Site constants (single source of truth for SEO)
// ---------------------------------------------------------------------------

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://elegantrwanda.com";
export const SITE_NAME = "Elegant Travel & Tours";
export const SITE_DEFAULT_DESCRIPTION =
  "Explore Rwanda's elegance with our luxury tours, premium car rentals, cab services, and air travel assistance. Experience the heart of Africa with personalized travel services.";
export const SITE_DEFAULT_OG_IMAGE = {
  url: "/hero-image.jpg",
  width: 1200,
  height: 630,
  alt: "Elegant Travel & Tours - Luxury and Affordable Travel in Rwanda",
};

export const ORGANIZATION_SAME_AS = [
  "https://www.facebook.com/elegantrwanda",
  "https://www.twitter.com/elegantrwanda",
  "https://www.instagram.com/elegantrwanda",
  "https://www.linkedin.com/company/elegantrwanda",
  "https://www.youtube.com/channel/UC_x-kSYAfv_Z-w0-2fCb73w",
  "https://www.pinterest.com/elegantrwanda",
  "https://www.tiktok.com/@elegantrwanda",
];

// ---------------------------------------------------------------------------
// Metadata builder: merge page-specific metadata with sensible defaults
// ---------------------------------------------------------------------------

export interface PageSeoOptions {
  title: string;
  description: string;
  /** Path without leading slash, e.g. "tours", "blog/my-post" */
  path?: string;
  keywords?: string | string[];
  openGraph?: Partial<{
    title: string;
    description: string;
    type: "website" | "article";
    images: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  }>;
  twitter?: Partial<{
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
  }>;
  /** Set to false to omit default OG image */
  noIndex?: boolean;
}

export function buildMetadata(options: PageSeoOptions): Metadata {
  const {
    title,
    description,
    path = "",
    keywords,
    openGraph = {},
    twitter = {},
    noIndex = false,
  } = options;

  const canonicalUrl = path ? `${SITE_URL}/${path}` : SITE_URL;
  const ogTitle = openGraph.title ?? title;
  const ogDescription = openGraph.description ?? description;
  const ogImages = openGraph.images?.length
    ? openGraph.images.map((img) => ({
        url: img.url.startsWith("http") ? img.url : `${SITE_URL}${img.url.startsWith("/") ? "" : "/"}${img.url}`,
        width: img.width ?? 1200,
        height: img.height ?? 630,
        alt: img.alt ?? ogTitle,
      }))
    : [
        {
          url: SITE_DEFAULT_OG_IMAGE.url.startsWith("http")
            ? SITE_DEFAULT_OG_IMAGE.url
            : `${SITE_URL}${SITE_DEFAULT_OG_IMAGE.url}`,
          width: SITE_DEFAULT_OG_IMAGE.width,
          height: SITE_DEFAULT_OG_IMAGE.height,
          alt: SITE_DEFAULT_OG_IMAGE.alt,
        },
      ];

  const metadata: Metadata = {
    title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
    description,
    keywords: Array.isArray(keywords) ? keywords : keywords ? [keywords] : undefined,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: openGraph.type ?? "website",
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: ogImages,
      locale: "en_US",
    },
    twitter: {
      card: twitter.card ?? "summary_large_image",
      title: twitter.title ?? ogTitle,
      description: twitter.description ?? ogDescription,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };

  return metadata;
}

// ---------------------------------------------------------------------------
// JSON-LD schema builders
// ---------------------------------------------------------------------------

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/et&t-logo.png`,
    sameAs: ORGANIZATION_SAME_AS,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+250-787-095-392",
      contactType: "customer service",
      areaServed: "RW",
      availableLanguage: "English, French",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    description: SITE_DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/tours?search={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export interface ArticleJsonLdInput {
  title: string;
  description: string;
  slug: string;
  featuredImage?: string | null;
  publishedAt: string; // ISO date
  modifiedAt?: string | null; // ISO date
  author?: string;
  tags?: string[];
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  const url = `${SITE_URL}/blog/${input.slug}`;
  const image = input.featuredImage
    ? (input.featuredImage.startsWith("http") ? input.featuredImage : `${SITE_URL}${input.featuredImage.startsWith("/") ? "" : "/"}${input.featuredImage}`)
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url,
    image,
    datePublished: input.publishedAt,
    dateModified: input.modifiedAt ?? input.publishedAt,
    author: input.author
      ? { "@type": "Person", name: input.author }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/et&t-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: input.tags?.join(", "),
  };
}

export interface ProductJsonLdInput {
  name: string;
  description: string;
  slug: string;
  /** e.g. "car-rental" */
  pathSegment: string;
  image?: string | null;
  price?: number;
  priceCurrency?: string;
  category?: string;
}

export function buildProductJsonLd(input: ProductJsonLdInput) {
  const url = `${SITE_URL}/${input.pathSegment}/${input.slug}`;
  const image = input.image
    ? (input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image.startsWith("/") ? "" : "/"}${input.image}`)
    : undefined;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url,
    image,
    category: input.category,
  };
  if (input.price != null) {
    schema.offers = {
      "@type": "Offer",
      price: input.price,
      priceCurrency: input.priceCurrency ?? "USD",
      availability: "https://schema.org/InStock",
      url,
    };
  }
  return schema;
}

export interface TourJsonLdInput {
  title: string;
  description: string;
  slug: string;
  images: string[];
  price: number;
  duration?: string;
  location?: string;
  category?: string;
}

export function buildTourJsonLd(input: TourJsonLdInput) {
  const url = `${SITE_URL}/tours/${input.slug}`;
  const image =
    input.images?.length > 0
      ? input.images[0].startsWith("http")
        ? input.images[0]
        : `${SITE_URL}${input.images[0].startsWith("/") ? "" : "/"}${input.images[0]}`
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.title,
    description: input.description,
    url,
    image,
    duration: input.duration,
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: input.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
    ...(input.location && { location: { "@type": "Place", name: input.location } }),
  };
}

export interface EventJsonLdInput {
  title: string;
  description: string;
  slug: string;
  date: string; // ISO date or datetime
  location?: string;
  images: string[];
}

export function buildEventJsonLd(input: EventJsonLdInput) {
  const url = `${SITE_URL}/events/${input.slug}`;
  const image =
    input.images?.length > 0
      ? input.images[0].startsWith("http")
        ? input.images[0]
        : `${SITE_URL}${input.images[0].startsWith("/") ? "" : "/"}${input.images[0]}`
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.title,
    description: input.description,
    url,
    image,
    startDate: input.date,
    location: input.location
      ? { "@type": "Place", name: input.location }
      : { "@type": "Place", name: "Rwanda" },
    organizer: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Service page (e.g. Cab Booking, Car Rental listing, Air Travel) */
export function buildServiceJsonLd(service: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE_URL}/${service.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    ...(service.image && {
      image: service.image.startsWith("http") ? service.image : `${SITE_URL}${service.image}`,
    }),
  };
}
