"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import { testimonials } from '@/data/testimonials';

export default function EditTestimonialPage() {
  const params = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const testimonialId = params.id as string;
  const testimonial = testimonials.find(t => t.id === testimonialId);

  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    location: testimonial?.location || '',
    rating: testimonial?.rating || 5,
    review: testimonial?.review || '',
    service: testimonial?.service || 'Tour',
    date: testimonial?.date || '',
    featured: testimonial?.featured || false,
    image: testimonial?.image || '',
    metaTitle: testimonial?.metaTitle || '',
    metaDescription: testimonial?.metaDescription || '',
    status: testimonial?.status || 'pending',
    helpful: testimonial?.helpful || 0,
    customerName: testimonial?.customerName || '',
    customerLocation: testimonial?.customerLocation || '',
    title: testimonial?.title || '',
    content: testimonial?.content || '',
    tour: testimonial?.tour || '',
    verified: testimonial?.verified || false,
  });

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
              <p className="text-gray-600">The testimonial you&apos;re trying to edit doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect back to testimonial details
    router.push(`/dashboard/testimonials/${testimonialId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/testimonials/${testimonialId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Details
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Testimonial</h1>
            <p className="text-gray-600">Review from {testimonial.name}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/testimonials/${testimonialId}`}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Customer details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter customer name..."
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., New York, USA"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="image">Customer Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="verified"
                  checked={formData.verified}
                  onCheckedChange={(checked) => handleInputChange('verified', checked)}
                />
                <Label htmlFor="verified">Verified customer</Label>
              </div>
            </CardContent>
          </Card>

          {/* Review Content */}
          <Card>
            <CardHeader>
              <CardTitle>Review Content</CardTitle>
              <CardDescription>The customer&apos;s feedback and rating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => handleInputChange('rating', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="review">Review Text</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => handleInputChange('review', e.target.value)}
                  placeholder="Customer&apos;s review text..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="title">Review Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Brief title for the review"
                />
              </div>

              <div>
                <Label htmlFor="content">Additional Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Additional review content..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
              <CardDescription>Details about the service provided</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tour">Tour</SelectItem>
                    <SelectItem value="Cab Booking">Cab Booking</SelectItem>
                    <SelectItem value="Car Rental">Car Rental</SelectItem>
                    <SelectItem value="Air Travel Assistance">Air Travel Assistance</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tour">Tour/Service Name</Label>
                <Input
                  id="tour"
                  value={formData.tour}
                  onChange={(e) => handleInputChange('tour', e.target.value)}
                  placeholder="Specific tour or service name"
                />
              </div>

              <div>
                <Label htmlFor="date">Review Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Status & Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Settings</CardTitle>
              <CardDescription>Review status and display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="helpful">Helpful Votes</Label>
                <Input
                  id="helpful"
                  type="number"
                  value={formData.helpful}
                  onChange={(e) => handleInputChange('helpful', parseInt(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured testimonial</Label>
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
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="SEO title for search engines"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="SEO description for search engines"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Fields</CardTitle>
              <CardDescription>Additional fields for dashboard management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerName">Dashboard Customer Name</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Customer name for dashboard"
                />
              </div>

              <div>
                <Label htmlFor="customerLocation">Dashboard Customer Location</Label>
                <Input
                  id="customerLocation"
                  value={formData.customerLocation}
                  onChange={(e) => handleInputChange('customerLocation', e.target.value)}
                  placeholder="Customer location for dashboard"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
