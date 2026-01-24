import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";

// Memory-based rate limiter (for development)
// In production, use Redis-based rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of requests
  duration: 60, // Per 60 seconds
});

const loginRateLimiter = new RateLimiterMemory({
  points: 5, // 5 login attempts
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes after limit exceeded
});

const passwordResetRateLimiter = new RateLimiterMemory({
  points: 3, // 3 password reset attempts
  duration: 3600, // Per hour
});

/**
 * Get client identifier from request (IP address)
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier
  return "unknown";
}

/**
 * Apply rate limiting to a request
 */
export async function rateLimit(
  request: NextRequest,
  limiter: RateLimiterMemory | RateLimiterRedis = rateLimiter
): Promise<{ success: boolean; response?: NextResponse }> {
  const identifier = getClientIdentifier(request);

  try {
    await limiter.consume(identifier);
    return { success: true };
  } catch (rejRes: unknown) {
    const error = rejRes as { msBeforeNext?: number };
    const remainingTime = Math.round((error.msBeforeNext || 0) / 1000) || 1;
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Too many requests",
          message: `Rate limit exceeded. Please try again in ${remainingTime} seconds.`,
          retryAfter: remainingTime,
        },
        {
          status: 429,
          headers: {
            "Retry-After": remainingTime.toString(),
            "X-RateLimit-Limit": limiter.points.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(Date.now() + (error.msBeforeNext || 0)).toISOString(),
          },
        }
      ),
    };
  }
}

/**
 * Rate limiter for login attempts
 */
export async function rateLimitLogin(
  request: NextRequest
): Promise<{ success: boolean; response?: NextResponse }> {
  return rateLimit(request, loginRateLimiter);
}

/**
 * Rate limiter for password reset attempts
 */
export async function rateLimitPasswordReset(
  request: NextRequest
): Promise<{ success: boolean; response?: NextResponse }> {
  return rateLimit(request, passwordResetRateLimiter);
}
