"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Check, X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

  // Fetch images from API when dialog opens
  useEffect(() => {
    if (open) {
      loadImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedCategory]);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        active: "true",
        ...(selectedCategory !== "all" && { category: selectedCategory }),
      });

      const response = await fetch(`/api/images?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setImages(data.images || []);
      } else {
        setError(data.error || "Failed to load images");
      }
    } catch (err) {
      setError("Failed to load images");
      console.error("Error loading images:", err);
    } finally {
      setLoading(false);
    }
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
      filtered = filtered.filter(
        (img) =>
          (img.title?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
          (img.category?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
          (img.alt?.toLowerCase().includes(search.toLowerCase()) ?? false)
      );
    }

    return filtered;
  }, [images, search, selectedCategory]);

  const handleImageClick = (imageUrl: string) => {
    if (multiple) {
      setSelectedImages((prev) =>
        prev.includes(imageUrl)
          ? prev.filter((url) => url !== imageUrl)
          : [...prev, imageUrl]
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
      // Update the selection when removing in multiple mode
      const updated = selectedImages.filter((src) => src !== imageSrc);
      onSelect(updated);
    }
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
      <DialogContent className="min-w-2xl sm:min-w-3xl md:min-w-4xl lg:min-w-6xl xl:min-w-8xl  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{multiple ? "Select Images" : "Select Image"}</DialogTitle>
          <DialogDescription>
            {multiple 
              ? "Choose one or more images from the gallery" 
              : "Choose an image from the gallery"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
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
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected Images:</p>
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
                        title="Remove image"
                        onClick={() => handleRemove(imageUrl)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-8 text-destructive">
              {error}
            </div>
          )}

          {/* Image Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filteredImages.map((image) => {
                const isSelected = selectedImages.includes(image.url);
                return (
                  <div
                    key={image.id}
                    className={cn(
                      "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                      isSelected
                        ? "border-primary ring-2 ring-primary"
                        : "border-border hover:border-primary"
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
                          <div className="bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <p className="text-white text-sm font-medium text-center px-2">
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
            <div className="text-center py-8 text-muted-foreground">
              No images found
            </div>
          )}

          {/* Actions */}
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
      </DialogContent>
    </Dialog>
  );
}
