"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { hasPermission, type UserRole } from "@/lib/rbac";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: {
    resource: string;
    action?: string;
  };
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  requiredRole,
  requiredPermission,
  fallback,
}: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Check role requirement
    if (requiredRole && user.role !== requiredRole && user.role !== "ADMIN") {
      router.push("/admin/dashboard");
      return;
    }

    // Check permission requirement
    if (requiredPermission) {
      if (!hasPermission(user.role, requiredPermission.resource, requiredPermission.action)) {
        router.push("/admin/dashboard");
        return;
      }
    }
  }, [user, requiredRole, requiredPermission, router]);

  if (!user) {
    return null;
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole && user.role !== "ADMIN") {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldX className="h-5 w-5 text-destructive" />
                <CardTitle>Access Denied</CardTitle>
              </div>
              <CardDescription>
                You don&apos;t have permission to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  // Check permission requirement
  if (requiredPermission) {
    if (!hasPermission(user.role, requiredPermission.resource, requiredPermission.action)) {
      return (
        fallback || (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldX className="h-5 w-5 text-destructive" />
                  <CardTitle>Access Denied</CardTitle>
                </div>
                <CardDescription>
                  You don&apos;t have permission to access this resource.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      );
    }
  }

  return <>{children}</>;
}
