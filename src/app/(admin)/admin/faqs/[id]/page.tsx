"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { faqs, FAQ } from "@/data/faq";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import Link from "next/link";

function getFAQById(id: string) {
  return faqs.find((faq) => faq.id === id);
}

export default function FAQDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const faq = getFAQById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: "",
    answer: "",
    category: "General Travel",
    order: 0,
    active: true,
  });

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
        active: faq.active,
      });
    }
  }, [faq]);

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

  const handleSave = () => {
    console.log("Saving FAQ:", formData);
    setIsEditing(false);
    alert("FAQ saved successfully!");
  };

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
            <Badge variant="outline">{faq.category}</Badge>
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
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Question & Answer */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Question & Answer</CardTitle>
            <CardDescription>FAQ content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              {isEditing ? (
                <Input
                  id="question"
                  value={formData.question || ""}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold">{faq.question}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              {isEditing ? (
                <Textarea
                  id="answer"
                  value={formData.answer || ""}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={6}
                />
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{faq.answer}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>FAQ configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              {isEditing ? (
                <Select
                  value={formData.category || "General Travel"}
                  onValueChange={(value: FAQ["category"]) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Travel">General Travel</SelectItem>
                    <SelectItem value="Gorilla Trekking">Gorilla Trekking</SelectItem>
                    <SelectItem value="Tours & Packages">Tours & Packages</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Accommodation">Accommodation</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline">{faq.category}</Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              {isEditing ? (
                <Input
                  id="order"
                  type="number"
                  value={formData.order || 0}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{faq.order}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="active">Status</Label>
              {isEditing ? (
                <Select
                  value={formData.active ? "active" : "inactive"}
                  onValueChange={(value) => setFormData({ ...formData, active: value === "active" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={faq.active ? "default" : "secondary"}>
                  {faq.active ? "Active" : "Inactive"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Views</p>
                <p className="text-2xl font-bold">{faq.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Helpful</p>
                <p className="text-2xl font-bold">{faq.helpful}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Not Helpful</p>
                <p className="text-2xl font-bold">{faq.notHelpful}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm font-medium">{new Date(faq.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
