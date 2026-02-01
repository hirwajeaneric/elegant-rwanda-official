"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Car, Loader2, DollarSign, Calendar, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface VehicleDetails {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description?: string;
  images: string[];
  make: string;
  model: string;
  year: number;
  dailyRate: number;
  specifications?: Record<string, unknown>;
}

interface VehicleInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleId: string | null;
  vehicleName?: string | null;
}

export function VehicleInfoModal({
  open,
  onOpenChange,
  vehicleId,
  vehicleName,
}: VehicleInfoModalProps) {
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !vehicleId) {
      setVehicle(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/vehicles/${vehicleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.vehicle) {
          setVehicle(data.vehicle);
        } else {
          setError("Vehicle not found");
        }
      })
      .catch(() => setError("Failed to load vehicle"))
      .finally(() => setLoading(false));
  }, [open, vehicleId]);

  const images = vehicle?.images ?? [];
  const displayImages = images.length >= 2 ? images.slice(0, 2) : images;
  const specs = (vehicle?.specifications ?? {}) as Record<string, unknown>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            {loading ? "Loading vehicle..." : vehicle?.name ?? vehicleName ?? "Vehicle"}
          </DialogTitle>
          <DialogDescription>
            Important information about the booked vehicle
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && !loading && (
          <p className="text-sm text-destructive py-4">{error}</p>
        )}

        {vehicle && !loading && (
          <div className="space-y-6">
            {/* At least 2 images */}
            {displayImages.length > 0 && (
              <div
                className={
                  displayImages.length >= 2
                    ? "grid grid-cols-2 gap-3"
                    : "grid grid-cols-1"
                }
              >
                {displayImages.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted"
                  >
                    <Image
                      src={src.startsWith("/") ? src : `${src}`}
                      alt={`${vehicle.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 320px"
                    />
                  </div>
                ))}
              </div>
            )}

            {vehicle.shortDescription && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {vehicle.shortDescription}
                </p>
              </div>
            )}

            {/* Key info */}
            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Car className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{vehicle.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Year</span>
                <span className="font-medium">{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2">
                <span className="text-muted-foreground">Make & model</span>
                <span className="font-medium">
                  {vehicle.make} {vehicle.model}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Daily rate</span>
                <span className="font-medium">
                  ${Number(vehicle.dailyRate).toLocaleString()}
                </span>
              </div>
              {specs.passengers != null && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Passengers</span>
                  <span className="font-medium">{String(specs.passengers)}</span>
                </div>
              )}
            </div>

            {vehicleId && (
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/admin/car-rental/${vehicleId}`}>
                  Open vehicle in admin
                </Link>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
