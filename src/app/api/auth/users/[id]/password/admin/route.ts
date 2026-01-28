import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { validateRequest, adminResetPasswordSchema } from "@/lib/auth/validation";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { rateLimit } from "@/lib/auth/rate-limit";
import { revokeAllUserSessions } from "@/lib/auth/session";

// PUT /api/auth/users/[id]/password/admin - Admin reset user password
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

    // Require admin authentication
    const authResult = await requireAuth(request, {
      requireAdmin: true,
    });
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;

    // Prevent admins from resetting their own password via this endpoint
    // They should use the regular password change endpoint
    if (id === authResult.auth.userId) {
      return NextResponse.json(
        { error: "Forbidden", message: "Use the regular password change endpoint for your own password" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(adminResetPasswordSchema, body);

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

    const { newPassword } = validation.data;

    // Validate password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          error: "Password does not meet requirements",
          details: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        updatedBy: authResult.auth.userId,
      },
    });

    // Revoke all user sessions (force re-login)
    await revokeAllUserSessions(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
