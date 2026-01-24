import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth/validation";
import { rateLimit } from "@/lib/auth/rate-limit";
import { generateOTP } from "@/lib/auth/tokens";
import { sendOTPEmail } from "@/lib/auth/email-templates";
import { z } from "zod";

const resendOTPSchema = z.object({
  email: z.string().email("Invalid email address"),
  purpose: z.enum(["REGISTRATION", "PASSWORD_RESET", "EMAIL_VERIFICATION"]),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (stricter for password reset)
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(resendOTPSchema, body);

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

    const { email, purpose } = validation.data;

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes

    // Invalidate previous OTPs for this email and purpose
    await prisma.oTPVerification.updateMany({
      where: {
        email,
        purpose,
        verified: false,
      },
      data: { verified: true }, // Mark as used
    });

    // Create new OTP verification record
    await prisma.oTPVerification.create({
      data: {
        email,
        otp,
        purpose,
        expiresAt,
      },
    });

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, purpose);
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
