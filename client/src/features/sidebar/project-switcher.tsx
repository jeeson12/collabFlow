"use client";

import { Check, ChevronDown, FolderKanban, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProjectSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 w-full justify-between rounded-lg border px-3"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <FolderKanban className="h-4 w-4 shrink-0" />

            <span className="truncate font-medium">CollabFlow</span>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72 p-1">
        <div className="px-2 py-2">
          <p className="text-sm font-semibold">Switch Project</p>

          <p className="text-xs text-muted-foreground">Choose a project.</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex cursor-pointer items-center justify-between rounded-md p-3 bg-muted">
          <div className="space-y-1">
            <p className="font-medium">CollabFlow</p>

            <p className="text-xs text-muted-foreground">CF</p>
          </div>

          <Check className="h-4 w-4 text-primary" />
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center justify-between rounded-md p-3">
          <div className="space-y-1">
            <p className="font-medium">Portfolio Website</p>

            <p className="text-xs text-muted-foreground">PORT</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center justify-between rounded-md p-3">
          <div className="space-y-1">
            <p className="font-medium">HR Management</p>

            <p className="text-xs text-muted-foreground">HR</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
