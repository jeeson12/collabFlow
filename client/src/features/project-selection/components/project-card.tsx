"use client";

import {
  CheckCircle2,
  Clock3,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Project } from "../type";
import { DeleteProject } from "./deleteProject";

type ProjectCardProps = {
  project: Project;
  onEdit: () => void;
};

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const totalTasks = project._count?.tasks ?? 0;

  const completedTasks = project.completedTasks ?? 0;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      onClick={() =>
        router.push(
          `/workspace/${workspaceId}/projects/${project.id}/dashboard`,
        )
      }
      className="flex h-full flex-col cursor-pointer overflow-hidden rounded-xl border border-[#063325]/50 bg-white shadow-none transition-all duration-200 hover:-translate-y-1 hover:border-[#063325]/30"
    >
      <div className="flex flex-1 flex-col justify-between space-y-4 p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted font-bold text-foreground">
              {project.projectKey || "PR"}
            </div>

            <div className="min-w-0">
              <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                {project.name}
              </h3>

              <p className="line-clamp-1 text-xs text-muted-foreground">
                {project.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:bg-muted/50"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span>Progress</span>

            <span>{completionRate}%</span>
          </div>

          <Progress
            value={completionRate}
            className="h-1 border-black "
            indicatorClassName="bg-green-900 rounded"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* TODO: replace with actual project member avatar */}
          <Avatar className="h-8 w-8 border border-background">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5" />

            <span>
              {completedTasks} / {totalTasks}
            </span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="flex items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
        <Clock3 className="h-3.5 w-3.5" />

        <span>No recent activity</span>
      </div>

      <DeleteProject
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        project={project}
      />
    </div>
  );
}
