"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Edit, Save, X, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { UserRole } from "@/lib/rbac";
import { useAuthStore } from "@/lib/stores/auth-store";
import { RoleGuard } from "@/components/auth/RoleGuard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchUser(id: string, csrfToken: string | null, signal?: AbortSignal): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}/api/auth/users/${id}`, {
      method: "GET",
      credentials: "include",
      headers,
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "Failed to fetch user",
      };
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    // Ignore abort errors
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request cancelled',
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const currentUser = useAuthStore((state) => state.user);
  const csrfToken = useAuthStore((state) => state.csrfToken);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "EDITOR",
    active: true,
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadUser = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    
    const result = await fetchUser(id, csrfToken, signal);
    
    // Don't update state if request was aborted
    if (signal?.aborted) {
      return;
    }
    
    if (result.success && result.user) {
      setUser(result.user);
      setFormData({
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        active: result.user.active,
      });
    } else {
      // Don't show error toast for cancelled requests
      if (result.error !== 'Request cancelled') {
        const errorMessage = result.error || "Failed to load user";
        setError(errorMessage);
        toast.error("Failed to load user", {
          description: errorMessage,
        });
      }
    }
    setLoading(false);
  }, [id, csrfToken]);

  useEffect(() => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    loadUser(abortController.signal);

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [id, loadUser]);

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{error || "User not found"}</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => loadUser(new AbortController().signal)}>
                Retry
              </Button>
              <Button asChild>
                <Link href="/admin/users">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Users
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "")) {
      newErrors.email = "Invalid email format";
    }

    if (passwordData.newPassword && passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    setErrors({});
    
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

      // Update user data
      const updateResponse = await fetch(`${API_URL}/api/auth/users/${id}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          active: formData.active,
        }),
      });

      const updateData = await updateResponse.json();

        if (!updateResponse.ok) {
          if (updateData.details && Array.isArray(updateData.details)) {
            const validationErrors: Record<string, string> = {};
            updateData.details.forEach((detail: { path: string; message: string }) => {
              validationErrors[detail.path] = detail.message;
            });
            setErrors(validationErrors);
            toast.error("Validation failed", {
              description: "Please check the form for errors.",
            });
          } else {
            const errorMessage = updateData.error || updateData.message || "Failed to update user";
            setErrors({ general: errorMessage });
            toast.error("Failed to update user", {
              description: errorMessage,
            });
          }
          setIsSubmitting(false);
          return;
        }

      // Update password if provided (only for other users, not own profile)
      if (passwordData.newPassword && id !== currentUser?.id) {
        const passwordResponse = await fetch(`${API_URL}/api/auth/users/${id}/password/admin`, {
          method: "PUT",
          credentials: "include",
          headers,
          body: JSON.stringify({
            newPassword: passwordData.newPassword,
          }),
        });

        const passwordData_result = await passwordResponse.json();

        if (!passwordResponse.ok) {
          const errorMessage = passwordData_result.error || passwordData_result.message || "Failed to update password";
          setErrors({ password: errorMessage });
          toast.error("Failed to update password", {
            description: errorMessage,
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Reload user data
      await loadUser();
      setIsEditing(false);
      setPasswordData({ newPassword: "", confirmPassword: "" });
      toast.success("User updated successfully", {
        description: "User information has been updated.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error";
      setErrors({ general: errorMessage });
      toast.error("Failed to update user", {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }

      const response = await fetch(`${API_URL}/api/auth/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || data.message || "Failed to delete user";
        setErrors({ general: errorMessage });
        toast.error("Failed to delete user", {
          description: errorMessage,
        });
        setIsDeleting(false);
        return;
      }

      // Success
      toast.success("User deleted successfully", {
        description: "The user has been deactivated.",
      });
      // Redirect to users list
      router.push("/admin/users");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error";
      setErrors({ general: errorMessage });
      toast.error("Failed to delete user", {
        description: errorMessage,
      });
      setIsDeleting(false);
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "CONTENT_MANAGER":
        return "default";
      case "EDITOR":
        return "secondary";
      default:
        return "outline";
    }
  };

  const canEditRole = currentUser?.role === "ADMIN" && user.id !== currentUser.id;
  const canEditUser = currentUser?.role === "ADMIN" || (currentUser?.role === "CONTENT_MANAGER" && user.role === "EDITOR");

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <Badge variant={getRoleBadgeVariant(user.role)}>
              {user.role.replace("_", " ")}
            </Badge>
            <Badge variant={user.active ? "default" : "secondary"}>
              {user.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/users">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              {canEditUser && (
                <>
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {currentUser?.role === "ADMIN" && user.id !== currentUser.id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will deactivate the user account and revoke all their sessions. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {errors.general && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{errors.general}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>User account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{user.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              {isEditing && canEditRole ? (
                <Select
                  value={formData.role || "EDITOR"}
                  onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EDITOR">Editor</SelectItem>
                    <SelectItem value="CONTENT_MANAGER">Content Manager</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role.replace("_", " ")}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              {isEditing ? (
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
              ) : (
                <Badge variant={user.active ? "default" : "secondary"}>
                  {user.active ? "Active" : "Inactive"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Account activity and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>User ID</Label>
              <p className="text-sm text-muted-foreground font-mono">{user.id}</p>
            </div>

            <div className="space-y-2">
              <Label>Last Login</Label>
              <p className="text-sm text-muted-foreground">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Never logged in"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Created At</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Last Updated</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>

            {user.createdBy && (
              <div className="space-y-2">
                <Label>Created By</Label>
                <p className="text-sm text-muted-foreground">User ID: {user.createdBy}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Change Password */}
        {isEditing && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{id === currentUser?.id ? "Change Password" : "Reset Password"}</CardTitle>
              <CardDescription>
                {id === currentUser?.id 
                  ? "To change your own password, please use the dedicated change password page"
                  : "Leave blank to keep current password. This will reset the user's password and log them out."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {id === currentUser?.id ? (
                <p className="text-sm text-muted-foreground">
                  For security reasons, please use the{" "}
                  <Link href="/auth/change-password" className="text-primary underline">
                    Change Password
                  </Link>{" "}
                  page to update your own password.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, newPassword: e.target.value })
                        }
                        placeholder="Enter new password (min 8 characters)"
                      />
                      {errors.newPassword && (
                        <p className="text-sm text-destructive">{errors.newPassword}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                        }
                        placeholder="Confirm new password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </RoleGuard>
  );
}
