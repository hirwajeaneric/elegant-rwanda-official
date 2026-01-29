"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { useCategories } from "@/lib/hooks/use-categories";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const { categories: categoryList } = useCategories({ type: ['FAQ'], active: true });
  
  const availableCategories = useMemo(() => 
    categoryList.map(cat => ({ id: cat.id, name: cat.name })), 
    [categoryList]
  );
  
  const categoryFilterOptions = useMemo(() => 
    availableCategories.map(cat => ({ value: cat.name, label: cat.name })),
    [availableCategories]
  );

  // Flatten category to a string for DataTable filtering (it compares by string; FAQ has category as object)
  const faqsForTable = useMemo(
    () =>
      faqs.map((faq) => ({
        ...faq,
        categoryName: faq.category?.name ?? "Uncategorized",
      })),
    [faqs]
  );

  const loadFAQs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/faqs");
      const data = await response.json();
      if (data.success) {
        setFaqs(data.faqs || []);
      } else {
        toast.error("Failed to load FAQs", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to load FAQs");
      console.error("Error loading FAQs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFAQs();
  }, [loadFAQs]);

  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const minOrder = faqs.length ? Math.min(...faqs.map((f) => f.order)) : 0;
  const maxOrder = faqs.length ? Math.max(...faqs.map((f) => f.order)) : 0;

  const handleReorder = useCallback(
    async (id: string, direction: "up" | "down") => {
      setReorderingId(id);
      try {
        const response = await fetch(`/api/faqs/${id}/reorder`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ direction }),
        });
        const data = await response.json();
        if (data.success) {
          await loadFAQs();
        } else {
          toast.error(data.error || "Failed to reorder");
        }
      } catch {
        toast.error("Failed to reorder FAQ");
      } finally {
        setReorderingId(null);
      }
    },
    [loadFAQs]
  );

  const columns = [
    {
      key: "order",
      label: "Order",
      sortable: false,
      render: (item: FAQ) => (
        <div className="flex items-center gap-1">
          <span className="tabular-nums w-6">{item.order}</span>
          <div className="flex flex-col">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={item.order <= minOrder || reorderingId === item.id}
              onClick={() => handleReorder(item.id, "up")}
              title="Move up"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={item.order >= maxOrder || reorderingId === item.id}
              onClick={() => handleReorder(item.id, "down")}
              title="Move down"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "question",
      label: "Question",
      sortable: true,
    },
    {
      key: "categoryName",
      label: "Category",
      sortable: true,
      render: (item: FAQ & { categoryName?: string }) => (
        <Badge variant="outline">{item.categoryName ?? item.category?.name ?? "Uncategorized"}</Badge>
      ),
    },
    {
      key: "active",
      label: "Active",
      sortable: true,
      render: (item: FAQ) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: FAQ) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/faqs/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

  if (loading && faqs.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">FAQs</h1>
          <p className="text-muted-foreground mt-2">
            Manage frequently asked questions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Link>
        </Button>
      </div>

      <DataTable
        data={faqsForTable}
        columns={columns}
        searchPlaceholder="Search FAQs..."
        filterOptions={[
          {
            key: "categoryName",
            label: "Category",
            options: categoryFilterOptions,
          },
        ]}
      />
    </div>
  );
}
