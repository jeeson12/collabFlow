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

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!task) {
        throw new Error("Task not found");
      }

      return deleteTask(task.id);
    },

    onSuccess: () => {
      if (!task) return;

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
          />
          {/* Body */}
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_260px]">
            {/* Main */}
            <main className="min-h-0 min-w-0 overflow-y-auto">
              <div className="space-y-4 px-7 pb-7">
                <TaskDetailsContent task={task} />

                <TaskDetailsComments task={task} />
              </div>
            </main>

            {/* Sidebar */}
            <TaskDetailsSidebar task={task} />
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
