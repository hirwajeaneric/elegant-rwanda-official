import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./session";
import { validateCSRFToken } from "./csrf";
import { UserRole } from "@/lib/rbac";

export interface AuthenticatedRequest {
  userId: string;
  userEmail: string;
  userRole: UserRole;
  sessionId: string;
}

/**
 * Middleware to authenticate requests
 */
export async function authenticateRequest(
  request: NextRequest,
  requireCSRF: boolean = true
): Promise<
  | { success: true; auth: AuthenticatedRequest }
  | { success: false; response: NextResponse }
> {
  // Check CSRF token for state-changing operations
  if (requireCSRF && ["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    const csrfValid = validateCSRFToken(request);
    if (!csrfValid) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Invalid or missing CSRF token" },
          { status: 403 }
        ),
      };
    }
  }

  // Get session from request
  const sessionData = await getSessionFromRequest(request);
  if (!sessionData) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Unauthorized", message: "Invalid or expired session" },
        { status: 401 }
      ),
    };
  }

  return {
    success: true,
    auth: {
      userId: sessionData.user.id,
      userEmail: sessionData.user.email,
      userRole: sessionData.user.role,
      sessionId: sessionData.session.id,
    },
  };
}

/**
 * Middleware to check if user has required role
 */
export function requireRole(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    ADMIN: 3,
    CONTENT_MANAGER: 2,
    EDITOR: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Middleware to check if user is admin
 */
export function requireAdmin(userRole: UserRole): boolean {
  return userRole === "ADMIN";
}

/**
 * Combined authentication and authorization middleware
 */
export async function requireAuth(
  request: NextRequest,
  options: {
    requireCSRF?: boolean;
    requireRole?: UserRole;
    requireAdmin?: boolean;
  } = {}
): Promise<
  | { success: true; auth: AuthenticatedRequest }
  | { success: false; response: NextResponse }
> {
  const authResult = await authenticateRequest(
    request,
    options.requireCSRF ?? true
  );

  if (!authResult.success) {
    return authResult;
  }

  // Check role requirements
  if (options.requireAdmin && !requireAdmin(authResult.auth.userRole)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 }
      ),
    };
  }

  if (
    options.requireRole &&
    !requireRole(authResult.auth.userRole, options.requireRole)
  ) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden", message: "Insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  return authResult;
}
