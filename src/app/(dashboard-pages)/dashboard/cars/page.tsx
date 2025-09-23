"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Car,
  Fuel,
  Users,
  Wrench
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data
const cars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2022,
    plateNumber: 'RAA-123A',
    capacity: 7,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    dailyRate: 120,
    status: 'available',
    location: 'Kigali',
    mileage: 45000,
    image: '/car-rental.jpg',
    lastService: '2024-01-15'
  },
  {
    id: 2,
    make: 'Nissan',
    model: 'X-Trail',
    year: 2021,
    plateNumber: 'RAA-456B',
    capacity: 5,
    fuelType: 'Petrol',
    transmission: 'Manual',
    dailyRate: 80,
    status: 'rented',
    location: 'Kigali',
    mileage: 52000,
    image: '/car-rental.jpg',
    lastService: '2024-01-10'
  },
  {
    id: 3,
    make: 'Mitsubishi',
    model: 'Pajero Sport',
    year: 2023,
    plateNumber: 'RAA-789C',
    capacity: 7,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    dailyRate: 100,
    status: 'maintenance',
    location: 'Kigali',
    mileage: 12000,
    image: '/car-rental.jpg',
    lastService: '2024-02-01'
  },
  {
    id: 4,
    make: 'Toyota',
    model: 'Hiace',
    year: 2020,
    plateNumber: 'RAA-321D',
    capacity: 14,
    fuelType: 'Diesel',
    transmission: 'Manual',
    dailyRate: 150,
    status: 'available',
    location: 'Kigali',
    mileage: 78000,
    image: '/car-rental.jpg',
    lastService: '2024-01-20'
  },
  {
    id: 5,
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    plateNumber: 'RAA-654E',
    capacity: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    dailyRate: 90,
    status: 'available',
    location: 'Kigali',
    mileage: 35000,
    image: '/car-rental.jpg',
    lastService: '2024-01-25'
  }
];

const statusColors = {
  available: 'bg-green-100 text-green-800',
  rented: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  unavailable: 'bg-red-100 text-red-800'
};

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Manage your vehicle fleet</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cars/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold">{cars.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Car className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold">{cars.filter(c => c.status === 'available').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rented</p>
                <p className="text-2xl font-bold">{cars.filter(c => c.status === 'rented').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Maintenance</p>
                <p className="text-2xl font-bold">{cars.filter(c => c.status === 'maintenance').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All Vehicles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('available')}>
                  Available
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('rented')}>
                  Rented
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('maintenance')}>
                  Maintenance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Cars Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Fleet</CardTitle>
          <CardDescription>Manage all your rental vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Daily Rate</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex-shrink-0">
                          <Image 
                            src={car.image} 
                            alt={`${car.make} ${car.model}`}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{car.make} {car.model}</p>
                          <p className="text-sm text-gray-500">{car.year}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {car.plateNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{car.capacity} seats</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Fuel className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{car.fuelType}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${car.dailyRate}/day</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{car.mileage.toLocaleString()} km</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[car.status as keyof typeof statusColors]}>
                        {car.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/cars/${car.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/cars/${car.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Wrench className="mr-2 h-4 w-4" />
                            Schedule Service
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Service Reminders */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Service Reminders</CardTitle>
          <CardDescription>Vehicles due for maintenance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cars.filter(car => {
              const lastService = new Date(car.lastService);
              const daysSinceService = Math.floor((Date.now() - lastService.getTime()) / (1000 * 60 * 60 * 24));
              return daysSinceService > 30;
            }).map((car) => (
              <div key={car.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">{car.make} {car.model}</p>
                    <p className="text-sm text-gray-600">Last service: {car.lastService}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Schedule Service
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}