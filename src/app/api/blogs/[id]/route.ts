import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { rateLimit } from "@/lib/auth/rate-limit";

// GET /api/blogs/[id] - Get specific blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Get blog error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;
    const body = await request.json();

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Check slug uniqueness if changing
    if (body.slug && body.slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug: body.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Blog post with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: body.title ?? existingBlog.title,
        slug: body.slug ?? existingBlog.slug,
        excerpt: body.excerpt ?? existingBlog.excerpt,
        content: body.content ?? existingBlog.content,
        author: body.author ?? existingBlog.author,
        authorImage: body.authorImage ?? existingBlog.authorImage,
        publishDate: body.publishDate ? new Date(body.publishDate) : existingBlog.publishDate,
        readTime: body.readTime ?? existingBlog.readTime,
        categoryId: body.categoryId ?? existingBlog.categoryId,
        tags: body.tags ?? existingBlog.tags,
        featuredImage: body.featuredImage ?? existingBlog.featuredImage,
        featured: body.featured ?? existingBlog.featured,
        metaTitle: body.metaTitle ?? existingBlog.metaTitle,
        metaDescription: body.metaDescription ?? existingBlog.metaDescription,
        status: body.status ?? existingBlog.status,
        updatedBy: authResult.auth.userId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const authResult = await requireAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
