"use client";

import { sanitizeHtml } from "@/lib/html-sanitizer";

interface BlogPostContentProps {
  post: {
    content: string;
  };
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  if (!post.content) {
    return (
      <article className="bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">No content available for this post.</p>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white">
      {/* Article Content */}
      <div className="">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content-wrapper"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
