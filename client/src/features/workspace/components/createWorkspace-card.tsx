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
        className="flex min-h-65 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#063325]/50 bg-white/50 transition-all duration-200 hover:-translate-y-1 hover:border-[#063325]/50 hover:bg-[#063325]/5"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#063325]/50">
          <Plus className="h-6 w-6 text-[#063325]" />
        </div>

        <h3 className="text-xl font-bold font-serif">Create Workspace</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Start a new workspace
        </p>
      </button>
    </>
  );
}
