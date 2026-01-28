"use client";

import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

interface GalleryTableViewProps {
  images: GalleryImage[];
  onView: (image: GalleryImage) => void;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string) => void;
  availableCategories: { id: string; name: string }[];
}

export function GalleryTableView({
  images,
  onView,
  onEdit,
  onDelete,
  availableCategories,
}: GalleryTableViewProps) {
  const columns = [
    {
      key: "src",
      label: "Image",
      render: (item: GalleryImage) => (
        <div className="relative h-12 w-12 rounded overflow-hidden">
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized={item.src.startsWith("http")}
          />
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: GalleryImage) => (
        <Badge variant="outline">{item.category}</Badge>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      sortable: true,
      render: (item: GalleryImage) => (
        <Badge variant={item.featured ? "default" : "secondary"}>
          {item.featured ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "active",
      label: "Active",
      sortable: true,
      render: (item: GalleryImage) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "uploadedAt",
      label: "Uploaded",
      sortable: true,
      render: (item: GalleryImage) =>
        new Date(item.uploadedAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: GalleryImage) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(item)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={images}
      columns={columns}
      searchPlaceholder="Search images..."
      filterOptions={[
        {
          key: "category",
          label: "Category",
          options: availableCategories.map(cat => ({ value: cat.name, label: cat.name })),
        },
      ]}
    />
  );
}
