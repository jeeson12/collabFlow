"use client";

import { Plus } from "lucide-react";

type CreateTaskButtonProps = {
  onClick?: () => void;
};

export function CreateTaskButton({ onClick }: CreateTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        h-11
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-dashed
        border-muted-foreground/25
        bg-background/70
        text-xs
        font-medium
        text-muted-foreground
        transition-all
        hover:border-primary/40
        hover:bg-background
        hover:text-foreground
      "
    >
      <Plus className="h-3.5 w-3.5" />
      Create Task
    </button>
  );
}
