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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Edit, Save, X, Plus, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import { EntityBookingsList } from "@/components/dashboard/EntityBookingsList";
import Image from "next/image";
import { useCategories } from "@/lib/hooks/use-categories";

interface ApiEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  endDate?: string | null;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  category: string;
  categoryId?: string | null;
  status: string;
  highlights: string[];
  activities: string[];
  images: string[];
  featured: boolean;
  registrationDeadline: string;
  time: string;
  price: number;
  active: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

const EVENT_STATUSES = ["Open", "Filling Fast", "Waitlist", "Closed"] as const;

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { categories: categoryList, refetch: refetchCategories } = useCategories({ type: ["EVENT"], active: true });
  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<ApiEvent>>({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    maxParticipants: 0,
    currentParticipants: 0,
    categoryId: "",
    highlights: [],
    activities: [],
    images: [],
    featured: false,
    registrationDeadline: "",
    status: "Open",
    time: "",
    price: 0,
    active: true,
  });
  const [newHighlight, setNewHighlight] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        if (data.success && data.event) {
          setEvent(data.event);
          setFormData(data.event);
        } else {
          setEvent(null);
        }
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Event not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddCategoryError(null);
    const name = newCategoryName.trim();
    const slug = newCategorySlug.trim() || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (!name) {
      setAddCategoryError("Name is required");
      return;
    }
    setAddingCategory(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, type: ["EVENT"], active: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");
      await refetchCategories();
      setFormData((prev) => ({ ...prev, categoryId: data.category.id }));
      setNewCategoryName("");
      setNewCategorySlug("");
      setAddCategoryOpen(false);
    } catch (err) {
      setAddCategoryError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setAddingCategory(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update event");
      setEvent(data.event);
      setFormData(data.event);
      setIsEditing(false);
      toast.success("Event saved successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  const handleAddArrayItem = (field: "highlights" | "activities", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] || []), value.trim()],
      });
      if (field === "highlights") setNewHighlight("");
      if (field === "activities") setNewActivity("");
    }
  };

  const handleRemoveArrayItem = (field: "highlights" | "activities", index: number) => {
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
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <Badge
              variant={
                event.status === "Open"
                  ? "default"
                  : event.status === "Filling Fast"
                  ? "secondary"
                  : "destructive"
              }
            >
              {event.status}
            </Badge>
            <Badge variant="outline">{event.category}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/events">
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
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
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
            <CardDescription>Event details</CardDescription>
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
                <p className="text-sm text-muted-foreground">{event.title}</p>
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
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Start Date</Label>
                {isEditing ? (
                  <Input
                    id="date"
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                {isEditing ? (
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate || ""}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {event.endDate ? new Date(event.endDate).toLocaleDateString() : "N/A"}
                  </p>
                )}
              </div>
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
                <p className="text-sm text-muted-foreground">{event.location}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants</Label>
                {isEditing ? (
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 0 })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{event.maxParticipants}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentParticipants">Current Participants</Label>
                {isEditing ? (
                  <Input
                    id="currentParticipants"
                    type="number"
                    value={formData.currentParticipants || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, currentParticipants: parseInt(e.target.value) || 0 })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{event.currentParticipants}</p>
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
                  <p className="text-sm text-muted-foreground">${event.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status || "Open"}
                    onValueChange={(value: ApiEvent["status"]) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Filling Fast">Filling Fast</SelectItem>
                      <SelectItem value="Waitlist">Waitlist</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    variant={
                      event.status === "Open"
                        ? "default"
                        : event.status === "Filling Fast"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {event.status}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              {isEditing ? (
                <div className="flex gap-2">
                  <Select
                    value={formData.categoryId || undefined}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={categoryList.length === 0 ? "No categories" : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryList.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="icon" title="Add new event category">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Event Category</DialogTitle>
                        <DialogDescription>
                          Create a new event category. It will be available in the list above.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCategory}>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="newCategoryName">Name</Label>
                            <Input
                              id="newCategoryName"
                              value={newCategoryName}
                              onChange={(e) => {
                                setNewCategoryName(e.target.value);
                                if (!newCategorySlug) setNewCategorySlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                              }}
                              placeholder="e.g. Cultural Event"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newCategorySlug">Slug (optional)</Label>
                            <Input
                              id="newCategorySlug"
                              value={newCategorySlug}
                              onChange={(e) => setNewCategorySlug(e.target.value)}
                              placeholder="e.g. cultural-event"
                            />
                          </div>
                          {addCategoryError && (
                            <p className="text-sm text-destructive">{addCategoryError}</p>
                          )}
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setAddCategoryOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={addingCategory}>
                            {addingCategory ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                            Add Category
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Badge variant="outline">{event.category}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Highlights & Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
            <CardDescription>Key features of this event</CardDescription>
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
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activities</CardTitle>
            <CardDescription>Activities included in this event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Add an activity"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("activities", newActivity);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("activities", newActivity)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {(formData.activities || []).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{activity}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("activities", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {event.activities.map((activity, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {activity}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Images */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Event images (can have multiple images)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Images</Label>
                  <AssetSelector
                    value={formData.images || []}
                    onSelect={(images) => {
                      const imageArray = Array.isArray(images) ? images : [images];
                      setFormData({ ...formData, images: imageArray });
                    }}
                    multiple={true}
                  />
                </div>
                {(formData.images || []).length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Images ({(formData.images || []).length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(formData.images || []).map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <Image
                              src={image}
                              alt={`Event image ${index + 1}`}
                              className="w-full h-full object-cover"
                              width={100}
                              height={100}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                const updatedImages = (formData.images || []).filter((_, i) => i !== index);
                                setFormData({ ...formData, images: updatedImages });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.images.length > 0 ? (
                  event.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={image}
                        alt={`Event image ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground col-span-full">No images added</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <EntityBookingsList entityType="event" entityId={event.id} />
      </div>
    </div>
  );
}
