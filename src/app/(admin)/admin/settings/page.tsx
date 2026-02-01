"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Settings, MapPin, Phone, Mail, Clock, AlertCircle, Share2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { WebsiteSettingsData, SocialLink } from "@/lib/settings-types";

const SOCIAL_PLATFORMS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "pinterest", label: "Pinterest" },
  { value: "tiktok", label: "TikTok" },
  { value: "other", label: "Other" },
];

function emptySocial(): SocialLink {
  return { platform: "other", label: "", url: "" };
}

export default function WebsiteSettingsPage() {
  const csrfToken = useAuthStore((state) => state.csrfToken);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<WebsiteSettingsData>({
    siteName: null,
    tagline: null,
    address: null,
    phonePrimary: null,
    phoneSecondary: null,
    emailPrimary: null,
    emailSecondary: null,
    businessHours: null,
    emergencyPhone: null,
    emergencyNote: null,
    socialLinks: [],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (res.ok && !data.error) {
        setForm({
          siteName: data.siteName ?? "",
          tagline: data.tagline ?? "",
          address: data.address ?? "",
          phonePrimary: data.phonePrimary ?? "",
          phoneSecondary: data.phoneSecondary ?? "",
          emailPrimary: data.emailPrimary ?? "",
          emailSecondary: data.emailSecondary ?? "",
          businessHours: data.businessHours ?? "",
          emergencyPhone: data.emergencyPhone ?? "",
          emergencyNote: data.emergencyNote ?? "",
          socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        siteName: form.siteName || null,
        tagline: form.tagline || null,
        address: form.address || null,
        phonePrimary: form.phonePrimary || null,
        phoneSecondary: form.phoneSecondary || null,
        emailPrimary: form.emailPrimary || null,
        emailSecondary: form.emailSecondary || null,
        businessHours: form.businessHours || null,
        emergencyPhone: form.emergencyPhone || null,
        emergencyNote: form.emergencyNote || null,
        socialLinks: form.socialLinks.filter((s) => s.url?.trim()),
      };
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (csrfToken) headers["X-CSRF-Token"] = csrfToken;
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setForm({
        ...form,
        socialLinks: data.socialLinks ?? form.socialLinks,
      });
      toast.success("Website settings updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const update = (key: keyof WebsiteSettingsData, value: string | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    setForm((prev) => {
      const next = [...(prev.socialLinks || [])];
      if (!next[index]) next[index] = emptySocial();
      next[index] = { ...next[index], [field]: value };
      if (field === "platform") {
        const platform = SOCIAL_PLATFORMS.find((p) => p.value === value);
        if (platform) next[index].label = platform.label;
      }
      return { ...prev, socialLinks: next };
    });
  };

  const addSocial = () => {
    setForm((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), emptySocial()],
    }));
  };

  const removeSocial = (index: number) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <DashboardBreadcrumbs />
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Website Settings</h1>
            <p className="mt-1 text-muted-foreground">
              Manage contact info, business hours, emergency support, and social links used across the site.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General & Contact */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">General & Contact</CardTitle>
                <CardDescription>Site name, tagline, address, phone, and email</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site name</Label>
                <Input
                  id="siteName"
                  value={form.siteName ?? ""}
                  onChange={(e) => update("siteName", e.target.value || null)}
                  placeholder="Elegant Travel & Tours"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={form.tagline ?? ""}
                  onChange={(e) => update("tagline", e.target.value || null)}
                  placeholder="Experience Rwanda's elegance..."
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Office address</Label>
                <Input
                  id="address"
                  value={form.address ?? ""}
                  onChange={(e) => update("address", e.target.value || null)}
                  placeholder="KG 123 St, Kigali, Rwanda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phonePrimary">Primary phone</Label>
                <Input
                  id="phonePrimary"
                  value={form.phonePrimary ?? ""}
                  onChange={(e) => update("phonePrimary", e.target.value || null)}
                  placeholder="+250 787 095 392"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneSecondary">Secondary phone (optional)</Label>
                <Input
                  id="phoneSecondary"
                  value={form.phoneSecondary ?? ""}
                  onChange={(e) => update("phoneSecondary", e.target.value || null)}
                  placeholder="+250 788 123 457"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPrimary">Primary email</Label>
                <Input
                  id="emailPrimary"
                  type="email"
                  value={form.emailPrimary ?? ""}
                  onChange={(e) => update("emailPrimary", e.target.value || null)}
                  placeholder="info@elegantrwanda.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailSecondary">Secondary email (optional)</Label>
                <Input
                  id="emailSecondary"
                  type="email"
                  value={form.emailSecondary ?? ""}
                  onChange={(e) => update("emailSecondary", e.target.value || null)}
                  placeholder="bookings@elegantrwanda.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business hours */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Business hours</CardTitle>
                <CardDescription>Shown on contact page and header (e.g. Mon to Sun 24/7)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              id="businessHours"
              value={form.businessHours ?? ""}
              onChange={(e) => update("businessHours", e.target.value || null)}
              placeholder="Monday - Friday: 8:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 4:00 PM&#10;Sunday: Closed"
              rows={4}
              className="resize-y"
            />
          </CardContent>
        </Card>

        {/* Emergency support */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Emergency support</CardTitle>
                <CardDescription>24/7 line and short note for contact page</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency phone</Label>
              <Input
                id="emergencyPhone"
                value={form.emergencyPhone ?? ""}
                onChange={(e) => update("emergencyPhone", e.target.value || null)}
                placeholder="+250 787 095 392"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyNote">Note (optional)</Label>
              <Input
                id="emergencyNote"
                value={form.emergencyNote ?? ""}
                onChange={(e) => update("emergencyNote", e.target.value || null)}
                placeholder="For urgent matters outside business hours..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Social media */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Social media</CardTitle>
                <CardDescription>Links shown in footer and used for SEO. Add or remove as needed.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {(form.socialLinks || []).map((social, index) => (
              <div key={index} className="flex flex-wrap items-end gap-2 rounded-lg border p-3">
                <div className="flex-1 min-w-[100px] space-y-1">
                  <Label className="text-xs" htmlFor={`social-platform-${index}`}>Platform</Label>
                  <select
                    id={`social-platform-${index}`}
                    aria-label="Social platform"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={social.platform}
                    onChange={(e) => updateSocial(index, "platform", e.target.value)}
                  >
                    {SOCIAL_PLATFORMS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[120px] space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={social.label}
                    onChange={(e) => updateSocial(index, "label", e.target.value)}
                    placeholder="Facebook"
                  />
                </div>
                <div className="flex-[2] min-w-[180px] space-y-1">
                  <Label className="text-xs">URL</Label>
                  <Input
                    value={social.url}
                    onChange={(e) => updateSocial(index, "url", e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeSocial(index)} aria-label="Remove">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSocial} className="gap-2">
              <Plus className="h-4 w-4" />
              Add social link
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save settings"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
