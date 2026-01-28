"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mountain,
  MessageSquare,
  FileText,
  Car,
  Calendar,
  Users,
  Map,
  HelpCircle,
  Image as ImageIcon,
  User,
  LogOut,
  Menu,
  Tag,
  UserCog,
  Globe,
} from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { canAccessRoute } from "@/lib/rbac";

const allNavigationItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "CONTENT_MANAGER", "EDITOR"] },
  { name: "Users", href: "/admin/users", icon: UserCog, roles: ["ADMIN"] },
  { name: "Services", href: "/admin/services", icon: Mountain, roles: ["ADMIN", "CONTENT_MANAGER"] },
  { name: "Tours", href: "/admin/tours", icon: Map, roles: ["ADMIN", "CONTENT_MANAGER"] },
  { name: "Car Rental", href: "/admin/car-rental", icon: Car, roles: ["ADMIN", "CONTENT_MANAGER"] },
  { name: "Events", href: "/admin/events", icon: Calendar, roles: ["ADMIN", "CONTENT_MANAGER"] },
  { name: "Blogs", href: "/admin/blogs", icon: FileText, roles: ["ADMIN", "CONTENT_MANAGER", "EDITOR"] },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, roles: ["ADMIN", "CONTENT_MANAGER"] },
  { name: "Team", href: "/admin/team", icon: Users, roles: ["ADMIN", "CONTENT_MANAGER"] },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle, roles: ["ADMIN", "CONTENT_MANAGER", "EDITOR"] },
  { name: "Categories", href: "/admin/categories", icon: Tag, roles: ["ADMIN", "CONTENT_MANAGER", "EDITOR"] },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon, roles: ["ADMIN", "CONTENT_MANAGER", "EDITOR"] },
  { name: "Profile", href: "/admin/profile", icon: User, roles: ["ADMIN", "CONTENT_MANAGER", "EDITOR"] },
];

const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    onLinkClick?.();
  };

  // Filter navigation items based on user role
  const navigation = allNavigationItems.filter((item) => {
    if (!user) return false;
    return canAccessRoute(user.role, item.href);
  });

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <h1 className="text-xl font-bold flex justify-start items-start flex-col gap-1">
          <span className="text-primary text-2xl">ET&T</span>
          <span className="text-black text-sm font-normal">Elegant Travel & Tours</span>
        </h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    "group flex gap-x-3 rounded-lg py-1 px-2 text-sm leading-6 font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li className="mt-auto space-y-1">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
              className="group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Globe className="h-5 w-5 shrink-0" />
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export function DashboardSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="border-r bg-background h-full">
            <SidebarContent onLinkClick={() => setMobileMenuOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
