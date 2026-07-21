"use client";
import { Workspace } from "../type";
import { WorkspaceForm } from "./workspaceForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type dialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  workspace?: Workspace;
};

export function WorkspaceDialog({
  open,
  onOpenChange,
  mode,
  workspace,
}: dialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Workspace" : "Edit Workspace"}
          </DialogTitle>
        </DialogHeader>

        <WorkspaceForm
          mode={mode}
          workspace={workspace}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
