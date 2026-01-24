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
import { blogPosts, BlogPost } from "@/data/blog";
import { getCategoriesForEntity } from "@/data/categories";
import { ArrowLeft, Edit, Save, X, Plus } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";

function getBlogById(id: string) {
  return blogPosts.find((blog) => blog.id === id);
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const blog = getBlogById(id);
  const availableCategories = useMemo(() => getCategoriesForEntity(['blog']), []);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    authorImage: "",
    publishDate: "",
    readTime: "",
    category: "Tours",
    tags: [],
    featuredImage: "",
    featured: false,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
  });
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (blog) {
      setFormData({
        ...blog,
      });
    }
  }, [blog]);

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

  const handleSave = () => {
    console.log("Saving blog:", formData);
    setIsEditing(false);
    alert("Blog post saved successfully!");
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <Badge variant={blog.status === "published" ? "default" : "secondary"}>
              {blog.status}
            </Badge>
            <Badge variant="outline">{blog.category}</Badge>
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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Blog post details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              {isEditing ? (
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{blog.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              {isEditing ? (
                <Textarea
                  id="excerpt"
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              {isEditing ? (
                <Textarea
                  id="content"
                  value={formData.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="font-mono text-xs"
                />
              ) : (
                <div
                  className="text-sm text-muted-foreground prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                {isEditing ? (
                  <Input
                    id="author"
                    value={formData.author || ""}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{blog.author}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishDate">Publish Date</Label>
                {isEditing ? (
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate || ""}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                {isEditing ? (
                  <Select
                    value={formData.category || availableCategories[0]?.name || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value as BlogPost["category"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="outline">{blog.category}</Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status || "draft"}
                    onValueChange={(value: "published" | "draft" | "scheduled") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                    {blog.status}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image & Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Image & Tags</CardTitle>
            <CardDescription>Featured image and tags</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Featured Image</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <AssetSelector
                    value={formData.featuredImage || ""}
                    onSelect={(image) => {
                      const imageValue = Array.isArray(image) ? image[0] || "" : image;
                      setFormData({ ...formData, featuredImage: imageValue });
                    }}
                  />
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <Image
                        src={formData.featuredImage}
                        alt={formData.title || "Preview"}
                        className="w-full h-48 object-cover rounded-md"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.tags || []).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveTag(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SEO Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>SEO Information</CardTitle>
            <CardDescription>Meta tags for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              {isEditing ? (
                <Input
                  id="metaTitle"
                  value={formData.metaTitle || ""}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Blog post title for SEO"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{blog.metaTitle || "Not set"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              {isEditing ? (
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription || ""}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={3}
                  placeholder="Blog post description for SEO"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{blog.metaDescription || "Not set"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Views</p>
                <p className="text-2xl font-bold">{blog.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">{blog.comments}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Read Time</p>
                <p className="text-sm font-medium">{blog.readTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
