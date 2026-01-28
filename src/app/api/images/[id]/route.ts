import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { deleteImage } from "@/lib/cloudinary";
import { rateLimit } from "@/lib/auth/rate-limit";

// GET /api/images/[id] - Get specific image
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const image = await prisma.image.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      image,
    });
  } catch (error) {
    console.error("Get image error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/images/[id] - Update image metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Require authentication
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;
    const body = await request.json();

    // Check if image exists
    const existingImage = await prisma.image.findUnique({
      where: { id },
    });

    if (!existingImage) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Update image metadata
    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existingImage.title,
        alt: body.alt !== undefined ? body.alt : existingImage.alt,
        description: body.description !== undefined ? body.description : existingImage.description,
        category: body.category !== undefined ? body.category : existingImage.category,
        tags: body.tags !== undefined ? body.tags : existingImage.tags,
        featured: body.featured !== undefined ? body.featured : existingImage.featured,
        active: body.active !== undefined ? body.active : existingImage.active,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      image: updatedImage,
    });
  } catch (error) {
    console.error("Update image error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/images/[id] - Delete image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Require authentication
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    // Check if image exists
    const existingImage = await prisma.image.findUnique({
      where: { id },
    });

    if (!existingImage) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    try {
      await deleteImage(existingImage.publicId);
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);
      // Continue with database deletion even if Cloudinary deletion fails
    }

    // Delete from database
    await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
