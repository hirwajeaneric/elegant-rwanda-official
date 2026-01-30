"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, MessageSquare, FileText, Car, Calendar, Users, HelpCircle, Image as ImageIcon } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { events } from "@/data/events";
import { team } from "@/data/team";
import { faqs } from "@/data/faq";
import { galleryImages } from "@/data/gallery";
import { tours } from "@/data/tours";

export default function DashboardPage() {
  const [testimonialStats, setTestimonialStats] = useState<{ value: number; total: number } | null>(null);
  const [vehicleStats, setVehicleStats] = useState<{ value: number; total: number } | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials?limit=500");
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials)) {
          const total = data.testimonials.length;
          const value = data.testimonials.filter((t: { active: boolean }) => t.active).length;
          setTestimonialStats({ value, total });
        } else {
          setTestimonialStats({ value: 0, total: 0 });
        }
      } catch {
        setTestimonialStats({ value: 0, total: 0 });
      }
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch("/api/vehicles?limit=500");
        const data = await res.json();
        if (data.success && Array.isArray(data.vehicles)) {
          const total = data.vehicles.length;
          const value = data.vehicles.filter((v: { status: string }) => v.status === "available").length;
          setVehicleStats({ value, total });
        } else {
          setVehicleStats({ value: 0, total: 0 });
        }
      } catch {
        setVehicleStats({ value: 0, total: 0 });
      }
    }
    fetchVehicles();
  }, []);

  const stats = [
    {
      name: "Tours",
      value: tours.filter((t) => t.status === "active").length,
      total: tours.length,
      icon: Mountain,
      href: "/admin/tours",
    },
    {
      name: "Car Rentals",
      value: vehicleStats?.value ?? "—",
      total: vehicleStats?.total ?? "—",
      icon: Car,
      href: "/admin/car-rental",
    },
    {
      name: "Events",
      value: events.filter((e) => e.active).length,
      total: events.length,
      icon: Calendar,
      href: "/admin/events",
    },
    {
      name: "Blogs",
      value: blogPosts.filter((b) => b.status === "published").length,
      total: blogPosts.length,
      icon: FileText,
      href: "/admin/blogs",
    },
    {
      name: "Testimonials",
      value: testimonialStats?.value ?? "—",
      total: testimonialStats?.total ?? "—",
      icon: MessageSquare,
      href: "/admin/testimonials",
    },
    {
      name: "Team Members",
      value: team.filter((t) => t.status === "active").length,
      total: team.length,
      icon: Users,
      href: "/admin/team",
    },
    {
      name: "FAQs",
      value: faqs.filter((f) => f.active).length,
      total: faqs.length,
      icon: HelpCircle,
      href: "/admin/faqs",
    },
    {
      name: "Gallery Images",
      value: galleryImages.filter((g) => g.active).length,
      total: galleryImages.length,
      icon: ImageIcon,
      href: "/admin/gallery",
    },
  ];

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
