"use client";

import { useAuthStore } from "@/lib/stores/auth-store";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const user = useAuthStore((state) => state.user);

  const getRoleBadgeVariant = (role: string) => {
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

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pl-8">
      <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
                {user?.role && (
                  <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                    {user.role.replace("_", " ")}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
