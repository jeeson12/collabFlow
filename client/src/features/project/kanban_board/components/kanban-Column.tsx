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
};

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  return (
    <div className="flex w-72.5 shrink-0 flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 mb-3 flex items-center justify-between rounded-md bg-[#f7f8fa] py-1">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${column.color}`} />

          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {column.title}
          </h2>

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
          <TaskCard key={task.id} task={task} />
        ))}

        <CreateTaskButton />

        {tasks.length === 0 && <EmptyColumn />}
      </div>
    </div>
  );
}
