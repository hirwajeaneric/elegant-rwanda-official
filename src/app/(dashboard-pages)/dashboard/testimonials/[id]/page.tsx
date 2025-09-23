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
  MapPin,
  Star,
  ThumbsUp,
  CheckCircle,
  XCircle,
  Clock,
  User
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

export default function TestimonialDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const testimonialId = params.id as string;
  const testimonial = testimonials.find(t => t.id === testimonialId);

  if (!testimonial) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/testimonials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Testimonial Not Found</h3>
              <p className="text-gray-600">The testimonial you're looking for doesn't exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard/testimonials');
  };

  const statusColors = {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const serviceColors = {
    Tour: 'bg-blue-100 text-blue-800',
    'Cab Booking': 'bg-green-100 text-green-800',
    'Car Rental': 'bg-purple-100 text-purple-800',
    'Air Travel Assistance': 'bg-orange-100 text-orange-800',
    Event: 'bg-pink-100 text-pink-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/testimonials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Testimonial Details</h1>
            <p className="text-gray-600">Review from {testimonial.name}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href={`/dashboard/testimonials/${testimonialId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Testimonial
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
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
          {/* Customer Image */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{testimonial.name}</h2>
                  <p className="text-lg text-gray-600">{testimonial.location}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500">({testimonial.rating}/5)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Content */}
          <Card>
            <CardHeader>
              <CardTitle>Review Content</CardTitle>
              <CardDescription>The customer's feedback and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                "{testimonial.review}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
              <CardDescription>Details about the service provided</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Service Type</label>
                  <div className="mt-1">
                    <Badge className={serviceColors[testimonial.service]}>
                      {testimonial.service}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-sm">{new Date(testimonial.date).toLocaleDateString()}</p>
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
                <p className="text-sm">{testimonial.metaTitle || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Meta Description</label>
                <p className="text-sm">{testimonial.metaDescription || 'Not set'}</p>
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
                <Badge className={statusColors[testimonial.status]}>
                  {testimonial.status}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{testimonial.rating}/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Helpful Votes</span>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">{testimonial.helpful}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Featured</span>
                <div className="flex items-center space-x-1">
                  {testimonial.featured ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm">{testimonial.featured ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">Customer Name</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{testimonial.location}</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{new Date(testimonial.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Review Date</p>
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
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={testimonial.status === 'approved'}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Review
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={testimonial.status === 'rejected'}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Review
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={testimonial.featured}
              >
                <Star className="mr-2 h-4 w-4" />
                Feature Review
              </Button>
            </CardContent>
          </Card>

          {/* Response */}
          <Card>
            <CardHeader>
              <CardTitle>Respond to Review</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Reply to Customer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
