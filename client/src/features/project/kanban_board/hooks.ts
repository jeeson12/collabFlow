import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "./api";

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  const cretateTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      queryClient.invalidateQueries({
        queryKey: ["task-overview", projectId],
      });
    },
  });
  return cretateTaskMutation;
}
