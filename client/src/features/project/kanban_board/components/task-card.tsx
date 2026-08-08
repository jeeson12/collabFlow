"use client";

import { Calendar, MessageCircle, Paperclip } from "lucide-react";
import { format } from "date-fns";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { priorityStyles } from "@/lib/utils";

import { Task } from "@/features/project/kanban_board/type";

type TaskCardProps = {
  task: Task;
  onClick: () => void;
  isOverlay?: boolean;
  disableAnimation?: boolean;
};

export function TaskCard({
  task,
  onClick,
  isOverlay = false,
  disableAnimation = false,
}: TaskCardProps) {
  const draggable = useDraggable({
    id: `task-${task.id}`,
    data: {
      type: "task",
      task,
    },
    disabled: isOverlay || disableAnimation,
  });

  const droppable = useDroppable({
    id: `droppable-task-${task.id}`,
    data: {
      type: "task",
      task,
    },
    disabled: isOverlay || disableAnimation,
  });

  const { attributes, listeners, isDragging } = draggable;

  const setNodeRef = (node: HTMLElement | null) => {
    draggable.setNodeRef(node);
    droppable.setNodeRef(node);
  };

  if (isOverlay) {
    return (
      <Card className="w-75  cursor-grabbing shadow-xl border-primary/50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">
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

  return (
    <div className="">
      <Card
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={onClick}
        className={`cursor-grab transition-opacity  
    mx-auto
    rounded-md
    border
    bg-background
    px-3
    py-2.5
    hover:-translate-y-0.5
    hover:border-black
    hover:shadow-md ${isDragging ? "opacity-30" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">
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
    </div>
  );
}
