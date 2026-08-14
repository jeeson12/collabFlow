"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

import { Task, updateTaskType } from "../type";
import { useCreateTask } from "../hooks";
import { updateTask } from "../api";

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  projectId: string;

  columns?: {
    id: string;
    name: string;
  }[];

  assignee?: {
    id: string;
    name: string;
  }[];

  defaultColumnId?: string;

  mode?: "create" | "edit";

  task?: Task;

  onTaskUpdated?: (updatedTask: Task) => void;
};

/* -------------------------------------------------------------------------- */
/* File Preview                                                               */
/* -------------------------------------------------------------------------- */

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-background shadow-sm transition-shadow hover:shadow-md">
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
        aria-label={`Remove ${file.name}`}
      >
        ✕
      </button>

      {/* Preview */}
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={file.name}
          className="h-24 w-full object-cover"
        />
      ) : (
        <div className="flex h-24 items-center justify-center bg-muted">
          <span className="text-3xl">📄</span>
        </div>
      )}

      {/* File information */}
      <div className="space-y-1 p-3">
        <p className="truncate text-xs font-medium" title={file.name}>
          {file.name}
        </p>

        <p className="text-[11px] text-muted-foreground">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Create Task Dialog                                                         */
/* -------------------------------------------------------------------------- */

export function CreateTaskDialog({
  open,
  onOpenChange,
  mode = "create",
  task,
  projectId,
  columns = [],
  assignee = [],
  defaultColumnId,
  onTaskUpdated,
}: CreateTaskDialogProps) {
  const queryClient = useQueryClient();

  const isEditMode = mode === "edit";

  const createTaskMutation = useCreateTask(projectId);

  /* ------------------------------------------------------------------------ */
  /* Form state                                                               */
  /* ------------------------------------------------------------------------ */

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  /* ------------------------------------------------------------------------ */
  /* Update task mutation                                                     */
  /* ------------------------------------------------------------------------ */

  const updateTaskMutation = useMutation({
    mutationFn: (data: updateTaskType) => {
      if (!task) {
        throw new Error("Task not found");
      }

      return updateTask(task.id, data);
    },

    onSuccess: (updatedTask: Task) => {
      /* Update task cache immediately */
      queryClient.setQueryData<Task[]>(["tasks", projectId], (oldTasks) => {
        if (!oldTasks) {
          return oldTasks;
        }

        return oldTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        );
      });

      /* Refetch task list */
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });

      /* Refresh board overview */
      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });

      /* Refresh task overview */
      queryClient.invalidateQueries({
        queryKey: ["task-overview", projectId],
      });

      /* Notify parent */
      onTaskUpdated?.(updatedTask);

      /* Close dialog */
      onOpenChange(false);
    },

    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });

  /* ------------------------------------------------------------------------ */
  /* Populate form                                                           */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!open) {
      return;
    }

    if (isEditMode && task) {
      setTaskTitle(task.title);

      setDescription(task.description ?? "");

      setPriority(task.priority);

      setSelectedColumnId(task.column?.id ?? "");

      setAssigneeId(task.assignee?.id ?? "");

      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      );

      /*
       * Attachments are handled separately in edit mode.
       * Do not mix existing attachments with File objects.
       */
      setFiles([]);

      return;
    }

    /* Create mode */
    setTaskTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSelectedColumnId(defaultColumnId ?? "");
    setAssigneeId("");
    setDueDate("");
    setFiles([]);
  }, [open, isEditMode, task, defaultColumnId]);

  /* ------------------------------------------------------------------------ */
  /* Reset form                                                               */
  /* ------------------------------------------------------------------------ */

  function resetForm() {
    setTaskTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSelectedColumnId(defaultColumnId ?? "");
    setAssigneeId("");
    setDueDate("");
    setFiles([]);
  }

  /* ------------------------------------------------------------------------ */
  /* File selection                                                           */
  /* ------------------------------------------------------------------------ */

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const newFiles = Array.from(selectedFiles);

    setFiles((previousFiles) => [...previousFiles, ...newFiles]);

    /*
     * Reset input so selecting the same file again
     * triggers onChange.
     */
    event.target.value = "";
  }

  /* ------------------------------------------------------------------------ */
  /* Remove file                                                              */
  /* ------------------------------------------------------------------------ */

  function removeFile(index: number) {
    setFiles((previousFiles) =>
      previousFiles.filter((_, fileIndex) => fileIndex !== index),
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Submit                                                                   */
  /* ------------------------------------------------------------------------ */

  function handleSubmit() {
    if (!taskTitle.trim()) {
      return;
    }

    /* ---------------------------------------------------------------------- */
    /* EDIT TASK                                                              */
    /* ---------------------------------------------------------------------- */

    if (isEditMode) {
      if (!task) {
        return;
      }

      if (!selectedColumnId) {
        return;
      }

      const data: updateTaskType = {
        title: taskTitle.trim(),

        description: description.trim() || undefined,

        priority,

        columnId: selectedColumnId,

        /*
         * Empty string means explicitly unassign.
         */
        assigneeId: assigneeId || null,

        /*
         * Backend expects string/null.
         */
        dueDate: dueDate || null,
      };

      updateTaskMutation.mutate(data);

      return;
    }

    /* ---------------------------------------------------------------------- */
    /* CREATE TASK                                                            */
    /* ---------------------------------------------------------------------- */

    if (!selectedColumnId) {
      return;
    }

    const formData = new FormData();

    formData.append("title", taskTitle.trim());

    if (description.trim()) {
      formData.append("description", description.trim());
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

    /* ---------------------------------------------------------------------- */
    /* Attachments                                                            */
    /* ---------------------------------------------------------------------- */

    files.forEach((file) => {
      formData.append("files", file, file.name);
    });

    /* Debug: verify files actually exist in FormData */
    console.log("Creating task with files:", files);

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`FormData ${key}:`, value.name, value.type, value.size);
      } else {
        console.log(`FormData ${key}:`, value);
      }
    }

    /* ---------------------------------------------------------------------- */
    /* Send request                                                           */
    /* ---------------------------------------------------------------------- */

    createTaskMutation.mutate(formData, {
      onSuccess: () => {
        resetForm();

        onOpenChange(false);
      },
    });
  }

  const isSubmitting =
    createTaskMutation.isPending || updateTaskMutation.isPending;

  /* ------------------------------------------------------------------------ */
  /* UI                                                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEditMode ? "Edit Task" : "Create Task"}
    >
      <div className="space-y-6">
        {/* ---------------------------------------------------------------- */}
        {/* Title                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Task title</label>

          <Input
            placeholder="What needs to be done?"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            className="h-10"
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Description                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Textarea
            placeholder="Add a description..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Attachments                                                       */}
        {/* ---------------------------------------------------------------- */}

        {!isEditMode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Attachments</label>

              {files.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {files.length} {files.length === 1 ? "file" : "files"}
                </span>
              )}
            </div>

            {/* File input */}
            <div className="rounded-lg border border-dashed bg-muted/30 p-4">
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>

            {/* Selected files */}
            {files.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {files.map((file, index) => (
                  <FilePreview
                    key={`${file.name}-${file.lastModified}-${index}`}
                    file={file}
                    onRemove={() => removeFile(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Assignee + Due Date                                               */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Assignee */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assignee</label>

            <Select
              value={assigneeId || "unassigned"}
              onValueChange={(value) =>
                setAssigneeId(value === "unassigned" ? "" : value)
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>

                {assignee.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Due date</label>

            <Input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="h-10"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Priority + Column                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>

            <Select
              value={priority}
              onValueChange={(value) =>
                setPriority(value as "LOW" | "MEDIUM" | "HIGH")
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="HIGH">High</SelectItem>

                <SelectItem value="MEDIUM">Medium</SelectItem>

                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Column */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Column</label>

            <Select
              value={selectedColumnId}
              onValueChange={setSelectedColumnId}
            >
              <SelectTrigger className="h-10">
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
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Submit                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="border-t pt-5">
          <Button
            className="h-10 w-full"
            onClick={handleSubmit}
            disabled={isSubmitting || !taskTitle.trim() || !selectedColumnId}
          >
            {isSubmitting
              ? isEditMode
                ? "Saving..."
                : "Creating..."
              : isEditMode
                ? "Save Changes"
                : "Create Task"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
