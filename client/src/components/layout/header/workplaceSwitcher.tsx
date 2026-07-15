"use client";

import { Check, ChevronDown, Plus, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg px-3"
        >
          <Building2 className="h-4 w-4" />

          <span className="max-w-[140px] truncate font-medium">CollabFlow</span>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold">Switch Workspace</p>

          <p className="text-xs text-muted-foreground">
            Select a workspace to continue.
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-medium">CollabFlow</p>

            <p className="text-xs text-muted-foreground">5 Projects</p>
          </div>

          <Check className="h-4 w-4 text-primary" />
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <div>
            <p className="font-medium">Marketing Team</p>

            <p className="text-xs text-muted-foreground">3 Projects</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <div>
            <p className="font-medium">Personal</p>

            <p className="text-xs text-muted-foreground">1 Project</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Create Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
