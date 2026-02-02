"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await forgotPassword(email);
      if (result?.success ?? result) {
        setSuccess(true);
        toast.success("Check your email for a reset link");
      } else {
        const msg = "Email not found. Please check your email address.";
        setError(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "An error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a password reset link to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <Link href="/auth/login" className="text-primary hover:underline">
              <ArrowLeft className="inline h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we&apos;ll send you a reset link
          </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <div className="mt-4 text-sm text-center text-muted-foreground">
          <Link href="/auth/login" className="text-primary hover:underline">
            <ArrowLeft className="inline h-4 w-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
