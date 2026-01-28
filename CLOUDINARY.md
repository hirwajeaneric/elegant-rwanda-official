# Cloudinary Integration Guide

This project uses Cloudinary for image management, storage, and optimization.

## Features

✅ **Upload Images**: Single or multiple image uploads with drag-and-drop support  
✅ **Image Storage**: Secure storage on Cloudinary CDN  
✅ **Database Integration**: Store image metadata in PostgreSQL  
✅ **Image Management**: Edit, delete, and organize images  
✅ **Optimization**: Automatic image optimization and transformations  
✅ **Responsive Images**: Generate responsive image URLs for different breakpoints  
✅ **Public Access**: Images are accessible via Cloudinary URLs  

## Configuration

### 1. Environment Variables

Add these to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=  # Optional, for unsigned uploads
```

Get these credentials from your [Cloudinary Dashboard](https://cloudinary.com/console).

### 2. Database Migration

Run the Prisma migration to create the Image table:

```bash
pnpm prisma db push
# or for production
pnpm prisma migrate dev --name add_image_model
```

## Usage

### Uploading Images

#### Via Gallery Page (Admin)

1. Navigate to `/admin/gallery`
2. Click "Upload Image"
3. Drag & drop images or click to select
4. Fill in metadata (title, category, description)
5. Click "Upload"

#### Via API

```typescript
const formData = new FormData();
formData.append("files", file);
formData.append("folder", "elegant-rwanda");
formData.append("tags", "tag1,tag2");

const response = await fetch("/api/images", {
  method: "POST",
  body: formData,
});
```

### Using AssetSelector Component

```tsx
import { AssetSelector } from "@/components/dashboard/AssetSelector";

<AssetSelector
  value={selectedImageUrl}
  onSelect={(url) => setSelectedImageUrl(url)}
  multiple={false}
  category="Wildlife"
/>
```

### Image Transformations

#### Using the Hook

```tsx
import { useCloudinaryImage } from "@/lib/hooks/use-cloudinary-image";

const { url, srcSet } = useCloudinaryImage({
  publicId: "image-public-id",
  width: 800,
  height: 600,
  crop: "fill",
  quality: "auto",
  responsive: true,
});
```

#### Using the Component

```tsx
import { CloudinaryImage } from "@/components/ui/cloudinary-image";

<CloudinaryImage
  publicId="image-public-id"
  url="fallback-url"
  alt="Image description"
  width={800}
  height={600}
  responsive={true}
/>
```

#### Direct Utility Functions

```typescript
import { getOptimizedImageUrl, generateSrcSet } from "@/lib/cloudinary";

// Get optimized URL
const url = getOptimizedImageUrl("public-id", {
  width: 800,
  height: 600,
  crop: "fill",
  quality: "auto",
});

// Generate srcset for responsive images
const srcSet = generateSrcSet("public-id", [640, 768, 1024, 1280]);
```

## API Endpoints

### POST `/api/images`
Upload one or more images.

**Request:**
- `files`: File[] (multipart/form-data)
- `folder`: string (optional)
- `tags`: string (optional, comma-separated)

**Response:**
```json
{
  "success": true,
  "images": [...],
  "count": 1
}
```

### GET `/api/images`
List images with filters.

**Query Parameters:**
- `category`: string (optional)
- `active`: boolean (optional)
- `featured`: boolean (optional)
- `search`: string (optional)
- `page`: number (optional, default: 1)
- `limit`: number (optional, default: 50)

### GET `/api/images/[id]`
Get specific image details.

### PUT `/api/images/[id]`
Update image metadata.

**Body:**
```json
{
  "title": "New Title",
  "category": "Wildlife",
  "description": "Description",
  "featured": true,
  "active": true
}
```

### DELETE `/api/images/[id]`
Delete an image (removes from both Cloudinary and database).

## Image Model Schema

```prisma
model Image {
  id          String   @id @default(cuid())
  publicId   String   @unique // Cloudinary public_id
  url        String   // Cloudinary secure URL
  urlRaw     String?  // Raw URL without transformations
  title      String?
  alt        String?
  description String?
  category   String?
  folder     String?
  width      Int?
  height     Int?
  format     String?
  bytes      Int?
  tags       String[]
  featured   Boolean  @default(false)
  active     Boolean  @default(true)
  uploadedBy String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## Transformation Options

### Crop Modes
- `fill`: Fill the dimensions, may crop
- `fit`: Fit within dimensions, no cropping
- `limit`: Resize to fit within dimensions
- `scale`: Resize proportionally
- `thumb`: Generate thumbnail

### Quality
- `auto`: Automatic optimization
- `80`: Specific quality (1-100)

### Format
- `auto`: Automatic format selection (WebP, AVIF, etc.)
- `jpg`, `png`, `webp`: Specific format

## Best Practices

1. **Always use secure URLs**: Cloudinary automatically provides HTTPS URLs
2. **Use responsive images**: Enable `responsive: true` for better performance
3. **Optimize on upload**: Set quality and format options during upload
4. **Organize with folders**: Use folders to organize images by category
5. **Add metadata**: Always provide title, alt text, and descriptions
6. **Clean up**: Delete unused images to save storage space

## Troubleshooting

### Images not uploading
- Check Cloudinary credentials in `.env`
- Verify file size (max 10MB)
- Check file format (PNG, JPG, GIF, WEBP)

### Images not displaying
- Verify the URL is accessible
- Check if image is marked as `active: true`
- Ensure Cloudinary account is active

### Transformation not working
- Verify `publicId` is correct
- Check transformation parameters
- Ensure image exists in Cloudinary

## Security

- All uploads require authentication
- Images are stored securely on Cloudinary CDN
- Access can be restricted via Cloudinary settings
- Signed URLs can be generated for private images
