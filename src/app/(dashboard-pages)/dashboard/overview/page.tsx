"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Car, 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const stats = [
  {
    title: 'Total Events',
    value: '24',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Calendar,
    description: 'Events this month'
  },
  {
    title: 'Cars Available',
    value: '18',
    change: '+3',
    changeType: 'positive' as const,
    icon: Car,
    description: 'Active vehicles'
  },
  {
    title: 'Blog Posts',
    value: '156',
    change: '+8%',
    changeType: 'positive' as const,
    icon: FileText,
    description: 'Published articles'
  },
  {
    title: 'Team Members',
    value: '12',
    change: '+2',
    changeType: 'positive' as const,
    icon: Users,
    description: 'Active staff'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'event',
    title: 'New event created: Gorilla Trekking Tour',
    time: '2 hours ago',
    status: 'published'
  },
  {
    id: 2,
    type: 'car',
    title: 'Car rental: Toyota Land Cruiser',
    time: '4 hours ago',
    status: 'active'
  },
  {
    id: 3,
    type: 'blog',
    title: 'Blog post published: "Best Time to Visit Rwanda"',
    time: '6 hours ago',
    status: 'published'
  },
  {
    id: 4,
    type: 'testimonial',
    title: 'New testimonial received from Sarah Johnson',
    time: '1 day ago',
    status: 'pending'
  }
];

const quickActions = [
  {
    title: 'Create Event',
    description: 'Add a new tour or event',
    href: '/dashboard/events',
    icon: Calendar,
    color: 'bg-blue-500'
  },
  {
    title: 'Add Car',
    description: 'Register new vehicle',
    href: '/dashboard/cars',
    icon: Car,
    color: 'bg-green-500'
  },
  {
    title: 'Write Blog',
    description: 'Create new blog post',
    href: '/dashboard/blog',
    icon: FileText,
    color: 'bg-purple-500'
  },
  {
    title: 'View Testimonials',
    description: 'Manage customer reviews',
    href: '/dashboard/testimonials',
    icon: MessageSquare,
    color: 'bg-orange-500'
  }
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View Site
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
                <span className="text-xs text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {activity.type === 'event' && <Calendar className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'car' && <Car className="h-4 w-4 text-green-500" />}
                      {activity.type === 'blog' && <FileText className="h-4 w-4 text-purple-500" />}
                      {activity.type === 'testimonial' && <MessageSquare className="h-4 w-4 text-orange-500" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={activity.status === 'published' || activity.status === 'active' ? 'default' : 'secondary'}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Website Performance</CardTitle>
            <CardDescription>Key metrics for your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Page Views</span>
                <span className="text-sm font-medium">12,345</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Unique Visitors</span>
                <span className="text-sm font-medium">8,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bounce Rate</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Session</span>
                <span className="text-sm font-medium">3m 24s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Testimonials</CardTitle>
            <CardDescription>Latest customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm text-gray-900 italic">
                  &ldquo;Amazing experience! The gorilla trekking was unforgettable.&rdquo;
                </p>
                <p className="text-xs text-gray-500 mt-1">- Sarah Johnson</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm text-gray-900 italic">
                  &ldquo;Professional service and excellent tour guides.&rdquo;
                </p>
                <p className="text-xs text-gray-500 mt-1">- Michael Chen</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm text-gray-900 italic">
                  &ldquo;Highly recommend for anyone visiting Rwanda!&rdquo;
                </p>
                <p className="text-xs text-gray-500 mt-1">- Emma Wilson</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}