import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogPostSidebar } from "@/components/blog/BlogPostSidebar";
import { getPostBySlug, getRelatedPosts } from "@/data/blog";
import { Calendar, Clock, User, Bookmark } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import { formatDate } from "@/lib/utils";


interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Elegant Travel and Tours",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      url: `https://elegantrwanda.com/blog/${post.slug}`,
      images: [
        {
          url: `/${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/${post.featuredImage}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

        {/* Category Badge */}
        {/* <div className="absolute top-6 left-6">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {post.category}
          </Badge>
        </div> */}

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <ShareButton
            url={`https://elegantrwanda.com/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
            variant="ghost"
            size="sm"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          />
          <button
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
            aria-label="Bookmark this post"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container-elegant">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-elegant py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <BlogPostContent post={post} />
        </div>
        <div className="lg:col-span-1">
          <BlogPostSidebar post={post} />
        </div>
      </div>
      <div className="container-elegant pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-display font-semibold mb-8">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.id}
                      className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                          style={{
                            backgroundImage: `url('/${relatedPost.featuredImage}')`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                          <a href={`/blog/${relatedPost.slug}`} className="hover:underline">
                            {relatedPost.title}
                          </a>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
