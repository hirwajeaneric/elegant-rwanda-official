import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormEmails } from "@/lib/email";
import { z } from "zod";

const newsletterSubscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  source: z.string().optional(),
  preferences: z.record(z.string(), z.boolean()).optional(),
  interests: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSubscriptionSchema.parse(body);

    // Normalize email to lowercase to prevent case-sensitive duplicates
    const normalizedEmail = validatedData.email.toLowerCase();

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingSubscriber) {
      // If subscriber is already active, prevent duplicate subscription
      if (existingSubscriber.active) {
        return NextResponse.json(
          {
            message:
              "This email address is already subscribed to our newsletter!",
            isSubscribed: true,
          },
          { status: 409 } // 409 Conflict - appropriate for duplicate resource
        );
      }

      // Reactivate previously unsubscribed user
      await prisma.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: {
          active: true,
          firstName: validatedData.firstName || existingSubscriber.firstName,
          source: validatedData.source || existingSubscriber.source,
          preferences:
            validatedData.preferences ||
            (existingSubscriber.preferences === null
              ? undefined
              : existingSubscriber.preferences),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          message: "Welcome back! Your subscription has been reactivated.",
          wasReactivated: true,
        },
        { status: 200 }
      );
    }

    // Create new subscriber
    const preferencesData =
      validatedData.preferences ||
      (validatedData.interests
        ? { interests: validatedData.interests }
        : undefined);

    await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        firstName: validatedData.firstName,
        source: validatedData.source || "general",
        preferences: preferencesData,
        active: true,
      },
    });

    // Send email notification
    try {
      await sendFormEmails({
        formType:
          validatedData.source === "events-newsletter"
            ? "events-newsletter"
            : "newsletter",
        data: {
          email: validatedData.email,
          firstName: validatedData.firstName || "N/A",
          source: validatedData.source || "general",
          preferences:
            validatedData.preferences || validatedData.interests || "None",
        },
        userEmail: validatedData.email,
      });
    } catch (emailError) {
      // Log email error but don't fail the subscription
      console.error("Failed to send email notification:", emailError);
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
