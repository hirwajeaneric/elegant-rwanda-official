"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileText, List, Heart, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface QuickFact {
  label: string;
  value: string;
}

interface MissionValue {
  title: string;
  description: string;
}

interface AboutForm {
  historicalBackground: string;
  quickFacts: QuickFact[];
  missionValues: MissionValue[];
}

function emptyQuickFact(): QuickFact {
  return { label: "", value: "" };
}

function emptyMissionValue(): MissionValue {
  return { title: "", description: "" };
}

export default function AdminAboutPage() {
  const csrfToken = useAuthStore((state) => state.csrfToken);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AboutForm>({
    historicalBackground: "",
    quickFacts: [emptyQuickFact()],
    missionValues: [emptyMissionValue()],
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/admin/about-content", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && data.about) {
        const a = data.about;
        setForm({
          historicalBackground: a.historicalBackground ?? "",
          quickFacts:
            Array.isArray(a.quickFacts) && a.quickFacts.length > 0
              ? a.quickFacts
              : [emptyQuickFact()],
          missionValues:
            Array.isArray(a.missionValues) && a.missionValues.length > 0
              ? a.missionValues
              : [emptyMissionValue()],
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load About page content");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csrfToken) {
      toast.error("Session expired. Please refresh.");
      return;
    }
    setSaving(true);
    try {
      const quickFacts = form.quickFacts.filter((f) => f.label.trim() || f.value.trim());
      const missionValues = form.missionValues.filter(
        (m) => m.title.trim() || m.description.trim()
      );
      const res = await fetch("/api/admin/about-content", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({
          historicalBackground: form.historicalBackground,
          quickFacts: quickFacts.length ? quickFacts : [],
          missionValues: missionValues.length ? missionValues : [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("About page content saved successfully.");
      } else {
        toast.error(data.error || "Failed to save");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save About page content");
    } finally {
      setSaving(false);
    }
  };

  const addQuickFact = () => {
    setForm((prev) => ({
      ...prev,
      quickFacts: [...prev.quickFacts, emptyQuickFact()],
    }));
  };

  const removeQuickFact = (index: number) => {
    setForm((prev) => ({
      ...prev,
      quickFacts: prev.quickFacts.filter((_, i) => i !== index),
    }));
  };

  const updateQuickFact = (index: number, field: "label" | "value", value: string) => {
    setForm((prev) => ({
      ...prev,
      quickFacts: prev.quickFacts.map((f, i) =>
        i === index ? { ...f, [field]: value } : f
      ),
    }));
  };

  const addMissionValue = () => {
    setForm((prev) => ({
      ...prev,
      missionValues: [...prev.missionValues, emptyMissionValue()],
    }));
  };

  const removeMissionValue = (index: number) => {
    setForm((prev) => ({
      ...prev,
      missionValues: prev.missionValues.filter((_, i) => i !== index),
    }));
  };

  const updateMissionValue = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      missionValues: prev.missionValues.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      ),
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">About Page Content</h1>
          <p className="text-muted-foreground mt-1">
            Edit historical background, quick facts, and mission & values shown on the
            public About page.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/about" target="_blank" rel="noopener noreferrer">
            View About Page
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="historical" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="historical" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Our Story
            </TabsTrigger>
            <TabsTrigger value="quickfacts" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Quick Facts
            </TabsTrigger>
            <TabsTrigger value="mission" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Mission & Values
            </TabsTrigger>
          </TabsList>

          <TabsContent value="historical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historical Background (Our Story)</CardTitle>
                <CardDescription>
                  This text appears in the &quot;Our Story&quot; section. Use line breaks
                  to separate paragraphs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="historicalBackground"
                  value={form.historicalBackground}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      historicalBackground: e.target.value,
                    }))
                  }
                  placeholder="Founded with a passion for showcasing Rwanda's natural beauty..."
                  className="min-h-[240px] resize-y"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quickfacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
                <CardDescription>
                  Label-value pairs shown in the sidebar (e.g. Founded, Locations, Satisfaction).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.quickFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-2 sm:items-center"
                  >
                    <Input
                      placeholder="Label (e.g. Founded)"
                      value={fact.label}
                      onChange={(e) => updateQuickFact(index, "label", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value (e.g. 2014)"
                      value={fact.value}
                      onChange={(e) => updateQuickFact(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuickFact(index)}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addQuickFact}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add fact
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mission" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mission & Values</CardTitle>
                <CardDescription>
                  Title and description for each value card on the About page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {form.missionValues.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border space-y-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <Label className="text-sm">Title</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMissionValue(index)}
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <Input
                      placeholder="e.g. Excellence in Service"
                      value={item.title}
                      onChange={(e) =>
                        updateMissionValue(index, "title", e.target.value)
                      }
                    />
                    <Label className="text-sm">Description</Label>
                    <Textarea
                      placeholder="Short description..."
                      value={item.description}
                      onChange={(e) =>
                        updateMissionValue(index, "description", e.target.value)
                      }
                      className="min-h-[80px] resize-y"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMissionValue}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add value
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
