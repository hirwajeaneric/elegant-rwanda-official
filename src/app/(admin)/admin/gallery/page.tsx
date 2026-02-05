"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { GalleryTableView } from "@/components/dashboard/GalleryTableView";
import { GalleryGridView } from "@/components/dashboard/GalleryGridView";
import { Button } from "@/components/ui/button";
import { Upload, Table2, Grid3x3, Loader2, X, FileSpreadsheet } from "lucide-react";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { useCategories } from "@/lib/hooks/use-categories";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useSearchParamsStore } from "@/lib/stores/search-params-store";

type ViewMode = "table" | "grid";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

interface CloudinaryImage {
  id: string;
  publicId: string;
  url: string;
  urlRaw: string | null;
  title: string | null;
  alt: string | null;
  description: string | null;
  category: string | null;
  folder: string | null;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null; // File size in bytes
  tags: string[];
  featured: boolean;
  active: boolean;
  uploadedBy: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function GalleryPage() {
  const { categories: categoryList } = useCategories({ type: ['IMAGE'], active: true });
  const availableCategories = useMemo(() =>
    categoryList.map(cat => ({ id: cat.id, name: cat.name })),
    [categoryList]
  );
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [pageSize, setPageSize] = useState(10);
  const { setParam } = useSearchParamsStore();
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFormData, setUploadFormData] = useState({
    title: "",
    category: "",
    description: "",
    featured: false,
    active: true,
  });
  const [updating, setUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    description: "",
    featured: false,
    active: true,
  });
  const [isSeedDialogOpen, setIsSeedDialogOpen] = useState(false);
  const [seedFile, setSeedFile] = useState<File | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedResults, setSeedResults] = useState<{
    total: number;
    created: number;
    skipped: number;
    errors: Array<{ row: number; error: string }>;
  } | null>(null);

  // Load images from API (higher limit so client-side search/filter/sort have enough data)
  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/images?active=true&limit=500");
      const data = await response.json();
      if (data.success) {
        setImages(data.images || []);
      } else {
        toast.error("Failed to load images", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load images");
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("files", file);
      });
      if (uploadFormData.category) {
        formData.append("folder", uploadFormData.category.toLowerCase().replace(/\s+/g, "-"));
      }

      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.images) {
        // Update metadata for uploaded images
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

        toast.success(`Successfully uploaded ${data.images.length} image(s)`);
        setIsUploadDialogOpen(false);
        setUploadFiles([]);
        setUploadFormData({
          title: "",
          category: "",
          description: "",
          featured: false,
          active: true,
        });
        loadImages();
      } else {
        toast.error("Upload failed", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Image deleted successfully");
        loadImages();
      } else {
        toast.error("Failed to delete image", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to delete image");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (image: { id: string; src: string }) => {
    const cloudinaryImage = images.find((img) => img.id === image.id);
    if (cloudinaryImage) {
      setSelectedImage(cloudinaryImage);
      setEditFormData({
        title: cloudinaryImage.title ?? "",
        category: cloudinaryImage.category ?? "",
        description: cloudinaryImage.description ?? "",
        featured: cloudinaryImage.featured ?? false,
        active: cloudinaryImage.active ?? true,
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdate = async () => {
    if (!selectedImage) return;

    setUpdating(true);
    try {
      const payload = {
        title: editFormData.title || null,
        category: editFormData.category || null,
        description: editFormData.description || null,
        featured: editFormData.featured,
        active: editFormData.active,
      };

      const response = await fetch(`/api/images/${selectedImage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Image updated successfully");
        setIsEditDialogOpen(false);
        setSelectedImage(null);
        loadImages();
      } else {
        toast.error("Failed to update image", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to update image");
      console.error("Update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleView = (image: { id: string; src: string }) => {
    const cloudinaryImage = images.find((img) => img.id === image.id);
    if (cloudinaryImage) {
      setSelectedImage(cloudinaryImage);
      setIsViewDialogOpen(true);
    }
  };

  const removeUploadFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSeedExcel = async () => {
    if (!seedFile) {
      toast.error("Please select an Excel file");
      return;
    }

    setSeeding(true);
    setSeedResults(null);

    try {
      const formData = new FormData();
      formData.append("file", seedFile);

      const response = await fetch("/api/images/seed-excel", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSeedResults(data.results);
        toast.success(data.message || "Images seeded successfully");
        if (data.results.created > 0) {
          // Reload images if any were created
          loadImages();
        }
      } else {
        toast.error("Seeding failed", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Seeding failed");
      console.error("Seed error:", error);
    } finally {
      setSeeding(false);
    }
  };

  const handleSeedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = [".xlsx", ".xls"];
      const fileName = file.name.toLowerCase();
      const isValidFile = validExtensions.some((ext) => fileName.endsWith(ext));

      if (!isValidFile) {
        toast.error("Invalid file type. Please upload an Excel file (.xlsx or .xls)");
        return;
      }

      setSeedFile(file);
      setSeedResults(null);
    }
  };

  // Convert CloudinaryImage to GalleryImage format for compatibility
  const convertedImages = useMemo(() => {
    return images.map((img) => ({
      id: img.id,
      src: img.url, // Full Cloudinary URL
      title: img.title || "Untitled",
      category: (img.category as "Wildlife" | "Landscapes" | "Culture" | "Accommodation" | "Food & Cuisine" | "City & Architecture" | "Events" | "Transportation") || "Uncategorized",
      alt: img.alt || undefined,
      description: img.description || undefined,
      size: img.bytes || undefined, // Map bytes to size
      width: img.width || undefined,
      height: img.height || undefined,
      uploadedAt: img.createdAt,
      uploadedBy: img.uploadedBy || undefined,
      tags: img.tags || undefined,
      featured: img.featured,
      active: img.active,
    }));
  }, [images]);

  if (loading && images.length === 0) {
    return <DataTableLoader columnCount={5} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Gallery</h1>
          <p className="text-muted-foreground mt-2">
            Manage images and assets for the website
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-8"
            >
              <Table2 className="h-4 w-4 mr-1" />
              Table
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <Grid3x3 className="h-4 w-4 mr-1" />
              Grid
            </Button>
          </div>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setParam("page", "1");
            }}
          >
            <SelectTrigger className="w-[110px] h-9">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isSeedDialogOpen} onOpenChange={setIsSeedDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Seed from Excel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Seed Images from Excel</DialogTitle>
                <DialogDescription>
                  Upload an Excel file to bulk import images. The file should contain columns: publicId, url, urlRaw, title, alt, description, category, folder, width, height, format, bytes, tags, featured, active
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Excel File (.xlsx or .xls)</Label>
                  <Input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleSeedFileChange}
                    disabled={seeding}
                  />
                  {seedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {seedFile.name}
                    </p>
                  )}
                </div>

                {seedResults && (
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="font-semibold text-xl">Seeding Results</h4>
                    <div className="space-y-1 text-sm">
                      <p>Total rows: {seedResults.total}</p>
                      <p className="text-green-600">Created: {seedResults.created}</p>
                      <p className="text-yellow-600">Skipped: {seedResults.skipped}</p>
                      {seedResults.errors.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium text-red-600">Errors:</p>
                          <div className="max-h-40 overflow-y-auto">
                            {seedResults.errors.slice(0, 10).map((error, idx) => (
                              <p key={idx} className="text-xs text-red-600">
                                Row {error.row}: {error.error}
                              </p>
                            ))}
                            {seedResults.errors.length > 10 && (
                              <p className="text-xs text-muted-foreground">
                                ... and {seedResults.errors.length - 10} more errors
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleSeedExcel}
                  disabled={seeding || !seedFile}
                >
                  {seeding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Seeding...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Seed Images
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-2xl md:min-w-2xl lg:min-w-4xl xl:min-w-6xl 2xl:min-w-8xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload New Images</DialogTitle>
                <DialogDescription>
                  Upload one or more images to the gallery
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* File Dropzone */}
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
                  `}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  {isDragActive ? (
                    <p className="text-primary">Drop images here...</p>
                  ) : (
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Drag & drop images here, or click to select
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports PNG, JPG, GIF, WEBP (max 10MB each)
                      </p>
                    </div>
                  )}
                </div>

                {/* Selected Files Preview */}
                {uploadFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files ({uploadFiles.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                      {uploadFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="relative aspect-square rounded-lg overflow-hidden border">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <button
                              title="Remove image"
                              onClick={() => removeUploadFile(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs truncate mt-1">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata Form */}
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Title (optional)</Label>
                    <Input
                      placeholder="Image title"
                      value={uploadFormData.title}
                      onChange={(e) =>
                        setUploadFormData({ ...uploadFormData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category (optional)</Label>
                    <Select
                      value={uploadFormData.category}
                      onValueChange={(value) =>
                        setUploadFormData({ ...uploadFormData, category: value })
                      }
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
                  <div className="space-y-2">
                    <Label>Description (optional)</Label>
                    <Textarea
                      placeholder="Image description"
                      value={uploadFormData.description}
                      onChange={(e) =>
                        setUploadFormData({ ...uploadFormData, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="upload-featured"
                      checked={uploadFormData.featured}
                      onCheckedChange={(checked) =>
                        setUploadFormData({ ...uploadFormData, featured: checked === true })
                      }
                    />
                    <Label htmlFor="upload-featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="upload-active"
                      checked={uploadFormData.active}
                      onCheckedChange={(checked) =>
                        setUploadFormData({ ...uploadFormData, active: checked === true })
                      }
                    />
                    <Label htmlFor="upload-active">Active</Label>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleUpload}
                    disabled={uploading || uploadFiles.length === 0}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload {uploadFiles.length > 0 ? `${uploadFiles.length} ` : ""}Image
                        {uploadFiles.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* View Components */}
      {viewMode === "table" ? (
        <GalleryTableView
          images={convertedImages}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          availableCategories={availableCategories}
          pageSize={pageSize}
        />
      ) : (
        <GalleryGridView
          images={convertedImages}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          availableCategories={availableCategories}
          pageSize={pageSize}
        />
      )}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title || "Untitled"}</DialogTitle>
            <DialogDescription>{selectedImage?.category || "Uncategorized"}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div>
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || selectedImage.title || ""}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Uploaded: {new Date(selectedImage.createdAt).toLocaleString()}
                </p>
                {selectedImage.description && (
                  <p className="text-sm">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>Update image details</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || selectedImage.title || ""}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editFormData.title}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={editFormData.category || ""}
                  onValueChange={(value) => setEditFormData((prev) => ({ ...prev, category: value }))}
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
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-featured"
                  checked={editFormData.featured}
                  onCheckedChange={(checked) => setEditFormData((prev) => ({ ...prev, featured: checked === true }))}
                />
                <Label htmlFor="edit-featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-active"
                  checked={editFormData.active}
                  onCheckedChange={(checked) => setEditFormData((prev) => ({ ...prev, active: checked === true }))}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
              <Button className="w-full" onClick={handleUpdate} disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
