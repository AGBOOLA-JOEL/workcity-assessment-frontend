"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "@/services/api";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiService.setAuthToken(token);
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiService.get("/auth/profile");
      setUser(response.data.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      apiService.setAuthToken("");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { token, user } = response.data.data;

    localStorage.setItem("token", token);
    apiService.setAuthToken(token);
    setUser(user);
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const response = await apiService.post("/auth/signup", {
      email,
      password,
      confirmPassword,
    });
    const { token, user } = response.data.data;

    localStorage.setItem("token", token);
    apiService.setAuthToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    apiService.setAuthToken("");
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
