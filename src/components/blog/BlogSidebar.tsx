"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar } from "lucide-react";
import { getRecentPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { subscribeToNewsletter } from "@/lib/client-submit";
import { toast } from "sonner";

export function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recentPosts = getRecentPosts(5);

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
        source: "blog-sidebar",
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
      {/* Search */}
      <div className="bg-muted/80 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Search Posts</h3>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-muted/80 rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('/${post.featuredImage}')`
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishDate)}</span>
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
