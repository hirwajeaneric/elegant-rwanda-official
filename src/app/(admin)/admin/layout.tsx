"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { canAccessRoute } from "@/lib/rbac";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const checkSession = useAuthStore((state) => state.checkSession);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check session on mount
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/auth/login") {
      router.push("/auth/login");
      return;
    }

    // Check if password reset is required
    if (isAuthenticated && user?.requirePasswordReset && pathname !== "/auth/force-password-reset") {
      router.push("/auth/force-password-reset");
      return;
    }

    // Check role-based access
    if (isAuthenticated && user && !canAccessRoute(user.role, pathname)) {
      // Redirect to dashboard if user doesn't have access
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, user, router, pathname]);

  if (!isAuthenticated) {
    return null;
  }

  // Redirect if password reset is required
  if (user?.requirePasswordReset && pathname !== "/auth/force-password-reset") {
    return null;
  }

  // Double-check access before rendering
  if (user && !canAccessRoute(user.role, pathname)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-4 md:p-6 lg:p-8 pt-6 lg:pt-8">{children}</main>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
