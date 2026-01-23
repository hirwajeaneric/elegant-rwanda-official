"use client";

import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, token: string, newPassword: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resendOTP: (email: string) => Promise<boolean>;
}

// Simple authentication - in production, this would call an API
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@elegantrwanda.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

function createAuthMethods(set: (partial: Partial<AuthState>) => void) {
  return {
    login: async (email: string, password: string) => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const user: User = {
          id: "1",
          email: email,
          name: "Admin User",
          role: "admin",
        };
        const newState = { user, isAuthenticated: true };
        set(newState);
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-storage", JSON.stringify({ state: newState }));
        }
        return true;
      }
      return false;
    },
    logout: () => {
      const newState = { user: null, isAuthenticated: false };
      set(newState);
      if (typeof window !== "undefined") {
        localStorage.setItem("auth-storage", JSON.stringify({ state: newState }));
      }
    },
    register: async (name: string, email: string, password: string) => {
      // In production, this would call an API
      // For now, simulate registration
      if (typeof window !== "undefined") {
        // Store pending verification
        localStorage.setItem("pending-verification", JSON.stringify({ email, name, password }));
        // Simulate OTP generation
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem(`otp-${email}`, JSON.stringify({ otp, expires: Date.now() + 600000 })); // 10 minutes
      }
      return true;
    },
    forgotPassword: async (email: string) => {
      // In production, this would send an email with reset token
      // For now, simulate token generation
      if (typeof window !== "undefined") {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem(`reset-token-${email}`, JSON.stringify({ token, expires: Date.now() + 3600000 })); // 1 hour
      }
      return true;
    },
    resetPassword: async (email: string, token: string) => {
      // In production, this would verify token with API
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`reset-token-${email}`);
        if (stored) {
          const { token: storedToken, expires } = JSON.parse(stored);
          if (storedToken === token && Date.now() < expires) {
            // Password reset successful
            localStorage.removeItem(`reset-token-${email}`);
            return true;
          }
        }
      }
      return false;
    },
    changePassword: async (currentPassword: string) => {
      // In production, this would verify current password with API
      // For demo, check against admin password
      if (currentPassword === ADMIN_PASSWORD) {
        // Password changed successfully
        return true;
      }
      return false;
    },
    verifyOTP: async (email: string, otp: string) => {
      // In production, this would verify OTP with API
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`otp-${email}`);
        if (stored) {
          const { otp: storedOTP, expires } = JSON.parse(stored);
          if (storedOTP === otp && Date.now() < expires) {
            // OTP verified, complete registration
            const pending = localStorage.getItem("pending-verification");
            if (pending) {
              const { name } = JSON.parse(pending);
              const user: User = {
                id: Date.now().toString(),
                email: email,
                name: name,
                role: "editor",
              };
              const newState = { user, isAuthenticated: true };
              set(newState);
              localStorage.setItem("auth-storage", JSON.stringify({ state: newState }));
              localStorage.removeItem("pending-verification");
              localStorage.removeItem(`otp-${email}`);
              return true;
            }
          }
        }
      }
      return false;
    },
    resendOTP: async (email: string) => {
      // In production, this would resend OTP via API
      if (typeof window !== "undefined") {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem(`otp-${email}`, JSON.stringify({ otp, expires: Date.now() + 600000 })); // 10 minutes
      }
      return true;
    },
  };
}

export const useAuthStore = create<AuthState>((set) => {
  // Load from localStorage on initialization
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.state?.user && parsed.state?.isAuthenticated) {
          const baseMethods = createAuthMethods(set);
          return {
            user: parsed.state.user,
            isAuthenticated: parsed.state.isAuthenticated,
            ...baseMethods,
          };
        }
      } catch {
        // Invalid storage, continue with default
      }
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    ...createAuthMethods(set),
  };
});
