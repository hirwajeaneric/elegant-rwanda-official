import { useState, useEffect, useCallback, useRef } from "react";

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

  // Create a stable array reference to prevent infinite loops when arrays are passed inline
  // Compare arrays by their stringified sorted contents
  const typeKeyRef = useRef<string | undefined>(undefined);
  const stableTypeRef = useRef<CategoryType[] | undefined>(undefined);
  
  const currentTypeKey = type ? JSON.stringify([...type].sort()) : undefined;
  
  // Only create a new array reference if the type content actually changed
  if (currentTypeKey !== typeKeyRef.current) {
    typeKeyRef.current = currentTypeKey;
    stableTypeRef.current = type ? [...type].sort() : undefined;
  }

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = publicEndpoint ? "/api/public/categories" : "/api/categories";
      const params = new URLSearchParams();
      
      const currentStableType = stableTypeRef.current;
      if (currentStableType && currentStableType.length > 0) {
        params.append("type", currentStableType[0]); // API expects single type
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
        if (currentStableType && currentStableType.length > 1) {
          fetchedCategories = fetchedCategories.filter((cat: Category) =>
            currentStableType.some(t => cat.type.includes(t))
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
  }, [active, publicEndpoint]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Note: Use useCategories hook in React components instead of this function
