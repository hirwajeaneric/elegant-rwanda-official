"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllPosts, getPostsByCategory, type BlogPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export function BlogGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const allPosts = getAllPosts();
  const filteredPosts = selectedCategory === "all" 
    ? allPosts 
    : getPostsByCategory(selectedCategory as BlogPost['category']);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const categories = [
    { id: "all", name: "All Posts", count: allPosts.length },
    { id: "Tours", name: "Tours", count: getPostsByCategory("Tours").length },
    { id: "Tips", name: "Travel Tips", count: getPostsByCategory("Tips").length },
    { id: "Culture", name: "Culture", count: getPostsByCategory("Culture").length },
    { id: "Wildlife", name: "Wildlife", count: getPostsByCategory("Wildlife").length },
    { id: "Luxury", name: "Luxury", count: getPostsByCategory("Luxury").length },
  ];

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {currentPosts.map((post) => (
          <article
            key={post.id}
            className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
          >
            {/* Featured Image */}
            <div className="relative h-48 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: `url('/${post.featuredImage}')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
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
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
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
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-all duration-200"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === page
                  ? "bg-primary text-white border-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
