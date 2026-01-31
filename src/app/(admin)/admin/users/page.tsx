"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/rbac";
import { Plus, Edit, Shield, UserCheck, UserX } from "lucide-react";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
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

// Type for table data where active is converted to string for filtering
type TableUser = Omit<User, "active"> & { active: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchUsers(): Promise<{ success: boolean; users?: User[]; error?: string }> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}/api/auth/users`, {
      method: "GET",
      credentials: "include",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "Failed to fetch users",
      };
    }

    return {
      success: true,
      users: data.users || [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const hasLoadedRef = useRef(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const result = await fetchUsers();
    if (result.success && result.users) {
      setUsers(result.users);
    } else {
      const errorMessage = result.error || "Failed to load users";
      toast.error("Failed to load users", {
        description: errorMessage,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Prevent duplicate requests in React Strict Mode
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    loadUsers();
  }, [loadUsers]);

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

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return <Shield className="h-4 w-4" />;
      case "CONTENT_MANAGER":
        return <UserCheck className="h-4 w-4" />;
      case "EDITOR":
        return <UserX className="h-4 w-4" />;
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (user: TableUser) => (
        <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 w-fit">
          {getRoleIcon(user.role)}
          {user.role.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "active",
      label: "Status",
      sortable: true,
      render: (user: TableUser) => {
        const isActive = user.active === "true";
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      key: "lastLogin",
      label: "Last Login",
      sortable: true,
      render: (user: TableUser) => (
        user.lastLogin
          ? new Date(user.lastLogin).toLocaleDateString()
          : "Never"
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (user: TableUser) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user: TableUser) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/users/${user.id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </Button>
      ),
    },
  ];

  if (loading && users.length === 0) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <DataTableLoader columnCount={6} rowCount={8} />
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <DashboardBreadcrumbs />
            <h1 className="text-3xl font-bold mt-4">User Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage user accounts, roles, and access permissions
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Link>
          </Button>
        </div>

        <DataTable<TableUser>
          data={users.map(user => ({
            ...user,
            active: user.active ? "true" : "false", // Convert boolean to string for filtering
          }))}
          columns={columns}
          searchPlaceholder="Search by name or email..."
          filterOptions={[
            {
              key: "role",
              label: "Role",
              options: [
                { value: "ADMIN", label: "Admin" },
                { value: "CONTENT_MANAGER", label: "Content Manager" },
                { value: "EDITOR", label: "Editor" },
              ],
            },
            {
              key: "active",
              label: "Status",
              options: [
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ],
            },
          ]}
        />
      </div>
    </RoleGuard>
  );
}
