"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Profile() {
  return (
    <div className=" p-2">
      <div className="flex items-center gap-3 rounded-lg border p-3">
        <Avatar>
          <AvatarFallback>JJ</AvatarFallback>
        </Avatar>

        <div className="overflow-hidde  n">
          <p className="truncate text-sm font-medium">Jeeson</p>

          <p className="truncate text-xs text-muted-foreground">
            Software Developer
          </p>
        </div>
      </div>
    </div>
  );
}
