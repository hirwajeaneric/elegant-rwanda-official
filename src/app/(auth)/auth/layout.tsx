"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Toaster } from "@/components/ui/sonner";

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  // Redirect authenticated users away from auth pages
  // Exception: allow /auth/force-password-reset if password reset is required
  useEffect(() => {
    if (isAuthenticated && pathname.startsWith("/auth/")) {
      // Allow force-password-reset page if password reset is required
      if (pathname === "/auth/force-password-reset" && user?.requirePasswordReset) {
        return;
      }
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, user, router, pathname]);

  const customStyles = {
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/nyungwe_national_park.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-muted/30 to-muted/50 p-4" style={customStyles}>
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-0">
          <div className="leading-tight flex flex-col items-center justify-center">
            <span className="text-2xl font-display block font-semibold text-white">
              Elegant Travel & Tours
            </span>
            <span className="text-xl font-display block font-semibold text-white">ET&T</span>
          </div>
        </Link>
      </div>

      {children}

      {/* Copyright */}
      <div className="mt-8 text-center">
        <p className="text-sm text-white/80">
          © {new Date().getFullYear()} Elegant Travel & Tours. All Rights Reserved.
        </p>
      </div>

      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
