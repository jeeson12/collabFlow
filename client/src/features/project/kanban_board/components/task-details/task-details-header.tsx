"use client";

import { DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { priorityStyles } from "@/lib/utils";
import { Task } from "@/features/project/kanban_board/type";

type TaskDetailsHeaderProps = {
  task: Task;
};

export function TaskDetailsHeader({ task }: TaskDetailsHeaderProps) {
  return (
    <DialogHeader className="shrink-0 border-b px-6 py-5">
      {/* Ticket ID + Priority */}

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-muted-foreground">
          {task.ticketId}
        </span>

        <Badge variant="outline" className={priorityStyles[task.priority]}>
          {task.priority}
        </Badge>
      </div>

      {/* Title + Column */}

      <div className="mt-3 flex items-center justify-between gap-6">
        <h1 className="min-w-0 text-2xl font-semibold tracking-tight">
          {task.title}
        </h1>

        <Badge
          variant="secondary"
          className="shrink-0 px-3 py-1 text-sm font-medium"
        >
          {task.column.name}
        </Badge>
      </div>
    </DialogHeader>
  );
}
