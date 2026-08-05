"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type BoardHeaderProps = {
  projectName: string;
  onCreateTask?: () => void;
};

export function BoardHeader({ projectName, onCreateTask }: BoardHeaderProps) {
  return (
    <div className="border-b bg-background px-8 py-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Project / {projectName}
          </p>

          <h1 className="mt-1 text-3xl font-bold">Kanban Board</h1>
        </div>

        <Button onClick={onCreateTask}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
    </div>
  );
}
