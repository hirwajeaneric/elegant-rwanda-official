"use client";

import Link from "next/link";
import { Calendar, Clock, User, Tag } from "lucide-react";
import { getRecentPosts, getPostsByCategory } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/data/blog";

interface BlogPostSidebarProps {
  post: BlogPost;
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  const recentPosts = getRecentPosts(5).filter(p => p.id !== post.id);
  const categoryPosts = getPostsByCategory(post.category).filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Post Info */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Post Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Author:</span>
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Published:</span>
            <span className="font-medium">{formatDate(post.publishDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Read time:</span>
            <span className="font-medium">{post.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{post.category}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts from Same Category */}
      {categoryPosts.length > 0 && (
        <div className="bg-muted/30 rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">More {post.category} Posts</h3>
          <div className="space-y-4">
            {categoryPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group">
                <Link href={`/blog/${relatedPost.slug}`} className="block">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundImage: `url('/${relatedPost.featuredImage}')`
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(relatedPost.publishDate)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((recentPost) => (
            <article key={recentPost.id} className="group">
              <Link href={`/blog/${recentPost.slug}`} className="block">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('/${recentPost.featuredImage}')`
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {recentPost.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(recentPost.publishDate)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-display font-semibold mb-3">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get the latest travel tips and stories delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
          />
          <button className="w-full bg-white text-primary font-medium py-3 rounded-lg hover:bg-white/90 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
