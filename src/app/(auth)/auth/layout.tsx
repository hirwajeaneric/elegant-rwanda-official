"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (isAuthenticated && pathname.startsWith("/auth/")) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router, pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/50 p-4">
      {children}
    </div>
  );
}
