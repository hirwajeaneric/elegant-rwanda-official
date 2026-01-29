"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Check, X, Loader2, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { useCategories } from "@/lib/hooks/use-categories";
import { toast } from "sonner";

const PAGE_SIZE_OPTIONS = [12, 24, 48, 96];

interface CloudinaryImage {
  id: string;
  url: string;
  title: string | null;
  category: string | null;
  alt: string | null;
  description: string | null;
  featured: boolean;
  active: boolean;
}

interface AssetSelectorProps {
  value?: string | string[];
  onSelect: (imageSrc: string | string[]) => void;
  trigger?: React.ReactNode;
  multiple?: boolean;
  category?: string;
}

export function AssetSelector({
  value,
  onSelect,
  trigger,
  multiple = false,
  category,
}: AssetSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [selectedImages, setSelectedImages] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: "",
    category: "",
    description: "",
    featured: false,
    active: true,
  });

  const { categories: categoryList } = useCategories({ type: ["IMAGE"], active: true });
  const availableCategories = useMemo(
    () => categoryList.map((cat) => ({ id: cat.id, name: cat.name })),
    [categoryList]
  );

  const loadImages = useCallback(
    async (pageNum = page, size = pageSize) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          active: "true",
          page: String(pageNum),
          limit: String(size),
          ...(selectedCategory !== "all" && { category: selectedCategory }),
          ...(search && { search }),
        });
        const response = await fetch(`/api/images?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          setImages(data.images || []);
          const pag = data.pagination;
          if (pag) {
            setTotal(pag.total ?? 0);
            setPages(pag.pages ?? 1);
          }
        } else {
          setError(data.error || "Failed to load images");
        }
      } catch (err) {
        setError("Failed to load images");
        console.error("Error loading images:", err);
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize, selectedCategory, search]
  );

  useEffect(() => {
    if (open) setPage(1);
  }, [open]);

  useEffect(() => {
    if (open && !isUploadOpen) {
      loadImages(page, pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isUploadOpen, page, pageSize, selectedCategory]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxSize: 10 * 1024 * 1024,
  });

  const handleUpload = useCallback(async () => {
    if (uploadFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => formData.append("files", file));
      if (uploadFormData.category) {
        formData.append("folder", uploadFormData.category.toLowerCase().replace(/\s+/g, "-"));
      }
      const response = await fetch("/api/images", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success && data.images?.length) {
        const updatePromises = data.images.map((img: { id: string }) =>
          fetch(`/api/images/${img.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: uploadFormData.title || undefined,
              category: uploadFormData.category || undefined,
              description: uploadFormData.description || undefined,
              featured: uploadFormData.featured,
              active: uploadFormData.active,
            }),
          })
        );
        await Promise.all(updatePromises);
        toast.success(`Uploaded ${data.images.length} image(s)`);
        setIsUploadOpen(false);
        setUploadFiles([]);
        setUploadFormData({ title: "", category: "", description: "", featured: false, active: true });
        loadImages(page, pageSize);
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }, [uploadFiles, uploadFormData, page, pageSize, loadImages]);

  const removeUploadFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Sync selectedImages when value prop changes
  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedImages(value);
    } else if (value) {
      setSelectedImages([value]);
    } else {
      setSelectedImages([]);
    }
  }, [value]);

  const categories = useMemo(() => {
    const cats = new Set(images.map((img) => img.category).filter(Boolean) as string[]);
    return Array.from(cats);
  }, [images]);

  const filteredImages = useMemo(() => {
    let filtered = images.filter((img) => img.active);
    if (selectedCategory !== "all") {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (img) =>
          (img.title?.toLowerCase().includes(q) ?? false) ||
          (img.category?.toLowerCase().includes(q) ?? false) ||
          (img.alt?.toLowerCase().includes(q) ?? false)
      );
    }
    return filtered;
  }, [images, search, selectedCategory]);

  const handleImageClick = (imageUrl: string) => {
    if (multiple) {
      setSelectedImages((prev) =>
        prev.includes(imageUrl) ? prev.filter((url) => url !== imageUrl) : [...prev, imageUrl]
      );
    } else {
      setSelectedImages([imageUrl]);
      onSelect(imageUrl);
      setOpen(false);
    }
  };

  const handleConfirm = () => {
    if (multiple && selectedImages.length > 0) {
      onSelect(selectedImages);
      setOpen(false);
    }
  };

  const handleRemove = (imageSrc: string) => {
    setSelectedImages((prev) => prev.filter((src) => src !== imageSrc));
    if (!multiple) {
      onSelect("");
    } else {
      onSelect(selectedImages.filter((src) => src !== imageSrc));
    }
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setPage(1);
    loadImages(1, pageSize);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" type="button">
            Select Image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-2xl sm:min-w-3xl md:min-w-4xl lg:min-w-6xl xl:min-w-8xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <DialogTitle>{multiple ? "Select Images" : "Select Image"}</DialogTitle>
              <DialogDescription>
                {multiple
                  ? "Choose one or more images from the gallery"
                  : "Choose an image from the gallery"}
              </DialogDescription>
            </div>
            {!isUploadOpen ? (
              <Button type="button" size="sm" onClick={() => setIsUploadOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload new
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)}>
                Back to list
              </Button>
            )}
          </div>
        </DialogHeader>

        {isUploadOpen ? (
          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              )}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              {isDragActive ? (
                <p className="text-primary">Drop images here...</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to select (PNG, JPG, GIF, WEBP, max 10MB)
                </p>
              )}
            </div>
            {uploadFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected ({uploadFiles.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {uploadFiles.map((file, i) => (
                    <div key={i} className="relative group">
                      <div className="w-16 h-16 rounded border bg-muted flex items-center justify-center text-xs truncate px-1">
                        {file.name}
                      </div>
                      <button
                        type="button"
                        className="absolute -top-1 -right-1 rounded-full bg-destructive text-destructive-foreground p-0.5"
                        onClick={() => removeUploadFile(i)}
                        aria-label="Remove file"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title (optional)</Label>
                <Input
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Image title"
                />
              </div>
              <div className="space-y-2">
                <Label>Category (optional)</Label>
                <Select
                  value={uploadFormData.category}
                  onValueChange={(v) => setUploadFormData((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                value={uploadFormData.description}
                onChange={(e) => setUploadFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Description"
                rows={2}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={uploadFormData.featured}
                  onCheckedChange={(c) => setUploadFormData((p) => ({ ...p, featured: c === true }))}
                />
                <span className="text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={uploadFormData.active}
                  onCheckedChange={(c) => setUploadFormData((p) => ({ ...p, active: c === true }))}
                />
                <span className="text-sm">Active</span>
              </label>
            </div>
            <Button onClick={handleUpload} disabled={uploading || uploadFiles.length === 0}>
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {uploadFiles.length ? uploadFiles.length : ""} image(s)
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="secondary" size="sm" onClick={handleSearchSubmit}>
                Search
              </Button>
            </div>

            {/* Pagination controls */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Per page</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => {
                    setPageSize(Number(v));
                    setPage(1);
                    loadImages(1, Number(v));
                  }}
                >
                  <SelectTrigger className="w-[90px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page >= pages}
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected</p>
                <div className="flex flex-wrap gap-2">
                  {selectedImages.map((imageUrl) => {
                    const image = images.find((img) => img.url === imageUrl);
                    return (
                      <div
                        key={imageUrl}
                        className="relative group h-20 w-20 rounded-lg overflow-hidden border-2 border-primary"
                      >
                        <Image
                          src={imageUrl}
                          alt={image?.alt || image?.title || ""}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          title="Remove"
                          onClick={() => handleRemove(imageUrl)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}

            {error && !loading && (
              <div className="py-8 text-center text-destructive">{error}</div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredImages.map((image) => {
                  const isSelected = selectedImages.includes(image.url);
                  return (
                    <div
                      key={image.id}
                      className={cn(
                        "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                        isSelected ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary"
                      )}
                      onClick={() => handleImageClick(image.url)}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={image.url}
                          alt={image.alt || image.title || ""}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="rounded-full bg-primary p-1 text-primary-foreground">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <p className="text-white text-sm font-medium text-center px-2 line-clamp-2">
                            {image.title || "Untitled"}
                          </p>
                        </div>
                      </div>
                      <div className="p-2 bg-background">
                        <p className="text-xs font-medium truncate">{image.title || "Untitled"}</p>
                        {image.category && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {image.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && !error && filteredImages.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">No images found</div>
            )}

            {multiple && (
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={selectedImages.length === 0}>
                  Confirm Selection
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
