"use client";

import { Calendar, MessageCircle, Paperclip } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { priorityStyles } from "@/lib/utils";

import { Task } from "@/features/project/kanban_board/type";
import { format } from "date-fns";

type TaskCardProps = {
  task: Task;
  onClick: () => void;
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card
      onClick={onClick}
      className="
    group
    w-[95%]
    mx-auto
    cursor-pointer
    rounded-md
    border
    bg-background
    px-3
    py-2.5
    transition-all
    hover:-translate-y-0.5
    hover:border-black
    hover:shadow-md
  "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
          {task.ticketId}
        </span>

        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-[10px]">
            {task.assignee?.name}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {task.dueDate
              ? format(new Date(task.dueDate), "dd MMM")
              : "No due date"}
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {task.comments}
          </div>

          <div className="flex items-center gap-1">
            <Paperclip className="h-3 w-3" />
            {task.attachments}
          </div>
        </div>
      </div>
    </Card>
  );
}
