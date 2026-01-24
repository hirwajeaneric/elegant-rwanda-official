import { NextRequest, NextResponse } from "next/server";
import { getUserSessions } from "@/lib/auth/session";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, { requireCSRF: false });
    if (!authResult.success) {
      return authResult.response;
    }

    const sessions = await getUserSessions(authResult.auth.userId);

    // Remove sensitive information
    const safeSessions = sessions.map((session) => ({
      id: session.id,
      device: session.device,
      browser: session.browser,
      os: session.os,
      ipAddress: session.ipAddress,
      country: session.country,
      city: session.city,
      lastActivity: session.lastActivity,
      createdAt: session.createdAt,
      isCurrent: session.id === authResult.auth.sessionId,
    }));

    return NextResponse.json({ sessions: safeSessions });
  } catch (error) {
    console.error("List sessions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
