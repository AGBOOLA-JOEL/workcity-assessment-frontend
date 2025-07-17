"use client";

import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Users, FolderOpen, Shield, Zap } from "lucide-react";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Client Management
            <span className="text-blue-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your client relationships and project management with our
            intuitive platform. Built for teams that value efficiency and
            organization.
          </p>

          {isAuthenticated ? (
            <div className="flex justify-center space-x-4">
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
              <Link href="/clients">
                <Button variant="outline" size="lg">
                  View Clients
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link href="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600" />
              <CardTitle>Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep track of all your clients in one place with detailed
                profiles and contact information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FolderOpen className="h-8 w-8 text-green-600" />
              <CardTitle>Project Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize projects by client, track progress, and manage
                deadlines efficiently.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-purple-600" />
              <CardTitle>Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Secure access controls with admin and user roles to protect
                sensitive information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-600" />
              <CardTitle>Real-time Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stay up-to-date with instant notifications and real-time data
                synchronization.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* User Welcome Section */}
        {isAuthenticated && (
          <section className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.email}!
            </h2>
            <p className="text-gray-600 mb-6">
              You're logged in as {user?.role}. Ready to manage your clients and
              projects?
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/clients">
                <Button>View Clients</Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline">View Projects</Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
