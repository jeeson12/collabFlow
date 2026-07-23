"use client";

import { Building2, Check, ChevronDown, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "@/features/workspace/api";
import { useParams, useRouter } from "next/navigation";

export function WorkspaceSwitcher() {
  const router = useRouter();

  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { data: workspace = [], isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
  const currentWorkspace = workspace.find(
    (workspace) => workspace.id === workspaceId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 gap-2 rounded-lg px-3 transition-colors"
        >
          <Building2 className="h-4 w-4 shrink-0" />

          <span className="max-w-[180px] truncate font-medium">
            <p className="text-sm">Switch Workspace</p>
          </span>

          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72 p-1">
        <div className="px-2 py-2">
          <p className="text-xs text-muted-foreground">Choose a workspace.</p>
        </div>

        <DropdownMenuSeparator />

        {workspace.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => {
              router.push(`/workspace/${workspace.id}/projects`);
            }}
            className={`flex cursor-pointer items-center justify-between rounded-md p-3 ${
              workspace.id === workspaceId ? "bg-muted" : ""
            }`}
          >
            <div className="space-y-1">
              <p className="font-medium">{workspace.name}</p>

              <p className="text-xs text-muted-foreground">
                {workspace._count.projects}{" "}
                {workspace._count.projects === 1 ? "Project" : "Projects"}
              </p>
            </div>

            {workspace.id === workspaceId && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Create Workspace
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer rounded-md">
          <Users className="mr-2 h-4 w-4" />
          Join Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
