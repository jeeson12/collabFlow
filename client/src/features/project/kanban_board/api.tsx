import { api } from "@/lib/api/axios";
import { CreateTaskPayload } from "./type";

export async function createTask(formData: FormData) {
  const task = await api.post("/task", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return task.data;
}

export async function getTasks(projectId: string) {
  const response = await api.get(`/task/project/${projectId}`);

  return response.data;
}

export async function getTaskOverview(projectId: string) {
  const response = await api.get(`/task/project/${projectId}/stats`);
  return response.data;
}
