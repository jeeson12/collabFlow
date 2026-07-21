"use client";
import { Plus } from "lucide-react";

interface CreateWorkspaceCardProps {
  onClick?: () => void;
}

export function CreateWorkspaceCard({ onClick }: CreateWorkspaceCardProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="flex min-h-65 flex-col items-center justify-center rounded-2xl border-2 border-dashed transition hover:border-primary hover:bg-muted/50"
      >
        <Plus className="mb-4 h-8 w-8" />

        <h3 className="text-lg font-semibold">Create Workspace</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Start a new workspace
        </p>
      </button>
    </>
  );
}
