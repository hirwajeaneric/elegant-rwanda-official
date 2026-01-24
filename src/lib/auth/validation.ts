import { z } from "zod";
import validator from "validator";

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return validator.escape(validator.trim(input));
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  return validator.normalizeEmail(validator.trim(email.toLowerCase())) || email;
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj } as T;
  for (const key in sanitized) {
    const value = sanitized[key];
    if (typeof value === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  return sanitized;
}

/**
 * Validation schemas
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").transform(sanitizeEmail),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").transform(sanitizeString),
  email: z.string().email("Invalid email address").transform(sanitizeEmail),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").transform(sanitizeString),
  email: z.string().email("Invalid email address").transform(sanitizeEmail),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "CONTENT_MANAGER", "EDITOR"]),
  active: z.boolean().optional().default(true),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").transform(sanitizeString).optional(),
  email: z.string().email("Invalid email address").transform(sanitizeEmail).optional(),
  role: z.enum(["ADMIN", "CONTENT_MANAGER", "EDITOR"]).optional(),
  active: z.boolean().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address").transform(sanitizeEmail),
});

export const resetPasswordConfirmSchema = z.object({
  email: z.string().email("Invalid email address").transform(sanitizeEmail),
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

/**
 * Validate request body against a schema
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
