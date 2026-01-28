"use client";

import { useState, useMemo } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { GalleryTableView } from "@/components/dashboard/GalleryTableView";
import { GalleryGridView } from "@/components/dashboard/GalleryGridView";
import { Button } from "@/components/ui/button";
import { Upload, Table2, Grid3x3 } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { getCategoriesForEntity } from "@/data/categories";
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

type ViewMode = "table" | "grid";

export default function GalleryPage() {
  const availableCategories = useMemo(() => getCategoriesForEntity(['image']), []);
  const [images, setImages] = useState(galleryImages);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  const handleEdit = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setIsEditDialogOpen(true);
  };

  const handleView = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setIsViewDialogOpen(true);
  };

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
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
              <DialogDescription>
                Add a new image to the gallery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Image File</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Image title" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
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
                <Textarea placeholder="Image description" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="active" defaultChecked />
                <Label htmlFor="active">Active</Label>
              </div>
              <Button className="w-full">Upload Image</Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* View Components */}
      {viewMode === "table" ? (
        <GalleryTableView
          images={images}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          availableCategories={availableCategories}
        />
      ) : (
        <GalleryGridView
          images={images}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          availableCategories={availableCategories}
        />
      )}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>{selectedImage?.category}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={`/${selectedImage.src}`}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Uploaded: {new Date(selectedImage.uploadedAt).toLocaleString()}
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
                  src={`/${selectedImage.src}`}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input defaultValue={selectedImage.title} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue={selectedImage.category}>
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
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue={selectedImage.description} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="edit-featured" defaultChecked={selectedImage.featured} />
                <Label htmlFor="edit-featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="edit-active" defaultChecked={selectedImage.active} />
                <Label htmlFor="edit-active">Active</Label>
              </div>
              <Button className="w-full">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
