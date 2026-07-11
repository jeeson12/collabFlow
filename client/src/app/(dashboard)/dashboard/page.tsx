"use client";
import { useAuth } from "@/features/auth/authProvider";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  console.log({
    user,
    isAuthenticated,
    isLoading,
  });
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
