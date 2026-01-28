import { useMemo } from "react";
import { getOptimizedImageUrl, generateSrcSet, getResponsiveImageUrls } from "@/lib/cloudinary";

interface UseCloudinaryImageOptions {
  publicId?: string;
  url?: string; // Fallback to direct URL if publicId is not available
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "scale" | "thumb";
  quality?: string | number;
  format?: string;
  fetchFormat?: "auto";
  responsive?: boolean;
  breakpoints?: number[];
}

/**
 * Hook to get optimized Cloudinary image URLs
 */
export function useCloudinaryImage(options: UseCloudinaryImageOptions) {
  const {
    publicId,
    url,
    width,
    height,
    crop = "limit",
    quality = "auto",
    format,
    fetchFormat = "auto",
    responsive = false,
    breakpoints = [640, 768, 1024, 1280, 1920],
  } = options;

  const optimizedUrl = useMemo(() => {
    if (!publicId && !url) return "";
    
    if (publicId) {
      return getOptimizedImageUrl(publicId, {
        width,
        height,
        crop,
        quality,
        format,
        fetchFormat,
      });
    }
    
    return url || "";
  }, [publicId, url, width, height, crop, quality, format, fetchFormat]);

  const srcSet = useMemo(() => {
    if (!publicId || !responsive) return "";
    return generateSrcSet(publicId, breakpoints);
  }, [publicId, responsive, breakpoints]);

  const responsiveUrls = useMemo(() => {
    if (!publicId || !responsive) return [];
    return getResponsiveImageUrls(publicId, breakpoints);
  }, [publicId, responsive, breakpoints]);

  return {
    url: optimizedUrl,
    srcSet,
    responsiveUrls,
  };
}

/**
 * Helper function to get optimized image URL
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  }
): string {
  return getOptimizedImageUrl(publicId, options || {});
}
