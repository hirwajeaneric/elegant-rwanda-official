"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, LayoutDashboard, FileText, Users } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg mt-2">
            The page you&apos;re looking for doesn&apos;t exist in the admin dashboard.
          </CardDescription> 
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <LayoutDashboard className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Dashboard</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/admin/blogs">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Blogs</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/admin/users">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Users</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Home className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Public Site</span>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button asChild>
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
