"use client";

import { useEffect, useState } from "react";

import { useCreateTask } from "../hooks";
import { CreateTaskPayload } from "../type";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/common/dialogBox";

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  projectId: string;

  columns: {
    id: string;
    name: string;
  }[];

  assignee: {
    id: string;
    name: string;
  }[];

  defaultColumnId?: string;
};

export function CreateTaskDialog({
  open,
  onOpenChange,
  projectId,
  columns,
  assignee,
  defaultColumnId,
}: CreateTaskDialogProps) {
  const createTaskMutation = useCreateTask(projectId);

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  useEffect(() => {
    setSelectedColumnId(defaultColumnId ?? "");
  }, [defaultColumnId, open]);

  function resetForm() {
    setTaskTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSelectedColumnId(defaultColumnId ?? "");
    setAssigneeId("");
  }

  function handleSubmit() {
    if (!taskTitle.trim() || !selectedColumnId) return;

    const payload: CreateTaskPayload = {
      title: taskTitle.trim(),
      description: description || undefined,
      projectId,
      columnId: selectedColumnId,
      priority,
      assigneeId: assigneeId || undefined,
    };

    createTaskMutation.mutate(payload, {
      onSuccess: () => {
        resetForm();
        onOpenChange(false);
      },
    });
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Task"
      description="Create a new task for this project."
      width="md"
    >
      <div className="space-y-5">
        <Input
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <Textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <div className="flex items-center gap-3">
          <span className="w-20 text-sm font-medium">Priority</span>

          <Select
            value={priority}
            onValueChange={(value) =>
              setPriority(value as "LOW" | "MEDIUM" | "HIGH")
            }
          >
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-20 text-sm font-medium">Assignee</span>

          <Select value={assigneeId} onValueChange={setAssigneeId}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Unassigned" />
            </SelectTrigger>

            <SelectContent>
              {assignee.map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!defaultColumnId && (
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm font-medium">Column</span>

            <Select
              value={selectedColumnId}
              onValueChange={setSelectedColumnId}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>

              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={createTaskMutation.isPending}
        >
          {createTaskMutation.isPending ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </AppDialog>
  );
}
