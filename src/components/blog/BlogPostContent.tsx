"use client";

import type { BlogPost } from "@/data/blog";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="bg-white">
      {/* Article Content */}
      <div className="">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content-wrapper"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
