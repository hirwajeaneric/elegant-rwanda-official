import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import fs from "fs";
import path from "path";

// Load seed data from prisma/seed-data directory
const seedDataPath = path.join(process.cwd(), "prisma", "seed-data");

const categoriesData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "categories.json"), "utf-8")
);
const blogsData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "blogs.json"), "utf-8")
);
const toursData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "tours.json"), "utf-8")
);
const eventsData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "events.json"), "utf-8")
);
const vehiclesData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "vehicles.json"), "utf-8")
);
const faqsData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "faqs.json"), "utf-8")
);
const testimonialsData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "testimonials.json"), "utf-8")
);
const imagesData = JSON.parse(
  fs.readFileSync(path.join(seedDataPath, "images.json"), "utf-8")
);

interface SeedResult {
  categories: { created: number; errors: string[] };
  images: { created: number; errors: string[] };
  blogs: { created: number; errors: string[] };
  tours: { created: number; errors: string[] };
  events: { created: number; errors: string[] };
  vehicles: { created: number; errors: string[] };
  faqs: { created: number; errors: string[] };
  testimonials: { created: number; errors: string[] };
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Find ADMIN user for assigning createdBy/uploadedBy
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN", active: true },
      select: { id: true },
    });

    if (!adminUser) {
      return NextResponse.json(
        {
          error:
            "No active ADMIN user found. Please create an ADMIN user first.",
        },
        { status: 404 }
      );
    }

    const results: SeedResult = {
      categories: { created: 0, errors: [] },
      images: { created: 0, errors: [] },
      blogs: { created: 0, errors: [] },
      tours: { created: 0, errors: [] },
      events: { created: 0, errors: [] },
      vehicles: { created: 0, errors: [] },
      faqs: { created: 0, errors: [] },
      testimonials: { created: 0, errors: [] },
    };

    // 1. Seed Categories first (other entities reference them)
    const categoryMap = new Map<string, string>(); // slug -> id
    for (const category of categoriesData) {
      try {
        const existing = await prisma.category.findUnique({
          where: { slug: category.slug },
        });

        if (existing) {
          categoryMap.set(category.slug, existing.id);
          continue;
        }

        const created = await prisma.category.create({
          data: {
            name: category.name,
            slug: category.slug,
            description: category.description || null,
            type: category.type,
            color: category.color || null,
            icon: category.icon || null,
            order: category.order,
            active: category.active,
            createdBy: adminUser.id,
            updatedBy: adminUser.id,
          },
        });

        categoryMap.set(category.slug, created.id);
        results.categories.created++;
      } catch (error: any) {
        results.categories.errors.push(`${category.slug}: ${error.message}`);
      }
    }

    // Helper function to get category ID by name
    const getCategoryIdByName = (name: string): string | null => {
      const slugMap: Record<string, string> = {
        "General Travel": "general-travel",
        "Gorilla Trekking": "gorilla-trekking",
        "Tours & Packages": "tours-packages",
        Transportation: "transportation",
        Accommodation: "accommodation",
        Wildlife: "wildlife",
        Cultural: "cultural",
        Adventure: "adventure",
        Unique: "unique",
        Nature: "nature",
        "Group Tour": "group-tour",
        "Cultural Event": "cultural-event",
        Tips: "tips",
        News: "news",
        Tours: "tours-packages",
        Culture: "cultural",
      };
      const slug = slugMap[name];
      return slug ? categoryMap.get(slug) || null : null;
    };

    // 2. Seed Images
    for (const image of imagesData) {
      try {
        const existing = await prisma.image.findUnique({
          where: { publicId: image.publicId },
        });

        if (existing) {
          continue;
        }

        await prisma.image.create({
          data: {
            publicId: image.publicId,
            url: image.url,
            urlRaw: image.urlRaw || null,
            title: image.title || null,
            alt: image.alt || null,
            description: image.description || null,
            category: image.category || null,
            categoryId:
              image.categoryId ||
              (image.category ? getCategoryIdByName(image.category) : null),
            folder: image.folder || null,
            width: image.width || null,
            height: image.height || null,
            format: image.format || null,
            bytes: image.bytes || null,
            tags: image.tags || [],
            featured: image.featured,
            active: image.active,
            uploadedBy: adminUser.id,
          },
        });

        results.images.created++;
      } catch (error: any) {
        results.images.errors.push(`${image.publicId}: ${error.message}`);
      }
    }

    // 3. Seed Blogs
    for (const blog of blogsData) {
      try {
        const existing = await prisma.blog.findUnique({
          where: { slug: blog.slug },
        });

        if (existing) {
          continue;
        }

        // Map category name to categoryId
        const categoryId = blog.categoryId || null; // Will be set manually if needed

        await prisma.blog.create({
          data: {
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            authorImage: blog.authorImage || null,
            publishDate: blog.publishDate ? new Date(blog.publishDate) : null,
            readTime: blog.readTime,
            categoryId: categoryId,
            tags: blog.tags || [],
            featuredImage: blog.featuredImage || null,
            featured: blog.featured,
            metaTitle: blog.metaTitle || null,
            metaDescription: blog.metaDescription || null,
            status: blog.status as "PUBLISHED" | "DRAFT" | "SCHEDULED",
            views: blog.views || 0,
            comments: blog.comments || 0,
            createdBy: adminUser.id,
            updatedBy: adminUser.id,
          },
        });

        results.blogs.created++;
      } catch (error: any) {
        results.blogs.errors.push(`${blog.slug}: ${error.message}`);
      }
    }

    // 4. Seed Tours
    for (const tour of toursData) {
      try {
        const existing = await prisma.tour.findUnique({
          where: { slug: tour.slug },
        });

        if (existing) {
          continue;
        }

        await prisma.tour.create({
          data: {
            slug: tour.slug,
            title: tour.title,
            description: tour.description,
            duration: tour.duration,
            location: tour.location,
            difficulty: tour.difficulty as "Easy" | "Moderate" | "Challenging",
            maxGroupSize: tour.maxGroupSize,
            highlights: tour.highlights,
            itinerary: tour.itinerary as any,
            inclusions: tour.inclusions,
            exclusions: tour.exclusions,
            images: tour.images,
            categoryId: tour.categoryId || null,
            featured: tour.featured,
            availableDates: tour.availableDates,
            price: tour.price || null,
            status: tour.status as "active" | "draft" | "scheduled",
            bookings: tour.bookings || 0,
            capacity: tour.capacity,
            guide: tour.guide || null,
            rating: tour.rating || null,
            reviews: tour.reviews || 0,
            metaTitle: tour.metaTitle || null,
            metaDescription: tour.metaDescription || null,
          },
        });

        results.tours.created++;
      } catch (error: any) {
        results.tours.errors.push(`${tour.slug}: ${error.message}`);
      }
    }

    // 5. Seed Events
    for (const event of eventsData) {
      try {
        const existing = await prisma.event.findUnique({
          where: { slug: event.slug },
        });

        if (existing) {
          continue;
        }

        await prisma.event.create({
          data: {
            slug: event.slug,
            title: event.title,
            description: event.description,
            date: new Date(event.date),
            endDate: event.endDate ? new Date(event.endDate) : null,
            location: event.location,
            maxParticipants: event.maxParticipants,
            currentParticipants: event.currentParticipants || 0,
            categoryId: event.categoryId || null,
            highlights: event.highlights,
            activities: event.activities,
            images: event.images,
            featured: event.featured,
            registrationDeadline: new Date(event.registrationDeadline),
            status: event.status as
              | "Open"
              | "Filling_Fast"
              | "Waitlist"
              | "Closed",
            time: event.time,
            price: event.price,
            active: event.active,
            metaTitle: event.metaTitle || null,
            metaDescription: event.metaDescription || null,
          },
        });

        results.events.created++;
      } catch (error: any) {
        results.events.errors.push(`${event.slug}: ${error.message}`);
      }
    }

    // 6. Seed Vehicles
    for (const vehicle of vehiclesData) {
      try {
        const existing = await prisma.vehicle.findUnique({
          where: { slug: vehicle.slug },
        });

        if (existing) {
          continue;
        }

        await prisma.vehicle.create({
          data: {
            slug: vehicle.slug,
            name: vehicle.name,
            category: vehicle.category as
              | "Economy"
              | "Compact"
              | "SUV"
              | "Unique"
              | "Minivan"
              | "Adventure"
              | "Executive",
            description: vehicle.description,
            shortDescription: vehicle.shortDescription,
            images: vehicle.images,
            specifications: vehicle.specifications as any,
            available: vehicle.available,
            pickupLocations: vehicle.pickupLocations,
            includedServices: vehicle.includedServices,
            additionalServices: vehicle.additionalServices,
            requirements: vehicle.requirements,
            insurance: vehicle.insurance as any,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            plateNumber: vehicle.plateNumber,
            dailyRate: vehicle.dailyRate,
            status: vehicle.status as "available" | "rented" | "maintenance",
            location: vehicle.location,
            mileage: vehicle.mileage || 0,
            lastService: vehicle.lastService || null,
            nextService: vehicle.nextService || null,
          },
        });

        results.vehicles.created++;
      } catch (error: any) {
        results.vehicles.errors.push(`${vehicle.slug}: ${error.message}`);
      }
    }

    // 7. Seed FAQs
    for (const faq of faqsData) {
      try {
        const existing = await prisma.fAQ.findFirst({
          where: { question: faq.question },
        });

        if (existing) {
          continue;
        }

        await prisma.fAQ.create({
          data: {
            question: faq.question,
            answer: faq.answer,
            categoryId: faq.categoryId || null,
            order: faq.order,
            active: faq.active,
            createdBy: adminUser.id,
            updatedBy: adminUser.id,
          },
        });

        results.faqs.created++;
      } catch (error: any) {
        results.faqs.errors.push(
          `${faq.question.substring(0, 50)}...: ${error.message}`
        );
      }
    }

    // 8. Seed Testimonials
    for (const testimonial of testimonialsData) {
      try {
        const existing = await prisma.testimonial.findFirst({
          where: {
            name: testimonial.name,
            review: testimonial.review,
          },
        });

        if (existing) {
          continue;
        }

        await prisma.testimonial.create({
          data: {
            name: testimonial.name,
            location: testimonial.location || null,
            rating: testimonial.rating,
            review: testimonial.review,
            service: testimonial.service as
              | "Tour"
              | "Cab Booking"
              | "Car Rental"
              | "Air Travel Assistance"
              | "Event",
            image: testimonial.image || null,
            active: testimonial.active,
            metaTitle: testimonial.metaTitle || null,
            metaDescription: testimonial.metaDescription || null,
            title: testimonial.title || null,
          },
        });

        results.testimonials.created++;
      } catch (error: any) {
        results.testimonials.errors.push(
          `${testimonial.name}: ${error.message}`
        );
      }
    }

    const totalCreated =
      results.categories.created +
      results.images.created +
      results.blogs.created +
      results.tours.created +
      results.events.created +
      results.vehicles.created +
      results.faqs.created +
      results.testimonials.created;

    return NextResponse.json(
      {
        success: true,
        message: `Successfully seeded database. Created ${totalCreated} records.`,
        results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        error: "Failed to seed database",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
