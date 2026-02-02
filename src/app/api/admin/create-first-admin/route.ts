import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { validateRequest } from "@/lib/auth/validation";
import { z } from "zod";
import validator from "validator";

const createFirstAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").transform((s) => validator.escape(validator.trim(s))),
  email: z.string().email("Invalid email address").transform((e) => validator.normalizeEmail(validator.trim(e.toLowerCase())) || e),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * POST /api/admin/create-first-admin
 * 
 * Creates the first admin user account. This endpoint should only be used once during initial setup.
 * It creates a user with:
 * - role: ADMIN
 * - active: true
 * - emailVerified: true
 * - requirePasswordReset: false (can be set to true if you want to force password change)
 * 
 * This endpoint does NOT require authentication - it's meant for initial setup only.
 * 
 * Request Body:
 * {
 *   "name": "Admin User",
 *   "email": "admin@example.com",
 *   "password": "SecurePassword123!"
 * }
 * 
 * Response (201 Created):
 * {
 *   "success": true,
 *   "user": {
 *     "id": "clx...",
 *     "email": "admin@example.com",
 *     "name": "Admin User",
 *     "role": "ADMIN",
 *     "active": true,
 *     "emailVerified": true,
 *     "requirePasswordReset": false,
 *     "createdAt": "2024-01-01T00:00:00.000Z"
 *   },
 *   "message": "First admin user created successfully"
 * }
 * 
 * Error Responses:
 * - 400: Validation error or user already exists
 * - 409: Admin user already exists
 * - 500: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    // Check if any admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          error: "Admin user already exists. Use the admin dashboard to create additional users.",
        },
        { status: 409 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(createFirstAdminSchema, body);

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

    const { name, email, password } = validation.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create first admin user
    const adminUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        active: true,
        emailVerified: true, // First admin is automatically verified
        requirePasswordReset: false, // Set to true if you want to force password change on first login
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        emailVerified: true,
        requirePasswordReset: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: adminUser,
        message: "First admin user created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create first admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
