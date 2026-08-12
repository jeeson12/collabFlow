"use client";

import {
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { priorityStyles } from "@/lib/utils";
import { Task } from "@/features/project/kanban_board/type";

type TaskDetailsSidebarProps = {
  task: Task;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TaskDetailsSidebar({ task }: TaskDetailsSidebarProps) {
  return (
    <aside className="min-h-0 overflow-hidden border-l bg-muted/20">
      <div className="h-full min-h-0 overflow-y-auto p-5">
        <div className="flex flex-col gap-7">
          {/* Status */}
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Status
            </p>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />

              <Badge variant="secondary" className="px-3 py-1">
                {task.column.name}
              </Badge>
            </div>
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
                <Avatar className="h-9 w-9">
                  {task.assignee.avatarPath && (
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_URL}/auth/avatar/${task.assignee.id}`}
                      alt=""
                    />
                  )}
                  <AvatarFallback className="text-xs font-medium">
                    {getInitials(task.assignee.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {task.assignee.name}
                  </p>

                  <p className="text-xs text-muted-foreground">Assigned</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="h-4 w-4" />
                <span>Unassigned</span>
              </div>
            )}
          </section>

          {/* Created By */}
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Created by
            </p>

            <div className="flex items-center gap-3">
              <Avatar className="h-7 w-7">
                {task.creator.avatarPath && (
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}/auth/avatar/${task.creator.id}`}
                    alt=""
                  />
                )}
                <AvatarFallback className="text-xs font-medium">
                  {getInitials(task.creator.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {task.creator.name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {task.creator.email}
                </p>
              </div>
            </div>
          </section>

          {/* Due Date */}
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Due date
            </p>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />

              <p className="text-sm font-medium">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No due date"}
              </p>
            </div>
          </section>

          {/* Task Information */}
        </div>
      </div>
    </aside>
  );
}
