
"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  Eye,
  MessageSquare,
  Share2,
  Clock,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const blogId = params.id as string;
  const blog = blogPosts.find(b => b.id === blogId);

  if (!blog) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Blog Post Not Found</h3>
              <p className="text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard/blog');
  };

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <p className="text-gray-600">Blog Post ID: {blog.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href={`/dashboard/blog/${blogId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={(e) => handleDelete(e)}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>The main content of the blog post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">{blog.excerpt}</p>
                <div className="whitespace-pre-wrap text-gray-600">
                  {blog.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Information */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
              <CardDescription>Search engine optimization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Meta Title</label>
                <p className="text-sm">{blog.metaTitle || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Meta Description</label>
                <p className="text-sm">{blog.metaDescription || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Slug</label>
                <p className="text-sm font-mono">{blog.slug}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={statusColors[blog.status]}>
                  {blog.status}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Views</span>
                <span className="font-semibold">{blog.views?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Comments</span>
                <span className="font-semibold">{blog.comments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Read Time</span>
                <span className="font-semibold">{blog.readTime}</span>
              </div>
            </CardContent>
          </Card>

          {/* Post Information */}
          <Card>
            <CardHeader>
              <CardTitle>Post Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{blog.author}</p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{new Date(blog.publishDate).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Published</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{blog.readTime}</p>
                  <p className="text-xs text-gray-500">Read Time</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <div>
                  <Badge variant="secondary">{blog.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Preview Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Comments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}