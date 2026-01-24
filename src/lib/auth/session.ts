import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "./jwt";
import { UserRole } from "@/lib/rbac";
import { NextRequest } from "next/server";

export interface SessionInfo {
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  platform?: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
}

/**
 * Extract session information from request
 */
export function extractSessionInfo(request: NextRequest): SessionInfo {
  const userAgent = request.headers.get("user-agent") || undefined;
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress = forwarded ? forwarded.split(",")[0].trim() : undefined;

  // Parse user agent (simplified - in production, use a library like ua-parser-js)
  let device: string | undefined;
  let browser: string | undefined;
  let browserVersion: string | undefined;
  let os: string | undefined;
  let osVersion: string | undefined;
  let platform: string | undefined;

  if (userAgent) {
    // Detect device
    if (/mobile|android|iphone|ipad/i.test(userAgent)) {
      device = "mobile";
      platform = /android/i.test(userAgent) ? "android" : "ios";
    } else if (/tablet|ipad/i.test(userAgent)) {
      device = "tablet";
    } else {
      device = "desktop";
      platform = "web";
    }

    // Detect browser
    if (/chrome/i.test(userAgent) && !/edge|edg/i.test(userAgent)) {
      browser = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : undefined;
    } else if (/firefox/i.test(userAgent)) {
      browser = "Firefox";
      const match = userAgent.match(/Firefox\/(\d+)/);
      browserVersion = match ? match[1] : undefined;
    } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
      browser = "Safari";
      const match = userAgent.match(/Version\/(\d+)/);
      browserVersion = match ? match[1] : undefined;
    } else if (/edge|edg/i.test(userAgent)) {
      browser = "Edge";
      const match = userAgent.match(/Edge\/(\d+)/);
      browserVersion = match ? match[1] : undefined;
    }

    // Detect OS
    if (/windows/i.test(userAgent)) {
      os = "Windows";
      const match = userAgent.match(/Windows NT (\d+\.\d+)/);
      osVersion = match ? match[1] : undefined;
    } else if (/macintosh|mac os x/i.test(userAgent)) {
      os = "macOS";
      const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
      osVersion = match ? match[1].replace("_", ".") : undefined;
    } else if (/linux/i.test(userAgent)) {
      os = "Linux";
    } else if (/android/i.test(userAgent)) {
      os = "Android";
      const match = userAgent.match(/Android (\d+\.\d+)/);
      osVersion = match ? match[1] : undefined;
    } else if (/ios|iphone|ipad/i.test(userAgent)) {
      os = "iOS";
      const match = userAgent.match(/OS (\d+[._]\d+)/);
      osVersion = match ? match[1].replace("_", ".") : undefined;
    }
  }

  return {
    ipAddress,
    userAgent,
    device,
    browser,
    browserVersion,
    os,
    osVersion,
    platform,
    // Location info would typically come from a geolocation service
    // For now, we'll leave these undefined
    country: undefined,
    city: undefined,
    region: undefined,
    timezone: undefined,
  };
}

/**
 * Create a new session for a user
 */
export async function createSession(
  userId: string,
  userEmail: string,
  userRole: UserRole,
  sessionInfo: SessionInfo
) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  // Create session in database first
  const session = await prisma.session.create({
    data: {
      userId,
      token: "", // Will be updated after token generation
      refreshToken: "", // Will be updated after token generation
      expiresAt,
      ...sessionInfo,
    },
  });

  // Generate tokens with session ID
  const accessToken = generateAccessToken({
    userId,
    email: userEmail,
    role: userRole,
    sessionId: session.id,
  });

  const refreshToken = generateRefreshToken({
    userId,
    sessionId: session.id,
  });

  // Update session with tokens
  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: {
      token: accessToken,
      refreshToken,
    },
  });

  return {
    session: updatedSession,
    accessToken,
    refreshToken,
  };
}

/**
 * Validate a session by token
 */
export async function validateSession(token: string) {
  const payload = verifyAccessToken(token);
  if (!payload) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session || !session.isActive || session.expiresAt < new Date()) {
    return null;
  }

  // Update last activity
  await prisma.session.update({
    where: { id: session.id },
    data: { lastActivity: new Date() },
  });

  return {
    session,
    user: session.user,
    payload,
  };
}

/**
 * Refresh a session using refresh token
 */
export async function refreshSession(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session || !session.isActive || session.expiresAt < new Date()) {
    return null;
  }

  if (session.refreshToken !== refreshToken) {
    return null;
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken({
    userId: session.userId,
    email: session.user.email,
    role: session.user.role,
    sessionId: session.id,
  });

  const newRefreshToken = generateRefreshToken({
    userId: session.userId,
    sessionId: session.id,
  });

  // Update session
  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: {
      token: newAccessToken,
      refreshToken: newRefreshToken,
      lastActivity: new Date(),
    },
  });

  return {
    session: updatedSession,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: session.user,
  };
}

/**
 * Revoke a session
 */
export async function revokeSession(sessionId: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { isActive: false },
  });
}

/**
 * Revoke all sessions for a user
 */
export async function revokeAllUserSessions(userId: string, exceptSessionId?: string) {
  return prisma.session.updateMany({
    where: {
      userId,
      id: exceptSessionId ? { not: exceptSessionId } : undefined,
    },
    data: { isActive: false },
  });
}

/**
 * Get all active sessions for a user
 */
export async function getUserSessions(userId: string) {
  return prisma.session.findMany({
    where: {
      userId,
      isActive: true,
      expiresAt: { gt: new Date() },
    },
    orderBy: { lastActivity: "desc" },
  });
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions() {
  return prisma.session.updateMany({
    where: {
      expiresAt: { lt: new Date() },
      isActive: true,
    },
    data: { isActive: false },
  });
}

/**
 * Get session from request (from Authorization header or cookie)
 */
export async function getSessionFromRequest(request: NextRequest) {
  // Try to get token from Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return validateSession(token);
  }

  // Try to get token from cookie
  const cookieToken = request.cookies.get("access-token")?.value;
  if (cookieToken) {
    return validateSession(cookieToken);
  }

  return null;
}
