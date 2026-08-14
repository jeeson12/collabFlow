"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Task } from "@/features/project/kanban_board/type";

import { TaskDetailsContent } from "./task-details-content";
import { TaskDetailsHeader } from "./task-details-header";
import { TaskDetailsComments } from "./task-details-comment";
import { TaskDetailsSidebar } from "./task-details-sidebar";
import { CreateTaskDialog } from "../create-task-dialog";

import { deleteTask } from "../../api";
import { AppDialog } from "@/components/common/dialogBox";
import { toast } from "sonner";

type TaskDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  task: Task | null;

  columns?: {
    id: string;
    name: string;
  }[];

  assignee?: {
    id: string;
    name: string;
  }[];

  onTaskUpdated?: (updatedTask: Task) => void;
};

export function TaskDetailsDialog({
  open,
  onOpenChange,
  task,
  columns = [],
  assignee = [],
  onTaskUpdated,
}: TaskDetailsDialogProps) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!task) {
        throw new Error("Task not found");
      }

      return deleteTask(task.id);
    },

    onSuccess: () => {
      if (!task) return;

      toast.success("Task deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["overview", task.projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-overview", task.projectId],
      });

      onOpenChange(false);
    },

    onError: (error) => {
      console.error("Failed to delete task:", error);
    },
  });

  if (!task) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex h-[85vh] max-h-[85vh] sm:max-w-5xl  flex-col overflow-hidden p-0">
          {" "}
          {/* Header */}
          <TaskDetailsHeader
            task={task}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteMutation.mutate()}
            isDeleting={deleteMutation.isPending}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          {/* Body */}
          <div className="flex flex-col md:flex-row min-h-0 flex-1 overflow-hidden">
            {/* Main */}
            <main className="min-h-0 flex-1 min-w-0 overflow-y-auto">
              <div className="space-y-4 px-7 pb-7">
                <TaskDetailsContent task={task} />

                <TaskDetailsComments task={task} />
              </div>
            </main>

            {/* Sidebar */}
            {isSidebarOpen && (
              <aside className="w-full md:w-65 shrink-0 border-l border-border/50 overflow-y-auto bg-muted/20">
                <TaskDetailsSidebar task={task} />
              </aside>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Task */}
      <CreateTaskDialog
        open={isEditing}
        onOpenChange={setIsEditing}
        mode="edit"
        task={task}
        projectId={task.projectId}
        columns={columns}
        assignee={assignee}
        onTaskUpdated={(updatedTask) => {
          onTaskUpdated?.(updatedTask);
        }}
      />
    </>
  );
}
