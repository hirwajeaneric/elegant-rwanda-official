"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function ForcePasswordResetPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const csrfToken = useAuthStore((state) => state.csrfToken);
  const user = useAuthStore((state) => state.user);
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    // Check if user is authenticated and requires password reset
    checkSession().then(() => {
      const currentUser = useAuthStore.getState().user;
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }
      // If user doesn't require password reset, redirect to dashboard
      if (currentUser && !currentUser.requirePasswordReset) {
        router.push("/admin/dashboard");
        return;
      }
    });
  }, [checkSession, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setError("Password must be at least 8 characters long");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("New password must be different from current password");
      setError("New password must be different from current password");
      return;
    }

    setLoading(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }

      const response = await fetch("/api/auth/force-password-reset", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || "Failed to reset password";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      toast.success("Password changed successfully. Please login again.");
      // Clear session and redirect to login (intentional logout after password reset)
      useAuthStore.getState().logout(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <ShieldAlert className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Password Reset Required
        </CardTitle>
        <CardDescription className="text-center">
          You must change your password before continuing. This is required for security purposes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="pl-10 pr-10"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password (min 8 characters)"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-center text-muted-foreground">
          After changing your password, you will be logged out and redirected to the login page.
        </p>
      </CardContent>
    </Card>
  );
}
