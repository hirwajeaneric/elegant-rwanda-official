"use client";

import { useState, useMemo } from "react";
import { useSearchParamsStore } from "@/lib/stores/search-params-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

interface GalleryGridViewProps {
  images: GalleryImage[];
  onView: (image: GalleryImage) => void;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string) => void;
  availableCategories: { id: string; name: string }[];
  searchKey?: string;
  pageSize?: number;
}

export function GalleryGridView({
  images,
  onView,
  onEdit,
  onDelete,
  availableCategories,
  searchKey = "search",
  pageSize = 12,
}: GalleryGridViewProps) {
  const { getParam, setParam } = useSearchParamsStore();
  const [localSearch, setLocalSearch] = useState(() => getParam(searchKey));
  const [localCategory, setLocalCategory] = useState(() => getParam("category") || "");
  const search = localSearch;
  const page = parseInt(getParam("page") || "1");
  const categoryFilter = localCategory;

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...images];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        Object.values(item).some((value) => {
          if (value == null || (typeof value === "object" && !(value instanceof Date))) return false;
          return String(value).toLowerCase().includes(q);
        })
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((item) => item.category != null && item.category === categoryFilter);
    }

    return result;
  }, [images, search, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    setParam(searchKey, value);
    setParam("page", "1");
  };

  const handlePageChange = (newPage: number) => {
    setParam("page", String(newPage));
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={categoryFilter || "all"}
          onValueChange={(value) => {
            const next = value === "all" ? "" : value;
            setLocalCategory(next);
            setParam("category", next);
            setParam("page", "1");
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {availableCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {paginatedData.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No images found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedData.map((image) => (
              <div key={image.id} className="overflow-hidden group hover:shadow-lg transition-shadow rounded-lg border bg-card">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={image.src.startsWith("http")}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onView(image)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(image)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {image.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="default">Featured</Badge>
                    </div>
                  )}
                  {!image.active && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{image.title}</h3>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {image.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
                {filteredData.length} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .map((p, idx, arr) => (
                      <div key={p} className="flex items-center gap-1">
                        {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-2">...</span>}
                        <Button
                          variant={page === p ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </Button>
                      </div>
                    ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
