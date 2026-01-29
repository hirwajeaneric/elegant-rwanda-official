"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, User, Tag, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { subscribeToNewsletter } from "@/lib/client-submit";
import { toast } from "sonner";

interface BlogPostSidebarProps {
  post: {
    id: string;
    slug: string;
    author: string;
    publishDate: string | null;
    readTime: string;
    category: {
      id: string;
      name: string;
      slug: string;
    } | null;
    tags: string[];
  };
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  featuredImage: string | null;
  publishDate: string | null;
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentPosts, setRecentPosts] = useState<RelatedPost[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        const [recentRes, categoryRes] = await Promise.all([
          fetch("/api/public/blogs?limit=6"),
          post.category?.id 
            ? fetch(`/api/public/blogs?categoryId=${post.category.id}&limit=4`)
            : Promise.resolve({ json: async () => ({ success: true, blogs: [] }) }),
        ]);

        const recentData = await recentRes.json();
        const categoryData = await categoryRes.json();

        if (recentData.success) {
          setRecentPosts(
            (recentData.blogs || [])
              .filter((p: RelatedPost) => p.id !== post.id)
              .slice(0, 5)
          );
        }

        if (categoryData.success) {
          setCategoryPosts(
            (categoryData.blogs || [])
              .filter((p: RelatedPost) => p.id !== post.id)
              .slice(0, 3)
          );
        }
      } catch (error) {
        console.error("Failed to fetch related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [post.id, post.category?.id]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter({
        email,
        source: "blog-post-sidebar",
      });
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to subscribe. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Post Info */}
      <div className="bg-muted/80 rounded-xl p-6">
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
            <span className="font-medium">{post.publishDate ? formatDate(post.publishDate) : "Not published"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Read time:</span>
            <span className="font-medium">{post.readTime}</span>
          </div>
          {post.category && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium">{post.category.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="bg-muted/80 rounded-xl p-6">
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
      )}

      {/* Related Posts from Same Category */}
      {loading ? (
        <div className="bg-muted/80 rounded-xl p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </div>
      ) : (
        <>
          {categoryPosts.length > 0 && post.category && (
            <div className="bg-muted/80 rounded-xl p-6">
              <h3 className="text-lg font-display font-semibold mb-4">More {post.category.name} Posts</h3>
              <div className="space-y-4">
                {categoryPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                          {relatedPost.featuredImage ? (
                            <div
                              className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                              style={{
                                backgroundImage: `url('${relatedPost.featuredImage}')`
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          {relatedPost.publishDate && (
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(relatedPost.publishDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <div className="bg-muted/80 rounded-xl p-6">
              <h3 className="text-lg font-display font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((recentPost) => (
                  <article key={recentPost.id} className="group">
                    <Link href={`/blog/${recentPost.slug}`} className="block">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                          {recentPost.featuredImage ? (
                            <div
                              className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                              style={{
                                backgroundImage: `url('${recentPost.featuredImage}')`
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {recentPost.title}
                          </h4>
                          {recentPost.publishDate && (
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(recentPost.publishDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-display font-semibold mb-3">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get the latest travel tips and stories delivered to your inbox.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-primary font-medium py-3 hover:bg-white/90 transition-colors duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
