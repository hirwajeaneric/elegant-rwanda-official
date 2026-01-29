"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit, Save, X, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";
import { toast } from "sonner";

type ServiceType = "Tour" | "Cab Booking" | "Car Rental" | "Air Travel Assistance" | "Event";

interface TestimonialData {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  review: string;
  service: string;
  image: string | null;
  active: boolean;
}

export default function TestimonialDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<TestimonialData>>({
    name: "",
    location: "",
    rating: 5,
    review: "",
    service: "Tour",
    image: "",
    active: true,
  });

  const loadTestimonial = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`);
      const data = await res.json();
      if (data.success && data.testimonial) {
        setTestimonial(data.testimonial);
        setFormData({
          name: data.testimonial.name,
          location: data.testimonial.location ?? "",
          rating: data.testimonial.rating,
          review: data.testimonial.review,
          service: data.testimonial.service,
          image: data.testimonial.image ?? "",
          active: data.testimonial.active !== false,
        });
      } else {
        setTestimonial(null);
      }
    } catch {
      setTestimonial(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTestimonial();
  }, [loadTestimonial]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location?.trim() || null,
          rating: formData.rating,
          review: formData.review,
          service: formData.service,
          image: formData.image?.trim() || null,
          active: formData.active !== false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonial(data.testimonial);
        setIsEditing(false);
        toast.success("Testimonial updated successfully");
      } else {
        toast.error(data.error || "Failed to update testimonial");
      }
    } catch {
      toast.error("Failed to update testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

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

  const display = isEditing ? formData : testimonial;
  const imageUrl = (isEditing ? formData.image : testimonial.image) || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{display?.name ?? testimonial.name}</h1>
            <Badge variant={(display?.active ?? testimonial.active) ? "default" : "secondary"}>
              {(display?.active ?? testimonial.active) ? "Active" : "Inactive"}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{display?.rating ?? testimonial.rating}</span>
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
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                {isSaving ? "Saving..." : "Save Changes"}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{testimonial.location ?? "—"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Customer Image (optional)</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <AssetSelector
                    value={formData.image || ""}
                    onSelect={(image) => {
                      const imageValue = Array.isArray(image) ? image[0] || "" : image;
                      setFormData({ ...formData, image: imageValue });
                    }}
                  />
                  {formData.image ? (
                    <div className="mt-2 flex items-center gap-2">
                      <Image
                        src={formData.image}
                        alt={formData.name || "Preview"}
                        className="w-24 h-24 object-cover rounded-full"
                        width={100}
                        height={100}
                        unoptimized={formData.image.startsWith("http")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, image: "" })}
                      >
                        Remove image
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No image selected</p>
                  )}
                </div>
              ) : testimonial.image ? (
                <div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 object-cover rounded-full"
                    width={100}
                    height={100}
                    unoptimized={testimonial.image.startsWith("http")}
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No image</p>
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
                  value={String(formData.rating ?? 5)}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
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
                  onValueChange={(value: ServiceType) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
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
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={6}
                />
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{testimonial.review}</p>
              )}
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="active">Show on site (Active)</Label>
              {isEditing ? (
                <Switch
                  id="active"
                  checked={formData.active !== false}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              ) : (
                <Badge variant={testimonial.active ? "default" : "secondary"}>
                  {testimonial.active ? "Active" : "Inactive"}
                </Badge>
              )}
            </div>
            {isEditing && (
              <p className="text-sm text-muted-foreground">
                Inactive testimonials are hidden from the public site.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
