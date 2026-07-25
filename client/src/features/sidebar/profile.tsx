"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../auth/authProvider";

export function Profile() {
  const { user, isLoading } = useAuth();
  console.log("Profile User:", user);
  console.log("Loading:", isLoading);

  if (isLoading) {
    return (
      <div className="p-2">
        <div className="h-16 animate-pulse rounded-lg border bg-muted" />
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex items-center gap-3 rounded-lg border p-3">
        <Avatar>
          <AvatarFallback>
            {user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium">{user?.name}</p>

          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
