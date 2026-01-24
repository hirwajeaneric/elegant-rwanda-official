"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { team, TeamMember } from "@/data/team";
import { ArrowLeft, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import Image from "next/image";

function getTeamMemberById(id: string) {
  return team.find((member) => member.id === id);
}

export default function TeamMemberDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const member = getTeamMemberById(id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    bio: "",
    image: "",
    experience: "",
    specialties: [],
    email: "",
    linkedin: "",
    phone: "",
    department: "Operations",
    location: "",
    hireDate: "",
    status: "active",
    languages: [],
  });
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
      });
    }
  }, [member]);

  if (!member) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumbs />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Team member not found</p>
            <Button asChild className="mt-4">
              <Link href="/admin/team">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Saving team member:", formData);
    setIsEditing(false);
    alert("Team member saved successfully!");
  };

  const handleAddArrayItem = (field: "specialties" | "languages", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] || []), value.trim()],
      });
      if (field === "specialties") setNewSpecialty("");
      if (field === "languages") setNewLanguage("");
    }
  };

  const handleRemoveArrayItem = (field: "specialties" | "languages", index: number) => {
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
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <Badge variant={member.status === "active" ? "default" : "secondary"}>
              {member.status}
            </Badge>
            <Badge variant="outline">{member.role}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/admin/team">
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
            <CardDescription>Team member details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              {isEditing ? (
                <Input
                  id="role"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.role}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              {isEditing ? (
                <Input
                  id="experience"
                  value={formData.experience || ""}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.experience}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <AssetSelector
                    value={formData.image || ""}
                    onSelect={(image) => {
                      const imageValue = Array.isArray(image) ? image[0] || "" : image;
                      setFormData({ ...formData, image: imageValue, avatar: imageValue });
                    }}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <Image
                        src={formData.image}
                        alt={formData.name || "Preview"}
                        className="w-32 h-32 object-cover rounded-full"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact & Department */}
        <Card>
          <CardHeader>
            <CardTitle>Contact & Department</CardTitle>
            <CardDescription>Contact information and department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.email || "Not set"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.phone || "Not set"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              {isEditing ? (
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{member.linkedin || "Not set"}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                {isEditing ? (
                  <Select
                    value={formData.department || "Operations"}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Customer Service">Customer Service</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="outline">{member.department}</Badge>
                )}
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
                  <p className="text-sm text-muted-foreground">{member.location}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                {isEditing ? (
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.hireDate || ""}
                    onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {new Date(member.hireDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status || "active"}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={member.status === "active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
            <CardDescription>Areas of expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add a specialty"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("specialties", newSpecialty);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("specialties", newSpecialty)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {(formData.specialties || []).map((specialty, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{specialty}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("specialties", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>Languages spoken</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add a language"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddArrayItem("languages", newLanguage);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddArrayItem("languages", newLanguage)} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {(formData.languages || []).map((language, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{language}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArrayItem("languages", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(member.languages || []).map((language, index) => (
                  <Badge key={index} variant="outline">
                    {language}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        {member.rating && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{member.rating}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tours Completed</p>
                  <p className="text-2xl font-bold">{member.toursCompleted || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
