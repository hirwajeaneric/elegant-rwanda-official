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
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Users,
  Globe,
  Award,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { team } from '@/data/team';

export default function TeamMemberDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const memberId = params.id as string;
  const member = team.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/team">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Team Member Not Found</h3>
              <p className="text-gray-600">The team member you're looking for doesn't exist.</p>
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
    router.push('/dashboard/team');
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
            <Link href="/dashboard/team">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <p className="text-gray-600">{member.role}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href={`/dashboard/team/${memberId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Member
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
          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <p className="text-lg text-gray-600">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.experience}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
              <CardDescription>Professional background and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle>Specialties</CardTitle>
              <CardDescription>Areas of expertise and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          {member.languages && member.languages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription>Languages spoken by this team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {member.languages.map((language, index) => (
                    <Badge key={index} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={statusColors[member.status]}>
                  {member.status}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{member.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tours Completed</span>
                <span className="font-semibold">{member.toursCompleted}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{member.email}</p>
                    <p className="text-xs text-gray-500">Email</p>
                  </div>
                </div>
              )}
              
              {member.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{member.phone}</p>
                    <p className="text-xs text-gray-500">Phone</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{member.location}</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle>Work Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{member.department}</p>
                  <p className="text-xs text-gray-500">Department</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{new Date(member.hireDate).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Hire Date</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{member.experience}</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          {member.linkedin && (
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={member.linkedin} target="_blank">
                    <Globe className="mr-2 h-4 w-4" />
                    LinkedIn Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="mr-2 h-4 w-4" />
                View Performance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
