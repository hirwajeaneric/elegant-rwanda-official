import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const sessionData = await getSessionFromRequest(request);

    if (!sessionData) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        role: sessionData.user.role,
        requirePasswordReset: sessionData.user.requirePasswordReset,
      },
      session: {
        id: sessionData.session.id,
        device: sessionData.session.device,
        browser: sessionData.session.browser,
        os: sessionData.session.os,
        ipAddress: sessionData.session.ipAddress,
        lastActivity: sessionData.session.lastActivity,
      },
    });
  } catch (error) {
    console.error("Get session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
