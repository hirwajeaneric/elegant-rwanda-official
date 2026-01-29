"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogPostForm, type BlogPostFormData } from "@/components/blog/BlogPostForm";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";


export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BlogPostFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Blog post created successfully");
        router.push("/admin/blogs");
      } else {
        toast.error("Failed to create blog post");
      }
    } catch (error) {
      toast.error("Failed to create blog post");
      console.error("Create blog error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Create New Blog Post</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/blogs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <BlogPostForm
        onSubmit={handleSubmit}
        isLoading={loading}
        isEditing={false}
        onCancel={() => router.push("/admin/blogs")}
      />
    </div>
  );
}
