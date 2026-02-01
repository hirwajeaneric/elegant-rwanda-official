"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import { VehicleInfoModal } from "@/components/dashboard/VehicleInfoModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import { Car } from "lucide-react";

interface CarRentalBookingItem {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  rentalType: string | null;
  name: string;
  email: string;
  phone: string;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  passengers: number | null;
  createdAt: string;
  vehicle?: { id: string; name: string; slug: string } | null;
}

export default function CarRentalBookingsPage() {
  const [bookings, setBookings] = useState<CarRentalBookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedVehicleName, setSelectedVehicleName] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/car-rental-bookings?limit=500");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error("Failed to load car rental bookings");
      }
    } catch (error) {
      console.error("Error loading car rental bookings:", error);
      toast.error("Failed to load car rental bookings");
    } finally {
      setLoading(false);
    }
  };

  const formatRentalType = (v: string | null) => {
    if (!v) return "—";
    if (v === "self-drive") return "Self Drive";
    if (v === "chauffeur") return "Chauffeur";
    return v;
  };

  const columns = [
    {
      key: "vehicle",
      label: "Vehicle",
      sortable: false,
      render: (item: CarRentalBookingItem) => item.vehicle?.name ?? "—",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: CarRentalBookingItem) => (
        <Badge
          variant={
            item.status === "COMPLETED"
              ? "default"
              : item.status === "IN_PROGRESS"
                ? "secondary"
                : "outline"
          }
        >
          {item.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "startDate",
      label: "Start",
      sortable: true,
      render: (item: CarRentalBookingItem) => item.startDate,
    },
    {
      key: "endDate",
      label: "End",
      sortable: true,
      render: (item: CarRentalBookingItem) => item.endDate,
    },
    {
      key: "pickupLocation",
      label: "Pickup",
      sortable: false,
      render: (item: CarRentalBookingItem) => item.pickupLocation ?? "—",
    },
    {
      key: "createdAt",
      label: "Submitted",
      sortable: true,
      render: (item: CarRentalBookingItem) => {
        const d = new Date(item.createdAt);
        try {
          return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
        } catch {
          return d.toISOString().slice(0, 16).replace("T", " ");
        }
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: CarRentalBookingItem) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/car-rental/bookings/${item.id}`}>View</Link>
          </Button>
          {item.vehicle && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedVehicleId(item.vehicle!.id);
                setSelectedVehicleName(item.vehicle!.name);
                setVehicleModalOpen(true);
              }}
            >
              <Car className="h-4 w-4 mr-1" />
              Vehicle info
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={11} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Car Rental Bookings</h1>
          <p className="text-muted-foreground mt-2">
            All car rental booking requests
          </p>
        </div>
      </div>

      <DataTable
        data={bookings}
        columns={columns}
        searchPlaceholder="Search car rental bookings..."
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "PENDING", label: "Pending" },
              { value: "IN_PROGRESS", label: "In Progress" },
              { value: "COMPLETED", label: "Completed" },
              { value: "ARCHIVED", label: "Archived" },
            ],
          },
        ]}
      />

      <VehicleInfoModal
        open={vehicleModalOpen}
        onOpenChange={setVehicleModalOpen}
        vehicleId={selectedVehicleId}
        vehicleName={selectedVehicleName}
      />
    </div>
  );
}
