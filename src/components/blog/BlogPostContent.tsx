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

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-muted/80 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('/${post.authorImage}')`
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold">{post.author}</h3>
                <p className="text-muted-foreground">
                  Travel expert and writer with deep knowledge of Rwanda&apos;s culture, wildlife, and luxury tourism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
