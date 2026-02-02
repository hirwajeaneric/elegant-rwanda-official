"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function ConfirmOTPPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const verifyOTP = useAuthStore((state) => state.verifyOTP);
  const resendOTP = useAuthStore((state) => state.resendOTP);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.push("/auth/login");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (!email) {
      toast.error("Email is required");
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      // Retrieve registration data from sessionStorage
      const registrationKey = `registration_${email}`;
      const registrationData = sessionStorage.getItem(registrationKey);
      
      if (!registrationData) {
        toast.error("Session expired. Please contact an administrator.");
        setError("Session expired. Please contact an administrator.");
        router.push("/auth/login");
        return;
      }

      const { name, password } = JSON.parse(registrationData);
      
      const result = await verifyOTP(email, otp, name, password);
      if (result.success) {
        sessionStorage.removeItem(registrationKey);
        toast.success("Account verified! Welcome.");
        router.push("/admin/dashboard");
      } else {
        const msg = result.error || "Invalid or expired verification code. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      const msg = "An error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || resendCooldown > 0) return;

    setError("");
    setResendCooldown(60);

    try {
      const result = await resendOTP(email);
      if (result?.success ?? true) {
        toast.success("Verification code sent. Check your email.");
      } else {
        toast.error(result?.error || "Failed to resend code.");
        setError("Failed to resend code. Please try again.");
      }
    } catch {
      toast.error("Failed to resend code. Please try again.");
      setError("Failed to resend code. Please try again.");
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          We&apos;ve sent a 6-digit verification code to
        </CardDescription>
        <div className="text-center text-sm font-medium mt-2">
          <Mail className="inline h-4 w-4 mr-1" />
          {email}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-sm text-center space-y-2">
            <p className="text-muted-foreground">
              Didn&apos;t receive the code?{" "}
            {resendCooldown > 0 ? (
              <span className="text-muted-foreground">
                Resend in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:underline"
              >
                Resend Code
              </button>
            )}
          </p>
          <div>
            <Link href="/auth/login" className="text-primary hover:underline">
              <ArrowLeft className="inline h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
