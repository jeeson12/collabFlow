"use client";

import { LogOut, Settings, User } from "lucide-react";
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

export function ProfileDropdown() {
  const { user } = useAuth();

  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/login");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="size-9 cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        {/* User Info */}
        <div className="px-3 py-2">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => loginMutation.mutate()}
          disabled={loginMutation.isPending}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {loginMutation.isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
