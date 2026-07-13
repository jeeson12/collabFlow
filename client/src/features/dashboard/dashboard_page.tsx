"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/api";
import { useAuth } from "@/features/auth/authProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      router.replace("/login");
    },
  });
  const handleLogout = async () => {
    logoutMutation.mutate();
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
      <p>{user?.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
