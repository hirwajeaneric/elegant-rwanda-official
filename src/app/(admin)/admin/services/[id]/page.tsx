"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceById } from "@/data/services";
import { toast } from "sonner";
import { ArrowLeft, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const service = getServiceById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [] as string[],
    href: "",
    image: "",
    icon: "",
    active: true,
    order: 0,
    metaTitle: "",
    metaDescription: "",
    status: "active" as "active" | "inactive" | "draft",
  });
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        features: [...service.features],
        href: service.href,
        image: service.image,
        icon: service.icon,
        active: service.active,
        order: service.order,
        metaTitle: service.metaTitle || "",
        metaDescription: service.metaDescription || "",
        status: service.status,
      });
    }
  }, [service]);

  if (!service) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Service not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log("Saving service:", formData);
    setIsEditing(false);
    toast.success("Service saved successfully!");
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{service.title}</h1>
            <Badge variant={service.status === "active" ? "default" : "secondary"}>
              {service.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/services">
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
            <CardDescription>Service details and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              {isEditing ? (
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{service.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{service.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="href">URL Path</Label>
              {isEditing ? (
                <Input
                  id="href"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  placeholder="/tours"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{service.href}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              {isEditing ? (
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Mountain"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{service.icon}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                {isEditing ? (
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{service.order}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive" | "draft") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={service.status === "active" ? "default" : "secondary"}>
                    {service.status}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image & Features */}
        <Card>
          <CardHeader>
            <CardTitle>Image & Features</CardTitle>
            <CardDescription>Service image and feature list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Image</Label>
              {isEditing ? (
                <div className="space-y-2">
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
                        alt={formData.title}
                        className="w-full h-48 object-cover rounded-md"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-md"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddFeature} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SEO Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>SEO Information</CardTitle>
            <CardDescription>Meta tags for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              {isEditing ? (
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Service title for SEO"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{service.metaTitle || "Not set"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              {isEditing ? (
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={3}
                  placeholder="Service description for SEO"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{service.metaDescription || "Not set"}</p>
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
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Views</p>
                <p className="text-2xl font-bold">{service.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clicks</p>
                <p className="text-2xl font-bold">{service.clicks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm font-medium">
                  {new Date(service.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
