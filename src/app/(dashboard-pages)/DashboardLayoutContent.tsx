"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Menu,
  X,
  Home,
  Calendar,
  Car,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Cars', href: '/dashboard/cars', icon: Car },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
];

export default function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
    // Restore persisted collapse state on mount
    const saved = localStorage.getItem('dashboard:sidebarCollapsed');
    if (saved !== null) {
      setSidebarCollapsed(saved === '1');
    }
  }, []);

  // Persist collapse state
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('dashboard:sidebarCollapsed', sidebarCollapsed ? '1' : '0');
  }, [sidebarCollapsed, isHydrated]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Show loading state until hydrated to prevent hydration mismatches
  if (!isHydrated) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between px-4 border-b">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="border-t p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {isHydrated && user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {isHydrated && user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {isHydrated && user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop sidebar */}
        <div className={cn("hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col", sidebarCollapsed && 'w-16')}>
          <div className={cn("flex flex-col flex-grow bg-white border-r border-gray-200", sidebarCollapsed && 'w-16')}>
            <div className="flex h-16 items-center justify-between px-4 border-b">
              {!sidebarCollapsed && <h2 className="text-lg font-semibold">Dashboard</h2>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100',
                    sidebarCollapsed && 'w-fit'
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn('h-5 w-5', !sidebarCollapsed && 'mr-3')} />
                  {!sidebarCollapsed && item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <div className={cn('flex items-center space-x-3 mb-4', sidebarCollapsed && 'justify-center')}>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {isHydrated && user?.name?.charAt(0)}
                  </span>
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {isHydrated && user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {isHydrated && user?.email}
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className={cn('w-full', sidebarCollapsed && 'w-fit')}
                title={sidebarCollapsed ? 'Sign out' : undefined}
              >
                <LogOut className={cn('h-4 w-4', !sidebarCollapsed && 'mr-2')} />
                {!sidebarCollapsed && 'Sign out'}
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={cn('lg:pl-64', sidebarCollapsed && 'lg:pl-16')}>
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="hidden lg:block">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {isHydrated && user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {isHydrated && user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isHydrated && user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
