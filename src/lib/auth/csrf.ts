import { NextRequest } from "next/server";
import Tokens from "csrf";

// Require CSRF secret - fail fast if not set
const CSRF_SECRET = process.env.CSRF_SECRET;

if (!CSRF_SECRET) {
  throw new Error("CSRF_SECRET must be set in environment variables");
}

const tokens = new Tokens();

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  // CSRF_SECRET is guaranteed to be defined due to check above
  return tokens.create(CSRF_SECRET!);
}

/**
 * Verify a CSRF token
 */
export function verifyCSRFToken(token: string): boolean {
  try {
    // CSRF_SECRET is guaranteed to be defined due to check above
    return tokens.verify(CSRF_SECRET!, token);
  } catch {
    return false;
  }
}

/**
 * Get CSRF token from request headers
 */
export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  // Check X-CSRF-Token header first
  const headerToken = request.headers.get("X-CSRF-Token");
  if (headerToken) {
    return headerToken;
  }

  // Check X-XSRF-Token header (common alternative)
  const xsrfToken = request.headers.get("X-XSRF-Token");
  if (xsrfToken) {
    return xsrfToken;
  }

  // Check cookies for CSRF token
  const cookieToken = request.cookies.get("csrf-token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

/**
 * Validate CSRF token from request
 */
export function validateCSRFToken(request: NextRequest): boolean {
  const token = getCSRFTokenFromRequest(request);
  if (!token) {
    return false;
  }
  return verifyCSRFToken(token);
}
