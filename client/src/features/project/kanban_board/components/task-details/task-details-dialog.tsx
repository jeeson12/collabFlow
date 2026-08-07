"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Task } from "@/features/project/kanban_board/type";

import { TaskDetailsContent } from "./task-details-content";
import { TaskDetailsHeader } from "./task-details-header";
import { TaskDetailsComments } from "./task-details-comment";
import { TaskDetailsSidebar } from "./task-details-sidebar";

type TaskDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
};

export function TaskDetailsDialog({
  open,
  onOpenChange,
  task,
}: TaskDetailsDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex
          max-h-[85vh]
          w-full
          sm:max-w-5xl
          flex-col
          overflow-hidden
          p-0
        "
      >
        {/* Header */}
        <TaskDetailsHeader task={task} />

        {/* Body */}
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_260px]">
          {/* Main */}
          <main className="min-h-0 min-w-0 overflow-y-auto">
            <div className="space-y-8 px-7 py-7">
              <TaskDetailsContent task={task} />

              <TaskDetailsComments task={task} />
            </div>
          </main>

          {/* Sidebar */}
          <TaskDetailsSidebar task={task} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
