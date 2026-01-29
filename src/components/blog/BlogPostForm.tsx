"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Loader2, Save } from "lucide-react";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import { useCategories } from "@/lib/hooks/use-categories";
import Image from "next/image";
import JoditEditor from "jodit-react";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { toast } from "sonner";

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string | null;
  readTime: string;
  categoryId: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
  status: "PUBLISHED" | "DRAFT";
}

interface BlogPostFormProps {
  initialData?: Partial<BlogPostFormData>;
  onSubmit: (data: BlogPostFormData) => Promise<void>;
  isLoading?: boolean;
  isEditing?: boolean;
  onCancel?: () => void;
}

export function BlogPostForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEditing = false,
  onCancel,
}: BlogPostFormProps) {
  const { categories: categoryList } = useCategories({ type: ['BLOG'], active: true });
  const availableCategories = useMemo(() => 
    categoryList.map(cat => ({ id: cat.id, name: cat.name })), 
    [categoryList]
  );

  const [users, setUsers] = useState<Array<{ id: string; name: string; email: string; role: string }>>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch users (ADMIN/EDITOR) for author selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/users/authors");
        const data = await response.json();
        if (data.success) {
          setUsers(data.users || []);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    author: initialData?.author || "",
    authorImage: initialData?.authorImage || "",
    publishDate: initialData?.publishDate || new Date().toISOString().split("T")[0],
    readTime: initialData?.readTime || "5 min",
    categoryId: initialData?.categoryId || availableCategories[0]?.id || "",
    tags: initialData?.tags || [],
    featuredImage: initialData?.featuredImage || "",
    featured: initialData?.featured || false,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    status: initialData?.status || "DRAFT",
  });

  const [newTag, setNewTag] = useState("");
  const [editorContent, setEditorContent] = useState(initialData?.content || "");
  const editor = useRef(null);

  // Update form data when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        author: initialData.author || "",
        authorImage: initialData.authorImage || "",
        publishDate: initialData.publishDate || new Date().toISOString().split("T")[0],
        readTime: initialData.readTime || "5 min",
        categoryId: initialData.categoryId || availableCategories[0]?.id || "",
        tags: initialData.tags || [],
        featuredImage: initialData.featuredImage || "",
        featured: initialData.featured || false,
        metaTitle: initialData.metaTitle || "",
        metaDescription: initialData.metaDescription || "",
        status: initialData.status || "DRAFT",
      });
      setEditorContent(initialData.content || "");
    }
  }, [initialData, availableCategories]);

  // Jodit editor configuration
  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Start writing your blog post...',
    height: 500,
    toolbarAdaptive: false,
    toolbarSticky: true,
    spellcheck: true,
    language: "en",
    colorPickerDefaultTab: "background" as const,
    imageDefaultWidth: 300,
    removeButtons: ['about'],
    uploader: {
      insertImageAsBase64URI: true
    },
    events: {
      beforeEnter: function () {
        return true;
      }
    }
  }), []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || !editorContent) {
      return;
    }

    // Sanitize the content before submitting
    const sanitizedContent = sanitizeHtml(editorContent);
    
    await onSubmit({
      ...formData,
      content: sanitizedContent,
      publishDate: formData.publishDate || null,
    });
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Post Content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
            <CardDescription>Write and configure your blog post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: !isEditing ? generateSlug(title) : formData.slug,
                  });
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated-from-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <div className="border rounded-md">
                <JoditEditor
                  className="prose"
                  ref={editor}
                  value={editorContent}
                  config={editorConfig}
                  onBlur={(newContent) => {
                    setEditorContent(newContent);
                  }}
                  onChange={(newContent) => {
                    setEditorContent(newContent);
                  }}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Blog post title for SEO"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={3}
                  placeholder="Blog post description for SEO"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Settings</CardTitle>
            <CardDescription>Configure publication and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              {loadingUsers ? (
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Loading users..."
                  disabled
                  required
                />
              ) : users.length > 0 ? (
                <>
                  <Select
                    value={users.find(u => u.name === formData.author)?.id || "custom"}
                    onValueChange={(value) => {
                      if (value === "custom") {
                        setFormData({
                          ...formData,
                          author: "",
                          authorImage: "",
                        });
                      } else {
                        const selectedUser = users.find(u => u.id === value);
                        if (selectedUser) {
                          setFormData({
                            ...formData,
                            author: selectedUser.name,
                            authorImage: "",
                          });
                        }
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.role})
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom Author</SelectItem>
                    </SelectContent>
                  </Select>
                  {(!users.find(u => u.name === formData.author) || users.find(u => u.name === formData.author) === undefined) && (
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Enter author name"
                      className="mt-2"
                      required
                    />
                  )}
                </>
              ) : (
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Enter author name"
                  required
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "PUBLISHED" | "DRAFT") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="date"
                value={formData.publishDate || ""}
                className="w-full"
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value || null })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
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
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 min"
              />
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label>Featured Image *</Label>
              <AssetSelector
                value={formData.featuredImage}
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
                    width={400}
                    height={200}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
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
                  {formData.tags.map((tag, index) => (
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isEditing ? "Saving..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Save Changes" : "Create Blog Post"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
