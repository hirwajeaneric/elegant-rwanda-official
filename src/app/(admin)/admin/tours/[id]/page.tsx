"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tours, Tour, Day } from "@/data/tours";
import { getCategoriesForEntity } from "@/data/categories";
import { ArrowLeft, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";

function getTourById(id: string) {
  return tours.find((tour) => tour.id === id);
}

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const tour = getTourById(id);
  const availableCategories = useMemo(() => getCategoriesForEntity(['tour']), []);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: "",
    description: "",
    duration: "",
    location: "",
    difficulty: "Moderate",
    maxGroupSize: 8,
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    images: [],
    category: "Wildlife",
    featured: false,
    availableDates: [],
    price: 0,
    status: "draft",
    bookings: 0,
    capacity: 0,
  });
  const [newHighlight, setNewHighlight] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");

  useEffect(() => {
    if (tour) {
      setFormData({
        ...tour,
      });
    }
  }, [tour]);

  if (!tour) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Tour not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/tours">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tours
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Saving tour:", formData);
    setIsEditing(false);
    alert("Tour saved successfully!");
  };

  const handleAddArrayItem = (field: "highlights" | "inclusions" | "exclusions", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] || []), value.trim()],
      });
      if (field === "highlights") setNewHighlight("");
      if (field === "inclusions") setNewInclusion("");
      if (field === "exclusions") setNewExclusion("");
    }
  };

  const handleRemoveArrayItem = (field: "highlights" | "inclusions" | "exclusions", index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{tour.title}</h1>
            <Badge variant={tour.status === "active" ? "default" : "secondary"}>
              {tour.status}
            </Badge>
            <Badge variant="outline">{tour.category}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/tours">
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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Tour details and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              {isEditing ? (
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{tour.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{tour.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                {isEditing ? (
                  <Input
                    id="duration"
                    value={formData.duration || ""}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="3 Days / 2 Nights"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{tour.duration}</p>
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
                  <p className="text-sm text-muted-foreground">{tour.location}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                {isEditing ? (
                  <Select
                    value={formData.difficulty || "Moderate"}
                    onValueChange={(value: "Easy" | "Moderate" | "Challenging") =>
                      setFormData({ ...formData, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Challenging">Challenging</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="outline">{tour.difficulty}</Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                {isEditing ? (
                  <Input
                    id="maxGroupSize"
                    type="number"
                    value={formData.maxGroupSize || 8}
                    onChange={(e) =>
                      setFormData({ ...formData, maxGroupSize: parseInt(e.target.value) || 8 })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{tour.maxGroupSize}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                {isEditing ? (
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">${tour.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status || "draft"}
                    onValueChange={(value: "active" | "draft" | "scheduled") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={tour.status === "active" ? "default" : "secondary"}>
                    {tour.status}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              {isEditing ? (
                <Select
                  value={formData.category || availableCategories[0]?.name || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as Tour["category"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline">{tour.category}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
            <CardDescription>Key features of this tour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a highlight"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("highlights", newHighlight);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("highlights", newHighlight)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {(formData.highlights || []).map((highlight, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{highlight}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("highlights", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Inclusions & Exclusions */}
        <Card>
          <CardHeader>
            <CardTitle>Inclusions</CardTitle>
            <CardDescription>What&apos;s included in this tour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    placeholder="Add an inclusion"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("inclusions", newInclusion);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("inclusions", newInclusion)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {(formData.inclusions || []).map((inclusion, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{inclusion}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("inclusions", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {tour.inclusions.map((inclusion, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {inclusion}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exclusions</CardTitle>
            <CardDescription>What&apos;s not included in this tour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    placeholder="Add an exclusion"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("exclusions", newExclusion);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("exclusions", newExclusion)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {(formData.exclusions || []).map((exclusion, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{exclusion}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("exclusions", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {tour.exclusions.map((exclusion, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {exclusion}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bookings</p>
                <p className="text-2xl font-bold">{tour.bookings}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="text-2xl font-bold">{tour.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">{tour.rating || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reviews</p>
                <p className="text-2xl font-bold">{tour.reviews || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
