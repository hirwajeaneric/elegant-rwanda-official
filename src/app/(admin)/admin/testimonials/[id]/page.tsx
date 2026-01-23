"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { testimonials, Testimonial } from "@/data/testimonials";
import { ArrowLeft, Edit, Save, X, Star } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";

function getTestimonialById(id: string) {
  return testimonials.find((testimonial) => testimonial.id === id);
}

export default function TestimonialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const testimonial = getTestimonialById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    location: "",
    rating: 5,
    review: "",
    service: "Tour",
    image: "",
    date: "",
    featured: false,
    customerName: "",
    customerLocation: "",
    title: "",
    content: "",
    tour: "",
    status: "pending",
    verified: false,
    helpful: 0,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        ...testimonial,
      });
    }
  }, [testimonial]);

  if (!testimonial) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Testimonial not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/testimonials">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Testimonials
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Saving testimonial:", formData);
    setIsEditing(false);
    alert("Testimonial saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{testimonial.name}</h1>
            <Badge variant={testimonial.status === "approved" ? "default" : "secondary"}>
              {testimonial.status}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{testimonial.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/testimonials">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Customer details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, customerName: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{testimonial.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value, customerLocation: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Customer Image</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <AssetSelector
                    value={formData.image || ""}
                    onSelect={(image) => setFormData({ ...formData, image })}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt={formData.name || "Preview"}
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              {isEditing ? (
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {new Date(testimonial.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Review Content */}
        <Card>
          <CardHeader>
            <CardTitle>Review Content</CardTitle>
            <CardDescription>Testimonial details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              {isEditing ? (
                <Select
                  value={String(formData.rating || 5)}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              {isEditing ? (
                <Select
                  value={formData.service || "Tour"}
                  onValueChange={(value: Testimonial["service"]) =>
                    setFormData({ ...formData, service: value })
                  }
                >
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
              ) : (
                <Badge variant="outline">{testimonial.service}</Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="review">Review</Label>
              {isEditing ? (
                <Textarea
                  id="review"
                  value={formData.review || ""}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value, content: e.target.value })}
                  rows={6}
                />
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{testimonial.review}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              {isEditing ? (
                <Select
                  value={formData.status || "pending"}
                  onValueChange={(value: "approved" | "pending" | "rejected") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={testimonial.status === "approved" ? "default" : "secondary"}>
                  {testimonial.status}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Helpful</p>
                <p className="text-2xl font-bold">{testimonial.helpful}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <Badge variant={testimonial.verified ? "default" : "secondary"}>
                  {testimonial.verified ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
