"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useAuth } from "../auth/authProvider";

export function Profile() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="p-2">
        <div className="h-16 animate-pulse rounded-lg border bg-muted" />
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex items-center gap-3 rounded-lg border border-white/10 p-3 text-white">
        <Avatar>
          {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
          <AvatarFallback className="text-black">
            {user?.name ? getInitials(user.name) : "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium">{user?.name}</p>

          <p className="truncate text-xs text-slate-400">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
