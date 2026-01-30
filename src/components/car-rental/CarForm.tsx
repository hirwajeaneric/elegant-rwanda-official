"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";
import JoditEditor from "jodit-react";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = ["Economy", "Compact", "SUV", "Unique", "Minivan", "Adventure", "Executive"] as const;
const STATUSES = ["available", "rented", "maintenance"] as const;
const TRANSMISSIONS = ["Manual", "Automatic"] as const;
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"] as const;

export interface VehicleSpecifications {
  passengers: number;
  doors: number;
  transmission: "Manual" | "Automatic";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  engineSize: string;
  power: string;
  fuelEfficiency: string;
  luggageCapacity: string;
  airConditioning: boolean;
  bluetooth: boolean;
  navigation: boolean;
  cruiseControl: boolean;
  parkingSensors: boolean;
  backupCamera: boolean;
  usbPorts: number;
  wifi: boolean;
}

export interface VehicleInsurance {
  included: boolean;
  coverage: string;
  excess: string;
}

export interface CarFormData {
  name: string;
  slug: string;
  category: (typeof CATEGORIES)[number];
  description: string;
  shortDescription: string;
  images: string[];
  specifications: VehicleSpecifications;
  available: boolean;
  pickupLocations: string[];
  includedServices: string[];
  additionalServices: string[];
  requirements: string[];
  insurance: VehicleInsurance;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  dailyRate: number;
  status: (typeof STATUSES)[number];
  location: string;
  mileage: number;
  lastService: string;
  nextService: string;
  // API payload matches this; Prisma stores specifications and insurance as Json
}

const defaultSpecifications: VehicleSpecifications = {
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
};

const defaultInsurance: VehicleInsurance = {
  included: true,
  coverage: "",
  excess: "",
};

function defaultFormData(initial?: Partial<CarFormData>): CarFormData {
  return {
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    category: initial?.category ?? "Economy",
    description: initial?.description ?? "",
    shortDescription: initial?.shortDescription ?? "",
    images: initial?.images ?? [],
    specifications: initial?.specifications ? { ...defaultSpecifications, ...initial.specifications } : { ...defaultSpecifications },
    available: initial?.available ?? true,
    pickupLocations: initial?.pickupLocations ?? [],
    includedServices: initial?.includedServices ?? [],
    additionalServices: initial?.additionalServices ?? [],
    requirements: initial?.requirements ?? [],
    insurance: initial?.insurance ? { ...defaultInsurance, ...initial.insurance } : { ...defaultInsurance },
    make: initial?.make ?? "",
    model: initial?.model ?? "",
    year: initial?.year ?? new Date().getFullYear(),
    plateNumber: initial?.plateNumber ?? "",
    dailyRate: initial?.dailyRate ?? 0,
    status: initial?.status ?? "available",
    location: initial?.location ?? "",
    mileage: initial?.mileage ?? 0,
    lastService: initial?.lastService ?? "",
    nextService: initial?.nextService ?? "",
  };
}

interface CarFormProps {
  initialData?: Partial<CarFormData>;
  onSubmit: (data: CarFormData) => Promise<void>;
  isLoading?: boolean;
  isEditing?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
}

export function CarForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEditing = false,
  submitLabel,
  onCancel,
}: CarFormProps) {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState<CarFormData>(() => defaultFormData(initialData));
  const [editorContent, setEditorContent] = useState(initialData?.description ?? "");

  const [newPickupLocation, setNewPickupLocation] = useState("");
  const [newIncludedService, setNewIncludedService] = useState("");
  const [newAdditionalService, setNewAdditionalService] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(defaultFormData(initialData));
      setEditorContent(initialData.description ?? "");
    }
  }, [initialData]);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Describe the vehicle...",
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
    field: "pickupLocations" | "includedServices" | "additionalServices" | "requirements",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    if (field === "pickupLocations") setNewPickupLocation("");
    if (field === "includedServices") setNewIncludedService("");
    if (field === "additionalServices") setNewAdditionalService("");
    if (field === "requirements") setNewRequirement("");
  };

  const handleRemoveArrayItem = (
    field: "pickupLocations" | "includedServices" | "additionalServices" | "requirements",
    index: number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
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
            <CardDescription>Vehicle details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vehicle Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    name,
                    slug: isEditing ? prev.slug : name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData((prev) => ({ ...prev, make: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as CarFormData["category"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Brief description for listings"
                required
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
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, year: parseInt(e.target.value, 10) || 0 }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number *</Label>
                <Input
                  id="plateNumber"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, plateNumber: e.target.value }))}
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
                  value={formData.mileage || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mileage: parseInt(e.target.value, 10) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Available</Label>
                <Select
                  value={formData.available.toString()}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, available: v === "true" }))}
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
                  value={formData.dailyRate || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dailyRate: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, status: v as CarFormData["status"] }))}
                >
                  <SelectTrigger>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Last Service Date</Label>
                <Input
                  type="date"
                  value={formData.lastService}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastService: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Next Service Date</Label>
                <Input
                  type="date"
                  value={formData.nextService}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nextService: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Vehicle images</CardDescription>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pickup Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Pickup Locations</CardTitle>
            <CardDescription>Available pickup locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newPickupLocation}
                onChange={(e) => setNewPickupLocation(e.target.value)}
                placeholder="Add location"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddArrayItem("pickupLocations", newPickupLocation);
                  }
                }}
              />
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("pickupLocations", newPickupLocation)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.pickupLocations.map((loc, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{loc}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("pickupLocations", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Included Services */}
        <Card>
          <CardHeader>
            <CardTitle>Included Services</CardTitle>
            <CardDescription>Services included with rental</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("includedServices", newIncludedService)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.includedServices.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{s}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("includedServices", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Services */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
            <CardDescription>Optional additional services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("additionalServices", newAdditionalService)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.additionalServices.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{s}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("additionalServices", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
            <CardDescription>Rental requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Button type="button" size="icon" onClick={() => handleAddArrayItem("requirements", newRequirement)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.requirements.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{r}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveArrayItem("requirements", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
                <Label>Passengers</Label>
                <Input
                  type="number"
                  value={formData.specifications.passengers || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, passengers: parseInt(e.target.value, 10) || 0 },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Doors</Label>
                <Input
                  type="number"
                  value={formData.specifications.doors || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, doors: parseInt(e.target.value, 10) || 0 },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Transmission</Label>
                <Select
                  value={formData.specifications.transmission}
                  onValueChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, transmission: v as VehicleSpecifications["transmission"] },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSMISSIONS.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuel Type</Label>
                <Select
                  value={formData.specifications.fuelType}
                  onValueChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, fuelType: v as VehicleSpecifications["fuelType"] },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FUEL_TYPES.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Engine Size</Label>
                <Input
                  value={formData.specifications.engineSize}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, specifications: { ...prev.specifications, engineSize: e.target.value } }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Power</Label>
                <Input
                  value={formData.specifications.power}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, specifications: { ...prev.specifications, power: e.target.value } }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fuel Efficiency</Label>
                <Input
                  value={formData.specifications.fuelEfficiency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, fuelEfficiency: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Luggage Capacity</Label>
                <Input
                  value={formData.specifications.luggageCapacity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, luggageCapacity: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>USB Ports</Label>
                <Input
                  type="number"
                  value={formData.specifications.usbPorts ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specifications: { ...prev.specifications, usbPorts: parseInt(e.target.value, 10) || 0 },
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              {(
                [
                  "airConditioning",
                  "bluetooth",
                  "navigation",
                  "cruiseControl",
                  "parkingSensors",
                  "backupCamera",
                  "wifi",
                ] as const
              ).map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={!!formData.specifications[key]}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        specifications: { ...prev.specifications, [key]: !!checked },
                      }))
                    }
                  />
                  <Label htmlFor={key} className="text-sm font-normal capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insurance */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Insurance & Service</CardTitle>
            <CardDescription>Insurance details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="insurance-included"
                checked={formData.insurance.included}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    insurance: { ...prev.insurance, included: !!checked },
                  }))
                }
              />
              <Label htmlFor="insurance-included" className="font-normal">
                Insurance included
              </Label>
            </div>
            <div className="space-y-2">
              <Label>Coverage</Label>
              <Input
                value={formData.insurance.coverage}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, insurance: { ...prev.insurance, coverage: e.target.value } }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Excess</Label>
              <Input
                value={formData.insurance.excess}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, insurance: { ...prev.insurance, excess: e.target.value } }))
                }
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
          {submitLabel ?? (isEditing ? "Update Vehicle" : "Create Vehicle")}
        </Button>
      </div>
    </form>
  );
}
