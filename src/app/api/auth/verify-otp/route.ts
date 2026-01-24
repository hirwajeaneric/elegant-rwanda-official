import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { validateRequest } from "@/lib/auth/validation";
import { rateLimit } from "@/lib/auth/rate-limit";
import { z } from "zod";
import { createSession, extractSessionInfo } from "@/lib/auth/session";
import { generateCSRFToken } from "@/lib/auth/csrf";
import { cookies } from "next/headers";

const verifyOTPSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(verifyOTPSchema, body);

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

    const { email, otp, name, password } = validation.data;

    // Find OTP verification
    const otpVerification = await prisma.oTPVerification.findFirst({
      where: {
        email,
        otp,
        verified: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpVerification) {
      // Increment attempts if OTP exists but is invalid
      await prisma.oTPVerification.updateMany({
        where: { email, verified: false },
        data: { attempts: { increment: 1 } },
      });

      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Check attempts (max 5 attempts)
    if (otpVerification.attempts >= 5) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    // Mark OTP as verified
    await prisma.oTPVerification.update({
      where: { id: otpVerification.id },
      data: { verified: true },
    });

    // Handle based on purpose
    if (otpVerification.purpose === "REGISTRATION") {
      if (!name || !password) {
        return NextResponse.json(
          { error: "Name and password are required for registration" },
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      let user;
      try {
        user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            emailVerified: true,
            role: "EDITOR", // Default role
          },
        });
        console.log("User created successfully:", user.id);
      } catch (dbError) {
        console.error("Database error creating user:", dbError);
        return NextResponse.json(
          { error: "Failed to create user account" },
          { status: 500 }
        );
      }

      // Update OTP verification with userId
      await prisma.oTPVerification.update({
        where: { id: otpVerification.id },
        data: { userId: user.id },
      });

      // Extract session information
      const sessionInfo = extractSessionInfo(request);

      // Create session
      const { accessToken, refreshToken } = await createSession(
        user.id,
        user.email,
        user.role,
        sessionInfo
      );

      // Generate CSRF token
      const csrfToken = generateCSRFToken();

      // Set HTTP-only cookies
      const cookieStore = await cookies();
      cookieStore.set("access-token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15, // 15 minutes
        path: "/",
      });

      cookieStore.set("refresh-token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      cookieStore.set("csrf-token", csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        csrfToken,
      });
    } else if (otpVerification.purpose === "PASSWORD_RESET") {
      if (!password) {
        return NextResponse.json(
          { error: "Password is required for password reset" },
          { status: 400 }
        );
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Hash new password
      const hashedPassword = await hashPassword(password);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      // Revoke all sessions
      await prisma.session.updateMany({
        where: { userId: user.id },
        data: { isActive: false },
      });

      return NextResponse.json({
        success: true,
        message: "Password reset successfully",
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    // Log full error details for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { 
        error: "Internal server error",
        // Only include details in development
        ...(process.env.NODE_ENV === "development" && { details: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    );
  }
}
