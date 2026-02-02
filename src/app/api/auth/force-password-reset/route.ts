import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { validateRequest, changePasswordSchema } from "@/lib/auth/validation";
import { rateLimit } from "@/lib/auth/rate-limit";

/**
 * POST /api/auth/force-password-reset
 * Forced password reset for users who have requirePasswordReset = true
 * User must be authenticated and provide current password + new password
 */
export async function POST(request: NextRequest) {
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

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(changePasswordSchema, body);

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

    const { currentPassword, newPassword } = validation.data;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: authResult.auth.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user requires password reset
    if (!user.requirePasswordReset) {
      return NextResponse.json(
        { error: "Password reset is not required for this account" },
        { status: 400 }
      );
    }

    // Verify current password
    const passwordValid = await verifyPassword(currentPassword, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Check if new password is different from current password
    const samePassword = await verifyPassword(newPassword, user.password);
    if (samePassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear requirePasswordReset flag
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        requirePasswordReset: false,
      },
    });

    // Revoke all sessions to force re-login
    await prisma.session.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. Please login again.",
    });
  } catch (error) {
    console.error("Force password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
