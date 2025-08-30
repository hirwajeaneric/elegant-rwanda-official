"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { getRecentPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export function LatestBlogPosts() {
  const recentPosts = getRecentPosts(3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-br from-muted/30 to-muted/50">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Latest{" "}
            <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest travel tips, cultural insights, and adventure stories 
            from Rwanda and beyond.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${post.featuredImage})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 hover:bg-primary text-white">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform duration-200"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="btn-outline" asChild>
            <Link href="/blog">
              View All Blog Posts
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-border">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Never Miss an Update
            </h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest travel tips, exclusive offers, and 
              insider knowledge about Rwanda&apos;s hidden gems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <Button className="btn-primary whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
