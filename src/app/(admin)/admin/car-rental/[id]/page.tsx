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
import { vehicles, Vehicle } from "@/data/car-rental";
import { ArrowLeft, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";

function getVehicleById(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const vehicle = getVehicleById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "",
    category: "Economy",
    description: "",
    shortDescription: "",
    images: [],
    features: [],
    specifications: {
      passengers: 4,
      doors: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
      engineSize: "",
      power: "",
      fuelEfficiency: "",
      luggageCapacity: "",
      airConditioning: true,
      bluetooth: true,
      navigation: false,
      cruiseControl: false,
      parkingSensors: false,
      backupCamera: false,
      usbPorts: 2,
      wifi: false,
    },
    dailyRate: 0,
    status: "available",
    location: "",
    make: "",
    model: "",
    year: 2024,
    plateNumber: "",
  });
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (vehicle) {
      setFormData({
        ...vehicle,
      });
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Vehicle not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/car-rental">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Car Rental
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Saving vehicle:", formData);
    setIsEditing(false);
    alert("Vehicle saved successfully!");
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-3xl font-bold">{vehicle.name}</h1>
            <Badge
              variant={
                vehicle.status === "available"
                  ? "default"
                  : vehicle.status === "rented"
                  ? "secondary"
                  : "destructive"
              }
            >
              {vehicle.status}
            </Badge>
            <Badge variant="outline">{vehicle.category}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/car-rental">
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
            <CardDescription>Vehicle details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vehicle Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{vehicle.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                {isEditing ? (
                  <Input
                    id="make"
                    value={formData.make || ""}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{vehicle.make || "N/A"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                {isEditing ? (
                  <Input
                    id="model"
                    value={formData.model || ""}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{vehicle.model || "N/A"}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              {isEditing ? (
                <Select
                  value={formData.category || "Economy"}
                  onValueChange={(value: Vehicle["category"]) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Compact">Compact</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Unique">Unique</SelectItem>
                    <SelectItem value="Minivan">Minivan</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline">{vehicle.category}</Badge>
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
                <p className="text-sm text-muted-foreground">{vehicle.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                {isEditing ? (
                  <Input
                    id="dailyRate"
                    type="number"
                    value={formData.dailyRate || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, dailyRate: parseFloat(e.target.value) || 0 })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">${vehicle.dailyRate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status || "available"}
                    onValueChange={(value: "available" | "rented" | "maintenance") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    variant={
                      vehicle.status === "available"
                        ? "default"
                        : vehicle.status === "rented"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {vehicle.status}
                  </Badge>
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
                <p className="text-sm text-muted-foreground">{vehicle.location}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Vehicle features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  {(formData.features || []).map((feature, index) => (
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
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Vehicle specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Passengers</p>
                <p className="text-lg font-semibold">{vehicle.specifications.passengers}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Doors</p>
                <p className="text-lg font-semibold">{vehicle.specifications.doors}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="text-lg font-semibold">{vehicle.specifications.transmission}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fuel Type</p>
                <p className="text-lg font-semibold">{vehicle.specifications.fuelType}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
