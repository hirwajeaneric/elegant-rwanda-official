"use client";

import { useState, useEffect } from "react";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTableLoader } from "@/components/dashboard/DataTableLoader";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/team");
      const data = await response.json();
      if (data.success) {
        setTeam(data.teams || []);
      } else {
        toast.error("Failed to load team members");
      }
    } catch (error) {
      console.error("Failed to load team:", error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: TeamMember) => (
        <Badge variant={item.status === "ACTIVE" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: TeamMember) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/team/${item.id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <DataTableLoader columnCount={4} rowCount={8} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-3xl font-bold mt-4">Team Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage team members and staff
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Link>
        </Button>
      </div>

      {team.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No team members found.</p>
          <Button asChild>
            <Link href="/admin/team/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Team Member
            </Link>
          </Button>
        </div>
      ) : (
        <DataTable
          data={team}
          columns={columns}
          searchPlaceholder="Search team members..."
          filterOptions={[
            {
              key: "status",
              label: "Status",
              options: [
                { value: "ACTIVE", label: "Active" },
                { value: "INACTIVE", label: "Inactive" },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}
