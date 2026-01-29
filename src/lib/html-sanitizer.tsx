/**
 * Enhanced HTML sanitizer for safe rendering of rich text content
 * This implementation handles common HTML tags and attributes used in rich text editors
 */

export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // Basic tag filtering - in production, consider using a library like DOMPurify
  let sanitized = html;
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: URLs (except for images)
  sanitized = sanitized.replace(/data:(?!image\/)/gi, '');
  
  // Remove vbscript: URLs
  sanitized = sanitized.replace(/vbscript:/gi, '');
  
  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  
  // Remove object tags
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  
  // Remove embed tags
  sanitized = sanitized.replace(/<embed\b[^<]*>/gi, '');
  
  // Remove meta tags
  sanitized = sanitized.replace(/<meta\b[^>]*>/gi, '');
  
  // Remove link tags
  sanitized = sanitized.replace(/<link\b[^>]*>/gi, '');
  
  // Remove style tags
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove base tags
  sanitized = sanitized.replace(/<base\b[^>]*>/gi, '');
  
  // Remove form tags
  sanitized = sanitized.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');
  
  // Remove input tags
  sanitized = sanitized.replace(/<input\b[^>]*>/gi, '');
  
  // Remove button tags
  sanitized = sanitized.replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, '');
  
  // Remove select tags
  sanitized = sanitized.replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, '');
  
  // Remove textarea tags
  sanitized = sanitized.replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, '');
  
  // Remove potentially dangerous attributes from allowed tags
  sanitized = sanitized.replace(/\s*(?:on\w+|javascript:|data-unsafe|data-js|data-url|data-src)=["'][^"']*["']/gi, '');
  
  // Remove empty paragraphs
  sanitized = sanitized.replace(/<p>\s*<\/p>/gi, '');
  
  // Clean up multiple newlines and spaces
  sanitized = sanitized.replace(/\n\s*\n/g, '\n').replace(/[ \t]+/g, ' ');
  
  return sanitized;
}

/**
 * Wrapper component for safely rendering HTML content
 * Usage: <SafeHtml content={career.content} />
 */
export function SafeHtml({ content, className = "" }: { content: string; className?: string }) {
  const sanitizedContent = sanitizeHtml(content);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
