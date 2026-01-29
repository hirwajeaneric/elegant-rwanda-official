"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { BlogPostForm, type BlogPostFormData } from "@/components/blog/BlogPostForm";
import { sanitizeHtml } from "@/lib/html-sanitizer";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string | null;
  publishDate: string | null;
  readTime: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: string[];
  featuredImage: string | null;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  status: "PUBLISHED" | "DRAFT";
  views: number;
  comments: number;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        toast.error("Failed to load blog post", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load blog post");
      console.error("Error loading blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: BlogPostFormData) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Blog post updated successfully");
        setIsEditing(false);
        loadBlog();
      } else {
        toast.error("Failed to update blog post", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to update blog post");
      console.error("Update blog error:", error);
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

  if (!blog) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Blog post not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
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
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <Badge variant={blog.status === "PUBLISHED" ? "default" : "secondary"}>
              {blog.status}
            </Badge>
            <Badge variant="outline">{blog.category?.name || "Uncategorized"}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/blogs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {isEditing ? (
        <BlogPostForm
          initialData={{
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            authorImage: blog.authorImage || "",
            publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().split("T")[0] : "",
            readTime: blog.readTime,
            categoryId: blog.categoryId || "",
            tags: blog.tags || [],
            featuredImage: blog.featuredImage || "",
            featured: blog.featured,
            metaTitle: blog.metaTitle || "",
            metaDescription: blog.metaDescription || "",
            status: blog.status,
          }}
          onSubmit={handleSave}
          isLoading={saving}
          isEditing={true}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <div 
                className="p-4 border rounded-md min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
