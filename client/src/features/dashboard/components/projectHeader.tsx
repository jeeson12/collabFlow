"use client";

import { FolderKanban, Plus, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <FolderKanban className="h-6 w-6 text-primary" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              CollabFlow Project
            </h1>

            <Badge variant="secondary">Active</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Team collaboration and project management platform
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>

        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
    </div>
  );
}
