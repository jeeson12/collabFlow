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
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceProject } from "../project-selection/api";

export function ProjectSwitcher() {
  const { workspaceId, projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();
  const router = useRouter();

  const { data: projects = [] } = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => getWorkspaceProject(workspaceId),
  });

  const currentProject = projects.find((project) => project.id === projectId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 w-full justify-between rounded-lg border px-3"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <FolderKanban className="h-4 w-4 shrink-0" />

            <span className="truncate font-medium">{currentProject?.name}</span>
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

        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() =>
              router.push(
                `/workspace/${workspaceId}/projects/${project.id}/dashboard`,
              )
            }
            className={`flex cursor-pointer items-center justify-between rounded-md p-3 ${
              project.id === projectId ? "bg-muted" : ""
            }`}
          >
            <div className="space-y-1">
              <p className="font-medium">{project.name}</p>

              <p className="text-xs text-muted-foreground">
                {project.projectKey}
              </p>
            </div>

            {project.id === projectId && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
