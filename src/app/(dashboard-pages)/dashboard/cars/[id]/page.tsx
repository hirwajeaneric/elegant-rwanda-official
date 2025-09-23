"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Settings,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { vehicles } from '@/data/car-rental';

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const carId = params.id as string;
  const car = vehicles.find(v => v.id === carId);

  if (!car) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/cars">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cars
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Car Not Found</h3>
              <p className="text-gray-600">The car you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard/cars');
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    rented: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/cars">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cars
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{car.make} {car.model}</h1>
            <p className="text-gray-600">Vehicle ID: {car.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href={`/dashboard/cars/${carId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Car
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Image */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>Complete information about this vehicle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Make</label>
                  <p className="text-lg font-semibold">{car.make}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Model</label>
                  <p className="text-lg font-semibold">{car.model}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Year</label>
                  <p className="text-lg font-semibold">{car.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Plate Number</label>
                  <p className="text-lg font-semibold">{car.plateNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Fuel Type</label>
                  <p className="text-lg font-semibold">{car.specifications.fuelType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Transmission</label>
                  <p className="text-lg font-semibold">{car.specifications.transmission}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Passengers</label>
                  <p className="text-lg font-semibold">{car.specifications.passengers}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Mileage</label>
                  <p className="text-lg font-semibold">{car.mileage?.toLocaleString()} km</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance History */}
          {car.maintenanceHistory && car.maintenanceHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
                <CardDescription>Recent maintenance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {car.maintenanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Wrench className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{record.type}</p>
                          <p className="text-sm text-gray-600">{record.description}</p>
                          <p className="text-xs text-gray-500">{record.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${record.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={statusColors[car.status]}>
                  {car.status}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Daily Rate</span>
                <span className="font-semibold">${car.dailyRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Location</span>
                <span className="text-sm">{car.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Last Service</label>
                <p className="text-sm">{car.lastService}</p>
              </div>
              {car.nextService && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Next Service</label>
                  <p className="text-sm">{car.nextService}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Update Location
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Vehicle Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}