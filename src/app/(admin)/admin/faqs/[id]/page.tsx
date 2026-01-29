"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/lib/hooks/use-categories";
import { ArrowLeft, Edit, Save, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FAQDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { categories: categoryList } = useCategories({ type: ['FAQ'], active: true });
  const availableCategories = useMemo(() => 
    categoryList.map(cat => ({ id: cat.id, name: cat.name })), 
    [categoryList]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    categoryId: "",
    active: true,
  });

  useEffect(() => {
    loadFAQ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadFAQ = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/faqs/${id}`);
      const data = await response.json();
      if (data.success) {
        const faqData = data.faq;
        setFaq(faqData);
        setFormData({
          question: faqData.question,
          answer: faqData.answer,
          categoryId: faqData.categoryId || "",
          active: faqData.active ?? true,
        });
      } else {
        toast.error("Failed to load FAQ", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load FAQ");
      console.error("Error loading FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      toast.error("Question and answer are required");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("FAQ updated successfully");
        setIsEditing(false);
        loadFAQ();
      } else {
        toast.error("Failed to update FAQ", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to update FAQ");
      console.error("Update FAQ error:", error);
    } finally {
      setSaving(false);
    }
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

  if (!faq) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">FAQ not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/faqs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to FAQs
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
            <h1 className="text-3xl font-bold">FAQ Details</h1>
            <Badge variant={faq.active ? "default" : "secondary"}>
              {faq.active ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline">{faq.category?.name || "Uncategorized"}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/faqs">
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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Question & Answer */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Question & Answer</CardTitle>
            <CardDescription>FAQ content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question *</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                disabled={!isEditing}
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>FAQ configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="active">Status</Label>
              <Select
                value={formData.active ? "active" : "inactive"}
                onValueChange={(value) => setFormData({ ...formData, active: value === "active" })}
                disabled={!isEditing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
