"use client";

import { useEffect, useState } from "react";

import { useCreateTask } from "../hooks";

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

  const [dueDate, setDueDate] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setSelectedColumnId(defaultColumnId ?? "");
  }, [defaultColumnId, open]);

  function resetForm() {
    setTaskTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSelectedColumnId(defaultColumnId ?? "");
    setAssigneeId("");
    setDueDate("");
    setFiles([]);
  }

  function handleSubmit() {
    if (!taskTitle.trim() || !selectedColumnId) return;

    const formData = new FormData();

    formData.append("title", taskTitle.trim());

    if (description) {
      formData.append("description", description);
    }

    formData.append("projectId", projectId);
    formData.append("columnId", selectedColumnId);
    formData.append("priority", priority);

    if (assigneeId) {
      formData.append("assigneeId", assigneeId);
    }

    if (dueDate) {
      formData.append("dueDate", dueDate);
    }

    files.forEach((file) => {
      formData.append("files", file);
    });

    createTaskMutation.mutate(formData, {
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

        {/* Attachments */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Attachments</label>

          <Input
            type="file"
            multiple
            onChange={(e) => {
              const selectedFiles = e.target.files;

              if (!selectedFiles) return;

              if (e.target.files) {
                setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
              }
            }}
          />

          {files.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {files.map((file, index) => {
                const previewUrl = URL.createObjectURL(file);

                return (
                  <div
                    key={`${file.name}-${index}`}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute right-1 top-1 z-10 rounded-full bg-black/60 px-1.5 py-0.5 text-xs text-white"
                    >
                      ✕
                    </button>

                    {file.type.startsWith("image/") ? (
                      <img
                        src={previewUrl}
                        alt={file.name}
                        className="h-16 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-16 items-center justify-center bg-muted">
                        <span className="text-xl">📄</span>
                      </div>
                    )}

                    <div className="p-1">
                      <p className="truncate text-xs font-medium">
                        {file.name}
                      </p>

                      <p className="text-[10px] text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Assignee + Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Assignee</label>

            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger>
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>

              <SelectContent>
                {assignee.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>

            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Priority + Column */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>

            <Select
              value={priority}
              onValueChange={(value) =>
                setPriority(value as "LOW" | "MEDIUM" | "HIGH")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="HIGH">High</SelectItem>

                <SelectItem value="MEDIUM">Medium</SelectItem>

                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!defaultColumnId && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Column</label>

              <Select
                value={selectedColumnId}
                onValueChange={setSelectedColumnId}
              >
                <SelectTrigger>
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
        </div>

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
