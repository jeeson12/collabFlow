"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  FolderKanban,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Workspace } from "../type";
import { DeleteWorkspaceDialog } from "./deleteDialog";

type WorkspaceCardProps = {
  workspace: Workspace;
  onEdit: () => void;
};

export function WorkspaceCard({ workspace, onEdit }: WorkspaceCardProps) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FolderKanban className="h-6 w-6 text-primary" />
          </div>

          <div className="flex items-center gap-2">
            <Badge>Admin</Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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

        {/* Body */}
        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold">{workspace.name}</h3>

          <p className="text-sm text-muted-foreground">
            Team collaboration workspace
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>12 Members</span>
          </div>

          <div className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4" />
            <span>
              {workspace._count.projects}{" "}
              {workspace._count.projects === 1 ? "Project" : "Projects"}
            </span>
          </div>
        </div>

        {/* Action */}
        <Button
          className="mt-8 w-full justify-between"
          onClick={() => router.push(`/workspace/${workspace.id}/projects`)}
        >
          Open Workspace
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <DeleteWorkspaceDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        workspace={workspace}
      />
    </>
  );
}
