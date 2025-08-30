import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogSidebar } from "@/components/blog/BlogSidebar";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Rwanda Travel Blog: Tips, Stories & Insights | Elegant Rwanda",
  description: "Discover Rwanda through our travel blog featuring expert tips, cultural insights, wildlife stories, and insider knowledge about Rwanda's hidden gems.",
  keywords: "Rwanda travel blog, gorilla trekking tips, Rwanda culture, wildlife photography, luxury travel Rwanda, travel guides",
  openGraph: {
    title: "Rwanda Travel Blog: Tips, Stories & Insights | Elegant Rwanda",
    description: "Discover Rwanda through our travel blog featuring expert tips, cultural insights, wildlife stories, and insider knowledge about Rwanda's hidden gems.",
    type: "website",
    url: "https://elegantrwanda.com/blog",
  },
};

export default function BlogPage() {
  return (
    <PageWrapper>
      <BlogHero />
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <BlogGrid />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
