"use client";

import { DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { priorityStyles } from "@/lib/utils";
import { Task } from "@/features/project/kanban_board/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type TaskDetailsHeaderProps = {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  isDeleting: boolean;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
};

export function TaskDetailsHeader({
  task,
  onDelete,
  onEdit,
  isDeleting,
  isSidebarOpen,
  onToggleSidebar,
}: TaskDetailsHeaderProps) {
  return (
    <DialogHeader className="shrink-0 border-b px-6 pt-3 pb-4">
      {/* Ticket ID + Priority */}

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-muted-foreground">
          {task.ticketId}
        </span>

        <Badge variant="outline" className={`${priorityStyles[task.priority]} rounded-full border px-3`}>
          {task.priority}
        </Badge>
      </div>

      {/* Title + Column */}

      <div className="mt-1 flex items-center justify-between gap-6">
        <h1 className="min-w-0 text-3xl font-bold font-serif text-[#063325] tracking-tight">
          {task.title}
        </h1>

        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="flex h-8 w-8 shrink-0"
              title={isSidebarOpen ? "Hide Details" : "Show Details"}
            >
              {isSidebarOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Task actions</span>
              </Button>
            </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              disabled={isDeleting}
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </DialogHeader>
  );
}
