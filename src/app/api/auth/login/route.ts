import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, extractSessionInfo } from "@/lib/auth/session";
import { rateLimitLogin } from "@/lib/auth/rate-limit";
import { validateRequest, loginSchema } from "@/lib/auth/validation";
import { generateCSRFToken } from "@/lib/auth/csrf";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimitLogin(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(loginSchema, body);

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

    const { email, password } = validation.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not (security best practice)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.active) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 403 }
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Extract session information from request
    const sessionInfo = extractSessionInfo(request);

    // Create session
    const { session, accessToken, refreshToken } = await createSession(
      user.id,
      user.email,
      user.role,
      sessionInfo
    );

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

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
      httpOnly: false, // CSRF token needs to be accessible to JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Return response
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: {
          id: session.id,
          device: session.device,
          browser: session.browser,
          os: session.os,
          ipAddress: session.ipAddress,
        },
        requirePasswordReset: user.requirePasswordReset, // Flag to indicate if password reset is required
        csrfToken, // Also return in response for client-side use
      },
      {
        status: 200,
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
