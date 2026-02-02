"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn, Lock } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mb-4">
          <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
        </div>
        <CardTitle className="text-2xl">Page Not Found</CardTitle>
        <CardDescription className="mt-2">
          The authentication page you&apos;re looking for doesn&apos;t exist.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button asChild className="w-full" variant="outline">
            <Link href="/auth/login">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
          
          <Button asChild className="w-full" variant="outline">
            <Link href="/auth/forgot-password">
              <Lock className="h-4 w-4 mr-2" />
              Forgot Password
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t">
          <Button onClick={() => router.back()} variant="ghost" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
