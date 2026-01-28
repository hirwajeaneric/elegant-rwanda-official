import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { uploadImage } from "@/lib/cloudinary";
import { rateLimit } from "@/lib/auth/rate-limit";

// POST /api/images - Upload one or more images
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Require authentication (any authenticated user can upload)
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const folder = formData.get("folder") as string | null;
    const tags = formData.get("tags") as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        continue; // Skip non-image files
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        continue; // Skip files that are too large
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const uploadResult = await uploadImage(buffer, {
        folder: folder || "elegant-rwanda",
        tags: tags ? tags.split(",").map((t) => t.trim()) : undefined,
      });

      // Save to database
      const image = await prisma.image.create({
        data: {
          publicId: uploadResult.public_id,
          url: uploadResult.secure_url,
          urlRaw: uploadResult.url,
          width: uploadResult.width,
          height: uploadResult.height,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          folder: folder || "elegant-rwanda",
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
          uploadedBy: authResult.auth.userId,
        },
      });

      uploadedImages.push(image);
    }

    if (uploadedImages.length === 0) {
      return NextResponse.json(
        { error: "No valid images were uploaded" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        images: uploadedImages,
        count: uploadedImages.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// GET /api/images - List images with filters
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const active = searchParams.get("active");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (active !== null) {
      where.active = active === "true";
    }

    if (featured !== null) {
      where.featured = featured === "true";
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { alt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [images, total] = await Promise.all([
      prisma.image.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.image.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("List images error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
