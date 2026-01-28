"use client";

import Image from "next/image";
import { useCloudinaryImage } from "@/lib/hooks/use-cloudinary-image";

interface CloudinaryImageProps {
  publicId?: string;
  url: string; // Fallback URL
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  crop?: "fill" | "fit" | "limit" | "scale" | "thumb";
  responsive?: boolean;
  sizes?: string;
}

/**
 * Optimized Cloudinary Image component
 * Automatically uses Cloudinary transformations if publicId is provided
 */
export function CloudinaryImage({
  publicId,
  url,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
  quality = 75,
  crop = "limit",
  responsive = false,
  sizes,
}: CloudinaryImageProps) {
  const { url: optimizedUrl, srcSet } = useCloudinaryImage({
    publicId,
    url,
    width,
    height,
    crop,
    quality: quality.toString(),
    fetchFormat: "auto",
    responsive,
  });

  if (fill) {
    return (
      <Image
        src={optimizedUrl}
        alt={alt}
        fill
        className={className}
        priority={priority}
        unoptimized={!publicId} // Only optimize if we have publicId
        {...(srcSet && { srcSet })}
        {...(sizes && { sizes })}
      />
    );
  }

  return (
    <Image
      src={optimizedUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      unoptimized={!publicId}
      {...(srcSet && { srcSet })}
      {...(sizes && { sizes })}
    />
  );
}
