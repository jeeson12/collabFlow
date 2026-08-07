"use client";

import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { priorityStyles } from "@/lib/utils";
import { Task } from "@/features/project/kanban_board/type";

type TaskDetailsSidebarProps = {
  task: Task;
};

export function TaskDetailsSidebar({ task }: TaskDetailsSidebarProps) {
  return (
    <aside className="min-h-0 overflow-y-auto border-l bg-muted/10">
      <div className="space-y-7 px-5 py-7">
        {/* Status */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Status
          </p>

          <Badge variant="secondary" className="px-3 py-1">
            {task.column.name}
          </Badge>
        </section>

        {/* Priority */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Priority
          </p>

          <Badge variant="outline" className={priorityStyles[task.priority]}>
            {task.priority}
          </Badge>
        </section>

        {/* Assignee */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Assignee
          </p>

          {task.assignee ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {task.assignee.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <p className="text-sm font-medium">{task.assignee.name}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Unassigned</p>
          )}
        </section>

        {/* Due Date */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Due date
          </p>

          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <span>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No due date"}
            </span>
          </div>
        </section>

        {/* Labels */}

        <section>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Labels
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Frontend</Badge>

            <Badge variant="secondary">UI</Badge>
          </div>
        </section>
      </div>
    </aside>
  );
}
