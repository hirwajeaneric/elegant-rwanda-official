"use client";



import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, MessageSquare, FileText, Car, Calendar, Users, HelpCircle, Image as ImageIcon } from "lucide-react";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import { vehicles } from "@/data/car-rental";
import { events } from "@/data/events";
import { team } from "@/data/team";
import { faqs } from "@/data/faq";
import { galleryImages } from "@/data/gallery";
import { tours } from "@/data/tours";

const stats = [
  {
    name: "Services",
    value: services.filter(s => s.status === 'active').length,
    total: services.length,
    icon: Mountain,
    href: "/admin/services",
  },
  {
    name: "Tours",
    value: tours.filter(t => t.status === 'active').length,
    total: tours.length,
    icon: Mountain,
    href: "/admin/tours",
  },
  {
    name: "Car Rentals",
    value: vehicles.filter(v => v.status === 'available').length,
    total: vehicles.length,
    icon: Car,
    href: "/admin/car-rental",
  },
  {
    name: "Events",
    value: events.filter(e => e.active).length,
    total: events.length,
    icon: Calendar,
    href: "/admin/events",
  },
  {
    name: "Blogs",
    value: blogPosts.filter(b => b.status === 'published').length,
    total: blogPosts.length,
    icon: FileText,
    href: "/admin/blogs",
  },
  {
    name: "Testimonials",
    value: testimonials.filter(t => t.status === 'approved').length,
    total: testimonials.length,
    icon: MessageSquare,
    href: "/admin/testimonials",
  },
  {
    name: "Team Members",
    value: team.filter(t => t.status === 'active').length,
    total: team.length,
    icon: Users,
    href: "/admin/team",
  },
  {
    name: "FAQs",
    value: faqs.filter(f => f.active).length,
    total: faqs.length,
    icon: HelpCircle,
    href: "/admin/faqs",
  },
  {
    name: "Gallery Images",
    value: galleryImages.filter(g => g.active).length,
    total: galleryImages.length,
    icon: ImageIcon,
    href: "/admin/gallery",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <DashboardBreadcrumbs />
        <h1 className="text-3xl font-bold mt-4">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your content management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.total} total
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
