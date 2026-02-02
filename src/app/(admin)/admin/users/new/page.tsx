
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, EyeOff, Eye, Save } from "lucide-react";
import Link from "next/link";
import { UserRole } from "@/lib/rbac";
import { useAuthStore } from "@/lib/stores/auth-store";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function NewUserPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const csrfToken = useAuthStore((state) => state.csrfToken);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "EDITOR" as UserRole,
    active: true,
    requirePasswordReset: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }

      const response = await fetch(`${API_URL}/api/auth/users`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          active: formData.active,
          requirePasswordReset: formData.requirePasswordReset,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          const validationErrors: Record<string, string> = {};
          data.details.forEach((detail: { path: string; message: string }) => {
            validationErrors[detail.path] = detail.message;
          });
          setErrors(validationErrors);
          const errorMessage = data.error || "Validation failed";
          setSubmitError(errorMessage);
          toast.error("Failed to create user", {
            description: errorMessage,
          });
        } else {
          const errorMessage = data.error || data.message || "Failed to create user";
          setSubmitError(errorMessage);
          toast.error("Failed to create user", {
            description: errorMessage,
          });
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      toast.success("User created successfully", {
        description: `${data.user?.name || "User"} has been created.`,
      });
      router.push("/admin/users");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error";
      setSubmitError(errorMessage);
      toast.error("Failed to create user", {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <DashboardBreadcrumbs />
            <h1 className="text-3xl font-bold mt-4">Create New User</h1>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>User account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="CONTENT_MANAGER">Content Manager</SelectItem>
                      {currentUser?.role === "ADMIN" && (
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {formData.role === "ADMIN" && "Full access to all features and user management"}
                    {formData.role === "CONTENT_MANAGER" && "Can manage all content except user management"}
                    {formData.role === "EDITOR" && "Can only manage Blog, Categories, FAQs, and Gallery"}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active" className="text-sm font-normal cursor-pointer">
                    Active (User can login)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>Configure password requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requirePasswordReset"
                    checked={formData.requirePasswordReset}
                    onCheckedChange={(checked) => setFormData({ ...formData, requirePasswordReset: checked })}
                  />
                  <Label htmlFor="requirePasswordReset" className="text-sm font-normal cursor-pointer">
                    Require password reset on first login
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  If enabled, the user will be required to change their password immediately after logging in for the first time.
                </p>
              </CardContent>
            </Card>

            {/* Password Information */}
            <Card>
              <CardHeader>
                <CardTitle>Initial Password</CardTitle>
                <CardDescription>Set initial password for the user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter password (min 8 characters)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" type="button" asChild disabled={isSubmitting}>
              <Link href="/admin/users">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create User
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </RoleGuard>
  );
}
