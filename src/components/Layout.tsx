"use client";

import type React from "react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Users, FolderOpen, Home, LogOut } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center h-auto lg:h-16">
            {/* Top row: ClientManager and Logout/User dropdown (mobile: justify-between) */}
            <div className="flex w-full items-center justify-between lg:justify-start lg:w-auto">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 whitespace-nowrap"
              >
                ClientManager
              </Link>
              <div className="block lg:hidden">
                {/* Mobile: Logout/User dropdown on the right */}
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user?.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user?.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex space-x-2">
                    <Link href="/auth/login">
                      <Button variant="ghost">Login</Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* Nav links: stacked on mobile, row on desktop */}
            <div className="w-full lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-8 mt-2 lg:mt-0">
              {isAuthenticated && (
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-row w-full">
                    <NavigationMenuItem>
                      <Link href="/dashboard" legacyBehavior passHref>
                        <NavigationMenuLink className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                          <Home className="h-4 w-4" />
                          <span>Dashboard</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/clients" legacyBehavior passHref>
                        <NavigationMenuLink className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                          <Users className="h-4 w-4" />
                          <span>Clients</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/projects" legacyBehavior passHref>
                        <NavigationMenuLink className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                          <FolderOpen className="h-4 w-4" />
                          <span>Projects</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )}
              {/* Desktop: Logout/User dropdown on the right */}
              <div className="hidden lg:block ml-auto">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user?.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user?.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex space-x-2">
                    <Link href="/auth/login">
                      <Button variant="ghost">Login</Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
