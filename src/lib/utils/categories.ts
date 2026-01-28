import { CategoryType } from "@/lib/hooks/use-categories";

/**
 * Fetch categories for specific entity types
 * This replaces the static getCategoriesForEntity function
 * Use this for server components or API routes
 */
export async function fetchCategoriesForEntity(
  types: CategoryType[],
  options: { publicEndpoint?: boolean } = {}
): Promise<Array<{ id: string; name: string; slug: string }>> {
  try {
    const endpoint = options.publicEndpoint
      ? "/api/public/categories"
      : "/api/categories";

    // Fetch all categories and filter client-side for multiple types
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.success && data.categories) {
      return data.categories
        .filter((cat: { type: CategoryType[]; active: boolean }) =>
          cat.active && types.some((t) => cat.type.includes(t))
        )
        .map((cat: { id: string; name: string; slug: string }) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Note: For React components, import useCategories directly from @/lib/hooks/use-categories
// This utility is for server-side usage only
