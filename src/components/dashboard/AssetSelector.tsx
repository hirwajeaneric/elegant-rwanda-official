"use client";

import { useState, useMemo } from "react";
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
import { Search, Check, X } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AssetSelectorProps {
  value?: string;
  onSelect: (imageSrc: string) => void;
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
    value ? [value] : []
  );

  const categories = useMemo(() => {
    const cats = new Set(galleryImages.map((img) => img.category));
    return Array.from(cats);
  }, []);

  const filteredImages = useMemo(() => {
    let filtered = galleryImages.filter((img) => img.active);

    if (selectedCategory !== "all") {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(search.toLowerCase()) ||
          img.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, selectedCategory]);

  const handleImageClick = (imageSrc: string) => {
    if (multiple) {
      setSelectedImages((prev) =>
        prev.includes(imageSrc)
          ? prev.filter((src) => src !== imageSrc)
          : [...prev, imageSrc]
      );
    } else {
      setSelectedImages([imageSrc]);
      onSelect(imageSrc);
      setOpen(false);
    }
  };

  const handleConfirm = () => {
    if (multiple && selectedImages.length > 0) {
      onSelect(selectedImages[0]); // For now, return first selected
      setOpen(false);
    }
  };

  const handleRemove = (imageSrc: string) => {
    setSelectedImages((prev) => prev.filter((src) => src !== imageSrc));
    if (!multiple && imageSrc === value) {
      onSelect("");
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
          <DialogDescription>
            Choose an image from the gallery
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
                {selectedImages.map((src) => {
                  const image = galleryImages.find((img) => img.src === src);
                  return (
                    <div
                      key={src}
                      className="relative group h-20 w-20 rounded-lg overflow-hidden border-2 border-primary"
                    >
                      <Image
                        src={`/${src}`}
                        alt={image?.title || ""}
                        fill
                        className="object-cover"
                      />
                      <button
                        title="Remove image"
                        onClick={() => handleRemove(src)}
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

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => {
              const isSelected = selectedImages.includes(image.src);
              return (
                <div
                  key={image.id}
                  className={cn(
                    "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary"
                      : "border-border hover:border-primary"
                  )}
                  onClick={() => handleImageClick(image.src)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={`/${image.src}`}
                      alt={image.title}
                      fill
                      className="object-cover"
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
                        {image.title}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-background">
                    <p className="text-xs font-medium truncate">{image.title}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {image.category}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredImages.length === 0 && (
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
