"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Column, Task } from "@/features/project/kanban_board/type";

import { CreateTaskButton } from "./createTask-button";
import { TaskCard } from "./task-card";
import { EmptyColumn } from "./emptyColumn";

type KanbanColumnProps = {
  column: Column;
  tasks: Task[];
  onCreateTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
};

export function KanbanColumn({
  column,
  tasks,
  onCreateTask,
  onTaskClick,
}: KanbanColumnProps) {
  return (
    <div className="w-75 shrink-0 rounded-lg border bg-muted/30 p-3">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{column.name}</h2>

          <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold shadow-sm">
            {tasks.length}
          </span>
        </div>

        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}

        <CreateTaskButton onClick={() => onCreateTask(column.id)} />

        {tasks.length === 0 && <EmptyColumn />}
      </div>
    </div>
  );
}
