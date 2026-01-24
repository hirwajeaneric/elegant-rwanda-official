"use client";

import { useAuthStore } from "@/lib/stores/auth-store";

export function DashboardHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pl-8">
      <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
        {/* <div className="relative flex flex-1 items-center ml-10 lg:ml-0">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 max-w-md"
          />
        </div> */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </Button> */}
          {/* <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" /> */}
          <div className="flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
