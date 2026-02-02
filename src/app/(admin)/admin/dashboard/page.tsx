"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mountain,
  FileText,
  Car,
  Calendar,
  Mail,
  TrendingUp,
  Loader2,
  ArrowRight,
  ClipboardList,
  MessageSquare,
  Users,
  HelpCircle,
  Image as ImageIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DateRange } from "@/app/api/admin/dashboard-stats/route";
import { useAuthStore } from "@/lib/stores/auth-store";
import { hasPermission } from "@/lib/rbac";

interface DashboardStats {
  range: DateRange;
  start: string;
  end: string;
  content: {
    tours: { active: number; total: number };
    vehicles: { active: number; total: number };
    events: { active: number; total: number };
    blogs: { active: number; total: number };
    testimonials: { active: number; total: number };
    team: { active: number; total: number };
    faqs: { active: number; total: number };
    images: { active: number; total: number };
  };
  period: {
    tourBookings: number;
    carRentalBookings: number;
    cabBookings: number;
    eventRegistrations: number;
    airTravelRequests: number;
    contactInquiries: number;
    subscribers: number;
    totalBookings: number;
  };
  chart: {
    bookingsByPeriod: { label: string; count: number }[];
    inquiriesByPeriod: { label: string; count: number }[];
  };
  recent: {
    tourBookings: { id: string; name: string; status: string; createdAt: string; numberOfPeople: number }[];
    carRentalBookings: { id: string; name: string; status: string; createdAt: string; startDate: string; endDate: string }[];
    cabBookings: { id: string; name: string; status: string; createdAt: string; pickupLocation: string }[];
    eventRegistrations: { id: string; name: string; status: string; createdAt: string; numberOfParticipants: number }[];
    contactInquiries: { id: string; name: string; subject: string; createdAt: string }[];
  };
}

const CONTENT_STATS = [
  { key: "tours", name: "Tours", icon: Mountain, href: "/admin/tours" },
  { key: "vehicles", name: "Car Rentals", icon: Car, href: "/admin/car-rental" },
  { key: "events", name: "Events", icon: Calendar, href: "/admin/events" },
  { key: "blogs", name: "Blogs", icon: FileText, href: "/admin/blogs" },
  { key: "testimonials", name: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
  { key: "team", name: "Team", icon: Users, href: "/admin/team" },
  { key: "faqs", name: "FAQs", icon: HelpCircle, href: "/admin/faqs" },
  { key: "images", name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
] as const;

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const [range, setRange] = useState<DateRange>("monthly");
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/admin/dashboard-stats?range=${range}`, { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json.success) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  // Filter content stats based on permissions
  const filteredContentStats = CONTENT_STATS.filter((item) => {
    if (item.key === "tours") return hasPermission(userRole, "tours", "read");
    if (item.key === "vehicles") return hasPermission(userRole, "car-rental", "read");
    if (item.key === "events") return hasPermission(userRole, "events", "read");
    if (item.key === "blogs") return hasPermission(userRole, "blogs", "read");
    if (item.key === "testimonials") return hasPermission(userRole, "testimonials", "read");
    if (item.key === "team") return hasPermission(userRole, "team", "read");
    if (item.key === "faqs") return hasPermission(userRole, "faqs", "read");
    if (item.key === "images") return hasPermission(userRole, "gallery", "read");
    return false;
  });

  // Check if user can see bookings
  const canSeeBookings = hasPermission(userRole, "bookings", "read");
  const canSeeCabBookings = hasPermission(userRole, "cab-bookings", "read");
  const canSeeAirTravel = hasPermission(userRole, "air-travel-bookings", "read");
  const canSeeContact = hasPermission(userRole, "contact", "read");
  const canSeeSubscribers = hasPermission(userRole, "subscribers", "read");
  const canSeeUsers = hasPermission(userRole, "users", "read");
  const canSeeSettings = hasPermission(userRole, "settings", "read");

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Platform performance and service overview. Filter by date range to see
            activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Date range:
          </span>
          <Select
            value={range}
            onValueChange={(v) => setRange(v as DateRange)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Last 24 hours</SelectItem>
              <SelectItem value="weekly">Last 7 days</SelectItem>
              <SelectItem value="monthly">Last 30 days</SelectItem>
              <SelectItem value="yearly">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : data ? (
        <>
          {/* Content stats – quick links */}
          {filteredContentStats.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Content overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredContentStats.map((item) => {
                  const Icon = item.icon;
                  const c = data.content[item.key];
                  const active = c?.active ?? 0;
                  const total = c?.total ?? 0;
                  return (
                    <Link key={item.key} href={item.href}>
                      <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                          <CardTitle className="text-sm font-medium">
                            {item.name}
                          </CardTitle>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{active}</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {total} total
                          </p>
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            View <ArrowRight className="h-3 w-3" />
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Period stats – bookings & inquiries in range */}
          {(canSeeBookings || canSeeContact) && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Activity in selected period</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {formatDate(data.start)} – {formatDate(data.end)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {canSeeBookings && (
                  <>
                    <Link href="/admin/tours/bookings">
                      <Card className="hover:shadow-md transition-all cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                          <CardTitle className="text-sm font-medium">
                            Tour Bookings
                          </CardTitle>
                          <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {data.period.tourBookings}
                          </div>
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            View all <ArrowRight className="h-3 w-3" />
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/admin/car-rental/bookings">
                      <Card className="hover:shadow-md transition-all cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Car Rental Bookings
                          </CardTitle>
                          <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {data.period.carRentalBookings}
                          </div>
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            View all <ArrowRight className="h-3 w-3" />
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    {canSeeBookings && (
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total Bookings
                          </CardTitle>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {data.period.totalBookings}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Tours + Car + Cab + Events
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
                {canSeeContact && (
                  <Link href="/admin/contact">
                    <Card className="hover:shadow-md transition-all cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Contact Inquiries
                        </CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data.period.contactInquiries}
                        </div>
                        <p className="text-xs text-primary mt-1 flex items-center gap-1">
                          View all <ArrowRight className="h-3 w-3" />
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Charts */}
          {(canSeeBookings || canSeeContact) && (
            <div className={`grid gap-6 ${canSeeBookings && canSeeContact ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {canSeeBookings && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bookings over time</CardTitle>
                    <CardDescription>
                      Tour, car rental, cab, and event bookings in the selected period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data.chart.bookingsByPeriod}
                          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                          />
                          <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "8px",
                              border: "1px solid hsl(var(--border))",
                            }}
                            formatter={(value: number) => [value, "Bookings"]}
                            labelFormatter={(label) => `Period: ${label}`}
                          />
                          <Bar
                            dataKey="count"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                            name="Bookings"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
              {canSeeContact && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact inquiries over time</CardTitle>
                    <CardDescription>
                      Incoming contact form submissions in the selected period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data.chart.inquiriesByPeriod}
                          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                          />
                          <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "8px",
                              border: "1px solid hsl(var(--border))",
                            }}
                            formatter={(value: number) => [value, "Inquiries"]}
                            labelFormatter={(label) => `Period: ${label}`}
                          />
                          <Bar
                            dataKey="count"
                            fill="hsl(var(--chart-2, var(--primary)))"
                            radius={[4, 4, 0, 0]}
                            name="Inquiries"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Recent items – summary tables */}
          {(canSeeBookings || canSeeContact) && (
            <div className={`grid gap-6 ${canSeeBookings && canSeeContact ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {canSeeBookings && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent tour bookings</CardTitle>
                      <CardDescription>Latest 5 tour booking requests</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/tours/bookings">View all</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {data.recent.tourBookings.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4">
                        No tour bookings yet.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.recent.tourBookings.map((b) => (
                            <TableRow key={b.id}>
                              <TableCell className="font-medium">{b.name}</TableCell>
                              <TableCell>{b.numberOfPeople}</TableCell>
                              <TableCell>
                                <span className="capitalize text-muted-foreground">
                                  {b.status.replace("_", " ")}
                                </span>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs">
                                {formatDate(b.createdAt)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              )}
              {canSeeContact && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent contact inquiries</CardTitle>
                      <CardDescription>Latest 5 contact form submissions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/contact">View all</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {data.recent.contactInquiries.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4">
                        No contact inquiries yet.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.recent.contactInquiries.map((c) => (
                            <TableRow key={c.id}>
                              <TableCell className="font-medium">{c.name}</TableCell>
                              <TableCell className="max-w-[180px] truncate">
                                {c.subject}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs">
                                {formatDate(c.createdAt)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Quick links row */}
          {(canSeeBookings || canSeeCabBookings || canSeeAirTravel || canSeeContact || canSeeSubscribers || canSeeSettings) && (
            <Card>
              <CardHeader>
                <CardTitle>Quick links</CardTitle>
                <CardDescription>
                  Jump to bookings, subscribers, and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {canSeeBookings && (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/admin/tours/bookings">Tour Bookings</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/admin/car-rental/bookings">Car Rental Bookings</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/admin/events/bookings">Event Registrations</Link>
                      </Button>
                    </>
                  )}
                  {canSeeCabBookings && (
                    <Button variant="outline" asChild>
                      <Link href="/admin/cab-bookings">Cab Bookings</Link>
                    </Button>
                  )}
                  {canSeeAirTravel && (
                    <Button variant="outline" asChild>
                      <Link href="/admin/air-travel-bookings">Air Travel Requests</Link>
                    </Button>
                  )}
                  {canSeeContact && (
                    <Button variant="outline" asChild>
                      <Link href="/admin/contact">Contact Inquiries</Link>
                    </Button>
                  )}
                  {canSeeSubscribers && (
                    <Button variant="outline" asChild>
                      <Link href="/admin/subscribers">Newsletter Subscribers</Link>
                    </Button>
                  )}
                  {canSeeSettings && (
                    <Button variant="outline" asChild>
                      <Link href="/admin/settings">Website Settings</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Failed to load dashboard stats. Please try again.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
