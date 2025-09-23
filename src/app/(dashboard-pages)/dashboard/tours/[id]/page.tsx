"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MapPin,
  Users,
  Clock,
  Eye,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const tourId = params.id as string;
  const tour = tours.find(t => t.id === tourId);

  if (!tour) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/tours">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tours
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tour Not Found</h3>
              <p className="text-gray-600">The tour you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard/tours');
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/tours">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tours
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{tour.title}</h1>
            <p className="text-gray-600">Tour ID: {tour.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href={`/dashboard/tours/${tourId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Tour
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
          {/* Tour Image */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={tour.images[0]}
                  alt={tour.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tour Description */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </CardContent>
          </Card>

          {/* Tour Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={statusColors[tour.status]}>
                  {tour.status}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Price</span>
                <span className="font-semibold">${tour.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bookings</span>
                <span className="font-semibold">{tour.bookings}/{tour.capacity}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tour Information */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{tour.duration}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{tour.location}</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{tour.maxGroupSize} people</p>
                  <p className="text-xs text-gray-500">Max Group Size</p>
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
                Preview Tour
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Tour
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}