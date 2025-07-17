"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiService } from "@/services/api";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  FolderOpen,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  deadline?: string;
  createdAt: string;
}

export default function ClientProfilePage() {
  const params = useParams();
  const { isAdmin } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      fetchClientData();
    }
  }, [params.id]);

  const fetchClientData = async () => {
    try {
      const [clientResponse, projectsResponse] = await Promise.all([
        apiService.get(`/clients/${params.id}`),
        apiService.get(`/projects?clientId=${params.id}`),
      ]);

      setClient(clientResponse.data.data);
      setProjects(projectsResponse.data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch client data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <ProtectedRoute>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-20" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <Skeleton className="h-5 w-40 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  if (!client) {
    return (
      <Layout>
        <ProtectedRoute>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Client not found
            </h2>
            <Link href="/clients">
              <Button>Back to Clients</Button>
            </Link>
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/clients">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {client.name}
                </h1>
                <p className="text-gray-600">Client Profile</p>
              </div>
            </div>

            {isAdmin && (
              <Link href={`/clients/${client.id}/edit`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Client
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client Information */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Client Details
                    <Badge
                      variant={
                        client.status === "active" ? "default" : "secondary"
                      }
                    >
                      {client.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{client.email}</span>
                  </div>

                  {client.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{client.phone}</span>
                    </div>
                  )}

                  {client.company && (
                    <div className="flex items-center space-x-3">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{client.company}</span>
                    </div>
                  )}

                  {client.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-sm">{client.address}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Joined {new Date(client.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <FolderOpen className="h-5 w-5" />
                        <span>Projects ({projects.length})</span>
                      </CardTitle>
                      <CardDescription>
                        Projects associated with this client
                      </CardDescription>
                    </div>

                    {isAdmin && (
                      <Link href={`/projects/new?clientId=${client.id}`}>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-8">
                      <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No projects yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        This client doesn't have any projects assigned.
                      </p>
                      {isAdmin && (
                        <Link href={`/projects/new?clientId=${client.id}`}>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Project
                          </Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{project.name}</h4>
                                <Badge
                                  variant={
                                    project.status === "active"
                                      ? "default"
                                      : project.status === "completed"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {project.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {project.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>
                                  Created{" "}
                                  {new Date(
                                    project.createdAt
                                  ).toLocaleDateString()}
                                </span>
                                {project.deadline && (
                                  <span>
                                    Due{" "}
                                    {new Date(
                                      project.deadline
                                    ).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link href={`/projects/${project.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                              {isAdmin && (
                                <Link href={`/projects/${project.id}/edit`}>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
