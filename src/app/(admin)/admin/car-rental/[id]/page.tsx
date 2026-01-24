"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
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
    available: true,
    mileage: 0,
    lastService: "",
    nextService: "",
    pickupLocations: [],
    includedServices: [],
    additionalServices: [],
    requirements: [],
    insurance: {
      included: true,
      coverage: "",
      excess: "",
    },
  });
  const [newFeature, setNewFeature] = useState("");
  const [newPickupLocation, setNewPickupLocation] = useState("");
  const [newIncludedService, setNewIncludedService] = useState("");
  const [newAdditionalService, setNewAdditionalService] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

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

  const handleAddArrayItem = (field: "pickupLocations" | "includedServices" | "additionalServices" | "requirements", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] || []), value.trim()],
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
      [field]: (formData[field] || []).filter((_, i) => i !== index),
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
              <Label htmlFor="shortDescription">Short Description</Label>
              {isEditing ? (
                <Input
                  id="shortDescription"
                  value={formData.shortDescription || ""}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief description for listings"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{vehicle.shortDescription || "N/A"}</p>
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
                <Label htmlFor="year">Year</Label>
                {isEditing ? (
                  <Input
                    id="year"
                    type="number"
                    value={formData.year || 2024}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{vehicle.year || "N/A"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number</Label>
                {isEditing ? (
                  <Input
                    id="plateNumber"
                    value={formData.plateNumber || ""}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{vehicle.plateNumber || "N/A"}</p>
                )}
              </div>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                {isEditing ? (
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage || 0}
                    onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{vehicle.mileage?.toLocaleString() || "N/A"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="available">Available</Label>
                {isEditing ? (
                  <Select
                    value={formData.available !== undefined ? formData.available.toString() : "true"}
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
                ) : (
                  <Badge variant={vehicle.available ? "default" : "secondary"}>
                    {vehicle.available ? "Available" : "Not Available"}
                  </Badge>
                )}
              </div>
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

        {/* Images */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Vehicle images (can have multiple images)</CardDescription>
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
                {vehicle.images.length > 0 ? (
                  vehicle.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={image}
                        alt={`Vehicle image ${index + 1}`}
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

        {/* Pickup Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Pickup Locations</CardTitle>
            <CardDescription>Available pickup locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
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
                  {(formData.pickupLocations || []).map((location, index) => (
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
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {vehicle.pickupLocations?.map((location, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{location}</li>
                )) || <li className="text-sm text-muted-foreground">No locations specified</li>}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Included Services */}
        <Card>
          <CardHeader>
            <CardTitle>Included Services</CardTitle>
            <CardDescription>Services included with rental</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
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
                  {(formData.includedServices || []).map((service, index) => (
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
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {vehicle.includedServices?.map((service, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{service}</li>
                )) || <li className="text-sm text-muted-foreground">No services specified</li>}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Additional Services */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
            <CardDescription>Optional additional services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
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
                  {(formData.additionalServices || []).map((service, index) => (
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
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {vehicle.additionalServices?.map((service, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{service}</li>
                )) || <li className="text-sm text-muted-foreground">No services specified</li>}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
            <CardDescription>Rental requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
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
                  {(formData.requirements || []).map((requirement, index) => (
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
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {vehicle.requirements?.map((requirement, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{requirement}</li>
                )) || <li className="text-sm text-muted-foreground">No requirements specified</li>}
              </ul>
            )}
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
                  {isEditing ? (
                    <Select
                      value={formData.insurance?.included !== undefined ? formData.insurance.included.toString() : "true"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            included: value === "true",
                            coverage: formData.insurance?.coverage || "",
                            excess: formData.insurance?.excess || "",
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
                  ) : (
                    <Badge variant={vehicle.insurance?.included ? "default" : "secondary"}>
                      {vehicle.insurance?.included ? "Included" : "Not Included"}
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Coverage</Label>
                  {isEditing ? (
                    <Input
                      value={formData.insurance?.coverage || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            included: formData.insurance?.included ?? true,
                            coverage: e.target.value,
                            excess: formData.insurance?.excess || "",
                          },
                        })
                      }
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{vehicle.insurance?.coverage || "N/A"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Excess</Label>
                  {isEditing ? (
                    <Input
                      value={formData.insurance?.excess || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            included: formData.insurance?.included ?? true,
                            coverage: formData.insurance?.coverage || "",
                            excess: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{vehicle.insurance?.excess || "N/A"}</p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Last Service Date</Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={formData.lastService || ""}
                      onChange={(e) => setFormData({ ...formData, lastService: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{vehicle.lastService || "N/A"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Next Service Date</Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={formData.nextService || ""}
                      onChange={(e) => setFormData({ ...formData, nextService: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{vehicle.nextService || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
