import { useState, useEffect, useCallback } from "react";

export type CategoryType = "FAQ" | "BLOG" | "EVENT" | "TOUR" | "IMAGE" | "GENERAL";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: CategoryType[];
  color?: string | null;
  icon?: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseCategoriesOptions {
  type?: CategoryType[];
  active?: boolean;
  publicEndpoint?: boolean;
}

/**
 * Hook to fetch categories from API
 */
export function useCategories(options: UseCategoriesOptions = {}) {
  const { type, active, publicEndpoint = false } = options;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = publicEndpoint ? "/api/public/categories" : "/api/categories";
      const params = new URLSearchParams();
      
      if (type && type.length > 0) {
        params.append("type", type[0]); // API expects single type
      }
      if (active !== undefined) {
        params.append("active", active.toString());
      }

      const url = params.toString() ? `${endpoint}?${params.toString()}` : endpoint;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        let fetchedCategories = data.categories || [];
        
        // Filter by multiple types on client side if needed
        if (type && type.length > 1) {
          fetchedCategories = fetchedCategories.filter((cat: Category) =>
            type.some(t => cat.type.includes(t))
          );
        }
        
        setCategories(fetchedCategories);
      } else {
        setError(data.error || "Failed to load categories");
      }
    } catch (err) {
      setError("Failed to load categories");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  }, [type, active, publicEndpoint]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Note: Use useCategories hook in React components instead of this function
