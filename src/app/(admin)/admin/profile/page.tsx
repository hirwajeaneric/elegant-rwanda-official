"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Session } from "@/lib/stores/auth-store";
import { toast } from "sonner";
import { Loader2, Monitor, Smartphone, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const getSessions = useAuthStore((state) => state.getSessions);
  const revokeSession = useAuthStore((state) => state.revokeSession);
  const revokeAllSessions = useAuthStore((state) => state.revokeAllSessions);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingAll, setRevokingAll] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement profile update API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  const loadSessions = async () => {
    setSessionsLoading(true);
    const result = await getSessions();
    setSessionsLoading(false);
    if (result.success && result.sessions) {
      setSessions(result.sessions);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleChangePassword = async () => {
    await logout();
    router.push("/auth/forgot-password");
  };

  const handleRevokeSession = async (sessionId: string, isCurrent: boolean) => {
    setRevokingId(sessionId);
    const result = await revokeSession(sessionId);
    setRevokingId(null);
    if (result.success) {
      if (isCurrent) {
        await logout();
        router.push("/auth/login");
        return;
      }
      await loadSessions();
      toast.success("Session ended");
    } else {
      toast.error(result.error || "Failed to end session");
    }
  };

  const handleRevokeAllSessions = async () => {
    setRevokingAll(true);
    const result = await revokeAllSessions();
    setRevokingAll(false);
    if (result.success) {
      await loadSessions();
      toast.success("All other sessions have been ended");
    } else {
      toast.error(result.error || "Failed to end sessions");
    }
  };

  const formatDate = (d: Date) => {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleString();
  };

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
    <div className="space-y-6">
      <div>
        <DashboardBreadcrumbs />
        <h1 className="text-3xl font-bold mt-4">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div>
                <Badge variant={getRoleBadgeVariant(user?.role || "")}>
                  {user?.role?.replace("_", " ") || "N/A"}
                </Badge>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              You will be signed out and taken to the forgot password page to request for a new password link.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Manage devices where you are signed in. End a session to sign out on that device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active sessions.</p>
            ) : (
              <>
                <ul className="space-y-3">
                  {sessions.map((session: Session) => (
                    <li
                      key={session.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {session.device?.toLowerCase().includes("mobile") ? (
                          <Smartphone className="h-5 w-5 shrink-0 text-muted-foreground" />
                        ) : (
                          <Monitor className="h-5 w-5 shrink-0 text-muted-foreground" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium truncate">
                              {session.device || session.browser || "Unknown device"}
                            </span>
                            {session.isCurrent && (
                              <Badge variant="secondary" className="shrink-0">This device</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-x-2">
                            {session.browser && <span>{session.browser}</span>}
                            {session.os && <span>· {session.os}</span>}
                            {session.ipAddress && <span>· {session.ipAddress}</span>}
                            {(session.country || session.city) && (
                              <span>· {[session.city, session.country].filter(Boolean).join(", ")}</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Last activity: {formatDate(session.lastActivity)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id, session.isCurrent)}
                        disabled={revokingId === session.id}
                      >
                        {revokingId === session.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <LogOut className="h-4 w-4 mr-1" />
                            End session
                          </>
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
                {sessions.some((s: Session) => !s.isCurrent) && (
                  <Button
                    variant="outline"
                    onClick={handleRevokeAllSessions}
                    disabled={revokingAll}
                  >
                    {revokingAll && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    {revokingAll ? "Ending..." : "End all other sessions"}
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
