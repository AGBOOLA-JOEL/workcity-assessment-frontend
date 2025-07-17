"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Calendar, Edit, User, ArrowLeft } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
    // eslint-disable-next-line
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await apiService.get(`/projects/${params.id}`);
      setProject(response.data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch project data",
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
          <div className="max-w-2xl mx-auto py-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <ProtectedRoute>
          <div className="max-w-2xl mx-auto py-8 text-center text-gray-600">
            Project not found.
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto py-8 space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex-1">
              {project.name}
            </h1>
            <Badge variant="default">{project.status}</Badge>
            <Link href={`/projects/${project.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" /> Edit
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {project.client
                  ? `${project.client.name} (${project.client.email})`
                  : "Unknown Client"}
              </div>
              {project.deadline && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Updated:{" "}
                {project.updatedAt
                  ? new Date(project.updatedAt).toLocaleDateString()
                  : "-"}
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
