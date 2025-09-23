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
  Users,
  Clock,
  DollarSign,
  UserCheck,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { events } from '@/data/events';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const eventId = params.id as string;
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Event Not Found</h3>
              <p className="text-gray-600">The event you're looking for doesn't exist.</p>
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
    router.push('/dashboard/events');
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-gray-600">Event ID: {event.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href={`/dashboard/events/${eventId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Event
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Image */}
          <Card>
            <CardHeader>
              <CardTitle>Event Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={event.images[0]}
                  alt={event.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Complete information about this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-700 mt-1">{event.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-lg font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Time</label>
                  <p className="text-lg font-semibold">{event.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-lg font-semibold">{event.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <p className="text-lg font-semibold">${event.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Event Highlights</CardTitle>
                <CardDescription>Key features and attractions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Event Schedule */}
          {event.schedule && event.schedule.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>Detailed timeline of activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.time}</p>
                        <p className="text-sm text-gray-600">{item.activity}</p>
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
                <Badge className={statusColors[event.active ? 'active' : 'inactive']}>
                  {event.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Price</span>
                <span className="font-semibold">${event.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Capacity</span>
                <span className="text-sm">{event.maxParticipants} people</span>
              </div>
            </CardContent>
          </Card>

          {/* Registration Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Registered</span>
                <span className="font-semibold">{event.currentParticipants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Available Spots</span>
                <span className="font-semibold">{event.maxParticipants - event.currentParticipants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Registration Rate</span>
                <span className="font-semibold">
                  {Math.round((event.currentParticipants / event.maxParticipants) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Event Date</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{event.time}</p>
                  <p className="text-xs text-gray-500">Start Time</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{event.location}</p>
                  <p className="text-xs text-gray-500">Venue</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{event.maxParticipants}</p>
                  <p className="text-xs text-gray-500">Max Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                View Registrations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Duplicate Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}