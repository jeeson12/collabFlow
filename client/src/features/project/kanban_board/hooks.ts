import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createColumn,
  createTask,
  deleteColumn,
  reorderColumn,
  updateColumn,
  updateTask,
} from "./api";
import { updateTaskType } from "./type";

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      toast.success("Task created successfully");

      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });
    },
  });

  return createTaskMutation;
}

export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: updateTaskType }) =>
      updateTask(taskId, data),
    onSuccess: () => {
      toast.success("Task updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });
    },
  });

  return updateTaskMutation;
}

export function useCreateColumn(projectId: string) {
  const queryClient = useQueryClient();

  const createColumnMutation = useMutation({
    mutationFn: (name: string) => createColumn(projectId, name),

    onSuccess: () => {
      toast.success("Column created successfully");

      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });
    },
  });

  return createColumnMutation;
}

export function useUpdateColumn(projectId: string) {
  const queryClient = useQueryClient();

  const updateColumnMutation = useMutation({
    mutationFn: ({ columnId, name }: { columnId: string; name: string }) =>
      updateColumn(columnId, name),

    onSuccess: () => {
      toast.success("Column updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });
    },
  });

  return updateColumnMutation;
}

export function useDeleteColumn(projectId: string) {
  const queryClient = useQueryClient();

  const deleteColumnMutation = useMutation({
    mutationFn: (columnId: string) => deleteColumn(columnId),

    onSuccess: () => {
      toast.success("Column deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });
    },
  });

  return deleteColumnMutation;
}

export function useReorderColumn(projectId: string) {
  const queryClient = useQueryClient();

  const reorderColumnMutation = useMutation({
    mutationFn: (
      columns: {
        id: string;
        order: number;
      }[],
    ) => reorderColumn(columns),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["overview", projectId],
      });
    },
  });

  return reorderColumnMutation;
}
