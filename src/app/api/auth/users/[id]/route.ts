import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth/middleware";
import { validateRequest, updateUserSchema } from "@/lib/auth/validation";
import { rateLimit } from "@/lib/auth/rate-limit";
import { UserRole } from "@/lib/rbac";

// GET /api/auth/users/[id] - Get user by ID
export async function GET(
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
    const authResult = await requireAuth(request, {
      requireCSRF: false,
    });
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    // Users can view their own profile, admins can view anyone
    if (id !== authResult.auth.userId && !requireRole(authResult.auth.userRole, "ADMIN")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/auth/users/[id] - Update user
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

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(updateUserSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validation.errors.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Permission checks
    const isSelf = id === authResult.auth.userId;
    const isAdmin = requireRole(authResult.auth.userRole, "ADMIN");
    const canEditRole = isAdmin && !isSelf; // Admins can't change their own role

    // Users can only edit themselves (limited fields), admins can edit anyone
    if (!isSelf && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Non-admins can't change role
    if (validation.data.role && !canEditRole) {
      return NextResponse.json(
        { error: "Forbidden", message: "You cannot change user roles" },
        { status: 403 }
      );
    }

    // Build update data
    const updateData: {
      updatedBy: string;
      name?: string;
      email?: string;
      role?: UserRole;
      active?: boolean;
    } = {
      updatedBy: authResult.auth.userId,
    };

    if (validation.data.name) {
      updateData.name = validation.data.name;
    }

    if (validation.data.email && validation.data.email !== user.email) {
      // Check if new email is already taken
      const existingUser = await prisma.user.findUnique({
        where: { email: validation.data.email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        );
      }

      updateData.email = validation.data.email;
    }

    if (canEditRole && validation.data.role) {
      updateData.role = validation.data.role;
    }

    if (isAdmin && validation.data.active !== undefined) {
      updateData.active = validation.data.active;
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/users/[id] - Delete/deactivate user
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

    // Require admin authentication
    const authResult = await requireAuth(request, {
      requireAdmin: true,
    });
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    // Prevent deleting yourself
    if (id === authResult.auth.userId) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Soft delete (deactivate) instead of hard delete
    await prisma.user.update({
      where: { id },
      data: {
        active: false,
        updatedBy: authResult.auth.userId,
      },
    });

    // Revoke all user sessions
    await prisma.session.updateMany({
      where: { userId: id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
