export type UserRole = "ADMIN" | "CONTENT_MANAGER" | "EDITOR";

export interface Permission {
  resource: string;
  actions: string[];
}

// Define role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    { resource: "*", actions: ["*"] }, // Full access to everything
  ],
  CONTENT_MANAGER: [
    { resource: "tours", actions: ["create", "read", "update", "delete"] },
    { resource: "car-rental", actions: ["create", "read", "update", "delete"] },
    { resource: "events", actions: ["create", "read", "update", "delete"] },
    { resource: "blogs", actions: ["create", "read", "update", "delete"] },
    { resource: "testimonials", actions: ["create", "read", "update", "delete"] },
    { resource: "team", actions: ["create", "read", "update", "delete"] },
    { resource: "faqs", actions: ["create", "read", "update", "delete"] },
    { resource: "categories", actions: ["create", "read", "update", "delete"] },
    { resource: "gallery", actions: ["create", "read", "update", "delete"] },
    { resource: "profile", actions: ["read", "update"] },
    // No access to users
  ],
  EDITOR: [
    { resource: "blogs", actions: ["create", "read", "update", "delete"] },
    { resource: "categories", actions: ["create", "read", "update", "delete"] },
    { resource: "faqs", actions: ["create", "read", "update", "delete"] },
    { resource: "gallery", actions: ["create", "read", "update", "delete"] },
    { resource: "profile", actions: ["read", "update"] },
    // Read-only access to dashboard
    { resource: "dashboard", actions: ["read"] },
  ],
};

// Check if user has permission for a resource and action
export function hasPermission(
  userRole: UserRole | undefined,
  resource: string,
  action: string = "read"
): boolean {
  if (!userRole) return false;

  const permissions = ROLE_PERMISSIONS[userRole];

  // Check for wildcard admin access
  const hasWildcard = permissions.some(
    (p) => p.resource === "*" && p.actions.includes("*")
  );
  if (hasWildcard) return true;

  // Check specific permissions
  return permissions.some(
    (p) =>
      (p.resource === resource || p.resource === "*") &&
      (p.actions.includes(action) || p.actions.includes("*"))
  );
}

// Check if user can access a route
export function canAccessRoute(userRole: UserRole | undefined, route: string): boolean {
  if (!userRole) return false;

  // Remove /admin prefix and get the resource
  const resource = route.replace("/admin/", "").split("/")[0];

  // Special cases
  if (route === "/admin/dashboard") {
    return true; // All authenticated users can access dashboard
  }

  if (route.startsWith("/admin/users")) {
    return userRole === "ADMIN"; // Only admins can access user management
  }

  if (route.startsWith("/admin/profile")) {
    return true; // All authenticated users can access profile
  }

  // Check permissions for the resource
  return hasPermission(userRole, resource);
}

// Get accessible routes for a role
export function getAccessibleRoutes(userRole: UserRole | undefined): string[] {
  if (!userRole) return ["/admin/dashboard"];

  const allRoutes = [
    "/admin/dashboard",
    "/admin/tours",
    "/admin/car-rental",
    "/admin/events",
    "/admin/blogs",
    "/admin/testimonials",
    "/admin/team",
    "/admin/faqs",
    "/admin/categories",
    "/admin/gallery",
    "/admin/users",
    "/admin/profile",
  ];

  return allRoutes.filter((route) => canAccessRoute(userRole, route));
}

// Role hierarchy for comparison
const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 3,
  CONTENT_MANAGER: 2,
  EDITOR: 1,
};

// Check if user role is higher than or equal to required role
export function hasMinimumRole(
  userRole: UserRole | undefined,
  requiredRole: UserRole
): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
