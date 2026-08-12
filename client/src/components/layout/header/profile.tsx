"use client";

import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/features/auth/authProvider";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/features/auth/api";
import { getInitials, handleApiError } from "@/lib/utils";
import { SettingsDialog } from "@/components/common/settings-dialog";
import { useState } from "react";

export function ProfileDropdown() {
  const { user } = useAuth();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },

    onError: (error) => {
      handleApiError(error);
      // Fallback in case of server error: still clear cache and redirect
      queryClient.clear();
      router.push("/");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-10 w-10 cursor-pointer">
              {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
              <AvatarFallback>
                {user?.name ? getInitials(user.name) : "?"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-72 p-0">
          {/* Profile Information */}
          <div className="flex flex-col items-center px-6 py-6">
            <Avatar className="h-20 w-20">
              {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
              <AvatarFallback className="text-xl">
                {user?.name ? getInitials(user.name) : "?"}
              </AvatarFallback>
            </Avatar>

            <p className="mt-3 font-semibold">{user?.name || "User"}</p>

            <p className="mt-1 max-w-full truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>

          <DropdownMenuSeparator />

          {/* Actions */}
          <div className="flex items-center gap-2 p-2">
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                setSettingsOpen(true);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />

              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
