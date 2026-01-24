import jwt from "jsonwebtoken";
import { UserRole } from "@/lib/rbac";

// Require JWT secrets - fail fast if not set
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m"; // 15 minutes
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d"; // 7 days

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error(
    "JWT_SECRET and JWT_REFRESH_SECRET must be set in environment variables"
  );
}

// TypeScript non-null assertions - secrets are guaranteed to be defined due to check above
const JWT_SECRET_NON_NULL = JWT_SECRET!;
const JWT_REFRESH_SECRET_NON_NULL = JWT_REFRESH_SECRET!;

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
}

/**
 * Generate an access token
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET_NON_NULL, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: "elegant-rwanda",
    audience: "elegant-rwanda-users",
  } as jwt.SignOptions);
}

/**
 * Generate a refresh token
 */
export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET_NON_NULL, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    issuer: "elegant-rwanda",
    audience: "elegant-rwanda-users",
  } as jwt.SignOptions);
}

/**
 * Verify an access token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_NON_NULL, {
      issuer: "elegant-rwanda",
      audience: "elegant-rwanda-users",
    }) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET_NON_NULL, {
      issuer: "elegant-rwanda",
      audience: "elegant-rwanda-users",
    }) as RefreshTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token: string): JWTPayload | RefreshTokenPayload | null {
  try {
    return jwt.decode(token) as JWTPayload | RefreshTokenPayload;
  } catch {
    return null;
  }
}
