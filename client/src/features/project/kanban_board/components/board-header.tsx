"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type BoardHeaderProps = {
  projectName: string;
  taskCount?: number;
  onCreateTask?: () => void;
};

export function BoardHeader({
  projectName,
  taskCount = 0,
  onCreateTask,
}: BoardHeaderProps) {
  return (
    <header className=" bg-background px-8 py-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            Project / {projectName}
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Kanban Board
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {taskCount} {taskCount === 1 ? "task" : "tasks"}
          </p>
        </div>

        <Button onClick={onCreateTask} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
    </header>
  );
}
