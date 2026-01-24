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
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";

export default function NewVehiclePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Economy" as "Economy" | "Compact" | "SUV" | "Unique" | "Minivan" | "Adventure" | "Executive",
    description: "",
    shortDescription: "",
    images: [] as string[],
    features: [] as string[],
    dailyRate: 0,
    status: "available" as "available" | "rented" | "maintenance",
    location: "",
    make: "",
    model: "",
    year: 2024,
    plateNumber: "",
    available: true,
    mileage: 0,
    lastService: "",
    nextService: "",
    pickupLocations: [] as string[],
    includedServices: [] as string[],
    additionalServices: [] as string[],
    requirements: [] as string[],
    insurance: {
      included: true,
      coverage: "",
      excess: "",
    },
    specifications: {
      passengers: 4,
      doors: 4,
      transmission: "Automatic" as "Manual" | "Automatic",
      fuelType: "Petrol" as "Petrol" | "Diesel" | "Hybrid" | "Electric",
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
  });
  const [newFeature, setNewFeature] = useState("");
  const [newPickupLocation, setNewPickupLocation] = useState("");
  const [newIncludedService, setNewIncludedService] = useState("");
  const [newAdditionalService, setNewAdditionalService] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating vehicle:", formData);
    alert("Vehicle created successfully!");
    router.push("/admin/car-rental");
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

  const handleAddArrayItem = (field: "pickupLocations" | "includedServices" | "additionalServices" | "requirements", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
      if (field === "pickupLocations") setNewPickupLocation("");
      if (field === "includedServices") setNewIncludedService("");
      if (field === "additionalServices") setNewAdditionalService("");
      if (field === "requirements") setNewRequirement("");
    }
  };

  const handleRemoveArrayItem = (field: "pickupLocations" | "includedServices" | "additionalServices" | "requirements", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Create New Vehicle</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/car-rental">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Vehicle details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vehicle Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setFormData((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                    }));
                  }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make *</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: "Economy" | "Compact" | "SUV" | "Unique" | "Minivan" | "Adventure" | "Executive") =>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief description for listings"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plateNumber">Plate Number *</Label>
                  <Input
                    id="plateNumber"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="available">Available</Label>
                  <Select
                    value={formData.available.toString()}
                    onValueChange={(value) => setFormData({ ...formData, available: value === "true" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    value={formData.dailyRate}
                    onChange={(e) => setFormData({ ...formData, dailyRate: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
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
                </div>
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
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Vehicle images (can have multiple images)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Images ({formData.images.length})</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                          <Image
                            src={image}
                            alt={`Vehicle image ${index + 1}`}
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
                              const updatedImages = formData.images.filter((_, i) => i !== index);
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
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Vehicle features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Pickup Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Pickup Locations</CardTitle>
              <CardDescription>Available pickup locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newPickupLocation}
                    onChange={(e) => setNewPickupLocation(e.target.value)}
                    placeholder="Add pickup location"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("pickupLocations", newPickupLocation);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("pickupLocations", newPickupLocation)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.pickupLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{location}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("pickupLocations", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Included Services */}
          <Card>
            <CardHeader>
              <CardTitle>Included Services</CardTitle>
              <CardDescription>Services included with rental</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newIncludedService}
                    onChange={(e) => setNewIncludedService(e.target.value)}
                    placeholder="Add included service"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("includedServices", newIncludedService);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("includedServices", newIncludedService)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.includedServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{service}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("includedServices", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Services */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>Optional additional services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newAdditionalService}
                    onChange={(e) => setNewAdditionalService(e.target.value)}
                    placeholder="Add additional service"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("additionalServices", newAdditionalService);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("additionalServices", newAdditionalService)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.additionalServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{service}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("additionalServices", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>Rental requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add requirement"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("requirements", newRequirement);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("requirements", newRequirement)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{requirement}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("requirements", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Vehicle specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    value={formData.specifications.passengers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specifications: {
                          ...formData.specifications,
                          passengers: parseInt(e.target.value) || 4,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doors">Doors</Label>
                  <Input
                    id="doors"
                    type="number"
                    value={formData.specifications.doors}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specifications: {
                          ...formData.specifications,
                          doors: parseInt(e.target.value) || 4,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={formData.specifications.transmission}
                    onValueChange={(value: "Manual" | "Automatic") =>
                      setFormData({
                        ...formData,
                        specifications: { ...formData.specifications, transmission: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    value={formData.specifications.fuelType}
                    onValueChange={(value: "Petrol" | "Diesel" | "Hybrid" | "Electric") =>
                      setFormData({
                        ...formData,
                        specifications: { ...formData.specifications, fuelType: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance & Service Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Insurance & Service Information</CardTitle>
              <CardDescription>Insurance details and service history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Insurance Included</Label>
                    <Select
                      value={formData.insurance.included.toString()}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            included: value === "true",
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Coverage</Label>
                    <Input
                      value={formData.insurance.coverage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            coverage: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Excess</Label>
                    <Input
                      value={formData.insurance.excess}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            excess: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Last Service Date</Label>
                    <Input
                      type="date"
                      value={formData.lastService}
                      onChange={(e) => setFormData({ ...formData, lastService: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Next Service Date</Label>
                    <Input
                      type="date"
                      value={formData.nextService}
                      onChange={(e) => setFormData({ ...formData, nextService: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/car-rental">Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Create Vehicle
          </Button>
        </div>
      </form>
    </div>
  );
}
