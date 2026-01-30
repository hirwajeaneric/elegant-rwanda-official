import { PageWrapper } from "@/components/layout/PageWrapper";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { buildMetadata, buildOrganizationJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Rwanda Travel Blog: Tips, Stories & Insights | Elegant Travel & Tours",
  description:
    "Discover Rwanda through our travel blog featuring expert tips, cultural insights, wildlife stories, and insider knowledge about Rwanda's hidden gems.",
  path: "blog",
  keywords:
    "Rwanda travel blog, gorilla trekking tips, Rwanda culture, wildlife photography, luxury travel Rwanda, travel guides, car rental near me, car near me, car to book near me, car rental near me, car rental to book near me, car rental to book near me in Rwanda, tour guide near me, trip planner near me, events near me, car near me, car to book near me, car to book near me in Rwanda",
  openGraph: {
    title: "Rwanda Travel Blog: Tips, Stories & Insights | Elegant Travel & Tours",
    description:
      "Discover Rwanda through our travel blog featuring expert tips, cultural insights, wildlife stories, and insider knowledge about Rwanda's hidden gems.",
    type: "website",
    images: [
      { url: "/green-hills-of-rwanda.jpg", width: 1200, height: 630, alt: "Rwanda Travel Blog: Tips, Stories & Insights" },
      { url: "/green-hills-of-rwanda.jpg", width: 960, height: 540, alt: "Rwanda Travel Blog: Tips, Stories & Insights" },
    ],
  },
});

const blogJsonLd = [
  buildOrganizationJsonLd(),
  buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
];

export default function BlogPage() {
  return (
    <PageWrapper>
      <JsonLd data={blogJsonLd} />
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
