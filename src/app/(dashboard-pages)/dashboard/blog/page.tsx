"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Calendar,
  Eye as EyeIcon,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data
const blogPosts = [
  {
    id: 1,
    title: 'Best Time to Visit Rwanda: A Complete Guide',
    excerpt: 'Discover the perfect time to explore Rwanda\'s stunning landscapes and wildlife...',
    author: 'John Doe',
    publishDate: '2024-02-10',
    status: 'published',
    views: 1250,
    comments: 23,
    category: 'Travel Tips',
    image: '/green-hills-of-rwanda.jpg',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Gorilla Trekking: What to Expect',
    excerpt: 'Everything you need to know before embarking on this once-in-a-lifetime adventure...',
    author: 'Jane Smith',
    publishDate: '2024-02-08',
    status: 'published',
    views: 2100,
    comments: 45,
    category: 'Wildlife',
    image: '/volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Rwandan Culture and Traditions',
    excerpt: 'Immerse yourself in the rich cultural heritage of Rwanda...',
    author: 'Mike Johnson',
    publishDate: '2024-02-05',
    status: 'draft',
    views: 0,
    comments: 0,
    category: 'Culture',
    image: '/Nyanza-Traditional-Intore-Dancers-1650x1100.jpg',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Top 10 Things to Do in Kigali',
    excerpt: 'Explore the vibrant capital city with our comprehensive guide...',
    author: 'Sarah Wilson',
    publishDate: '2024-02-03',
    status: 'published',
    views: 890,
    comments: 12,
    category: 'City Guide',
    image: '/kigali.jpeg',
    readTime: '4 min read'
  },
  {
    id: 5,
    title: 'Lake Kivu: A Hidden Gem',
    excerpt: 'Discover the beauty and activities around Rwanda\'s largest lake...',
    author: 'David Brown',
    publishDate: '2024-02-01',
    status: 'scheduled',
    views: 0,
    comments: 0,
    category: 'Nature',
    image: '/lake-kivu_Photo-from-Getty-Images.jpg',
    readTime: '8 min read'
  }
];

const statusColors = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  scheduled: 'bg-blue-100 text-blue-800',
  archived: 'bg-gray-100 text-gray-800'
};

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{blogPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold">{blogPosts.filter(p => p.status === 'published').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <EyeIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold">{blogPosts.reduce((sum, post) => sum + post.comments, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All Posts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('published')}>
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('scheduled')}>
                  Scheduled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage all your blog content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex-shrink-0">
                          <Image 
                            src={post.image} 
                            alt={post.title}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{post.title}</p>
                          <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{post.readTime}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">ID: #{post.id}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm">{post.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{post.views.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/blog/${post.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your most popular content this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts
              .filter(post => post.status === 'published')
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((post, index) => (
                <div key={post.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">#{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.views.toLocaleString()} views</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/blog/${post.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}