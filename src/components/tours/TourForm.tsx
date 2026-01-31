"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";
import JoditEditor from "jodit-react";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const STATUSES = ["active", "draft"] as const;
const DIFFICULTIES = ["Easy", "Moderate", "Challenging"] as const;

export interface TourDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals: string[];
}

export interface TourFormData {
  title: string;
  slug: string;
  description: string;
  duration: string;
  location: string;
  difficulty: (typeof DIFFICULTIES)[number];
  maxGroupSize: number;
  highlights: string[];
  itinerary: TourDay[];
  inclusions: string[];
  exclusions: string[];
  images: string[];
  categoryId: string;
  featured: boolean;
  availableDates: string[];
  price?: number;
  status: (typeof STATUSES)[number];
  capacity: number;
  guide?: string;
  metaTitle?: string;
  metaDescription?: string;
}

function defaultFormData(initial?: Partial<TourFormData>): TourFormData {
  return {
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    duration: initial?.duration ?? "",
    location: initial?.location ?? "",
    difficulty: initial?.difficulty ?? "Moderate",
    maxGroupSize: initial?.maxGroupSize ?? 8,
    highlights: initial?.highlights ?? [],
    itinerary: initial?.itinerary ?? [],
    inclusions: initial?.inclusions ?? [],
    exclusions: initial?.exclusions ?? [],
    images: initial?.images ?? [],
    categoryId: initial?.categoryId ?? "",
    featured: initial?.featured ?? false,
    availableDates: initial?.availableDates ?? [],
    price: initial?.price,
    status: initial?.status ?? "draft",
    capacity: initial?.capacity ?? 0,
    guide: initial?.guide,
    metaTitle: initial?.metaTitle,
    metaDescription: initial?.metaDescription,
  };
}

interface TourFormProps {
  initialData?: Partial<TourFormData>;
  onSubmit: (data: TourFormData) => Promise<void>;
  isLoading?: boolean;
  isEditing?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  availableCategories?: Array<{ id: string; name: string }>;
  onCategoryAdded?: (newCategory: { id: string; name: string }) => void;
}

export function TourForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEditing = false,
  submitLabel,
  onCancel,
  availableCategories = [],
  onCategoryAdded,
}: TourFormProps) {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState<TourFormData>(() => defaultFormData(initialData));
  const [editorContent, setEditorContent] = useState(initialData?.description ?? "");

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState<string | null>(null);

  const [newHighlight, setNewHighlight] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newActivity, setNewActivity] = useState<{ dayIndex: number; value: string } | null>(null);
  const [newMeal, setNewMeal] = useState<{ dayIndex: number; value: string } | null>(null);
  const [newDate, setNewDate] = useState("");
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (initialData) {
      setFormData(defaultFormData(initialData));
      setEditorContent(initialData.description ?? "");
    }
  }, [initialData]);

  useEffect(() => {
    if (availableCategories.length === 0) return;
    setFormData((prev) =>
      prev.categoryId === "" ? { ...prev, categoryId: availableCategories[0].id } : prev
    );
  }, [availableCategories]);

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
        body: JSON.stringify({ name, slug, type: ["TOUR"], active: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");
      const newCategory = { id: data.category.id, name: data.category.name };
      onCategoryAdded?.(newCategory);
      setFormData((prev) => ({ ...prev, categoryId: newCategory.id }));
      setNewCategoryName("");
      setNewCategorySlug("");
      setAddCategoryOpen(false);
    } catch (err) {
      setAddCategoryError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setAddingCategory(false);
    }
  };

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Describe the tour...",
      height: 400,
      toolbarAdaptive: false,
      toolbarSticky: true,
      spellcheck: true,
      language: "en",
      removeButtons: ["about"],
      uploader: { insertImageAsBase64URI: true },
    }),
    []
  );

  const handleAddArrayItem = (
    field: "highlights" | "inclusions" | "exclusions",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    if (field === "highlights") setNewHighlight("");
    if (field === "inclusions") setNewInclusion("");
    if (field === "exclusions") setNewExclusion("");
  };

  const handleRemoveArrayItem = (
    field: "highlights" | "inclusions" | "exclusions",
    index: number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleAddDay = () => {
    const dayNumber = formData.itinerary.length + 1;
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: dayNumber,
          title: "",
          description: "",
          activities: [],
          meals: [],
        },
      ],
    }));
    setExpandedDays((prev) => new Set([...prev, dayNumber - 1]));
  };

  const handleRemoveDay = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((day, i) => ({ ...day, day: i + 1 })),
    }));
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const handleUpdateDay = (index: number, field: keyof TourDay, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) =>
        i === index ? { ...day, [field]: value } : day
      ),
    }));
  };

  const handleAddActivity = (dayIndex: number) => {
    if (!newActivity || newActivity.dayIndex !== dayIndex || !newActivity.value.trim()) return;
    const day = formData.itinerary[dayIndex];
    handleUpdateDay(dayIndex, "activities", [...day.activities, newActivity.value.trim()]);
    setNewActivity(null);
  };

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    const day = formData.itinerary[dayIndex];
    handleUpdateDay(dayIndex, "activities", day.activities.filter((_, i) => i !== activityIndex));
  };

  const handleAddMeal = (dayIndex: number) => {
    if (!newMeal || newMeal.dayIndex !== dayIndex || !newMeal.value.trim()) return;
    const day = formData.itinerary[dayIndex];
    handleUpdateDay(dayIndex, "meals", [...day.meals, newMeal.value.trim()]);
    setNewMeal(null);
  };

  const handleRemoveMeal = (dayIndex: number, mealIndex: number) => {
    const day = formData.itinerary[dayIndex];
    handleUpdateDay(dayIndex, "meals", day.meals.filter((_, i) => i !== mealIndex));
  };

  const handleAddDate = () => {
    if (!newDate.trim()) return;
    setFormData((prev) => ({ ...prev, availableDates: [...prev.availableDates, newDate.trim()] }));
    setNewDate("");
  };

  const handleRemoveDate = (index: number) => {
    setFormData((prev) => ({ ...prev, availableDates: prev.availableDates.filter((_, i) => i !== index) }));
  };

  const toggleDayExpanded = (index: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const description = sanitizeHtml(editorContent);
    await onSubmit({ ...formData, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Tour details and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    title,
                    slug: isEditing ? prev.slug : title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                  }));
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <div className="border rounded-md">
                <JoditEditor
                  ref={editorRef}
                  value={editorContent}
                  config={editorConfig}
                  onBlur={(newContent) => setEditorContent(newContent)}
                  onChange={(newContent) => setEditorContent(newContent)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="3 Days / 2 Nights"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, difficulty: v as TourFormData["difficulty"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  value={formData.maxGroupSize || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxGroupSize: parseInt(e.target.value, 10) || 8 }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.price ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFormData((prev) => ({ ...prev, price: v === "" ? undefined : parseFloat(v) || undefined }));
                  }}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, capacity: parseInt(e.target.value, 10) || 0 }))}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, status: v as TourFormData["status"] }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Tour Category</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.categoryId || undefined}
                    onValueChange={(v) => setFormData((prev) => ({ ...prev, categoryId: v }))}
                  >
                    <SelectTrigger id="category" className="flex-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="icon" title="Add new category">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Tour Category</DialogTitle>
                        <DialogDescription>
                          Create a new tour category. It will be available in the list above.
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
                              placeholder="e.g. Wildlife"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newCategorySlug">Slug (optional)</Label>
                            <Input
                              id="newCategorySlug"
                              value={newCategorySlug}
                              onChange={(e) => setNewCategorySlug(e.target.value)}
                              placeholder="e.g. wildlife"
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
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guide">Guide (Optional)</Label>
              <Input
                id="guide"
                value={formData.guide || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, guide: e.target.value || undefined }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: !!checked }))}
              />
              <Label htmlFor="featured" className="font-normal">
                Featured Tour
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Tour images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AssetSelector
              value={formData.images}
              onSelect={(images) => {
                const arr = Array.isArray(images) ? images : [images];
                setFormData((prev) => ({ ...prev, images: arr }));
              }}
              multiple
            />
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {formData.images.map((url, i) => (
                  <div key={i} className="relative group">
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image src={url} alt="" className="object-cover" fill sizes="150px" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setFormData((prev) => ({ ...prev, images: prev.images.filter((_, j) => j !== i) }))}
                      >
                        <Trash2 className="h-2 w-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
            <CardDescription>Key features of this tour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add highlight"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddArrayItem("highlights", newHighlight);
                  }
                }}
              />
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("highlights", newHighlight)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.highlights.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{h}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("highlights", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Inclusions */}
        <Card>
          <CardHeader>
            <CardTitle>Inclusions</CardTitle>
            <CardDescription>What&apos;s included</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                placeholder="Add inclusion"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddArrayItem("inclusions", newInclusion);
                  }
                }}
              />
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("inclusions", newInclusion)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.inclusions.map((inc, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{inc}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("inclusions", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exclusions */}
        <Card>
          <CardHeader>
            <CardTitle>Exclusions</CardTitle>
            <CardDescription>What&apos;s not included</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="Add exclusion"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddArrayItem("exclusions", newExclusion);
                  }
                }}
              />
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("exclusions", newExclusion)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.exclusions.map((exc, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{exc}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("exclusions", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Itinerary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
            <CardDescription>Day-by-day tour schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.itinerary.map((day, dayIndex) => (
              <Collapsible
                key={dayIndex}
                open={expandedDays.has(dayIndex)}
                onOpenChange={() => toggleDayExpanded(dayIndex)}
              >
                <CollapsibleTrigger asChild>
                  <Button type="button" variant="outline" className="w-full justify-between">
                    <span>Day {day.day}: {day.title || "Untitled"}</span>
                    {expandedDays.has(dayIndex) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Day Title</Label>
                      <Input
                        value={day.title}
                        onChange={(e) => handleUpdateDay(dayIndex, "title", e.target.value)}
                        placeholder="Day title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Accommodation (Optional)</Label>
                      <Input
                        value={day.accommodation || ""}
                        onChange={(e) => handleUpdateDay(dayIndex, "accommodation", e.target.value || undefined)}
                        placeholder="Accommodation name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Day Description</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => handleUpdateDay(dayIndex, "description", e.target.value)}
                      rows={3}
                      placeholder="Describe this day"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Activities</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newActivity?.dayIndex === dayIndex ? newActivity.value : ""}
                        onChange={(e) => setNewActivity({ dayIndex, value: e.target.value })}
                        placeholder="Add activity"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddActivity(dayIndex);
                          }
                        }}
                      />
                      <Button type="button" size="icon" onClick={() => handleAddActivity(dayIndex)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                          <span className="text-sm">{activity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => handleRemoveActivity(dayIndex, actIndex)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Meals</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newMeal?.dayIndex === dayIndex ? newMeal.value : ""}
                        onChange={(e) => setNewMeal({ dayIndex, value: e.target.value })}
                        placeholder="Add meal (e.g., Breakfast)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddMeal(dayIndex);
                          }
                        }}
                      />
                      <Button type="button" size="icon" onClick={() => handleAddMeal(dayIndex)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {day.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                          <span className="text-sm">{meal}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => handleRemoveMeal(dayIndex, mealIndex)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveDay(dayIndex)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Day
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            ))}
            <Button type="button" variant="outline" onClick={handleAddDay}>
              <Plus className="h-4 w-4 mr-2" />
              Add Day
            </Button>
          </CardContent>
        </Card>

        {/* Available Dates */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Available Dates</CardTitle>
            <CardDescription>Tour availability dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDate();
                  }
                }}
              />
              <Button type="button" size="icon" onClick={handleAddDate}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.availableDates.map((date, i) => (
                <div key={i} className="flex items-center gap-1 bg-muted px-3 py-1 rounded">
                  <span className="text-sm">{new Date(date).toLocaleDateString()}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    onClick={() => handleRemoveDate(i)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SEO Fields */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Meta information for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value || undefined }))}
                placeholder="SEO title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={formData.metaDescription || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value || undefined }))}
                rows={3}
                placeholder="SEO description"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {submitLabel ?? (isEditing ? "Update Tour" : "Create Tour")}
        </Button>
      </div>
    </form>
  );
}
