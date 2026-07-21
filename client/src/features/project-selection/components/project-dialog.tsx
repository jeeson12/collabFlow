"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "./project-form";
import { Project } from "../type";

type CreateProjectDialogProps = {
  workspaceId: string;
  project?: Project;
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDialog({
  project,
  mode,
  workspaceId,
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create" : "Edit"}</DialogTitle>
        </DialogHeader>

        <ProjectForm
          mode={mode}
          project={project}
          onSuccess={() => onOpenChange(false)}
          workspaceId={workspaceId}
        />
      </DialogContent>
    </Dialog>
  );
}
