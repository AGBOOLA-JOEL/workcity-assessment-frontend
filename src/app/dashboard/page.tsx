"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";
import { Users, FolderOpen, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [clientsResponse, projectsResponse] = await Promise.all([
        apiService.get("/clients"),
        apiService.get("/projects"),
      ]);

      const clients = clientsResponse.data.data;
      const projects = projectsResponse.data.data;

      setStats({
        totalClients: clients.length,
        totalProjects: projects.length,
        activeProjects: projects.filter((p: any) => p.status === "active")
          .length,
        completedProjects: projects.filter((p: any) => p.status === "completed")
          .length,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ProtectedRoute>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center flex-col lg:flex-row gap-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user?.email}! Here's what's happening.
              </p>
            </div>

            {isAdmin && (
              <div className="flex space-x-1 w-full justify-start gap-2 lg:justify-end">
                <Link href="/clients/new">
                  <Button>
                    <Plus className="h-4 w-5 mr-2" />
                    Add Client
                  </Button>
                </Link>
                <Link href="/projects/new">
                  <Button variant="outline">
                    <Plus className="h-4 w-5 mr-2" />
                    Add Project
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Clients
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats?.totalClients || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Active client relationships
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Projects
                    </CardTitle>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats?.totalProjects || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All projects managed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Projects
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats?.activeProjects || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently in progress
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completed
                    </CardTitle>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats?.completedProjects || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Successfully delivered
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to get you started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/clients" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View All Clients
                  </Button>
                </Link>
                <Link href="/projects" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    View All Projects
                  </Button>
                </Link>
                {isAdmin && (
                  <>
                    <Link href="/clients/new" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Client
                      </Button>
                    </Link>
                    <Link href="/projects/new" className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Project
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">System initialized</p>
                      <p className="text-xs text-muted-foreground">
                        Welcome to your dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
