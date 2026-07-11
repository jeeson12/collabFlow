"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./authProvider";
import { useEffect } from "react";
type protectedRoutesprops = { children: React.ReactNode };

export default function protectedRoutes({ children }: protectedRoutesprops) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
