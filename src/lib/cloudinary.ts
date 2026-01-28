import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  tags?: string[];
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  };
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  resource_type: string;
  created_at: string;
}

/**
 * Upload an image to Cloudinary
 */
export async function uploadImage(
  file: Buffer | string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      resource_type: "image",
      ...(options.folder && { folder: options.folder }),
      ...(options.publicId && { public_id: options.publicId }),
      ...(options.tags && { tags: options.tags }),
    };

    // Add transformations if provided
    if (options.transformation) {
      uploadOptions.transformation = [
        {
          ...(options.transformation.width && { width: options.transformation.width }),
          ...(options.transformation.height && { height: options.transformation.height }),
          ...(options.transformation.crop && { crop: options.transformation.crop }),
          ...(options.transformation.quality && { quality: options.transformation.quality }),
          ...(options.transformation.format && { format: options.transformation.format }),
        },
      ];
    }

    if (Buffer.isBuffer(file)) {
      // Upload buffer using upload_stream
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result as UploadResult);
          } else {
            reject(new Error("Upload failed: No result returned"));
          }
        }
      );
      uploadStream.end(file);
    } else {
      // Base64 string or data URI
      cloudinary.uploader.upload(file, uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result as UploadResult);
        } else {
          reject(new Error("Upload failed: No result returned"));
        }
      });
    }
  });
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else if (result?.result === "ok" || result?.result === "not found") {
        resolve();
      } else {
        reject(new Error(`Failed to delete image: ${result?.result}`));
      }
    });
  });
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
    fetchFormat?: "auto";
  } = {}
): string {
  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  if (options.fetchFormat === "auto") transformations.push("f_auto");

  const transformationString = transformations.length > 0 ? transformations.join(",") : "";

  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformationString ? [{ transformation: transformationString }] : undefined,
  });
}

/**
 * Get responsive image URLs for different breakpoints
 */
export function getResponsiveImageUrls(
  publicId: string,
  breakpoints: number[] = [640, 768, 1024, 1280, 1920]
): string[] {
  return breakpoints.map((width) =>
    getOptimizedImageUrl(publicId, {
      width,
      crop: "limit",
      quality: "auto",
      fetchFormat: "auto",
    })
  );
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(publicId: string, breakpoints: number[] = [640, 768, 1024, 1280, 1920]): string {
  const urls = getResponsiveImageUrls(publicId, breakpoints);
  return urls.map((url, index) => `${url} ${breakpoints[index]}w`).join(", ");
}

export { cloudinary };
