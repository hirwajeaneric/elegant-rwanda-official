"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorImage: string | null;
  publishDate: string | null;
  readTime: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: string[];
  featuredImage: string | null;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function BlogGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch("/api/public/blogs?limit=100"),
          fetch("/api/public/categories?type=BLOG&active=true"),
        ]);

        const blogsData = await blogsRes.json();
        const categoriesData = await categoriesRes.json();

        if (blogsData.success) {
          setPosts(blogsData.blogs || []);
        }
        if (categoriesData.success) {
          setCategories(categoriesData.categories || []);
        }
      } catch (err) {
        console.error("Failed to fetch blog data:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category?.id === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const categoryCounts = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    count: posts.filter(p => p.category?.id === cat.id).length,
  }));

  const allCategories = [
    { id: "all", name: "All Posts", count: posts.length },
    ...categoryCounts,
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      {allCategories.length > 1 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => (
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
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {currentPosts.map((post) => (
          <article
            key={post.id}
            className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
          >
            {/* Featured Image */}
            <div className="relative h-48 overflow-hidden">
              {post.featuredImage ? (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${post.featuredImage}')`
                  }}
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Category Badge */}
              {post.category && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {post.category.name}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Meta Information */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                {post.publishDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                )}
                {post.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                )}
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
