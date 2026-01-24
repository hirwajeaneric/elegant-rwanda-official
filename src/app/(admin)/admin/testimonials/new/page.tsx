"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
    service: "Tour" as "Tour" | "Cab Booking" | "Car Rental" | "Air Travel Assistance" | "Event",
    image: "",
    date: new Date().toISOString().split("T")[0],
    featured: false,
    status: "pending" as "approved" | "pending" | "rejected",
    verified: false,
    helpful: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating testimonial:", formData);
    alert("Testimonial created successfully!");
    router.push("/admin/testimonials");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Create New Testimonial</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/testimonials">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Customer details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Customer Image</Label>
                <AssetSelector
                  value={formData.image}
                  onSelect={(image) => {
                    const imageValue = Array.isArray(image) ? image[0] || "" : image;
                    setFormData({ ...formData, image: imageValue });
                  }}
                />
                {formData.image && (
                  <div className="mt-2">
                    <Image
                      src={formData.image}
                      alt={formData.name || "Preview"}
                      className="w-24 h-24 object-cover rounded-full"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
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
                <Label htmlFor="rating">Rating *</Label>
                <Select
                  value={String(formData.rating)}
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value: "Tour" | "Cab Booking" | "Car Rental" | "Air Travel Assistance" | "Event") =>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Review *</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
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
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/testimonials">Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Create Testimonial
          </Button>
        </div>
      </form>
    </div>
  );
}
