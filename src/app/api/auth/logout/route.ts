import { NextRequest, NextResponse } from "next/server";
import { revokeSession } from "@/lib/auth/session";
import { authenticateRequest } from "@/lib/auth/middleware";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request, false);
    if (!authResult.success) {
      // If not authenticated, still clear cookies
      const cookieStore = await cookies();
      cookieStore.delete("access-token");
      cookieStore.delete("refresh-token");
      cookieStore.delete("csrf-token");
      return NextResponse.json({ success: true });
    }

    // Revoke session
    await revokeSession(authResult.auth.sessionId);

    // Clear cookies
    const cookieStore = await cookies();
    cookieStore.delete("access-token");
    cookieStore.delete("refresh-token");
    cookieStore.delete("csrf-token");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
