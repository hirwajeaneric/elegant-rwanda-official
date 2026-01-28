"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Save, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const categoryTypes: { value: string; label: string }[] = [
  { value: "FAQ", label: "FAQ" },
  { value: "BLOG", label: "Blog" },
  { value: "EVENT", label: "Event" },
  { value: "TOUR", label: "Tour" },
  { value: "IMAGE", label: "Image" },
  { value: "GENERAL", label: "General" },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: string[];
  color?: string | null;
  icon?: string | null;
  active: boolean;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    slug: "",
    description: "",
    type: [],
    color: "#3B82F6",
    icon: "",
    active: true,
  });

  useEffect(() => {
    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${id}`);
      const data = await response.json();
      if (data.success) {
        setCategory(data.category);
        setFormData({
          name: data.category.name,
          slug: data.category.slug,
          description: data.category.description || "",
          type: data.category.type || [],
          color: data.category.color || "#3B82F6",
          icon: data.category.icon || "",
          active: data.category.active ?? true,
        });
      } else {
        toast.error("Failed to load category", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load category");
      console.error("Error loading category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) {
      toast.error("Name and slug are required");
      return;
    }

    if (!formData.type || formData.type.length === 0) {
      toast.error("Please select at least one category type");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Category updated successfully");
        setIsEditing(false);
        loadCategory();
      } else {
        toast.error("Failed to update category", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to update category");
      console.error("Update category error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleTypeToggle = (type: string) => {
    const currentTypes = formData.type || [];
    if (currentTypes.includes(type)) {
      setFormData({
        ...formData,
        type: currentTypes.filter((t) => t !== type),
      });
    } else {
      setFormData({
        ...formData,
        type: [...currentTypes, type],
      });
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Category not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/categories">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">Category Details</h1>
            <Badge variant={category.active ? "default" : "secondary"}>
              {category.active ? "Active" : "Inactive"}
            </Badge>
            {category.color && (
              <div
                className="w-6 h-6 rounded-full border-2 border-border"
                style={{ backgroundColor: category.color }}
              />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/categories">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Category name and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({
                    ...formData,
                    name,
                    slug: isEditing ? generateSlug(name) : formData.slug,
                  });
                }}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Types */}
        <Card>
          <CardHeader>
            <CardTitle>Category Types</CardTitle>
            <CardDescription>Select applicable types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {categoryTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.value}`}
                  checked={(formData.type || []).includes(type.value)}
                  onCheckedChange={() => handleTypeToggle(type.value)}
                  disabled={!isEditing}
                />
                <Label htmlFor={`type-${type.value}`}>{type.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Appearance & Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance & Settings</CardTitle>
            <CardDescription>Visual and display settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="color"
                value={formData.color || "#3B82F6"}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                value={formData.icon || ""}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Icon name or class"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, active: checked === true })
                }
                disabled={!isEditing}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
