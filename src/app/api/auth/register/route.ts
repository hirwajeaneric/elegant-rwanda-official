import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validatePasswordStrength } from "@/lib/auth/password";
import { validateRequest, registerSchema } from "@/lib/auth/validation";
import { rateLimit } from "@/lib/auth/rate-limit";
import { generateOTP } from "@/lib/auth/tokens";
import { sendOTPEmail } from "@/lib/auth/email-templates";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(registerSchema, body);

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

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          error: "Password does not meet requirements",
          details: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes

    // Create OTP verification record
    try {
      const otpRecord = await prisma.oTPVerification.create({
        data: {
          email,
          otp,
          purpose: "REGISTRATION",
          expiresAt,
        },
      });
      console.log("OTP verification record created:", otpRecord.id);
    } catch (dbError) {
      console.error("Database error creating OTP record:", dbError);
      return NextResponse.json(
        { error: "Failed to create OTP verification record" },
        { status: 500 }
      );
    }

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, "REGISTRATION");
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      // Don't fail the request, but log the error
    }

    return NextResponse.json({
      success: true,
      message: "Registration OTP sent to your email",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
