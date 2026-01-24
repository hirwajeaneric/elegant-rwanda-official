"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/lib/rbac";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Session {
  id: string;
  device: string | null;
  browser: string | null;
  os: string | null;
  ipAddress: string | null;
  country: string | null;
  city: string | null;
  lastActivity: Date;
  createdAt: Date;
  isCurrent: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  csrfToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (email: string, otp: string, name?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  resendOTP: (email: string, purpose?: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION") => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<{ success: boolean; error?: string }>;
  checkSession: () => Promise<{ success: boolean; error?: string }>;
  getSessions: () => Promise<{ success: boolean; sessions?: Session[]; error?: string }>;
  revokeSession: (sessionId: string) => Promise<{ success: boolean; error?: string }>;
  revokeAllSessions: () => Promise<{ success: boolean; error?: string }>;
  setCSRFToken: (token: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  csrfToken?: string | null
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add CSRF token if provided
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include", // Include cookies
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "Request failed",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

function createAuthMethods(set: (partial: Partial<AuthState>) => void, get: () => AuthState) {
  return {
    login: async (email: string, password: string) => {
      const result = await apiRequest<{
        user: User;
        csrfToken: string;
        session: {
          id: string;
          device: string | null;
          browser: string | null;
          os: string | null;
          ipAddress: string | null;
        };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (result.success && result.data) {
        set({
          user: result.data.user,
          isAuthenticated: true,
          csrfToken: result.data.csrfToken,
        });
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    logout: async () => {
      const csrfToken = get().csrfToken;
      await apiRequest("/api/auth/logout", {
        method: "POST",
      }, csrfToken);
      set({ user: null, isAuthenticated: false, csrfToken: null });
    },
    register: async (name: string, email: string, password: string) => {
      const result = await apiRequest<{
        success: boolean;
        message: string;
      }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      if (result.success) {
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    forgotPassword: async (email: string) => {
      const result = await apiRequest<{
        success: boolean;
        message: string;
      }>("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (result.success) {
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    resetPassword: async (email: string, token: string, newPassword: string) => {
      const result = await apiRequest<{
        success: boolean;
        message: string;
      }>("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, token, newPassword }),
      });

      if (result.success) {
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
      const user = get().user;
      if (!user) {
        return { success: false, error: "Not authenticated" };
      }

      const csrfToken = get().csrfToken;
      const result = await apiRequest(`/api/auth/users/${user.id}/password`, {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      }, csrfToken);

      if (result.success) {
        // After password change, user needs to re-login
        await get().logout();
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    verifyOTP: async (email: string, otp: string, name?: string, password?: string) => {
      const result = await apiRequest<{
        success: boolean;
        user?: User;
        csrfToken?: string;
        message?: string;
      }>("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp, name, password }),
      });

      if (result.success && result.data) {
        // If user is returned, it means registration was successful
        if (result.data.user) {
          set({
            user: result.data.user,
            isAuthenticated: true,
            csrfToken: result.data.csrfToken || null,
          });
        }
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    resendOTP: async (email: string, purpose: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION" = "REGISTRATION") => {
      const result = await apiRequest<{
        success: boolean;
        message: string;
      }>("/api/auth/resend-otp", {
        method: "POST",
        body: JSON.stringify({ email, purpose }),
      });

      if (result.success) {
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    refreshSession: async () => {
      const result = await apiRequest<{ user: User }>("/api/auth/session/refresh", {
        method: "POST",
      });

      if (result.success && result.data) {
        set({
          user: result.data.user,
          isAuthenticated: true,
        });
        return { success: true };
      }

      // If refresh fails, logout
      set({ user: null, isAuthenticated: false, csrfToken: null });
      return { success: false, error: result.error };
    },
    checkSession: async () => {
      const result = await apiRequest<{ 
        user: User; 
        session: {
          id: string;
          device: string | null;
          browser: string | null;
          os: string | null;
          ipAddress: string | null;
          lastActivity: string;
        };
      }>("/api/auth/session/me", {
        method: "GET",
      });

      if (result.success && result.data) {
        set({
          user: result.data.user,
          isAuthenticated: true,
        });
        return { success: true };
      }

      set({ user: null, isAuthenticated: false, csrfToken: null });
      return { success: false, error: result.error };
    },
    getSessions: async () => {
      const result = await apiRequest<{ sessions: Session[] }>("/api/auth/session/list", {
        method: "GET",
      });

      if (result.success && result.data) {
        return { success: true, sessions: result.data.sessions };
      }

      return { success: false, error: result.error };
    },
    revokeSession: async (sessionId: string) => {
      const csrfToken = get().csrfToken;
      const result = await apiRequest(`/api/auth/session/${sessionId}`, {
        method: "DELETE",
      }, csrfToken);

      if (result.success) {
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    revokeAllSessions: async () => {
      const user = get().user;
      if (!user) {
        return { success: false, error: "Not authenticated" };
      }

      // Get all sessions first
      const sessionsResult = await get().getSessions();
      if (!sessionsResult.success || !sessionsResult.sessions) {
        return { success: false, error: "Failed to fetch sessions" };
      }

      // Revoke all sessions except current
      const revokePromises = sessionsResult.sessions
        .filter((s) => !s.isCurrent)
        .map((s) => get().revokeSession(s.id));

      const results = await Promise.all(revokePromises);
      const allSuccess = results.every((r) => r.success);

      if (allSuccess) {
        return { success: true };
      }

      return { success: false, error: "Some sessions could not be revoked" };
    },
    setCSRFToken: (token: string) => {
      set({ csrfToken: token });
    },
  };
}

// Type assertion needed due to Zustand v5 type inference limitations with persist middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      csrfToken: null,
      ...createAuthMethods(set, get as () => AuthState),
    }),
    {
      name: "auth-storage",
      partialize: (state: AuthState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        csrfToken: state.csrfToken,
      }),
    }
  )
);
